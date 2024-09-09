import React, { useState } from "react";
import LockAllObjectsButton from "./LockAllObjectsButton";
import AddTablesModal from "./AddTablesModal";
import AddFeaturesModal from "./AddFeaturesModal";
import InfoModal from "./InfoModal";
import { RoomOptionsProps } from "../Types";
import ClearAllTablesButton from "./ClearAllTablesButton"; // Import the new component

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
	rooms,
	setSelectedRoomId,
	openAddRoomModal,
	setTables,
}) => {
	const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
	const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
		useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

	const closeAddTablesModal = () => setIsAddTablesModalOpen(false);
	const closeAddFeaturesModal = () => setIsAddFeaturesModalOpen(false);
	const closeInfoModal = () => setIsInfoModalOpen(false);

	return (
		<div>
			<div className="room-details-container w-full p-4 mb-4">
				{selectedRoomId && room && (
					<div className="flex items-center space-x-2">
						<LockAllObjectsButton
							areAllObjectsLocked={
								areAllObjectsLocked
							}
							lockAllObjects={lockAllObjects}
						/>
						<AddTablesModal
							isOpen={isAddTablesModalOpen}
							onClose={closeAddTablesModal}
							addTable={addTable}
							tables={tables}
							selectedRoomId={selectedRoomId}
						/>
						<AddFeaturesModal
							isOpen={isAddFeaturesModalOpen}
							onClose={closeAddFeaturesModal}
							addFeature={addFeature}
							features={features}
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
