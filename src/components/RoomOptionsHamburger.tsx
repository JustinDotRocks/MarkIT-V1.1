import React, { useState, useEffect, useRef } from "react";
import LockAllObjectsButton from "./LockAllObjectsButton";
import AddTablesModal from "./Modals/AddTablesModal";
import AddFeaturesModal from "./Modals/AddFeaturesModal";
import InfoModal from "./Modals/InfoModal";
import ClearAllTablesButton from "./ClearAllTablesButton";
import { RoomOptionsProps } from "../Types";
import { cycleGridMode } from "../utils/functions";

const RoomOptionsHamburger: React.FC<RoomOptionsProps> = ({
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
	const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle hamburger menu
	const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
	const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
		useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null); // Ref to track menu

	const closeAddTablesModal = () => setIsAddTablesModalOpen(false);
	const closeAddFeaturesModal = () => setIsAddFeaturesModalOpen(false);
	const closeInfoModal = () => setIsInfoModalOpen(false);

	// Open the menu or toggle it closed when button is clicked
	const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

	const handleButtonClick = (action: () => void) => {
		action();
		setIsMenuOpen(false); // Close the menu after a button click
	};

	const handleCycleGridMode = () => {
		// Call the extracted cycleGridMode function and pass setGridMode
		cycleGridMode(setGridMode);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<div className="fixed top-30 right-12">
				{/* Hamburger button to open/close menu */}
				{!isMenuOpen ? (
					<button
						onClick={toggleMenu}
						className="bg-customBlue text-white px-4 py-2 rounded-md focus:outline-none"
					>
						Options
					</button>
				) : (
					<button
						onClick={toggleMenu}
						className="bg-customBlue text-white px-4 py-2 rounded-md focus:outline-none"
					>
						Close
					</button>
				)}
			</div>
			<div className="fixed top-48 left-0 p-4 w-full">
				{/* Fullscreen menu when isMenuOpen is true */}
				{isMenuOpen && (
					<div className="flex flex-col items-center justify-center rounded bg-customBlue p-4 z-50">
						<div className="text-white text-2xl mb-4">
							Room Options
						</div>
						{/* Menu buttons */}
						<div className="flex flex-col space-y-4 text-white font-bold text-lg">
							{/* Grid Toggle */}
							<button
								onClick={() =>
									handleButtonClick(
										handleCycleGridMode
									)
								}
								className="bg-customBlue2 hover:bg-blue-700 px-2 py-1 md:px-4 md:py-2 rounded"
							>
								{gridMode === "Off" &&
									"Grid Off"}
								{gridMode === "Drag" &&
									"Grid Drag"}
								{gridMode === "On" && "Grid On"}
							</button>

							{/* Lock All Objects */}
							<LockAllObjectsButton
								areAllObjectsLocked={
									areAllObjectsLocked
								}
								lockAllObjects={() =>
									handleButtonClick(
										lockAllObjects
									)
								}
							/>

							{/* Clear All Tables */}
							<ClearAllTablesButton
								tables={tables}
								setTables={setTables}
								selectedRoomId={selectedRoomId}
							/>
						</div>
						<div className="mt-4 mb-4 text-lg">
							{/* Add Tables Modal */}
							<AddTablesModal
								isOpen={isAddTablesModalOpen}
								onClose={closeAddTablesModal}
								addTable={addTable}
								tables={tables}
								selectedRoomId={selectedRoomId}
							/>
						</div>
						<div className="mb-4 text-lg">
							{/* Add Features Modal */}
							<AddFeaturesModal
								isOpen={isAddFeaturesModalOpen}
								onClose={closeAddFeaturesModal}
								addFeature={addFeature}
								features={features}
								selectedRoomId={selectedRoomId}
							/>
						</div>

						{/* Info Modal */}
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
		</>
	);
};

export default RoomOptionsHamburger;
