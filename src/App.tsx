import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
// import CanvasArea from "./components/CanvasArea/CanvasArea";
import CanvasAreaKonva from "./components/CanvasAreaKonva";
import { Feature, Room, Vendor, Table } from "./Types";
import RoomEditModal from "./components/RoomEditModal";

import {
	saveToLocalStorage,
	loadFromLocalStorage,
	getStorageKeys,
} from "./Storage";

const App: React.FC = () => {
	const [activeMode, setActiveMode] = useState<"setup" | "vendor" | "">(
		"setup"
	);
	const [features, setFeatures] = useState<Feature[]>(
		() =>
			loadFromLocalStorage<Feature[]>(getStorageKeys().FEATURES) ||
			[]
	);
	const [rooms, setRooms] = useState<Room[]>(
		() => loadFromLocalStorage<Room[]>(getStorageKeys().ROOMS) || []
	);
	const [vendors, setVendors] = useState<Vendor[]>(
		() => loadFromLocalStorage<Vendor[]>(getStorageKeys().VENDORS) || []
	);
	const [tables, setTables] = useState<Table[]>(
		() => loadFromLocalStorage<Table[]>(getStorageKeys().TABLES) || []
	);
	const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); // Updated to allow null
	const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
		useState<boolean>(false);
	const [objectToDelete, setObjectToDelete] = useState<string | null>(null);

	// KEEP IN CASE WE HAVE UNDEFINED TABLES IN THE VENDOR CARD: Cleanup tables state to remove incomplete entries
	// useEffect(() => {
	// 	const cleanedTables = tables.filter(
	// 		(table) =>
	// 			table.tableNumber !== undefined &&
	// 			table.roomName !== undefined
	// 	);
	// 	setTables(cleanedTables);
	// 	saveToLocalStorage(getStorageKeys().TABLES, cleanedTables);
	// }, [tables]);

	useEffect(() => {
		// Save all state to localStorage in one effect
		saveToLocalStorage(getStorageKeys().FEATURES, features);
		saveToLocalStorage(getStorageKeys().ROOMS, rooms);
		saveToLocalStorage(getStorageKeys().VENDORS, vendors);
		saveToLocalStorage(getStorageKeys().TABLES, tables);
	}, [features, rooms, vendors, tables]);

	const addObjectToCanvas = (
		type: "door" | "obstacle",
		id: string,
		details?: string
	) => {
		const newFeature: Feature = {
			id,
			type,
			details,
			roomId: selectedRoomId || "",
			x: 0,
			y: 0,
			isLocked: false, // Initialize as unlocked
		};
		setFeatures((prevFeatures: Feature[]) => [
			...prevFeatures,
			newFeature,
		]);
	};

	const addTableToCanvas = (
		type: "table-6" | "table-8" | "table-5",
		id: string,
		details?: string
	) => {
		// Get the next table number for the selected room
		const existingTables = tables.filter(
			(table) => table.roomId === selectedRoomId
		);
		const nextTableNumber = existingTables.length + 1;

		// Find the name of the selected room
		// const roomName =
		// 	rooms.find((room) => room.id === selectedRoomId)?.name ||
		// 	"Unknown Room";

		const newTable: Table = {
			id,
			type,
			details,
			roomId: selectedRoomId || "",
			tableNumber: nextTableNumber,
			x: 0,
			y: 0,
			isLocked: false, // Initialize as unlocked
		};

		setTables((prevTables: Table[]) => [...prevTables, newTable]);
	};

	const toggleLockObject = (id: string, type: "table" | "feature") => {
		if (type === "table") {
			setTables((prevTables: Table[]) => {
				const updatedTables = prevTables.map((table) =>
					table.id === id
						? { ...table, isLocked: !table.isLocked }
						: table
				);
				saveToLocalStorage(
					getStorageKeys().TABLES,
					updatedTables
				); // Save to local storage
				return updatedTables;
			});
		} else {
			setFeatures((prevFeatures: Feature[]) => {
				const updatedFeatures = prevFeatures.map((feature) =>
					feature.id === id
						? {
								...feature,
								isLocked: !feature.isLocked,
						  }
						: feature
				);
				saveToLocalStorage(
					getStorageKeys().FEATURES,
					updatedFeatures
				); // Save to local storage
				return updatedFeatures;
			});
		}
	};

	const removeObjectFromCanvas = (id: string) => {
		setFeatures((prevFeatures: Feature[]) =>
			prevFeatures.filter((feature) => feature.id !== id)
		);
		setTables((prevTables: Table[]) =>
			prevTables.filter((table) => table.id !== id)
		);
	};

	const updateVendorDetails = (updatedVendor: Vendor) => {
		setVendors((prevVendors) =>
			prevVendors.map((vendor) =>
				vendor.id === updatedVendor.id ? updatedVendor : vendor
			)
		);
	};

	const removeRoom = (roomId: string) => {
		setRooms((prevRooms) =>
			prevRooms.filter((room) => room.id !== roomId)
		);
		setFeatures((prevFeatures) =>
			prevFeatures.filter((feature) => feature.roomId !== roomId)
		);
		setTables((prevTables) =>
			prevTables.filter((table) => table.roomId !== roomId)
		);
	};

	const openEditModal = (room: Room) => {
		setRoomToEdit(room);
		setIsModalOpen(true);
	};

	const closeEditModal = () => {
		setIsModalOpen(false);
		setRoomToEdit(null);
	};

	// const handleRoomUpdate = (updatedRoom: Room) => {
	// 	setRooms((prevRooms) =>
	// 		prevRooms.map((room) =>
	// 			room.id === updatedRoom.id ? updatedRoom : room
	// 		)
	// 	);
	// 	closeEditModal();
	// };

	const updateRoom = (updatedRoom: Room) => {
		setRooms((prevRooms) =>
			prevRooms.map((room) =>
				room.id === updatedRoom.id ? updatedRoom : room
			)
		);
	};

	return (
		<div className="flex flex-col h-screen">
			<NavBar
				activeMode={activeMode}
				setActiveMode={setActiveMode}
			/>
			<div className="relative flex flex-col flex-grow overflow-scroll">
				<SideBar
					activeMode={activeMode}
					addObject={addObjectToCanvas}
					addTable={addTableToCanvas}
					rooms={rooms}
					setRooms={setRooms}
					vendors={vendors}
					setVendors={setVendors}
					features={features}
					setFeatures={setFeatures}
					tables={tables}
					setTables={setTables}
					selectedRoomId={selectedRoomId}
					setSelectedRoomId={setSelectedRoomId}
					updateVendorDetails={updateVendorDetails}
				/>
				<div className="flex-grow flex-col justify-center m-8 items-center overflow-y-auto h-full">
					<CanvasAreaKonva
						objects={features}
						// removeObject={removeObjectFromCanvas}
						rooms={rooms}
						tables={tables}
						removeRoom={removeRoom}
						selectedRoomId={selectedRoomId}
						setTables={setTables}
						setFeatures={setFeatures}
						features={features}
						vendors={vendors}
						openEditModal={openEditModal}
						removeObjectFromCanvas={
							removeObjectFromCanvas
						}
						toggleLockObject={toggleLockObject}
					/>
				</div>
				{isModalOpen && roomToEdit && (
					// <RoomEditModal
					// 	room={roomToEdit}
					// 	onClose={closeEditModal}
					// 	onSave={handleRoomUpdate}
					// />
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
						} // Provide a default room if roomToEdit is null
						onSave={updateRoom}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
