import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useRooms } from "./hooks/useRooms";
import { useTablesAndFeatures } from "./hooks/useTablesAndFeatures";
import { useVendors } from "./hooks/useVendors";
import { useActiveMode } from "./hooks/useActiveMode";
import { useAutoSave } from "./hooks/useAutoSave";
import NavBar from "./components/NavBar";
import CanvasAreaKonva from "./components/CanvasAreaKonva";
import RoomEditModal from "./components/Modals/RoomEditModal";
import AddRoomModal from "./components/Modals/AddRoomModal";
import VendorModePage from "./components/VendorModePage";
import AboutPage from "./components/AboutPage";
import LandingPage from "./components/LandingPage";

const App: React.FC = () => {
	const { activeMode, setActiveMode } = useActiveMode();
	const {
		rooms,
		selectedRoomId,
		setSelectedRoomId,
		roomToEdit,
		isRoomModalOpen,
		isModalOpen,
		addRoom,
		updateRoom,
		removeRoom,
		openRoomModal,
		closeRoomModal,
		openEditModal,
		closeEditModal,
	} = useRooms();
	const {
		features,
		tables,
		setFeatures,
		setTables,
		addTableToCanvas,
		addFeatureToCanvas,
		toggleLockObject,
		removeObjectFromCanvas,
		areAllObjectsLocked,
		setAreAllObjectsLocked,
	} = useTablesAndFeatures(selectedRoomId);
	const { vendors, setVendors, updateVendorDetails } = useVendors();
	// Automatically save state to localStorage
	useAutoSave(features, rooms, vendors, tables);

	return (
		<Router>
			<div className="flex flex-col h-full bg-customWhite">
				<NavBar
					activeMode={activeMode}
					setActiveMode={setActiveMode}
				/>
				<div className="relative flex flex-col flex-grow ">
					<Routes>
						<Route path="/" Component={LandingPage} />

						<Route
							path="/venue"
							element={
								<div className="flex-grow flex-col justify-center m-2 items-center overflow-y-auto h-full">
									<CanvasAreaKonva
										objects={features}
										rooms={rooms}
										tables={tables}
										removeRoom={
											removeRoom
										}
										selectedRoomId={
											selectedRoomId
										}
										setTables={
											setTables
										}
										setFeatures={
											setFeatures
										}
										features={features}
										vendors={vendors}
										openEditModal={
											openEditModal
										}
										removeObjectFromCanvas={
											removeObjectFromCanvas
										}
										toggleLockObject={
											toggleLockObject
										}
										setSelectedRoomId={
											setSelectedRoomId
										}
										openAddRoomModal={
											openRoomModal
										}
										addTable={
											addTableToCanvas
										}
										addFeature={
											addFeatureToCanvas
										}
										areAllObjectsLocked={
											areAllObjectsLocked
										}
										setAreAllObjectsLocked={
											setAreAllObjectsLocked
										}
										setVendors={
											setVendors
										}
										updateVendorDetails={
											updateVendorDetails
										}
									/>
								</div>
							}
						></Route>
						<Route
							path="/vendor-mode"
							element={
								<VendorModePage
									vendors={vendors}
									setVendors={setVendors}
									tables={tables}
									setTables={setTables}
									rooms={rooms}
									updateVendorDetails={
										updateVendorDetails
									}
									selectedRoomId={
										selectedRoomId
									}
									setSelectedRoomId={
										setSelectedRoomId
									}
								/>
							}
						/>
						<Route
							path="/about"
							Component={AboutPage}
						/>
					</Routes>

					{isModalOpen && roomToEdit && (
						<RoomEditModal
							isOpen={isModalOpen}
							onClose={closeEditModal}
							roomToEdit={
								roomToEdit || {
									id: "",
									name: "",
									width: "",
									depth: "",
									tables: [],
								}
							}
							selectedRoomId={selectedRoomId}
							onSave={updateRoom}
						/>
					)}
					<AddRoomModal
						isOpen={isRoomModalOpen}
						onClose={closeRoomModal}
						addRoom={addRoom}
					/>
				</div>
			</div>
		</Router>
	);
};

export default App;
