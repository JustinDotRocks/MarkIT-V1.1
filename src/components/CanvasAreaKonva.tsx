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
		width: 0,
		height: 0,
	});
	const feetToPixels = 20; // Scale factor
	const adjustmentFactor = 1; // Adjustment factor for height

	const room = rooms.find((r) => r.id === selectedRoomId);

	useEffect(() => {
		if (room) {
			const roomWidthFeet = parseFloat(room.width);
			const roomHeightFeet = parseFloat(room.depth);

			const roomWidthPixels = roomWidthFeet * feetToPixels;
			const roomHeightPixels =
				roomHeightFeet * feetToPixels * adjustmentFactor;

			setContainerSize({
				width: roomWidthPixels,
				height: roomHeightPixels,
			});
		}
	}, [room]);

	const handleDragEnd = (id: string, type: "table" | "feature", e: any) => {
		const x = e.target.x() / feetToPixels;
		const y = e.target.y() / (feetToPixels * adjustmentFactor);
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

	// Define table dimensions in feet
	const tableDimensions = {
		"table-6": { width: 6, height: 2.5 },
		"table-8": { width: 8, height: 2.5 },
		"table-5": { width: 5, height: 5 },
	};

	const renderTableText = (
		table: Table,
		tableWidthPixels: number,
		tableHeightPixels: number,
		vendorName: string
	) => {
		const textX = table.x * feetToPixels + tableWidthPixels / 4;
		const textY =
			table.y * feetToPixels * adjustmentFactor +
			tableHeightPixels / 4;
		return (
			<React.Fragment key={`${table.id}-text`}>
				<Text
					x={textX - 25}
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
					x={textX - 5} // Adjust position to the right of the table number
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
								}
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
								.map((table) => {
									const dimensions =
										tableDimensions[
											table.type
										];
									const tableWidthPixels =
										dimensions.width *
										feetToPixels;
									const tableHeightPixels =
										dimensions.height *
										feetToPixels *
										adjustmentFactor;
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
													feetToPixels
												}
												y={
													table.y *
													feetToPixels *
													adjustmentFactor
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
											feetToPixels
										}
										y={
											feature.y *
											feetToPixels *
											adjustmentFactor
										}
										width={
											30 *
											feetToPixels
										}
										height={
											30 *
											feetToPixels *
											adjustmentFactor
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
