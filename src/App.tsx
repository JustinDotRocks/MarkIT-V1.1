import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
// import CanvasArea from "./components/CanvasArea/CanvasArea";
import CanvasAreaKonva from "./components/CanvasAreaKonva";
// import { Feature, Room, Vendor, Table, RoomFeature, RoomTable } from "./Types";
import { Feature, Room, Vendor, Table } from "./Types";

import {
	saveToLocalStorage,
	loadFromLocalStorage,
	getStorageKeys,
} from "./Storage";
import { v4 as uuidv4 } from "uuid";

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

	// const [roomFeatures, setRoomFeatures] = useState<RoomFeature[]>(
	// 	() =>
	// 		loadFromLocalStorage<RoomFeature[]>(
	// 			getStorageKeys().ROOM_FEATURES
	// 		) || []
	// );

	// const [roomTables, setRoomTables] = useState<RoomTable[]>(
	// 	() =>
	// 		loadFromLocalStorage<RoomTable[]>(
	// 			getStorageKeys().ROOM_TABLES
	// 		) || []
	// );

	const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null); // Updated to allow null

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

	// COMBINED: Single useEffect for saving state to localStorage
	// useEffect(() => {
	// 	// Save all state to localStorage in one effect
	// 	saveToLocalStorage(getStorageKeys().FEATURES, features);
	// 	saveToLocalStorage(getStorageKeys().ROOMS, rooms);
	// 	saveToLocalStorage(getStorageKeys().VENDORS, vendors);
	// 	saveToLocalStorage(getStorageKeys().TABLES, tables);
	// 	saveToLocalStorage(getStorageKeys().ROOM_FEATURES, roomFeatures);
	// 	saveToLocalStorage(getStorageKeys().ROOM_TABLES, roomTables);
	// }, [features, rooms, vendors, tables, roomFeatures, roomTables]);
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
		};
		setFeatures((prevFeatures: Feature[]) => [
			...prevFeatures,
			newFeature,
		]);

		// ADDED: Add the feature to the roomFeatures intersection object
		// if (selectedRoomId) {
		// 	const newRoomFeature: RoomFeature = {
		// 		id: uuidv4(),
		// 		roomId: selectedRoomId,
		// 		featureId: newFeature.id,
		// 	};
		// 	setRoomFeatures((prevRoomFeatures: RoomFeature[]) => [
		// 		...prevRoomFeatures,
		// 		newRoomFeature,
		// 	]);
		// }
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
		const roomName =
			rooms.find((room) => room.id === selectedRoomId)?.name ||
			"Unknown Room";

		const newTable: Table = {
			id,
			type,
			details,
			roomId: selectedRoomId || "",
			tableNumber: nextTableNumber, // Ensure this is a number
			// roomName,
		};

		setTables((prevTables: Table[]) => [...prevTables, newTable]);

		// Add the table to the roomTables intersection object
		// if (selectedRoomId) {
		// 	const newRoomTable: RoomTable = {
		// 		id: uuidv4(),
		// 		roomId: selectedRoomId,
		// 		tableId: newTable.id,
		// 	};
		// 	setRoomTables((prevRoomTables: RoomTable[]) => [
		// 		...prevRoomTables,
		// 		newRoomTable,
		// 	]);
		// }
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
		// setRoomFeatures((prevRoomFeatures) =>
		// 	prevRoomFeatures.filter((rf) => rf.roomId !== roomId)
		// );
		// setRoomTables((prevRoomTables) =>
		// 	prevRoomTables.filter((rt) => rt.roomId !== roomId)
		// );
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
					// roomFeatures={roomFeatures}
					// setRoomFeatures={setRoomFeatures}
					// roomTables={roomTables}
					// setRoomTables={setRoomTables}
					updateVendorDetails={updateVendorDetails}
				/>
				{/* <CanvasArea
					objects={features}
					removeObject={removeObjectFromCanvas}
					rooms={rooms}
					tables={tables}
					removeRoom={removeRoom}
					selectedRoomId={selectedRoomId}
				/> */}
				<CanvasAreaKonva
					objects={features}
					removeObject={removeObjectFromCanvas}
					rooms={rooms}
					tables={tables}
					removeRoom={removeRoom}
					selectedRoomId={selectedRoomId}
				/>
			</div>
		</div>
	);
};

export default App;
