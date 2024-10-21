import React, { useState } from "react";
import CustomTooltip from "./CustomTooltip";
import LockAllObjectsButton from "./LockAllObjectsButton";
import AddTablesModal from "./Modals/AddTablesModal";
import AddFeaturesModal from "./Modals/AddFeaturesModal";
import InfoModal from "./Modals/InfoModal";
import ClearAllTablesButton from "./ClearAllTablesButton";
import { RoomOptionsProps } from "../Types";
import { MdMenu } from "react-icons/md";
import { MdGridOn, MdGridOff } from "react-icons/md";
import { TbChartGridDotsFilled } from "react-icons/tb";

import { cycleGridMode } from "../utils/functions";

const RoomOptionsMobile: React.FC<RoomOptionsProps> = ({
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
}) => {
	const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
	const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
		useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false); // Track the state of the hamburger menu

	const closeAddTablesModal = () => setIsAddTablesModalOpen(false);
	const closeAddFeaturesModal = () => setIsAddFeaturesModalOpen(false);
	const closeInfoModal = () => setIsInfoModalOpen(false);

	const handleCycleGridMode = () => cycleGridMode(setGridMode);

	return (
		<div className=" p-2 bg-white shadow-lg z-50 w-screen flex justify-between">
			{/* Left Side: Always Visible Add Buttons */}
			<div className="flex space-x-2 ml-6">
				<CustomTooltip
					id="addTablesTip"
					title="Add Tables"
					placement="bottom"
				>
					<button
						data-tooltip-id="addTablesTip"
						onClick={() =>
							setIsAddTablesModalOpen(true)
						}
					>
						<AddTablesModal
							isOpen={isAddTablesModalOpen}
							onClose={closeAddTablesModal}
							addTable={addTable}
							tables={tables}
							selectedRoomId={selectedRoomId}
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
							setIsAddFeaturesModalOpen(true)
						}
					>
						<AddFeaturesModal
							isOpen={isAddFeaturesModalOpen}
							onClose={closeAddFeaturesModal}
							addFeature={addFeature}
							features={features}
							selectedRoomId={selectedRoomId}
						/>
					</button>
				</CustomTooltip>
			</div>

			{/* Right Side: Hamburger Menu */}
			<div className="relative mr-8">
				<CustomTooltip
					id="lockAllObjectsTip"
					title={
						areAllObjectsLocked
							? "Unlock All Objects"
							: "Lock All Objects"
					}
					placement="left"
				>
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="text-3xl"
					>
						<MdMenu
							style={{
								// backgroundColor: "#4a235a", // Custom background color
								color: "#4a235a",
								zIndex: 100,
							}}
						/>
					</button>
				</CustomTooltip>

				{menuOpen && (
					<div className="absolute right-0 top-full flex flex-col items-center mt-2 px-2 py-2 bg-white shadow-md rounded-lg z-50">
						<CustomTooltip
							id="gridSelectionTip"
							title="Grid Selection"
							placement="left"
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

						<div className="">
							<CustomTooltip
								id="clearAllTablesTip"
								title="Remove All Tables"
								placement="left"
							>
								<button
									data-tooltip-id="gridSelectionTip"
									onClick={
										handleCycleGridMode
									}
									className="bg-customPurple hover:bg-customPurpleLight text-white text-left px-2 py-1 rounded"
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
						</div>

						<button data-tooltip-id="clearAllTablesTip">
							<ClearAllTablesButton
								tables={tables}
								setTables={setTables}
								selectedRoomId={selectedRoomId}
							/>
						</button>

						{room && (
							<CustomTooltip
								id="infoModalTip"
								title="Room Information"
								placement="left"
							>
								<button
									data-tooltip-id="infoModalTip"
									onClick={() =>
										setIsInfoModalOpen(
											true
										)
									}
								>
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
				)}
			</div>
		</div>
	);
};

export default RoomOptionsMobile;
