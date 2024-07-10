import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { Feature, Room, Table, CanvasAreaProps } from "../Types";

const CanvasAreaKonva: React.FC<CanvasAreaProps> = ({
	objects,
	removeObject,
	rooms,
	tables,
	setTables,
	features,
	setFeatures,
	removeRoom,
	selectedRoomId,
	vendors,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({
		width: window.innerWidth * 0.9, // Use 90% of the window width
		height: window.innerHeight * 0.9, // Use 90% of the window height
	});

	useEffect(() => {
		const updateContainerSize = () => {
			if (containerRef.current) {
				setContainerSize({
					width: containerRef.current.offsetWidth,
					height: containerRef.current.offsetHeight,
				});
			}
		};

		// Update size initially
		updateContainerSize();

		// Update size on window resize
		window.addEventListener("resize", updateContainerSize);
		return () =>
			window.removeEventListener("resize", updateContainerSize);
	}, []);

	const room = rooms.find((r) => r.id === selectedRoomId);

	// const feetToPixels = 25; // 1 foot equals 10 pixels
	const feetToPixelsWidth = 25; // 1 foot equals 25 pixels for width
	const feetToPixelsHeight = 25; // 1 foot equals 25 pixels for height

	let roomWidthFeet = 0;
	let roomHeightFeet = 0;
	let roomWidthPixels = 0;
	let roomHeightPixels = 0;
	// let scale = 1;
	let scaleWidth = 1;
	let scaleHeight = 1;

	if (room) {
		roomWidthFeet = parseFloat(room.width);
		roomHeightFeet = parseFloat(room.depth);

		// Convert room dimensions from feet to pixels
		roomWidthPixels = roomWidthFeet * feetToPixelsWidth;
		roomHeightPixels = roomHeightFeet * feetToPixelsHeight;

		// Calculate scale factors to fit the room within the canvas
		scaleWidth = containerSize.width / roomWidthPixels;
		scaleHeight = containerSize.height / roomHeightPixels;
	}

	// Define table dimensions in feet
	const tableDimensions = {
		"table-6": { width: 6, height: 2.5 },
		"table-8": { width: 8, height: 2.5 },
		"table-5": { width: 5, height: 5 },
	};

	const handleDragEnd = (id: string, type: "table" | "feature", e: any) => {
		const x = e.target.x() / scaleWidth;
		const y = e.target.y() / scaleHeight;
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

	const renderTableText = (
		table: Table,
		tableWidthPixels: number,
		tableHeightPixels: number,
		vendorName: string
	) => {
		const textX = table.x * scaleWidth + tableWidthPixels / 4;
		const textY = table.y * scaleHeight + tableHeightPixels / 4;
		return (
			<React.Fragment key={`${table.id}-text`}>
				<Text
					x={textX - 30}
					y={textY}
					text={`${table.tableNumber}`}
					fontSize={20}
					fill="white"
					draggable
					onDragEnd={(e) =>
						handleDragEnd(table.id, "table", e)
					}
				/>
				<Text
					x={textX - 15} // Adjust position to the right of the table number
					y={textY}
					text={vendorName}
					fontSize={16}
					fill="white"
					draggable
					onDragEnd={(e) =>
						handleDragEnd(table.id, "table", e)
					}
				/>
			</React.Fragment>
		);
	};

	return (
		<div
			ref={containerRef}
			// className="flex-grow overflow-y-auto p-2 m-6"
			className="flex-grow flex-col justify-center items-center overflow-y-auto h-full m-8"
		>
			<div className="canvas-area flex flex-row">
				{rooms.map((room) => (
					<div key={room.id} className="room">
						<h3 className="flex justify-between items-center">
							<span>{room.name}</span>
							<button
								onClick={() =>
									removeRoom(room.id)
								} // ADD: Delete button for room
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
							>
								Delete
							</button>
						</h3>
						<p>Width: {room.width}</p>
						<p>Depth: {room.depth}</p>
					</div>
				))}
			</div>
			{room &&
				containerSize.width > 0 &&
				containerSize.height > 0 && (
					<Stage
						width={containerSize.width}
						height={containerSize.height}
					>
						<Layer
							scaleX={scaleWidth}
							scaleY={scaleHeight}
						>
							<Rect
								x={0}
								y={0}
								width={roomWidthPixels}
								height={roomHeightPixels}
								stroke="black"
								strokeWidth={2}
							/>
							{tables
								.filter(
									(table) =>
										table.roomId ===
										selectedRoomId
								)
								.map((table) => {
									const dimensions =
										tableDimensions[
											table.type
										];
									const tableWidthPixels =
										dimensions.width *
										feetToPixelsWidth;
									const tableHeightPixels =
										dimensions.height *
										feetToPixelsHeight;
									const vendorName =
										vendors.find(
											(vendor) =>
												vendor.id ===
												table.vendorId
										)?.name || "";
									return (
										<React.Fragment
											key={table.id}
										>
											<Rect
												x={
													table.x *
													scaleWidth
												}
												y={
													table.y *
													scaleHeight
												}
												width={
													tableWidthPixels
												}
												height={
													tableHeightPixels
												}
												fill="blue"
												draggable
												onDragEnd={(
													e
												) =>
													handleDragEnd(
														table.id,
														"table",
														e
													)
												}
											/>
											{renderTableText(
												table,
												tableWidthPixels,
												tableHeightPixels,
												vendorName
											)}
										</React.Fragment>
									);
								})}
							{objects
								.filter(
									(feature) =>
										feature.roomId ===
										selectedRoomId
								)
								.map((feature) => (
									<Rect
										key={feature.id}
										x={
											feature.x *
											scaleWidth
										}
										y={
											feature.y *
											scaleHeight
										}
										width={
											30 *
											scaleWidth
										}
										height={
											30 *
											scaleHeight
										}
										fill="red"
										draggable
										onDragEnd={(e) =>
											handleDragEnd(
												feature.id,
												"feature",
												e
											)
										}
									/>
								))}
						</Layer>
					</Stage>
				)}
		</div>
	);
};

export default CanvasAreaKonva;
