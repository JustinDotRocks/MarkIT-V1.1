import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { CanvasAreaProps } from "../Types";
import OptionsBar from "./OptionsBar";
import RoomDetailsDisplay from "./RoomDetailsDisplay";
import LockAllObjectsButton from "./LockAllObjectsButton";
import TableComponent from "./TableComponent";
import FeatureComponent from "./FeatureComponent";
import RotateHandler from "./RotateHandler";
import DragAndDropHandler from "./DragAndDropHandler";
import AddTablesModal from "./AddTablesModal";
import AddFeaturesModal from "./AddFeaturesModal";
import InfoModal from "./InfoModal";
import { FiInfo } from "react-icons/fi";

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
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({
		width: window.innerWidth * 0.9, // Use 90% of the window width
		height: window.innerHeight * 0.9, // Use 90% of the window height
	});

	const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
	const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
		useState(false);
	const [isRoomInfoModalOpen, setIsRoomInfoModalOpen] = useState(false);

	// State for selectedObject and OptionsBar position
	const [selectedObject, setSelectedObject] = useState<{
		id: string;
		type: "table" | "feature";
		x: number;
		y: number;
	} | null>(null);

	const room = rooms.find((r) => r.id === selectedRoomId);

	const feetToPixels = 25; // Scale factor

	const openAddTablesModal = () => setIsAddTablesModalOpen(true);
	const closeAddTablesModal = () => setIsAddTablesModalOpen(false);

	const openAddFeaturesModal = () => setIsAddFeaturesModalOpen(true);
	const closeAddFeaturesModal = () => setIsAddFeaturesModalOpen(false);

	const toggleRoomInfoModal = () => setIsRoomInfoModalOpen((prev) => !prev);

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
		console.log("Features in CanvasAreaKonva:", features);
	}, [features]);

	// Log the selected roomId and room details
	useEffect(() => {
		console.log("Selected Room ID:", selectedRoomId);
		console.log("Current Room Object:", room);
	}, [selectedRoomId, room]);

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
			<div className="room-details-container w-full p-4 mb-4 bg-blue-200">
				<LockAllObjectsButton
					areAllObjectsLocked={areAllObjectsLocked}
					lockAllObjects={lockAllObjects}
				/>
				{selectedRoomId && (
					<>
						<button
							onClick={openAddTablesModal}
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
						>
							Add Tables
						</button>
						<button
							onClick={openAddFeaturesModal} // Add this button
							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4"
						>
							Add Features
						</button>
						<div
							onClick={toggleRoomInfoModal}
							className="cursor-pointer text-blue-500 inline-block ml-2"
						>
							<FiInfo size={24} />
						</div>
					</>
				)}
			</div>
			{isAddTablesModalOpen && (
				<AddTablesModal
					isOpen={isAddTablesModalOpen}
					onClose={closeAddTablesModal}
					addTable={addTable}
					tables={tables}
					selectedRoomId={selectedRoomId}
				/>
			)}
			{isAddFeaturesModalOpen && (
				<AddFeaturesModal
					isOpen={isAddFeaturesModalOpen}
					onClose={closeAddFeaturesModal}
					addFeature={addFeature}
					features={features}
					selectedRoomId={selectedRoomId}
				/>
			)}
			{room && (
				<InfoModal
					isOpen={isRoomInfoModalOpen}
					onClose={toggleRoomInfoModal}
					room={room}
					openEditModal={openEditModal}
					removeRoom={removeRoom}
				/>
			)}
			{room &&
				containerSize.width > 0 &&
				containerSize.height > 0 && (
					<Stage
						width={containerSize.width}
						height={containerSize.height}
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
						/>
					)}
				</RotateHandler>
			)}
		</div>
	);
};

export default CanvasAreaKonva;
