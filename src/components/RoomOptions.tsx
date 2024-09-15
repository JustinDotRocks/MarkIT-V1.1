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
	// showGrid,
	// toggleGridVisibility,
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

	// const cycleGridMode = () => {
	// 	setGridMode((prevMode) => {
	// 		switch (prevMode) {
	// 			case "Off":
	// 				return "On";
	// 			case "On":
	// 				return "Drag";
	// 			case "Drag":
	// 				return "Off";
	// 			default:
	// 				return "Off";
	// 		}
	// 	});
	// };
	const cycleGridMode = () => {
		setGridMode((prevMode) => {
			switch (prevMode) {
				case "Off":
					return "Drag";
				case "Drag":
					return "On";
				case "On":
					return "Off";
				default:
					return "Off";
			}
		});
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
						{/* Grid Toggle Button */}
						{/* <button
							onClick={toggleGridVisibility}
							className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
						>
							{showGrid ? "Hide Grid" : "Show Grid"}
						</button> */}
						<button
							onClick={cycleGridMode}
							className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
						>
							{/* {gridMode === "Off" && "Grid Off"}
							{gridMode === "On" && "Grid On"}
							{gridMode === "Drag" && "Grid Drag"} */}
							{gridMode === "Off" && "Grid Off"}
							{gridMode === "Drag" && "Grid Drag"}
							{gridMode === "On" && "Grid On"}
						</button>
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
