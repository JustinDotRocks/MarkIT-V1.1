import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { CanvasAreaProps } from "../Types";
import OptionsBar from "./OptionsBar";
import RoomDetailsDisplay from "./RoomDetailsDisplay";
import TableComponent from "./TableComponent";
import FeatureComponent from "./FeatureComponent";
import RotateHandler from "./RotateHandler";
import DragAndDropHandler from "./DragAndDropHandler";
import AssignVendorModal from "./AssignVendorModal";
import RoomOptions from "./RoomOptions";

const CanvasAreaKonva: React.FC<CanvasAreaProps> = ({
	objects,
	rooms,
	tables,
	setTables,
	features,
	setFeatures,
	removeRoom,
	selectedRoomId,
	vendors,
	openEditModal,
	removeObjectFromCanvas,
	toggleLockObject,
	setSelectedRoomId,
	openAddRoomModal,
	addTable,
	addFeature,
	areAllObjectsLocked,
	setAreAllObjectsLocked,
	// handleRemoveVendor,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({
		width: window.innerWidth * 0.9, // Use 90% of the window width
		height: window.innerHeight * 0.9, // Use 90% of the window height
	});

	// const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
	// const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
	// 	useState(false);
	// const [isRoomInfoModalOpen, setIsRoomInfoModalOpen] = useState(false);

	// State for selectedObject and OptionsBar position
	const [selectedObject, setSelectedObject] = useState<{
		id: string;
		type: "table" | "feature";
		x: number;
		y: number;
	} | null>(null);

	const room = rooms.find((r) => r.id === selectedRoomId);

	const feetToPixels = 25; // Scale factor

	// const openAddTablesModal = () => setIsAddTablesModalOpen(true);
	// const closeAddTablesModal = () => setIsAddTablesModalOpen(false);

	// const openAddFeaturesModal = () => setIsAddFeaturesModalOpen(true);
	// const closeAddFeaturesModal = () => setIsAddFeaturesModalOpen(false);

	// const toggleRoomInfoModal = () => setIsRoomInfoModalOpen((prev) => !prev);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTableId, setSelectedTableId] = useState<string | null>(
		null
	);

	const [scale, setScale] = useState(1);
	const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
	const stageRef = useRef<any>(null); // Reference for the Konva stage
	const [isStageDragging, setIsStageDragging] = useState(false); // State for stage dragging

	useEffect(() => {
		if (room) {
			const roomWidthFeet = parseFloat(room.width);
			const roomHeightFeet = parseFloat(room.depth);

			// Determine the greater dimension and set it to the horizontal axis
			const greaterDimensionFeet = Math.max(
				roomWidthFeet,
				roomHeightFeet
			);
			const lesserDimensionFeet = Math.min(
				roomWidthFeet,
				roomHeightFeet
			);

			const roomWidthPixels = greaterDimensionFeet * feetToPixels;
			const roomHeightPixels = lesserDimensionFeet * feetToPixels;
			const scaleWidth = containerSize.width / roomWidthPixels;

			setContainerSize({
				width: roomWidthPixels * scaleWidth,
				height: roomHeightPixels * scaleWidth,
			});
		}
	}, [room, containerSize.width]);

	const lockAllObjects = () => {
		const allLocked = areAllObjectsLocked;
		setAreAllObjectsLocked(!allLocked);

		setTables((prevTables) =>
			prevTables.map((table) => ({
				...table,
				isLocked: !allLocked,
			}))
		);
		setFeatures((prevFeatures) =>
			prevFeatures.map((feature) => ({
				...feature,
				isLocked: !allLocked,
			}))
		);
	};

	const handleObjectClick = (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
		// width: number,
		// height: number
	) => {
		// Adjust x and y to be the center of the object
		// const centerX = x + width / 2;
		// const centerY = y + height / 2;
		// setSelectedObject({ id, type, x: centerX, y: centerY });
		setSelectedObject({ id, type, x, y });
	};

	const handleStageClick = () => {
		setSelectedObject(null);
	};

	const handleDelete = () => {
		if (selectedObject) {
			removeObjectFromCanvas(selectedObject.id);
			setSelectedObject(null);
		}
	};

	const selectedTableOrFeature = selectedObject
		? selectedObject.type === "table"
			? tables.find((table) => table.id === selectedObject.id)
			: features.find((feature) => feature.id === selectedObject.id)
		: null;

	const handleAddVendorClick = (tableId: string) => {
		setSelectedTableId(tableId);
		setIsModalOpen(true);
	};

	const handleRemoveVendorClick = (tableId: string) => {
		setSelectedTableId(tableId);
		setIsModalOpen(true);
	};

	// const handleAssignVendor = (vendorId: string) => {
	// 	if (selectedTableId) {
	// 		setTables((prevTables) =>
	// 			prevTables.map((table) =>
	// 				table.id === selectedTableId
	// 					? { ...table, vendorId }
	// 					: table
	// 			)
	// 		);
	// 		setSelectedTableId(null);
	// 	}
	// };

	const handleRemoveVendor = (tableId: string) => {
		setTables((prevTables) =>
			prevTables.map((table) =>
				table.id === tableId
					? { ...table, vendorId: undefined }
					: table
			)
		);
	};

	// Handle zooming with mouse wheel
	const handleWheel = (e: any) => {
		e.evt.preventDefault();

		const stage = stageRef.current;
		const oldScale = stage.scaleX();
		const pointer = stage.getPointerPosition();

		const scaleBy = 1.01; // Zoom factor
		let direction = e.evt.deltaY > 0 ? 1 : -1;

		// Revert zoom direction when using ctrlKey (for touchpads)
		if (e.evt.ctrlKey) {
			direction = -direction;
		}

		const newScale =
			direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

		setScale(newScale);

		const mousePointTo = {
			x: (pointer.x - stage.x()) / oldScale,
			y: (pointer.y - stage.y()) / oldScale,
		};

		const newPos = {
			x: pointer.x - mousePointTo.x * newScale,
			y: pointer.y - mousePointTo.y * newScale,
		};

		setStagePosition(newPos);
		stage.scale({ x: newScale, y: newScale });
		stage.position(newPos);
		stage.batchDraw(); // Update the stage
	};

	// Handle stage dragging start
	const handleDragStageStart = () => {
		setIsStageDragging(true);
	};

	// Handle stage dragging end
	const handleDragStageEnd = () => {
		setIsStageDragging(false);
		const stage = stageRef.current;
		setStagePosition({ x: stage.x(), y: stage.y() });
	};

	useEffect(() => {
		const stage = stageRef.current;
		if (stage) {
			stage.on("wheel", handleWheel);
		}

		return () => {
			if (stage) {
				stage.off("wheel", handleWheel);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="flex-grow flex-col justify-center items-center overflow-y-auto h-full"
		>
			<div className="canvas-area flex flex-col">
				<RoomDetailsDisplay
					rooms={rooms}
					handleRemoveRoom={removeRoom}
					openEditModal={openEditModal}
					removeRoom={removeRoom}
					setSelectedRoomId={setSelectedRoomId}
					openAddRoomModal={openAddRoomModal}
					selectedRoomId={selectedRoomId}
				/>
			</div>
			{room !== undefined && (
				<RoomOptions
					areAllObjectsLocked={areAllObjectsLocked}
					lockAllObjects={lockAllObjects}
					selectedRoomId={selectedRoomId}
					// toggleRoomInfoModal={() =>
					// 	setIsRoomInfoModalOpen(!isRoomInfoModalOpen)
					// }
					addTable={addTable}
					tables={tables}
					addFeature={addFeature}
					features={features}
					room={room}
					removeRoom={removeRoom}
					openEditModal={openEditModal}
					rooms={rooms}
					setSelectedRoomId={setSelectedRoomId}
					openAddRoomModal={openAddRoomModal}
					setTables={setTables}
				/>
			)}
			{room &&
				containerSize.width > 0 &&
				containerSize.height > 0 && (
					<Stage
						ref={stageRef}
						width={containerSize.width}
						height={containerSize.height}
						scaleX={scale}
						scaleY={scale}
						draggable // Enable stage dragging
						x={stagePosition.x}
						y={stagePosition.y}
						onMouseDown={handleStageClick}
						onTouchStart={handleStageClick}
					>
						<Layer>
							<Rect
								x={0}
								y={0}
								width={containerSize.width}
								height={containerSize.height}
								stroke="black"
								strokeWidth={2}
							/>
							{tables
								.filter(
									(table) =>
										table.roomId ===
										selectedRoomId
								)
								.map((table) => (
									<DragAndDropHandler
										key={table.id}
										item={table}
										containerSize={
											containerSize
										}
										feetToPixels={
											feetToPixels
										}
										room={room}
										tables={tables}
										features={features}
										setTables={
											setTables
										}
										setFeatures={
											setFeatures
										}
										onObjectClick={
											handleObjectClick
										}
										Component={
											TableComponent
										}
									/>
								))}
							{objects
								.filter(
									(feature) =>
										feature.roomId ===
										selectedRoomId
								)
								.map((feature) => {
									console.log(
										"Rendering Feature:",
										feature
									);
									return (
										<DragAndDropHandler
											key={
												feature.id
											}
											item={feature}
											feetToPixels={
												feetToPixels
											}
											room={room}
											containerSize={
												containerSize
											}
											tables={
												tables
											}
											features={
												features
											}
											setTables={
												setTables
											}
											setFeatures={
												setFeatures
											}
											onObjectClick={
												handleObjectClick
											}
											Component={
												FeatureComponent
											}
										/>
									);
								})}
						</Layer>
					</Stage>
				)}
			{/* <div className="relative"> */}
			{selectedObject && selectedTableOrFeature && (
				<RotateHandler
					item={selectedTableOrFeature}
					setTables={setTables}
					setFeatures={setFeatures}
				>
					{({ rotateCW, rotateCCW }) => (
						<OptionsBar
							x={selectedObject.x}
							y={selectedObject.y}
							// x={
							// 	selectedObject.x *
							// 	containerSize.width
							// }
							// y={
							// 	selectedObject.y *
							// 	containerSize.height
							// }
							onDelete={handleDelete}
							onRotateCW={rotateCW}
							onRotateCCW={rotateCCW}
							onToggleLock={() =>
								toggleLockObject(
									selectedObject.id,
									selectedObject.type
								)
							}
							isLocked={
								selectedObject.type === "table"
									? !!tables.find(
											(table) =>
												table.id ===
												selectedObject.id
									  )?.isLocked
									: !!features.find(
											(feature) =>
												feature.id ===
												selectedObject.id
									  )?.isLocked
							}
							vendorName={
								selectedObject.type === "table"
									? tables.find(
											(table) =>
												table.id ===
												selectedObject.id
									  )?.vendorId
										? vendors.find(
												(
													vendor
												) =>
													vendor.id ===
													tables.find(
														(
															table
														) =>
															table.id ===
															selectedObject.id
													)
														?.vendorId
										  )?.name || ""
										: ""
									: ""
							}
							onAddVendor={() =>
								handleAddVendorClick(
									selectedObject.id
								)
							}
							onRemoveVendor={() =>
								handleRemoveVendor(
									selectedObject.id
								)
							}
							objectType={selectedObject.type}
							canvasWidth={containerSize.width}
							canvasHeight={containerSize.height}
						/>
					)}
				</RotateHandler>
			)}
			{/* </div> */}
			<AssignVendorModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				vendors={vendors}
				// onAssign={handleAssignVendor}
				tables={tables}
				rooms={rooms}
				setTables={setTables}
				selectedTableId={selectedObject?.id || null}
			/>
		</div>
	);
};

export default CanvasAreaKonva;
