// import React, { useRef, useEffect, useState } from "react";
// import { Stage, Layer, Rect, Circle, Text } from "react-konva";
// import { Feature, Room, Table, CanvasAreaProps } from "../Types";

// const CanvasAreaKonva: React.FC<CanvasAreaProps> = ({
// 	objects,
// 	removeObject,
// 	rooms,
// 	tables,
// 	setTables,
// 	features,
// 	setFeatures,
// 	removeRoom,
// 	selectedRoomId,
// 	vendors,
// }) => {
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const [containerSize, setContainerSize] = useState({
// 		width: 0,
// 		height: 0,
// 	});
// 	const feetToPixels = 20; // Scale factor
// 	const adjustmentFactor = 1; // Adjustment factor for height

// 	const room = rooms.find((r) => r.id === selectedRoomId);

// 	useEffect(() => {
// 		if (room) {
// 			const roomWidthFeet = parseFloat(room.width);
// 			const roomHeightFeet = parseFloat(room.depth);

// 			const roomWidthPixels = roomWidthFeet * feetToPixels;
// 			const roomHeightPixels =
// 				roomHeightFeet * feetToPixels * adjustmentFactor;

// 			setContainerSize({
// 				width: roomWidthPixels,
// 				height: roomHeightPixels,
// 			});
// 		}
// 	}, [room]);

// 	// Handle room deletion with confirmation prompt
// 	const handleRemoveRoom = (roomId: string) => {
// 		if (window.confirm("Are you sure you want to delete the room?")) {
// 			removeRoom(roomId);
// 		}
// 	};

// 	const handleDragMove = (e: any) => {
// 		const node = e.target;
// 		const id = node.attrs.id;
// 		const type = node.attrs.type;

// 		// Get dimensions of the item being dragged
// 		const itemWidthFeet =
// 			type === "table"
// 				? tables.find((table) => table.id === id)?.type ===
// 				  "table-6"
// 					? 6
// 					: tables.find((table) => table.id === id)
// 							?.type === "table-8"
// 					? 8
// 					: 5
// 				: 1.5; // Assuming feature width is 1.5 feet for example
// 		const itemHeightFeet =
// 			type === "table"
// 				? 2.5 // Assuming table height is 2.5 feet for all types
// 				: 1.5; // Assuming feature height is 1.5 feet for example

// 		const itemWidthPixels = itemWidthFeet * feetToPixels;
// 		const itemHeightPixels =
// 			itemHeightFeet * feetToPixels * adjustmentFactor;

// 		// Ensure x and y are within the bounds
// 		let x = node.x();
// 		let y = node.y();

// 		if (x < 0) x = 0;
// 		if (y < 0) y = 0;
// 		if (x + itemWidthPixels > containerSize.width)
// 			x = containerSize.width - itemWidthPixels;
// 		if (y + itemHeightPixels > containerSize.height)
// 			y = containerSize.height - itemHeightPixels;

// 		node.x(x);
// 		node.y(y);
// 	};

// 	const handleDragEnd = (id: string, type: "table" | "feature", e: any) => {
// 		const node = e.target;
// 		const x = node.x() / feetToPixels;
// 		const y = node.y() / (feetToPixels * adjustmentFactor);

// 		if (type === "table") {
// 			setTables((prevTables) =>
// 				prevTables.map((table) =>
// 					table.id === id ? { ...table, x, y } : table
// 				)
// 			);
// 		} else {
// 			setFeatures((prevFeatures) =>
// 				prevFeatures.map((feature) =>
// 					feature.id === id ? { ...feature, x, y } : feature
// 				)
// 			);
// 		}
// 	};

// 	// Define table dimensions in feet
// 	const tableDimensions = {
// 		"table-6": { width: 6, height: 2.5 },
// 		"table-8": { width: 8, height: 2.5 },
// 		"table-5": { width: 5, height: 5 },
// 	};

// 	const renderTableText = (
// 		table: Table,
// 		tableWidthPixels: number,
// 		tableHeightPixels: number,
// 		vendorName: string
// 	) => {
// 		const textX = table.x * feetToPixels + tableWidthPixels / 4;
// 		const textY =
// 			table.y * feetToPixels * adjustmentFactor +
// 			tableHeightPixels / 4;
// 		return (
// 			<React.Fragment key={`${table.id}-text`}>
// 				<Text
// 					x={textX - 25}
// 					y={textY}
// 					text={`${table.tableNumber}`}
// 					fontSize={20}
// 					fill="white"
// 					draggable
// 					onDragMove={handleDragMove}
// 					onDragEnd={(e) =>
// 						handleDragEnd(table.id, "table", e)
// 					}
// 				/>
// 				<Text
// 					x={textX - 5} // Adjust position to the right of the table number
// 					y={textY}
// 					text={vendorName}
// 					fontSize={16}
// 					fill="white"
// 					draggable
// 					onDragMove={handleDragMove}
// 					onDragEnd={(e) =>
// 						handleDragEnd(table.id, "table", e)
// 					}
// 				/>
// 			</React.Fragment>
// 		);
// 	};

// 	return (
// 		<div
// 			ref={containerRef}
// 			className="flex-grow flex-col justify-center items-center overflow-y-auto h-full m-8"
// 		>
// 			<div className="canvas-area flex flex-row">
// 				{rooms.map((room) => (
// 					<div key={room.id} className="room">
// 						<h3 className="flex justify-between items-center">
// 							<span>{room.name}</span>
// 							<button
// 								onClick={() =>
// 									handleRemoveRoom(room.id)
// 								}
// 								className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
// 							>
// 								Delete
// 							</button>
// 						</h3>
// 						<p>Width: {room.width}</p>
// 						<p>Depth: {room.depth}</p>
// 					</div>
// 				))}
// 			</div>
// 			{room &&
// 				containerSize.width > 0 &&
// 				containerSize.height > 0 && (
// 					<Stage
// 						width={containerSize.width}
// 						height={containerSize.height}
// 					>
// 						<Layer>
// 							<Rect
// 								x={0}
// 								y={0}
// 								width={containerSize.width}
// 								height={containerSize.height}
// 								stroke="black"
// 								strokeWidth={2}
// 							/>
// 							{tables
// 								.filter(
// 									(table) =>
// 										table.roomId ===
// 										selectedRoomId
// 								)
// 								.map((table) => {
// 									const dimensions =
// 										tableDimensions[
// 											table.type
// 										];
// 									const tableWidthPixels =
// 										dimensions.width *
// 										feetToPixels;
// 									const tableHeightPixels =
// 										dimensions.height *
// 										feetToPixels *
// 										adjustmentFactor;
// 									const vendorName =
// 										vendors.find(
// 											(vendor) =>
// 												vendor.id ===
// 												table.vendorId
// 										)?.name || "";
// 									return (
// 										<React.Fragment
// 											key={table.id}
// 										>
// 											{table.type ===
// 											"table-5" ? (
// 												<Circle
// 													x={
// 														table.x *
// 														feetToPixels
// 													}
// 													y={
// 														table.y *
// 														feetToPixels *
// 														adjustmentFactor
// 													}
// 													radius={
// 														(tableWidthPixels +
// 															tableHeightPixels) /
// 														4
// 													}
// 													fill="blue"
// 													draggable
// 													onDragMove={
// 														handleDragMove
// 													}
// 													onDragEnd={(
// 														e
// 													) =>
// 														handleDragEnd(
// 															table.id,
// 															"table",
// 															e
// 														)
// 													}
// 												/>
// 											) : (
// 												<Rect
// 													x={
// 														table.x *
// 														feetToPixels
// 													}
// 													y={
// 														table.y *
// 														feetToPixels *
// 														adjustmentFactor
// 													}
// 													width={
// 														tableWidthPixels
// 													}
// 													height={
// 														tableHeightPixels
// 													}
// 													fill="blue"
// 													draggable
// 													onDragMove={
// 														handleDragMove
// 													}
// 													onDragEnd={(
// 														e
// 													) =>
// 														handleDragEnd(
// 															table.id,
// 															"table",
// 															e
// 														)
// 													}
// 												/>
// 											)}
// 											{renderTableText(
// 												table,
// 												tableWidthPixels,
// 												tableHeightPixels,
// 												vendorName
// 											)}
// 										</React.Fragment>
// 									);
// 								})}
// 							{objects
// 								.filter(
// 									(feature) =>
// 										feature.roomId ===
// 										selectedRoomId
// 								)
// 								.map((feature) => {
// 									const isDoor =
// 										feature.type ===
// 										"door";
// 									return (
// 										<React.Fragment
// 											key={
// 												feature.id
// 											}
// 										>
// 											{isDoor ? (
// 												<Rect
// 													x={
// 														feature.x *
// 														feetToPixels
// 													}
// 													y={
// 														feature.y *
// 														feetToPixels *
// 														adjustmentFactor
// 													}
// 													width={
// 														30
// 													}
// 													height={
// 														30
// 													}
// 													fill="green"
// 													draggable
// 													onDragMove={
// 														handleDragMove
// 													}
// 													onDragEnd={(
// 														e
// 													) =>
// 														handleDragEnd(
// 															feature.id,
// 															"feature",
// 															e
// 														)
// 													}
// 												/>
// 											) : (
// 												<Circle
// 													x={
// 														feature.x *
// 														feetToPixels
// 													}
// 													y={
// 														feature.y *
// 														feetToPixels *
// 														adjustmentFactor
// 													}
// 													radius={
// 														15
// 													}
// 													fill="red"
// 													draggable
// 													onDragMove={
// 														handleDragMove
// 													}
// 													onDragEnd={(
// 														e
// 													) =>
// 														handleDragEnd(
// 															feature.id,
// 															"feature",
// 															e
// 														)
// 													}
// 												/>
// 											)}
// 										</React.Fragment>
// 									);
// 								})}
// 						</Layer>
// 					</Stage>
// 				)}
// 		</div>
// 	);
// };

// export default CanvasAreaKonva;
import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Circle } from "react-konva";
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

	const room = rooms.find((r) => r.id === selectedRoomId);

	const feetToPixels = 25; // Scale factor

	useEffect(() => {
		if (room) {
			const roomWidthFeet = parseFloat(room.width);
			const roomHeightFeet = parseFloat(room.depth);

			const roomWidthPixels = roomWidthFeet * feetToPixels;
			const scaleWidth = containerSize.width / roomWidthPixels;

			setContainerSize({
				width: containerSize.width,
				height: roomHeightFeet * feetToPixels * scaleWidth,
			});
		}
	}, [room, containerSize.width]);

	const handleDragMove = (e: any) => {
		const node = e.target;
		const id = node.attrs.id;
		const type = node.attrs.type;

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
		const textX = table.x * containerSize.width + tableWidthPixels / 4;
		const textY =
			table.y * containerSize.height + tableHeightPixels / 4;
		return (
			<React.Fragment key={`${table.id}-text`}>
				<Text
					x={textX - 3}
					y={textY}
					text={`${table.tableNumber}`}
					fontSize={12}
					fill="white"
					draggable
					onDragMove={handleDragMove}
					onDragEnd={(e) =>
						handleDragEnd(table.id, "table", e)
					}
				/>
				<Text
					x={textX - 20}
					y={textY}
					text={vendorName}
					fontSize={8}
					fill="white"
					draggable
					onDragMove={handleDragMove}
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
										feetToPixels *
										(containerSize.width /
											(room?.width
												? parseFloat(
														room.width
												  ) *
												  feetToPixels
												: 1));
									const tableHeightPixels =
										dimensions.height *
										feetToPixels *
										(containerSize.width /
											(room?.width
												? parseFloat(
														room.width
												  ) *
												  feetToPixels
												: 1));
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
											{table.type ===
											"table-5" ? (
												<Circle
													x={
														table.x *
														containerSize.width
													}
													y={
														table.y *
														containerSize.height
													}
													radius={
														(dimensions.width *
															feetToPixels *
															(containerSize.width /
																(room?.width
																	? parseFloat(
																			room.width
																	  ) *
																	  feetToPixels
																	: 1))) /
														2
													}
													fill="blue"
													draggable
													onDragMove={
														handleDragMove
													}
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
											) : (
												<Rect
													x={
														table.x *
														containerSize.width
													}
													y={
														table.y *
														containerSize.height
													}
													width={
														tableWidthPixels
													}
													height={
														tableHeightPixels
													}
													fill="blue"
													draggable
													onDragMove={
														handleDragMove
													}
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
											)}
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
											containerSize.width
										}
										y={
											feature.y *
											containerSize.height
										}
										width={
											30 *
											feetToPixels *
											(containerSize.width /
												(room?.width
													? parseFloat(
															room.width
													  ) *
													  feetToPixels
													: 1))
										}
										height={
											30 *
											feetToPixels *
											(containerSize.width /
												(room?.width
													? parseFloat(
															room.width
													  ) *
													  feetToPixels
													: 1))
										}
										fill={
											feature.type ===
											"door"
												? "green"
												: "red"
										}
										draggable
										onDragMove={
											handleDragMove
										}
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
