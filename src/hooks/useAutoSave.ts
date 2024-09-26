import { useEffect } from "react";
import { saveToLocalStorage, getStorageKeys } from "../utils/storageUtils";
import { Feature, Room, Vendor, Table } from "../Types";

export const useAutoSave = (
	features: Feature[],
	rooms: Room[],
	vendors: Vendor[],
	tables: Table[]
) => {
	useEffect(() => {
		// Save all state to localStorage in one effect
		saveToLocalStorage(getStorageKeys().FEATURES, features);
		saveToLocalStorage(getStorageKeys().ROOMS, rooms);
		saveToLocalStorage(getStorageKeys().VENDORS, vendors);
		saveToLocalStorage(getStorageKeys().TABLES, tables);
	}, [features, rooms, vendors, tables]);
};
