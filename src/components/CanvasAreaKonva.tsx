import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
// import { KonvaEventObject } from "konva/lib/Node";
import { Table, CanvasAreaProps } from "../Types";
import OptionsBar from "./OptionsBar";
import RoomDetailsDisplay from "./RoomDetailsDisplay";
import LockAllObjectsButton from "./LockAllObjectsButton";
import TableComponent from "./TableComponent";
import FeatureComponent from "./FeatureComponent";
import RotateHandler from "./RotateHandler";
import DragAndDropHandler from "./DragAndDropHandler";

const CanvasAreaKonva: React.FC<CanvasAreaProps> = ({
	objects,
	// removeObject,
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
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({
		width: window.innerWidth * 0.9, // Use 90% of the window width
		height: window.innerHeight * 0.9, // Use 90% of the window height
	});

	// State for selectedObject and OptionsBar position
	const [selectedObject, setSelectedObject] = useState<{
		id: string;
		type: "table" | "feature";
		x: number;
		y: number;
	} | null>(null);

	const [areAllObjectsLocked, setAreAllObjectsLocked] = useState(false);

	const room = rooms.find((r) => r.id === selectedRoomId);

	const feetToPixels = 25; // Scale factor

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

	// const dragParams = {
	// 	containerSize,
	// 	tables,
	// 	features,
	// 	setTables,
	// 	setFeatures,
	// };

	const handleDragMove = (e: any) => {
		const node = e.target;
		const id = node.attrs.id;
		const type = node.attrs.type;

		const item =
			type === "table"
				? tables.find((table) => table.id === id)
				: features.find((feature) => feature.id === id);

		if (item?.isLocked) {
			return; // Prevent dragging if the item is locked
		}

		// Get dimensions of the item being dragged
		const itemWidthFeet =
			type === "table"
				? tables.find((table) => table.id === id)?.type ===
				  "table-6"
					? 6
					: tables.find((table) => table.id === id)
							?.type === "table-8"
					? 8
					: 5
				: 1.5; // Assuming feature width is 1.5 feet for example
		const itemHeightFeet =
			type === "table"
				? 2.5 // Assuming table height is 2.5 feet for all types
				: 1.5; // Assuming feature height is 1.5 feet for example

		const itemWidthPixels = itemWidthFeet * feetToPixels;
		const itemHeightPixels = itemHeightFeet * feetToPixels;

		// Ensure x and y are within the bounds
		let x = node.x();
		let y = node.y();

		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x + itemWidthPixels > containerSize.width)
			x = containerSize.width - itemWidthPixels;
		if (y + itemHeightPixels > containerSize.height)
			y = containerSize.height - itemHeightPixels;

		node.x(x);
		node.y(y);
	};

	const handleDragEnd = (id: string, type: "table" | "feature", e: any) => {
		const x = e.target.x() / containerSize.width;
		const y = e.target.y() / containerSize.height;

		const isLocked =
			type === "table"
				? tables.find((table) => table.id === id)?.isLocked
				: features.find((feature) => feature.id === id)
						?.isLocked;

		// If the object is locked, do nothing
		if (isLocked) return;

		if (type === "table") {
			setTables((prevTables) =>
				prevTables.map((table) =>
					table.id === id ? { ...table, x, y } : table
				)
			);
		} else {
			setFeatures((prevFeatures) =>
				prevFeatures.map((feature) =>
					feature.id === id ? { ...feature, x, y } : feature
				)
			);
		}
	};

	const lockAllObjects = () => {
		setAreAllObjectsLocked((prev) => !prev);
		setTables((prevTables) =>
			prevTables.map((table) => ({
				...table,
				isLocked: !areAllObjectsLocked,
			}))
		);
		setFeatures((prevFeatures) =>
			prevFeatures.map((feature) => ({
				...feature,
				isLocked: !areAllObjectsLocked,
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
				/>
			</div>
			<div className="room-details-container w-full p-4 mb-4 bg-blue-200">
				<LockAllObjectsButton
					areAllObjectsLocked={areAllObjectsLocked}
					lockAllObjects={lockAllObjects}
				/>
			</div>
			{room &&
				containerSize.width > 0 &&
				containerSize.height > 0 && (
					<Stage
						width={containerSize.width}
						height={containerSize.height}
						onMouseDown={handleStageClick} // Deselect object on stage click
						onTouchStart={handleStageClick} // Deselect object on touch
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
									<TableComponent
										key={table.id}
										table={table}
										containerSize={
											containerSize
										}
										room={room}
										feetToPixels={
											feetToPixels
										}
										handleDragMove={
											handleDragMove
										}
										handleDragEnd={
											handleDragEnd
										}
										handleObjectClick={
											handleObjectClick
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
									<FeatureComponent
										key={feature.id}
										feature={feature}
										containerSize={
											containerSize
										}
										room={room}
										feetToPixels={
											feetToPixels
										}
										handleDragMove={
											handleDragMove
										}
										handleDragEnd={
											handleDragEnd
										}
										handleObjectClick={
											handleObjectClick
										}
									/>;
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
