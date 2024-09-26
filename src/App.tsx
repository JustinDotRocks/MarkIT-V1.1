import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Feature, Room, Vendor, Table } from "./Types";
import { useRooms } from "./hooks/useRooms";
import { useTablesAndFeatures } from "./hooks/useTablesAndFeatures";
import { useVendors } from "./hooks/useVendors";
import { useActiveMode } from "./hooks/useActiveMode";
import { useAutoSave } from "./hooks/useAutoSave";
import NavBar from "./components/NavBar/NavBar";
import CanvasAreaKonva from "./components/CanvasAreaKonva";
import RoomEditModal from "./components/RoomEditModal";
import AddRoomModal from "./components/AddRoomModal";
import VendorModePage from "./components/VendorModePage";
// import {
// 	saveToLocalStorage,
// 	loadFromLocalStorage,
// 	getStorageKeys,
// } from "./Storage";
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

	// const [activeMode, setActiveMode] = useState<
	// 	"setup" | "vendor" | "about" | ""
	// >("setup");
	// const [features, setFeatures] = useState<Feature[]>(
	// 	() =>
	// 		loadFromLocalStorage<Feature[]>(getStorageKeys().FEATURES) ||
	// 		[]
	// );
	// const [rooms, setRooms] = useState<Room[]>(
	// 	() => loadFromLocalStorage<Room[]>(getStorageKeys().ROOMS) || []
	// );
	// const [vendors, setVendors] = useState<Vendor[]>(
	// 	() => loadFromLocalStorage<Vendor[]>(getStorageKeys().VENDORS) || []
	// );
	// const [tables, setTables] = useState<Table[]>(
	// 	() => loadFromLocalStorage<Table[]>(getStorageKeys().TABLES) || []
	// );
	// const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); // Updated to allow null
	// const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
	// const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	// const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false);

	// const [areAllObjectsLocked, setAreAllObjectsLocked] = useState(false);

	// useEffect(() => {
	// 	// Save all state to localStorage in one effect
	// 	saveToLocalStorage(getStorageKeys().FEATURES, features);
	// 	saveToLocalStorage(getStorageKeys().ROOMS, rooms);
	// 	saveToLocalStorage(getStorageKeys().VENDORS, vendors);
	// 	saveToLocalStorage(getStorageKeys().TABLES, tables);
	// }, [features, rooms, vendors, tables]);

	// const openRoomModal = () => setIsRoomModalOpen(true);
	// const closeRoomModal = () => setIsRoomModalOpen(false);

	// const addTableToCanvas = (tableData: {
	// 	type: "table-6" | "table-8" | "table-5";
	// 	id: string;
	// 	details?: string;
	// 	tableNumber: number;
	// }) => {
	// 	setTables((prevTables: Table[]) => {
	// 		// Filter tables to include only those in the selected room
	// 		const roomTables = prevTables.filter(
	// 			(table) => table.roomId === selectedRoomId
	// 		);

	// 		// Get the highest table number from the tables in the selected room
	// 		const maxTableNumber = roomTables.reduce((max, table) => {
	// 			return table.tableNumber > max
	// 				? table.tableNumber
	// 				: max;
	// 		}, 0);

	// 		// Assign the next table number by incrementing the highest number
	// 		const nextTableNumber = maxTableNumber + 1;

	// 		const newTable: Table = {
	// 			...tableData,
	// 			tableNumber: nextTableNumber,
	// 			roomId: selectedRoomId || "",
	// 			x: 0,
	// 			y: 0,
	// 			isLocked: false,
	// 		};

	// 		return [...prevTables, newTable];
	// 	});
	// };

	// const addFeatureToCanvas = (featureData: {
	// 	type: "door" | "obstacle";
	// 	id: string;
	// 	details?: string;
	// }) => {
	// 	const newFeature: Feature = {
	// 		...featureData,
	// 		roomId: selectedRoomId || "",
	// 		x: 0,
	// 		y: 0,
	// 		isLocked: false,
	// 	};

	// 	setFeatures((prevFeatures: Feature[]) => [
	// 		...prevFeatures,
	// 		newFeature,
	// 	]);
	// };

	// const toggleLockObject = (id: string, type: "table" | "feature") => {
	// 	if (type === "table") {
	// 		setTables((prevTables: Table[]) => {
	// 			const updatedTables = prevTables.map((table) =>
	// 				table.id === id
	// 					? { ...table, isLocked: !table.isLocked }
	// 					: table
	// 			);
	// 			// Check if any table is unlocked after toggling
	// 			const allLocked = updatedTables.every(
	// 				(table) => table.isLocked
	// 			);
	// 			setAreAllObjectsLocked(allLocked);
	// 			saveToLocalStorage(
	// 				getStorageKeys().TABLES,
	// 				updatedTables
	// 			);
	// 			return updatedTables;
	// 		});
	// 	} else {
	// 		setFeatures((prevFeatures: Feature[]) => {
	// 			const updatedFeatures = prevFeatures.map((feature) =>
	// 				feature.id === id
	// 					? {
	// 							...feature,
	// 							isLocked: !feature.isLocked,
	// 					  }
	// 					: feature
	// 			);
	// 			const allLocked = updatedFeatures.every(
	// 				(feature) => feature.isLocked
	// 			);
	// 			setAreAllObjectsLocked(allLocked);
	// 			saveToLocalStorage(
	// 				getStorageKeys().FEATURES,
	// 				updatedFeatures
	// 			);
	// 			return updatedFeatures;
	// 		});
	// 	}
	// };

	// const removeObjectFromCanvas = (id: string) => {
	// 	setFeatures((prevFeatures: Feature[]) =>
	// 		prevFeatures.filter((feature) => feature.id !== id)
	// 	);
	// 	setTables((prevTables: Table[]) =>
	// 		prevTables.filter((table) => table.id !== id)
	// 	);
	// };

	// const updateVendorDetails = (updatedVendor: Vendor) => {
	// 	setVendors((prevVendors) =>
	// 		prevVendors.map((vendor) =>
	// 			vendor.id === updatedVendor.id
	// 				? { ...vendor, ...updatedVendor }
	// 				: vendor
	// 		)
	// 	);
	// };

	// const removeRoom = (roomId: string) => {
	// 	setRooms((prevRooms) =>
	// 		prevRooms.filter((room) => room.id !== roomId)
	// 	);
	// 	setFeatures((prevFeatures) =>
	// 		prevFeatures.filter((feature) => feature.roomId !== roomId)
	// 	);
	// 	setTables((prevTables) =>
	// 		prevTables.filter((table) => table.roomId !== roomId)
	// 	);
	// };

	// const openEditModal = (room: Room) => {
	// 	setRoomToEdit(room);
	// 	setIsModalOpen(true);
	// };

	// const closeEditModal = () => {
	// 	setIsModalOpen(false);
	// 	setRoomToEdit(null);
	// };

	// const addRoom = (name: string, width: string, depth: string) => {
	// 	const newRoom: Room = {
	// 		id: Date.now().toString(),
	// 		name,
	// 		width,
	// 		depth,
	// 		tables: [],
	// 	};
	// 	setRooms((prevRooms) => [...prevRooms, newRoom]);
	// };

	// const updateRoom = (updatedRoom: Room) => {
	// 	setRooms((prevRooms) =>
	// 		prevRooms.map((room) =>
	// 			room.id === updatedRoom.id ? updatedRoom : room
	// 		)
	// 	);
	// };

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
