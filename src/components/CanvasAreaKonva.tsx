import React, { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Group } from "react-konva";
import { feetToPixels, gridSize } from "../utils/constants";

import { CanvasAreaProps } from "../Types";

import { useCanvasSize } from "../hooks/useCanvasSize";
import { useObjectSelection } from "../hooks/useObjectSelection";
import { useLockState } from "../hooks/useLockState";
import { useVendorManagement } from "../hooks/useVendorManagement";
import { useGridToggle } from "../hooks/useGridToggle";
// import { useStageInteraction } from "../hooks/useStageInteraction";
import { useOptionsBarPosition } from "../hooks/useOptionsBarPosition";
import { useVendorSelection } from "../hooks/useVendorSelection";
import { useTouchZoom } from "../hooks/useTouchZoom";

import OptionsBar from "./OptionsBar";
import RoomDetailsDisplay from "./RoomDetailsDisplay";
import TableComponent from "./TableComponent";
import FeatureComponent from "./FeatureComponent";
import RotateHandler from "./RotateHandler";
import DragAndDropHandler from "./DragAndDropHandler";
import AssignVendorModal from "./Modals/AssignVendorModal";
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
	setVendors,
	updateVendorDetails,
}) => {
	const room = rooms.find((r) => r.id === selectedRoomId); // Ensure room is declared before being used
	const containerRef = useRef<HTMLDivElement>(null); // Declare containerRef before usage
	const stageRef = useRef<Konva.Stage>(null); // Declare stageRef before usage

	// Determine if the screen is mobile and update on window resize
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const {
		containerSize,
		stageRotation,
		scale,
		stagePosition,
		handleWheel,
		handleZoomChange,
		setScale,
		setStagePosition,
	} = useCanvasSize(room, containerRef, stageRef);
	useTouchZoom(stageRef, setScale, setStagePosition);

	const {
		selectedObject,
		selectedTable,
		handleObjectClick,
		handleStageClick,
		handleDelete,
	} = useObjectSelection(tables, features, removeObjectFromCanvas);
	const { areAllObjectsLocked, lockAllObjects } = useLockState(
		tables,
		features,
		setTables,
		setFeatures
	);
	const {
		isModalOpen,
		setIsModalOpen,
		handleAddVendorClick,
		handleRemoveVendor,
	} = useVendorManagement(tables, setTables, vendors, setVendors);
	const {
		gridMode,
		isDragging,
		setGridMode,
		handleGlobalDragStart,
		handleGlobalDragEnd,
	} = useGridToggle();
	// useStageInteraction(stageRef, handleWheel);
	const getOptionsBarPosition = useOptionsBarPosition(
		selectedObject,
		stageRef,
		scale
	);
	const { selectedVendor } = useVendorSelection(
		selectedTable || null,
		vendors
	);

	const [, setShowGrid] = useState(false);

	const selectedTableOrFeature = selectedObject
		? selectedObject.type === "table"
			? tables.find((table) => table.id === selectedObject.id)
			: features.find((feature) => feature.id === selectedObject.id)
		: null;

	const optionsBarPosition = getOptionsBarPosition();

	return (
		<div ref={containerRef} className="flex flex-col h-screen mt-28">
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
					<div className="fixed top-22 right-10 z-50">
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
							onWheel={handleWheel} // Ensure the wheel event is handled
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
												vendors={
													vendors
												}
											/>
										</div>
									)}
								</RotateHandler>
							)}
						{/* Vertical Zoom Slider */}
						{/* <div className="flex zoom-slider flex-col items-center absolute right-0 top-1/2 transform -translate-y-1/2 mr-4">
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
						</div> */}
						<div
							className={`zoom-slider flex items-center absolute ${
								isMobile
									? "top-5 left-0 right-5 p-4"
									: "right-0 top-1/2 transform -translate-y-1/2 mr-4"
							}`}
						>
							<label
								htmlFor="zoom"
								className={`${
									isMobile ? "mr-2" : "mb-2"
								} text-customBlue`}
							>
								Zoom:
							</label>
							<input
								id="zoom"
								type="range"
								min="0.25"
								max="3"
								step="0.01"
								value={scale}
								onChange={(e) =>
									handleZoomChange(
										parseFloat(
											e.target.value
										)
									)
								}
								className={`${
									isMobile
										? "w-full h-2"
										: "h-48 w-2"
								} cursor-pointer appearance-none bg-gray-200`}
								style={{
									writingMode: isMobile
										? "horizontal-tb"
										: "vertical-rl",
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
