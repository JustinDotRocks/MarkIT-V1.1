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
			{/* <RoomDetailsDisplay
				rooms={rooms}
				handleRemoveRoom={removeRoom}
				openEditModal={openEditModal}
				removeRoom={removeRoom}
				setSelectedRoomId={setSelectedRoomId}
				openAddRoomModal={openAddRoomModal}
				selectedRoomId={selectedRoomId}
			/> */}
			<div className="room-details-container w-full p-4 mb-4">
				{selectedRoomId && room && (
					<>
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
						<div className="flex items-center justify-start">
							<ClearAllTablesButton
								tables={tables}
								setTables={setTables}
								selectedRoomId={selectedRoomId}
							/>
						</div>
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
					</>
				)}
			</div>
		</div>
	);
};

export default RoomOptions;
