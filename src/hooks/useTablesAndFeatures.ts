import { useState, useEffect } from "react";
import { Feature, Table } from "../Types";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
	getStorageKeys,
} from "../utils/storageUtils";

export const useTablesAndFeatures = (selectedRoomId: string | null) => {
	const [features, setFeatures] = useState<Feature[]>(
		() =>
			loadFromLocalStorage<Feature[]>(getStorageKeys().FEATURES) ||
			[]
	);
	const [tables, setTables] = useState<Table[]>(
		() => loadFromLocalStorage<Table[]>(getStorageKeys().TABLES) || []
	);
	const [areAllObjectsLocked, setAreAllObjectsLocked] = useState(false);

	useEffect(() => {
		saveToLocalStorage(getStorageKeys().FEATURES, features);
		saveToLocalStorage(getStorageKeys().TABLES, tables);
	}, [features, tables]);

	const addTableToCanvas = (tableData: {
		type: "table-6" | "table-8" | "table-5";
		id: string;
		details?: string;
		tableNumber: number;
	}) => {
		setTables((prevTables: Table[]) => {
			const roomTables = prevTables.filter(
				(table) => table.roomId === selectedRoomId
			);

			const maxTableNumber = roomTables.reduce(
				(max, table) =>
					table.tableNumber > max ? table.tableNumber : max,
				0
			);
			const nextTableNumber = maxTableNumber + 1;

			const newTable: Table = {
				...tableData,
				tableNumber: nextTableNumber,
				roomId: selectedRoomId || "",
				x: 0,
				y: 0,
				isLocked: false,
			};

			return [...prevTables, newTable];
		});
	};

	const addFeatureToCanvas = (featureData: {
		type: "door" | "obstacle";
		id: string;
		details?: string;
	}) => {
		const newFeature: Feature = {
			...featureData,
			roomId: selectedRoomId || "",
			x: 0,
			y: 0,
			isLocked: false,
		};
		setFeatures((prevFeatures: Feature[]) => [
			...prevFeatures,
			newFeature,
		]);
	};

	const toggleLockObject = (id: string, type: "table" | "feature") => {
		if (type === "table") {
			setTables((prevTables: Table[]) => {
				const updatedTables = prevTables.map((table) =>
					table.id === id
						? { ...table, isLocked: !table.isLocked }
						: table
				);
				const allLocked = updatedTables.every(
					(table) => table.isLocked
				);
				setAreAllObjectsLocked(allLocked);
				saveToLocalStorage(
					getStorageKeys().TABLES,
					updatedTables
				);
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
				const allLocked = updatedFeatures.every(
					(feature) => feature.isLocked
				);
				setAreAllObjectsLocked(allLocked);
				saveToLocalStorage(
					getStorageKeys().FEATURES,
					updatedFeatures
				);
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

	return {
		features,
		tables,
		addTableToCanvas,
		addFeatureToCanvas,
		toggleLockObject,
		removeObjectFromCanvas,
		areAllObjectsLocked,
		setAreAllObjectsLocked,
		setFeatures,
		setTables,
	};
};
