import React, { useState } from "react";
import LockAllObjectsButton from "./LockAllObjectsButton";
import AddTablesModal from "./Modals/AddTablesModal";
import AddFeaturesModal from "./Modals/AddFeaturesModal";
import InfoModal from "./Modals/InfoModal";
import { RoomOptionsProps } from "../Types";
import ClearAllTablesButton from "./ClearAllTablesButton";
import CustomTooltip from "./CustomTooltip";
import { cycleGridMode } from "../utils/functions";

import { MdGridOn } from "react-icons/md";
import { MdGridOff } from "react-icons/md";
import { TbChartGridDotsFilled } from "react-icons/tb";

const RoomOptions: React.FC<RoomOptionsProps> = ({
	areAllObjectsLocked,
	lockAllObjects,
	selectedRoomId,
	addTable,
	tables,
	addFeature,
	features,
	room,
	removeRoom,
	openEditModal,
	setTables,
	gridMode,
	setGridMode,
	scale,
	handleZoomChange,
	isMobile,
}) => {
	const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
	const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
		useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

	const closeAddTablesModal = () => setIsAddTablesModalOpen(false);
	const closeAddFeaturesModal = () => setIsAddFeaturesModalOpen(false);
	const closeInfoModal = () => setIsInfoModalOpen(false);

	const handleCycleGridMode = () => {
		// Call the extracted cycleGridMode function and pass setGridMode
		cycleGridMode(setGridMode);
	};

	return (
		<div className="room-details-container w-full p-4 mb-2 mt-4">
			{selectedRoomId && room && (
				<div className="flex items-center justify-center">
					{/* Left Group: Add Features and Add Tables */}
					<div className="flex">
						<CustomTooltip
							id="addTablesTip"
							title="Add Tables"
							placement="bottom"
						>
							<button
								data-tooltip-id="addTablesTip"
								data-event="mouseenter"
								data-event-off="mouseleave click"
								onClick={() =>
									setIsAddTablesModalOpen(
										true
									)
								}
							>
								<AddTablesModal
									isOpen={
										isAddTablesModalOpen
									}
									onClose={
										closeAddTablesModal
									}
									addTable={addTable}
									tables={tables}
									selectedRoomId={
										selectedRoomId
									}
								/>
							</button>
						</CustomTooltip>
						<CustomTooltip
							id="addFeaturesTip"
							title="Add Features"
							placement="bottom"
						>
							<button
								data-tooltip-id="addFeaturesTip"
								onClick={() =>
									setIsAddFeaturesModalOpen(
										true
									)
								}
							>
								<AddFeaturesModal
									isOpen={
										isAddFeaturesModalOpen
									}
									onClose={
										closeAddFeaturesModal
									}
									addFeature={addFeature}
									features={features}
									selectedRoomId={
										selectedRoomId
									}
								/>
							</button>
						</CustomTooltip>
					</div>

					{/* Center Group: Lock, Grid, and Clear All Buttons */}
					<div className="flex items-center justify-center ml-24 space-x-2">
						<CustomTooltip
							id="lockAllObjectsTip"
							title={
								areAllObjectsLocked
									? "Unlock All Objects"
									: "Lock All Objects"
							}
							placement="bottom"
						>
							<button data-tooltip-id="lockAllObjectsTip">
								<LockAllObjectsButton
									areAllObjectsLocked={
										areAllObjectsLocked
									}
									lockAllObjects={
										lockAllObjects
									}
								/>
							</button>
						</CustomTooltip>

						<CustomTooltip
							id="gridSelectionTip"
							title="Grid Selection"
							placement="bottom"
						>
							<button
								data-tooltip-id="gridSelectionTip"
								onClick={handleCycleGridMode}
								className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-1 px-2 mb-1 rounded"
							>
								{gridMode === "Off" && (
									<MdGridOff />
								)}
								{gridMode === "Drag" && (
									<TbChartGridDotsFilled />
								)}
								{gridMode === "On" && (
									<MdGridOn />
								)}
							</button>
						</CustomTooltip>

						<CustomTooltip
							id="clearAllTablesTip"
							title="Remove All Tables"
							placement="bottom"
						>
							<button data-tooltip-id="clearAllTablesTip">
								<ClearAllTablesButton
									tables={tables}
									setTables={setTables}
									selectedRoomId={
										selectedRoomId
									}
								/>
							</button>
						</CustomTooltip>

						{room && (
							<CustomTooltip
								id="infoModalTip"
								title="Room Information"
								placement="bottom"
							>
								<button data-tooltip-id="infoModalTip">
									<InfoModal
										isOpen={
											isInfoModalOpen
										}
										onClose={
											closeInfoModal
										}
										room={room}
										openEditModal={
											openEditModal
										}
										removeRoom={
											removeRoom
										}
										selectedRoomId={
											selectedRoomId
										}
									/>
								</button>
							</CustomTooltip>
						)}
					</div>
					{/* Right Group: Zoom Slider */}
					<div className="ml-12 mb-2">
						{!isMobile && (
							<CustomTooltip
								id="zoomSliderTip"
								title="Zoom Slider"
								placement="bottom"
							>
								<button data-tooltip-id="zoomSliderTip">
									<div
										className={`zoom-slider flex items-center ${
											isMobile
												? "top-5 left-0 right-5 p-4"
												: "ml-4"
										}`}
										style={{
											zIndex: 35,
											pointerEvents:
												"auto",
										}}
									>
										<input
											id="zoom"
											type="range"
											min="0.25"
											max="3"
											step="0.01"
											value={scale}
											onChange={(
												e
											) =>
												handleZoomChange(
													parseFloat(
														e
															.target
															.value
													)
												)
											}
											className={`w-full h-2 cursor-pointer appearance-none bg-gray-200`}
											style={{
												writingMode:
													"horizontal-tb", // Display horizontal like on mobile
												accentColor:
													"#4a235a",
											}}
										/>
									</div>
								</button>
							</CustomTooltip>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default RoomOptions;
