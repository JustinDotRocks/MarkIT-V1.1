import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Circle } from "react-konva";
// import { KonvaEventObject } from "konva/lib/Node";
import { Table, CanvasAreaProps } from "../Types";
import OptionsBar from "./OptionsBar";

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

	const [areAllObjectsLocked, setAreAllObjectsLocked] = useState(false); // New state for locking/unlocking all objects

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

			// const roomWidthPixels = roomWidthFeet * feetToPixels;
			const roomWidthPixels = greaterDimensionFeet * feetToPixels;
			const roomHeightPixels = lesserDimensionFeet * feetToPixels;
			const scaleWidth = containerSize.width / roomWidthPixels;

			// setContainerSize({
			// 	width: containerSize.width,
			// 	height: roomHeightFeet * feetToPixels * scaleWidth,
			// });
			setContainerSize({
				width: roomWidthPixels * scaleWidth,
				height: roomHeightPixels * scaleWidth,
			});
		}
	}, [room, containerSize.width]);

	const handleDragMove = (e: any) => {
		const node = e.target;
		const id = node.attrs.id;
		const type = node.attrs.type;

		// const isLocked =
		// 	type === "table"
		// 		? tables.find((table) => table.id === id)?.locked
		// 		: features.find((feature) => feature.id === id)?.locked;

		// // If the object is locked, do nothing
		// if (isLocked) return;
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

		// Find the item and check if it's locked
		// const item =
		// 	type === "table"
		// 		? tables.find((table) => table.id === id)
		// 		: features.find((feature) => feature.id === id);

		// if (item?.locked) return; // Prevent updating position if locked
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

	const tableDimensions = {
		"table-6": { width: 6, height: 2.5 },
		"table-8": { width: 8, height: 2.5 },
		"table-5": { width: 5, height: 5 },
	};

	// const toggleLockObject = (id: string, type: "table" | "feature") => {
	// 	if (type === "table") {
	// 		setTables((prevTables: Table[]) =>
	// 			prevTables.map((table) =>
	// 				table.id === id
	// 					? { ...table, locked: !table.isLocked }
	// 					: table
	// 			)
	// 		);
	// 	} else {
	// 		setFeatures((prevFeatures: Feature[]) =>
	// 			prevFeatures.map((feature) =>
	// 				feature.id === id
	// 					? { ...feature, locked: !feature.isLocked }
	// 					: feature
	// 			)
	// 		);
	// 	}
	// };

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

	const getFontSizes = (roomWidthFeet: number, isCircle: boolean) => {
		if (roomWidthFeet < 50) {
			return {
				tableNumberFontSize: 16,
				vendorNameFontSize: 14,
				xOffset: isCircle ? 40 : 38,
				xOffsetVendorName: isCircle ? 60 : 25,
				yOffset: isCircle ? 50 : 0,
			};
		} else if (roomWidthFeet < 100) {
			return {
				tableNumberFontSize: 10,
				vendorNameFontSize: 8,
				xOffset: isCircle ? 20 : 18,
				xOffsetVendorName: isCircle ? 30 : 10,
				yOffset: isCircle ? 25 : 0,
			};
		} else if (roomWidthFeet < 150) {
			return {
				tableNumberFontSize: 8,
				vendorNameFontSize: 6,
				xOffset: isCircle ? 12 : 12,
				xOffsetVendorName: isCircle ? 16 : 6,
				yOffset: isCircle ? 15 : 0,
			};
		} else if (roomWidthFeet < 200) {
			return {
				tableNumberFontSize: 5,
				vendorNameFontSize: 4,
				xOffset: isCircle ? 9 : 8,
				xOffsetVendorName: isCircle ? 18 : 3,
				yOffset: isCircle ? 10 : 0,
			};
		} else {
			return {
				tableNumberFontSize: 4,
				vendorNameFontSize: 3.5,
				xOffset: isCircle ? 6 : 5,
				xOffsetVendorName: isCircle ? 12 : 2,
				yOffset: isCircle ? 7 : 0,
			};
		}
	};

	// 	// Handle room deletion with confirmation prompt
	const handleRemoveRoom = (roomId: string) => {
		if (window.confirm("Are you sure you want to delete the room?")) {
			removeRoom(roomId);
		}
	};

	// const handleRemove = (id: string, type: "table" | "feature") => {
	// 	if (window.confirm("Are you sure you want to delete this item?")) {
	// 		handleRemoveObject(id);
	// 	}
	// };

	const handleObjectClick = (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
	) => {
		setSelectedObject({ id, type, x, y });
	};
	// const handleObjectClick = (
	// 	id: string,
	// 	type: "table" | "feature",
	// 	x: number,
	// 	y: number,
	// 	event: Konva.KonvaEventObject<MouseEvent>
	// ) => {
	// 	const node = event.target;
	// 	const { x: nodeX, y: nodeY } = node.getClientRect({ relativeTo: node.getStage() });
	// 	setSelectedObject({
	// 		id,
	// 		type,
	// 		x: nodeX,
	// 		y: nodeY - 40, // Adjust to position the OptionsBar above the object
	// 	});
	// };

	const handleStageClick = () => {
		setSelectedObject(null);
	};

	const handleDelete = () => {
		if (selectedObject) {
			removeObjectFromCanvas(selectedObject.id);
			setSelectedObject(null);
		}
	};

	const rotateObject = (
		id: string,
		type: "table" | "feature",
		angle: number
	) => {
		if (type === "table") {
			setTables((prevTables) =>
				prevTables.map((table) => {
					if (table.id === id) {
						// Check if the table is locked
						if (table.isLocked) return table;

						// Update rotation
						const newRotation =
							((table.rotation || 0) + angle) % 360;
						return { ...table, rotation: newRotation };
					}
					return table;
				})
			);
		} else {
			setFeatures((prevFeatures) =>
				prevFeatures.map((feature) => {
					if (feature.id === id) {
						// Check if the feature is locked
						if (feature.isLocked) return feature;

						// Update rotation
						const newRotation =
							((feature.rotation || 0) + angle) %
							360;
						return {
							...feature,
							rotation: newRotation,
						};
					}
					return feature;
				})
			);
		}
	};

	const rotateCW = () => {
		if (selectedObject) {
			rotateObject(selectedObject.id, selectedObject.type, 45);
		}
	};

	const rotateCCW = () => {
		if (selectedObject) {
			rotateObject(selectedObject.id, selectedObject.type, -45);
		}
	};

	const renderTableText = (
		table: Table,
		tableWidthPixels: number,
		tableHeightPixels: number
		// vendorName: string
	) => {
		const textX = table.x * containerSize.width + tableWidthPixels / 4;
		const textY =
			table.y * containerSize.height + tableHeightPixels / 4;

		const isCircle = table.type === "table-5";

		// Determine font sizes based on room width
		const {
			tableNumberFontSize,
			// vendorNameFontSize,
			xOffset,
			// xOffsetVendorName,
			yOffset,
		} = room
			? getFontSizes(parseFloat(room.width), isCircle)
			: {
					tableNumberFontSize: 12,
					// vendorNameFontSize: 8,
					xOffset: 35,
					// xOffsetVendorName: 45,
					yOffset: 0,
			  }; // Default values if room is undefined

		return (
			<React.Fragment key={`${table.id}-text`}>
				<Text
					x={textX - xOffset}
					y={textY}
					text={`${table.tableNumber}`}
					fontSize={tableNumberFontSize}
					fill="white"
					draggable={!table.isLocked}
					onDragMove={handleDragMove}
					onDragEnd={(e) =>
						handleDragEnd(table.id, "table", e)
					}
					// onClick={(event) =>
					// 	handleObjectClick(
					// 		table.id,
					// 		"table",
					// 		event.evt.clientX,
					// 		event.evt.clientY
					// 	)
					// }
					onClick={(e) =>
						handleObjectClick(
							table.id,
							"table",
							e.evt.clientX,
							e.evt.clientY
						)
					}
					rotation={table.rotation || 0}
				/>
				{/* <Text
					x={textX - xOffsetVendorName}
					y={textY - yOffset}
					text={vendorName}
					fontSize={vendorNameFontSize}
					fill="white"
					draggable={!table.isLocked}
					onDragMove={handleDragMove}
					onDragEnd={(e) =>
						handleDragEnd(table.id, "table", e)
					}
					// onClick={(e) =>
					// 	handleObjectClick(
					// 		table.id,
					// 		"table",
					// 		e.evt.clientX,
					// 		e.evt.clientY
					// 	)
					// }
					onClick={(e) =>
						handleObjectClick(
							table.id,
							"table",
							e.evt.clientX,
							e.evt.clientY
						)
					}
					rotation={table.rotation || 0}
				/> */}
			</React.Fragment>
		);
	};

	return (
		<div
			ref={containerRef}
			className="flex-grow flex-col justify-center items-center overflow-y-auto h-full"
		>
			<div className="canvas-area flex flex-col">
				<div className="flex flex-row">
					{rooms.map((room) => (
						<div key={room.id} className="room">
							<h3 className="flex justify-between items-center">
								<span>{room.name}</span>
								<button
									// onClick={() =>
									// 	removeRoom(room.id)
									// }
									onClick={() =>
										handleRemoveRoom(
											room.id
										)
									}
									className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
								>
									Delete
								</button>
								<button
									onClick={() =>
										openEditModal(room)
									}
									className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
								>
									Edit
								</button>
							</h3>
							<p>Width: {room.width}</p>
							<p>Depth: {room.depth}</p>
						</div>
					))}
				</div>
				<div className="room-details-container w-full p-4 mb-4 bg-blue-200">
					{/* Container with light blue background */}
					<button
						onClick={lockAllObjects}
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
					>
						{areAllObjectsLocked
							? "Unlock All Objects"
							: "Lock All Objects"}
					</button>
				</div>
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
													draggable={
														!table.isLocked
													}
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
													// onClick={(
													// 	e
													// ) =>
													// 	handleObjectClick(
													// 		table.id,
													// 		"table",
													// 		e
													// 			.evt
													// 			.clientX,
													// 		e
													// 			.evt
													// 			.clientY
													// 	)
													// }
													onClick={(
														e
													) =>
														handleObjectClick(
															table.id,
															"table",
															e
																.evt
																.clientX,
															e
																.evt
																.clientY
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
													draggable={
														!table.isLocked
													}
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
													rotation={
														table.rotation ||
														0
													}
													// onClick={(
													// 	e
													// ) =>
													// 	handleObjectClick(
													// 		table.id,
													// 		"table",
													// 		e
													// 			.evt
													// 			.clientX,
													// 		e
													// 			.evt
													// 			.clientY
													// 	)
													// }
													onClick={(
														e
													) =>
														handleObjectClick(
															table.id,
															"table",
															e
																.evt
																.clientX,
															e
																.evt
																.clientY
														)
													}
												/>
											)}
											{renderTableText(
												table,
												tableWidthPixels,
												tableHeightPixels
												// vendorName
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
								.map((feature) => {
									const isDoor =
										feature.type ===
										"door";
									return (
										<React.Fragment
											key={
												feature.id
											}
										>
											{isDoor ? (
												<>
													<Rect
														x={
															feature.x *
															containerSize.width
														}
														y={
															feature.y *
															containerSize.height
														}
														width={
															2 *
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
															2 *
															feetToPixels *
															(containerSize.width /
																(room?.width
																	? parseFloat(
																			room.width
																	  ) *
																	  feetToPixels
																	: 1))
														}
														// width={
														// 	30
														// }
														// height={
														// 	30
														// }
														fill="green"
														draggable={
															!feature.isLocked
														}
														onDragMove={
															handleDragMove
														}
														onDragEnd={(
															e
														) =>
															handleDragEnd(
																feature.id,
																"feature",
																e
															)
														}
														// onClick={(
														// 	e
														// ) =>
														// 	handleObjectClick(
														// 		feature.id,
														// 		"feature",
														// 		e
														// 			.evt
														// 			.clientX,
														// 		e
														// 			.evt
														// 			.clientY
														// 	)
														// }
														onClick={(
															e
														) =>
															handleObjectClick(
																feature.id,
																"feature",
																e
																	.evt
																	.clientX,
																e
																	.evt
																	.clientY
															)
														}
													/>
													{/* <Text
														x={
															feature.x *
															containerSize.width
														}
														y={
															feature.y *
																containerSize.height -
															10
														}
														text="X"
														fontSize={
															15
														}
														fill="red"
														onClick={() => {
															if (
																window.confirm(
																	"Are you sure you want to delete this feature?"
																)
															) {
																removeObjectFromCanvas(
																	feature.id
																);
															}
														}}
														cursor="pointer"
													/> */}
												</>
											) : (
												<>
													<Circle
														x={
															feature.x *
															containerSize.width
														}
														y={
															feature.y *
															containerSize.height
														}
														// x={
														// 	feature.x *
														// 	feetToPixels
														// }
														// y={
														// 	feature.y *
														// 	feetToPixels *
														// 	adjustmentFactor
														// }
														radius={
															15
														}
														fill="red"
														draggable={
															!feature.isLocked
														}
														onDragMove={
															handleDragMove
														}
														onDragEnd={(
															e
														) =>
															handleDragEnd(
																feature.id,
																"feature",
																e
															)
														}
														// onClick={(
														// 	e
														// ) =>
														// 	handleObjectClick(
														// 		feature.id,
														// 		"feature",
														// 		e
														// 			.evt
														// 			.clientX,
														// 		e
														// 			.evt
														// 			.clientY
														// 	)
														// }
														onClick={(
															e
														) =>
															handleObjectClick(
																feature.id,
																"feature",
																e
																	.evt
																	.clientX,
																e
																	.evt
																	.clientY
															)
														}
														rotation={
															feature.rotation ||
															0
														}
													/>
													{/* <Text
														x={
															feature.x *
															containerSize.width
														}
														y={
															feature.y *
																containerSize.height -
															10
														}
														text="X"
														fontSize={
															15
														}
														fill="red"
														onClick={() => {
															if (
																window.confirm(
																	"Are you sure you want to delete this feature?"
																)
															) {
																removeObjectFromCanvas(
																	feature.id
																);
															}
														}}
														cursor="pointer"
													/> */}
												</>
											)}
										</React.Fragment>
									);
								})}
						</Layer>
					</Stage>
				)}
			{selectedObject && (
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
										(vendor) =>
											vendor.id ===
											tables.find(
												(
													table
												) =>
													table.id ===
													selectedObject.id
											)?.vendorId
								  )?.name || ""
								: ""
							: ""
					}
				/>
			)}
		</div>
	);
};

export default CanvasAreaKonva;
