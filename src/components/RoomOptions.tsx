import React, { useState } from "react";
import LockAllObjectsButton from "./LockAllObjectsButton";
import AddTablesModal from "./Modals/AddTablesModal";
import AddFeaturesModal from "./Modals/AddFeaturesModal";
import InfoModal from "./Modals/InfoModal";
import { RoomOptionsProps } from "../Types";
import ClearAllTablesButton from "./ClearAllTablesButton";
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
		<div>
			<div className="room-details-container w-full p-4 mb-4">
				{selectedRoomId && room && (
					<div className="flex items-center justify-center space-x-2">
						<LockAllObjectsButton
							areAllObjectsLocked={
								areAllObjectsLocked
							}
							lockAllObjects={lockAllObjects}
						/>
						<button
							onClick={handleCycleGridMode}
							className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-1 px-2 rounded m-1"
						>
							{gridMode === "Off" && <MdGridOff />}
							{gridMode === "Drag" && (
								<TbChartGridDotsFilled />
							)}
							{gridMode === "On" && <MdGridOn />}
						</button>
						<AddFeaturesModal
							isOpen={isAddFeaturesModalOpen}
							onClose={closeAddFeaturesModal}
							addFeature={addFeature}
							features={features}
							selectedRoomId={selectedRoomId}
						/>
						<AddTablesModal
							isOpen={isAddTablesModalOpen}
							onClose={closeAddTablesModal}
							addTable={addTable}
							tables={tables}
							selectedRoomId={selectedRoomId}
						/>
						<ClearAllTablesButton
							tables={tables}
							setTables={setTables}
							selectedRoomId={selectedRoomId}
						/>
						{room && (
							<InfoModal
								isOpen={isInfoModalOpen}
								onClose={closeInfoModal}
								room={room}
								openEditModal={openEditModal}
								removeRoom={removeRoom}
								selectedRoomId={selectedRoomId}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default RoomOptions;
