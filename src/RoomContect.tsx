import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { Room, Table, Feature, Vendor } from "./Types";
import {
	saveToLocalStorage,
	loadFromLocalStorage,
	getStorageKeys,
} from "./Storage";

interface RoomContextProps {
	rooms: Room[];
	setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
	tables: Table[];
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	features: Feature[];
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
	vendors: Vendor[];
	setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	selectedRoomId: string | null;
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
	addRoom: (name: string, width: string, depth: string) => void;
	addTable: (type: "table-6" | "table-8" | "table-5") => void;
	removeRoom: (roomId: string) => void;
	toggleLockObject: (id: string, type: "table" | "feature") => void;
	removeObjectFromCanvas: (id: string) => void;
	updateVendorDetails: (updatedVendor: Vendor) => void;
}

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

export const useRoomContext = (): RoomContextProps => {
	const context = useContext(RoomContext);
	if (!context) {
		throw new Error(
			"useRoomContext must be used within a RoomProvider"
		);
	}
	return context;
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
	const [rooms, setRooms] = useState<Room[]>(
		() => loadFromLocalStorage<Room[]>(getStorageKeys().ROOMS) || []
	);
	const [tables, setTables] = useState<Table[]>(
		() => loadFromLocalStorage<Table[]>(getStorageKeys().TABLES) || []
	);
	const [features, setFeatures] = useState<Feature[]>(
		() =>
			loadFromLocalStorage<Feature[]>(getStorageKeys().FEATURES) ||
			[]
	);
	const [vendors, setVendors] = useState<Vendor[]>(
		() => loadFromLocalStorage<Vendor[]>(getStorageKeys().VENDORS) || []
	);
	const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

	useEffect(() => {
		saveToLocalStorage(getStorageKeys().FEATURES, features);
		saveToLocalStorage(getStorageKeys().ROOMS, rooms);
		saveToLocalStorage(getStorageKeys().VENDORS, vendors);
		saveToLocalStorage(getStorageKeys().TABLES, tables);
	}, [features, rooms, vendors, tables]);

	const addRoom = (name: string, width: string, depth: string) => {
		const newRoom: Room = {
			id: Date.now().toString(),
			name,
			width,
			depth,
			tables: [],
		};
		setRooms((prevRooms) => [...prevRooms, newRoom]);
	};

	const addTable = (type: "table-6" | "table-8" | "table-5") => {
		if (!selectedRoomId) return;

		const existingTables = tables.filter(
			(table) => table.roomId === selectedRoomId
		);
		const nextTableNumber = existingTables.length + 1;

		const newTable: Table = {
			id: Date.now().toString(),
			type,
			roomId: selectedRoomId,
			tableNumber: nextTableNumber,
			x: 0,
			y: 0,
			isLocked: false,
		};

		setTables((prevTables) => [...prevTables, newTable]);
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

	const toggleLockObject = (id: string, type: "table" | "feature") => {
		if (type === "table") {
			setTables((prevTables) => {
				const updatedTables = prevTables.map((table) =>
					table.id === id
						? { ...table, isLocked: !table.isLocked }
						: table
				);
				saveToLocalStorage(
					getStorageKeys().TABLES,
					updatedTables
				);
				return updatedTables;
			});
		} else {
			setFeatures((prevFeatures) => {
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
				);
				return updatedFeatures;
			});
		}
	};

	const removeObjectFromCanvas = (id: string) => {
		setFeatures((prevFeatures) =>
			prevFeatures.filter((feature) => feature.id !== id)
		);
		setTables((prevTables) =>
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

	return (
		<RoomContext.Provider
			value={{
				rooms,
				setRooms,
				tables,
				setTables,
				features,
				setFeatures,
				vendors,
				setVendors,
				selectedRoomId,
				setSelectedRoomId,
				addRoom,
				addTable,
				removeRoom,
				toggleLockObject,
				removeObjectFromCanvas,
				updateVendorDetails,
			}}
		>
			{children}
		</RoomContext.Provider>
	);
};
