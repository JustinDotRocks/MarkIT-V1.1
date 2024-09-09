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
import Grid from "./Grid";

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
	setVendors,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({
		width: window.innerWidth * 0.9, // Use 90% of the window width
		height: window.innerHeight * 0.9, // Use 90% of the window height
	});

	const [showGrid, setShowGrid] = useState(false); // State to control grid visibility
	// Grid size can be adjusted as needed
	const gridSize = 20; // Grid cell size

	// State for selectedObject and OptionsBar position
	const [selectedObject, setSelectedObject] = useState<{
		id: string;
		type: "table" | "feature";
		x: number;
		y: number;
	} | null>(null);

	const room = rooms.find((r) => r.id === selectedRoomId);

	const feetToPixels = 25; // Scale factor

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTableId, setSelectedTableId] = useState<string | null>(
		null
	);

	const [scale, setScale] = useState(1);
	const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
	const stageRef = useRef<any>(null); // Reference for the Konva stage

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

	useEffect(() => {
		// Load the lock state from local storage on initial load
		const storedLockState = localStorage.getItem("areAllObjectsLocked");
		if (storedLockState !== null) {
			setAreAllObjectsLocked(JSON.parse(storedLockState));
		}
	}, []);

	// const lockAllObjects = () => {
	// 	const allLocked = areAllObjectsLocked;
	// 	setAreAllObjectsLocked(!allLocked);

	// 	setTables((prevTables) =>
	// 		prevTables.map((table) => ({
	// 			...table,
	// 			isLocked: !allLocked,
	// 		}))
	// 	);
	// 	setFeatures((prevFeatures) =>
	// 		prevFeatures.map((feature) => ({
	// 			...feature,
	// 			isLocked: !allLocked,
	// 		}))
	// 	);
	// };
	const lockAllObjects = () => {
		const allLocked = areAllObjectsLocked;
		const newLockState = !allLocked;

		setAreAllObjectsLocked(newLockState);

		setTables((prevTables) =>
			prevTables.map((table) => ({
				...table,
				isLocked: newLockState,
			}))
		);
		setFeatures((prevFeatures) =>
			prevFeatures.map((feature) => ({
				...feature,
				isLocked: newLockState,
			}))
		);

		// Save the new lock state to local storage
		localStorage.setItem(
			"areAllObjectsLocked",
			JSON.stringify(newLockState)
		);
	};

	const handleObjectClick = (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
	) => {
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

	// const handleRemoveVendor = (tableId: string) => {
	// 	setTables((prevTables) =>
	// 		prevTables.map((table) =>
	// 			table.id === tableId
	// 				? { ...table, vendorId: undefined }
	// 				: table
	// 		)
	// 	);

	// 	// Find the associated vendor and update the signedIn status
	// 	const associatedVendor = vendors.find((vendor) =>
	// 		tables.some(
	// 			(table) =>
	// 				table.id === tableId &&
	// 				table.vendorId === vendor.id
	// 		)
	// 	);

	// 	if (associatedVendor) {
	// 		setVendors((prevVendors) =>
	// 			prevVendors.map((vendor) =>
	// 				vendor.id === associatedVendor.id
	// 					? { ...vendor, signedIn: false }
	// 					: vendor
	// 			)
	// 		);
	// 	}
	// };
	const handleRemoveVendor = (tableId: string) => {
		// First, update tables state to remove the vendorId from the table
		setTables((prevTables) =>
			prevTables.map((table) =>
				table.id === tableId
					? { ...table, vendorId: undefined }
					: table
			)
		);

		// Update vendors after the table state has been modified
		setVendors((prevVendors) => {
			// Find the vendor associated with the table
			const associatedVendor = prevVendors.find((vendor) =>
				tables.some(
					(table) =>
						table.id === tableId &&
						table.vendorId === vendor.id
				)
			);

			if (associatedVendor) {
				// Remove room and table association from the vendor
				localStorage.removeItem(
					`vendor-${associatedVendor.id}-roomId`
				); // Clear room from localStorage
				return prevVendors.map((vendor) =>
					vendor.id === associatedVendor.id
						? {
								...vendor,
								signedIn: false,
								roomId: "", // Clear room association
								roomName: "", // Clear room name
						  }
						: vendor
				);
			}
			return prevVendors;
		});
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

	const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newScale = parseFloat(e.target.value);
		const stage = stageRef.current;

		if (stage) {
			const oldScale = stage.scaleX();
			const pointer = stage.getPointerPosition() || { x: 0, y: 0 };

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
		}
	};

	useEffect(() => {
		const stage = stageRef.current;
		if (stage) {
			// Attach the wheel event handler for zooming
			stage.on("wheel", handleWheel);

			// Force an update to ensure all Konva internals are set up
			stage.batchDraw();
			console.log("Zoom event listener attached on stage:", stage);

			return () => {
				stage.off("wheel", handleWheel);
			};
		}
	}, [handleWheel]); // Adding handleWheel as a dependency ensures it captures the latest state

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
					<>
						{/* Zoom Slider */}
						<div className="zoom-slider mt-4">
							<label htmlFor="zoom">Zoom: </label>
							<input
								id="zoom"
								type="range"
								min="0.5"
								max="2"
								step="0.01"
								value={scale}
								onChange={handleZoomChange}
								className="w-1/4"
								style={{
									accentColor: "#1f5160",
								}}
							/>
						</div>
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
								{/* Grid Component */}
								{showGrid && (
									<Grid
										containerSize={
											containerSize
										}
										gridSize={gridSize}
										isVisible={showGrid}
									/>
								)}

								<Rect
									x={0}
									y={0}
									width={
										containerSize.width
									}
									height={
										containerSize.height
									}
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
												TableComponent
											}
											vendors={
												vendors
											}
											stageRef={
												stageRef
											}
											setShowGrid={
												setShowGrid
											} // Pass setShowGrid to the handler
										/>
									))}
								{objects
									.filter(
										(feature) =>
											feature.roomId ===
											selectedRoomId
									)
									.map((feature) => {
										return (
											<DragAndDropHandler
												key={
													feature.id
												}
												item={
													feature
												}
												feetToPixels={
													feetToPixels
												}
												room={
													room
												}
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
												stageRef={
													stageRef
												}
												setShowGrid={
													setShowGrid
												} // Pass setShowGrid to the handler
											/>
										);
									})}
							</Layer>
						</Stage>
					</>
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
				tables={tables}
				rooms={rooms}
				setTables={setTables}
				selectedTableId={selectedObject?.id || null}
				setVendors={setVendors}
			/>
		</div>
	);
};

export default CanvasAreaKonva;
