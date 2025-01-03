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
import { useStageInteraction } from "../hooks/useStageInteraction";
import { useOptionsBarPosition } from "../hooks/useOptionsBarPosition";
import { useVendorSelection } from "../hooks/useVendorSelection";

import OptionsBar from "./OptionsBar";
import TableComponent from "./TableComponent";
import FeatureComponent from "./FeatureComponent";
import RotateHandler from "./RotateHandler";
import DragAndDropHandler from "./DragAndDropHandler";
import AssignVendorModal from "./Modals/AssignVendorModal";
import RoomOptions from "./RoomOptions";
import RoomOptionsMobile from "./RoomOptionsMobile";

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
	} = useCanvasSize(room, containerRef, stageRef);

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
	useStageInteraction(stageRef, handleWheel);
	const getOptionsBarPosition = useOptionsBarPosition(
		selectedObject,
		stageRef
		// scale
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

	// Adjust optionsBarPosition to keep it within the viewport
	const adjustedOptionsBarPosition = { ...optionsBarPosition };

	const optionsBarWidth = 350; // Adjust to your OptionsBar width
	const optionsBarHeight = 100; // Adjust to your OptionsBar height

	if (!isMobile) {
		if (optionsBarPosition.x - optionsBarWidth / 2 < 0) {
			adjustedOptionsBarPosition.x = optionsBarWidth / 2;
		} else if (
			optionsBarPosition.x + optionsBarWidth / 2 >
			window.innerWidth
		) {
			adjustedOptionsBarPosition.x =
				window.innerWidth - optionsBarWidth / 2;
		}

		if (optionsBarPosition.y - optionsBarHeight < 0) {
			adjustedOptionsBarPosition.y = optionsBarHeight;
		} else if (
			optionsBarPosition.y + optionsBarHeight >
			window.innerHeight
		) {
			adjustedOptionsBarPosition.y =
				window.innerHeight - optionsBarHeight;
		}
	}

	// Function to handle removing a room and updating vendors
	const handleRemoveRoom = (roomId: string) => {
		// Call removeRoom to remove the room and associated tables
		removeRoom(roomId);

		// Update vendors to remove the room assignment
		setVendors((prevVendors) =>
			prevVendors.map((vendor) => {
				if (vendor.roomId === roomId || vendor.room) {
					return {
						...vendor,
						roomId: "",
						roomName: "",
					};
				}
				return vendor;
			})
		);
	};

	return (
		<div
			ref={containerRef}
			className="flex flex-col h-screen mt-28 md:mt-14"
		>
			{room !== undefined &&
				(isMobile ? (
					<div className="fixed top-20 right-0 z-30">
						<RoomOptionsMobile
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
							removeRoom={handleRemoveRoom}
							openEditModal={openEditModal}
							rooms={rooms}
							setSelectedRoomId={setSelectedRoomId}
							openAddRoomModal={openAddRoomModal}
							setTables={setTables}
							gridMode={gridMode}
							setGridMode={setGridMode}
							scale={scale}
							handleZoomChange={handleZoomChange}
							isMobile={isMobile}
							vendors={vendors}
							setVendors={setVendors}
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
						removeRoom={handleRemoveRoom}
						openEditModal={openEditModal}
						rooms={rooms}
						setSelectedRoomId={setSelectedRoomId}
						openAddRoomModal={openAddRoomModal}
						setTables={setTables}
						gridMode={gridMode}
						setGridMode={setGridMode}
						scale={scale}
						handleZoomChange={handleZoomChange}
						isMobile={isMobile}
						vendors={vendors}
						setVendors={setVendors}
					/>
				))}
			{room &&
				containerRef.current &&
				containerSize.width > 0 &&
				containerSize.height > 0 && (
					<div className="flex-1 flex relative z-10">
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
									<Rect
										x={0}
										y={0}
										width={
											containerSize.width
										}
										height={
											containerSize.height
										}
										fill="#f0f0f0"
										stroke="#4a235a"
										strokeWidth={3}
									/>
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
													: `${adjustedOptionsBarPosition.x}px`,
												top: isMobile
													? "2%"
													: `${adjustedOptionsBarPosition.y}px`,
												// transform:
												// 	isMobile
												// 		? "translateX(-50%)"
												// 		: "translate(-50%, -100%)",
												transform:
													isMobile
														? "translateX(-50%)"
														: "translate(-50%, -100%) translateY(-20px)", // Adjusted here
												zIndex: 40,
												pointerEvents:
													"auto",
											}}
										>
											<OptionsBar
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
