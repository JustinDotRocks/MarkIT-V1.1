import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import CanvasArea from "./components/CanvasArea/CanvasArea";
import { Feature, Room, Vendor, Table } from "./Types";
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

	useEffect(() => {
		saveToLocalStorage(getStorageKeys().FEATURES, features);
	}, [features]);

	useEffect(() => {
		saveToLocalStorage(getStorageKeys().ROOMS, rooms);
	}, [rooms]);

	useEffect(() => {
		saveToLocalStorage(getStorageKeys().VENDORS, vendors);
	}, [vendors]);

	useEffect(() => {
		saveToLocalStorage(getStorageKeys().TABLES, tables);
	}, [tables]);

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
	};

	// Add tables to the canvas
	const addTableToCanvas = (
		type: "table-6" | "table-8" | "table-5",
		id: string,
		// roomId: string,
		details?: string
	) => {
		const newTable: Table = {
			id,
			type,
			details,
			roomId: selectedRoomId || "",
		};
		setTables((prevTables: Table[]) => [...prevTables, newTable]);
	};

	const removeObjectFromCanvas = (id: string) => {
		setFeatures((prevFeatures: Feature[]) =>
			prevFeatures.filter((feature) => feature.id !== id)
		);
		setTables((prevTables: Table[]) =>
			prevTables.filter((table) => table.id !== id)
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
					addTable={addTableToCanvas} // Pass addTable to SideBar for adding tables
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
				/>
				<CanvasArea
					objects={features}
					removeObject={removeObjectFromCanvas}
					rooms={rooms}
					tables={tables}
					selectedRoomId={selectedRoomId}
				/>
			</div>
		</div>
	);
};

export default App;
