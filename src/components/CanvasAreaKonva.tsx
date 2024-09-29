import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";
import { CanvasAreaProps, GridMode } from "../Types";
import { useCanvasSize } from "../hooks/useCanvasSize";
import OptionsBar from "./OptionsBar";
import RoomDetailsDisplay from "./RoomDetailsDisplay";
import TableComponent from "./TableComponent";
import FeatureComponent from "./FeatureComponent";
import RotateHandler from "./RotateHandler";
import DragAndDropHandler from "./DragAndDropHandler";
import AssignVendorModal from "./AssignVendorModal";
import RoomOptions from "./RoomOptions";
import RoomOptionsHamburger from "./RoomOptionsHamburger";
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
	updateVendorDetails,
}) => {
	const room = rooms.find((r) => r.id === selectedRoomId); // Ensure room is declared before being used
	const containerRef = useRef<HTMLDivElement>(null); // Declare containerRef before usage
	const stageRef = useRef<any>(null); // Declare stageRef before usage

	const {
		containerSize,
		stageRotation,
		scale,
		stagePosition,
		handleWheel,
		handleZoomChange,
	} = useCanvasSize(room, containerRef, stageRef);
	// const containerRef = useRef<HTMLDivElement>(null);
	// const [containerSize, setContainerSize] = useState({
	// 	width: window.innerWidth,
	// 	height: window.innerHeight,
	// });

	const [, setShowGrid] = useState(false);
	const gridSize = 20;
	const [gridMode, setGridMode] = useState<GridMode>("Drag");
	const [isDragging, setIsDragging] = useState<boolean>(false);

	// const [stageRotation, setStageRotation] = useState(0);

	const [isMobile] = useState(window.innerWidth < 768); // Determine if the screen is mobile

	// Handlers for drag events
	const handleGlobalDragStart = () => {
		setIsDragging(true);
	};

	const handleGlobalDragEnd = () => {
		setIsDragging(false);
	};

	// State for selectedObject and OptionsBar position
	const [selectedObject, setSelectedObject] = useState<{
		id: string;
		type: "table" | "feature";
		x: number;
		y: number;
	} | null>(null);

	const selectedTable =
		selectedObject && selectedObject.type === "table"
			? tables.find((table) => table.id === selectedObject.id)
			: null;

	const selectedVendor =
		selectedTable && selectedTable.vendorId
			? vendors.find(
					(vendor) => vendor.id === selectedTable.vendorId
			  )
			: null;

	// const room = rooms.find((r) => r.id === selectedRoomId);

	const feetToPixels = 25; // Scale factor

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [, setSelectedTableId] = useState<string | null>(null);

	// const [scale, setScale] = useState(1);
	// const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
	// const stageRef = useRef<any>(null);

	// useEffect(() => {
	// 	const updateContainerSize = () => {
	// 		if (containerRef.current && room) {
	// 			const containerWidth = containerRef.current.clientWidth;
	// 			const containerHeight =
	// 				containerRef.current.clientHeight;

	// 			const roomWidthFeet = parseFloat(room.width);
	// 			const roomHeightFeet = parseFloat(room.depth);
	// 			const feetToPixels = 25;

	// 			let roomWidthPixels = roomWidthFeet * feetToPixels;
	// 			let roomHeightPixels = roomHeightFeet * feetToPixels;

	// 			const isMobile = window.innerWidth < 768;
	// 			const isPortraitMode =
	// 				window.innerHeight > window.innerWidth;

	// 			// Rotation logic for mobile and desktop
	// 			if (isMobile && isPortraitMode) {
	// 				[roomWidthPixels, roomHeightPixels] = [
	// 					roomHeightPixels,
	// 					roomWidthPixels,
	// 				];
	// 				// In mobile, make sure the greater dimension is aligned with y-axis (portrait mode)
	// 				if (roomWidthFeet > roomHeightFeet) {
	// 					setStageRotation(0); // No rotation needed
	// 				} else {
	// 					setStageRotation(90); // Rotate to fit width along y-axis
	// 				}
	// 			} else {
	// 				// In desktop, make sure the greater dimension is aligned with x-axis (landscape mode)
	// 				if (roomHeightFeet > roomWidthFeet) {
	// 					[roomWidthPixels, roomHeightPixels] = [
	// 						roomHeightPixels,
	// 						roomWidthPixels,
	// 					];
	// 					setStageRotation(0); // No rotation needed
	// 				} else {
	// 					[roomWidthPixels, roomHeightPixels] = [
	// 						roomHeightPixels,
	// 						roomWidthPixels,
	// 					];
	// 					setStageRotation(90); // Rotate to fit height along x-axis
	// 				}
	// 			}

	// 			// Compute the scale factor to fit the room within the container
	// 			const scaleX = containerWidth / roomWidthPixels;
	// 			const scaleY = containerHeight / roomHeightPixels;
	// 			const scale = Math.min(scaleX, scaleY);

	// 			setScale(scale);
	// 			setContainerSize({
	// 				width: roomWidthPixels,
	// 				height: roomHeightPixels,
	// 			});

	// 			// Calculate the center of the room
	// 			const centerX = roomWidthPixels / 2;
	// 			const centerY = roomHeightPixels / 2;

	// 			// Set the offset of the stage to rotate around the center
	// 			const containerCenterX = containerWidth / 2;
	// 			const containerCenterY = containerHeight / 3;

	// 			// Offset the stage position to keep it centered
	// 			const offsetX = centerX * scale;
	// 			const offsetY = centerY * scale;

	// 			// // Position the stage so the room is centered
	// 			setStagePosition({
	// 				x: containerCenterX,
	// 				y: containerCenterY,
	// 			});
	// 			// Adjust the stage position to center the room
	// 			if (stageRef.current) {
	// 				// Set stage offsets to rotate around the center
	// 				stageRef.current.offsetX(offsetX);
	// 				stageRef.current.offsetY(offsetY);
	// 			}
	// 		}
	// 	};

	// 	updateContainerSize();
	// 	window.addEventListener("resize", updateContainerSize);

	// 	return () => {
	// 		window.removeEventListener("resize", updateContainerSize);
	// 	};
	// }, [room, containerRef]);

	useEffect(() => {
		// Load the lock state from local storage on initial load
		const storedLockState = localStorage.getItem("areAllObjectsLocked");
		if (storedLockState !== null) {
			setAreAllObjectsLocked(JSON.parse(storedLockState));
		}
	}, []);

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
	// const handleWheel = (e: any) => {
	// 	e.evt.preventDefault();

	// 	const stage = stageRef.current;
	// 	const oldScale = stage.scaleX();
	// 	const pointer = stage.getPointerPosition();

	// 	const scaleBy = 1.01; // Zoom factor
	// 	let direction = e.evt.deltaY > 0 ? 1 : -1;

	// 	// Revert zoom direction when using ctrlKey (for touchpads)
	// 	if (e.evt.ctrlKey) {
	// 		direction = -direction;
	// 	}

	// 	const newScale =
	// 		direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

	// 	setScale(newScale);

	// 	const mousePointTo = {
	// 		x: (pointer.x - stage.x()) / oldScale,
	// 		y: (pointer.y - stage.y()) / oldScale,
	// 	};

	// 	const newPos = {
	// 		x: pointer.x - mousePointTo.x * newScale,
	// 		y: pointer.y - mousePointTo.y * newScale,
	// 	};

	// 	setStagePosition(newPos);
	// 	stage.scale({ x: newScale, y: newScale });
	// 	stage.position(newPos);
	// 	stage.batchDraw(); // Update the stage
	// };

	// const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const newScale = parseFloat(e.target.value);
	// 	const stage = stageRef.current;

	// 	if (stage) {
	// 		const oldScale = stage.scaleX();
	// 		const pointer = stage.getPointerPosition() || { x: 0, y: 0 };

	// 		setScale(newScale);

	// 		const mousePointTo = {
	// 			x: (pointer.x - stage.x()) / oldScale,
	// 			y: (pointer.y - stage.y()) / oldScale,
	// 		};

	// 		const newPos = {
	// 			x: pointer.x - mousePointTo.x * newScale,
	// 			y: pointer.y - mousePointTo.y * newScale,
	// 		};

	// 		setStagePosition(newPos);
	// 		stage.scale({ x: newScale, y: newScale });
	// 		stage.position(newPos);
	// 		stage.batchDraw(); // Update the stage
	// 	}
	// };

	useEffect(() => {
		const stage = stageRef.current;
		if (stage) {
			// Attach the wheel event handler for zooming
			stage.on("wheel", handleWheel);

			// Force an update to ensure all Konva internals are set up
			stage.batchDraw();

			return () => {
				stage.off("wheel", handleWheel);
			};
		}
	}, [handleWheel]); // Adding handleWheel as a dependency ensures it captures the latest state

	const getOptionsBarPosition = () => {
		if (!selectedObject) return { x: 0, y: 0 };

		const stage = stageRef.current;
		const layer = stage.getLayers()[0];
		const node = layer.findOne(`#${selectedObject.id}`);

		if (node) {
			const transform = node.getAbsoluteTransform().copy();
			// Get the center point of the object
			const objectCenter = {
				x: node.width() / 2,
				y: node.height() / 2,
			};
			// transform the node position to the screen coordinate system
			const position = transform.point(objectCenter); // Get position of the center

			// get the position of the stage container on the page
			const stageContainerRect = stage
				.container()
				.getBoundingClientRect();

			// calculate the absolute position on the screen
			const absoluteX =
				stageContainerRect.left + position.x * scale;
			const absoluteY = stageContainerRect.top + position.y * scale;

			return { x: absoluteX, y: absoluteY };
		}

		return { x: 0, y: 0 };
	};

	const optionsBarPosition = getOptionsBarPosition();

	return (
		<div ref={containerRef} className="flex flex-col h-screen">
			<div className="canvas-area flex flex-col ">
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

			{room !== undefined &&
				(isMobile ? (
					<div className="fixed top-20 right-10 z-50">
						<RoomOptionsHamburger
							areAllObjectsLocked={
								areAllObjectsLocked
							}
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
							gridMode={gridMode}
							setGridMode={setGridMode}
						/>
					</div>
				) : (
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
						gridMode={gridMode}
						setGridMode={setGridMode}
					/>
				))}
			{room &&
				containerRef.current &&
				containerSize.width > 0 &&
				containerSize.height > 0 && (
					<div className="flex-1 flex relative ">
						<Stage
							ref={stageRef}
							width={
								containerRef.current.clientWidth
							}
							height={
								containerRef.current
									.clientHeight
							}
							scaleX={scale}
							scaleY={scale}
							draggable
							x={stagePosition.x}
							y={stagePosition.y}
							onMouseDown={handleStageClick}
							onTouchStart={handleStageClick}
							rotation={stageRotation}
							offsetX={containerSize.width / 2}
							offsetY={containerSize.height / 2}
						>
							<Layer>
								<Group>
									{(gridMode === "On" ||
										(gridMode ===
											"Drag" &&
											isDragging)) && (
										<Grid
											containerSize={
												containerSize
											}
											gridSize={
												gridSize
											}
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
										stroke="#1f5160"
										strokeWidth={3}
									/>
									{tables
										.filter(
											(table) =>
												table.roomId ===
												selectedRoomId
										)
										.map((table) => (
											<DragAndDropHandler
												key={
													table.id
												}
												item={
													table
												}
												containerSize={
													containerSize
												}
												feetToPixels={
													feetToPixels
												}
												room={
													room
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
												}
												onGlobalDragStart={
													handleGlobalDragStart
												}
												onGlobalDragEnd={
													handleGlobalDragEnd
												}
												gridSize={
													gridSize
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
													}
													onGlobalDragStart={
														handleGlobalDragStart
													}
													onGlobalDragEnd={
														handleGlobalDragEnd
													}
													gridSize={
														gridSize
													}
												/>
											);
										})}
								</Group>
							</Layer>
						</Stage>
						{selectedObject &&
							selectedTableOrFeature && (
								<RotateHandler
									item={
										selectedTableOrFeature
									}
									setTables={setTables}
									setFeatures={setFeatures}
								>
									{({
										rotateCW,
										rotateCCW,
									}) => (
										<div
											style={{
												position: "absolute",
												left: isMobile
													? "50%"
													: `${optionsBarPosition.x}px`,
												top: isMobile
													? "1%"
													: `${optionsBarPosition.y}px`,
												transform:
													isMobile
														? "translateX(-50%)"
														: "none",
												zIndex: 1,
												pointerEvents:
													"auto",
											}}
										>
											<OptionsBar
												x={
													selectedObject.x
												}
												y={
													selectedObject.y
												}
												onDelete={
													handleDelete
												}
												onRotateCW={
													rotateCW
												}
												onRotateCCW={
													rotateCCW
												}
												onToggleLock={() =>
													toggleLockObject(
														selectedObject.id,
														selectedObject.type
													)
												}
												isLocked={
													selectedObject.type ===
													"table"
														? !!tables.find(
																(
																	table
																) =>
																	table.id ===
																	selectedObject.id
														  )
																?.isLocked
														: !!features.find(
																(
																	feature
																) =>
																	feature.id ===
																	selectedObject.id
														  )
																?.isLocked
												}
												vendorName={
													selectedObject.type ===
													"table"
														? tables.find(
																(
																	table
																) =>
																	table.id ===
																	selectedObject.id
														  )
																?.vendorId
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
															  )
																	?.name ||
															  ""
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
												objectType={
													selectedObject.type
												}
												signedIn={
													selectedVendor?.signedIn
												}
												vendorId={
													selectedVendor?.id
												}
												updateVendorDetails={
													updateVendorDetails
												}
											/>
										</div>
									)}
								</RotateHandler>
							)}
						{/* Vertical Zoom Slider */}
						<div className="hidden md:flex zoom-slider flex-col items-center absolute right-0 top-1/2 transform -translate-y-1/2 mr-4">
							<label
								htmlFor="zoom"
								className="mb-2"
							>
								Zoom:{" "}
							</label>
							<input
								id="zoom"
								type="range"
								min="0.25"
								max="3"
								step="0.01"
								value={scale}
								// onChange={handleZoomChange}
								onChange={(e) =>
									handleZoomChange(
										parseFloat(
											e.target.value
										)
									)
								}
								className="h-48 w-2 cursor-pointer appearance-none bg-gray-200"
								style={{
									writingMode:
										"vertical-rl", // Change to a valid value for vertical slider
									accentColor: "#1f5160",
								}}
							/>
						</div>
					</div>
				)}
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
