import { useState, useEffect } from "react";
import { Table, Feature } from "../Types";

export const useLockState = (
	_tables: Table[],
	_features: Feature[],
	setTables: React.Dispatch<React.SetStateAction<Table[]>>,
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>
) => {
	const [areAllObjectsLocked, setAreAllObjectsLocked] = useState(false);

	// Load lock state from local storage on initial load
	useEffect(() => {
		const storedLockState = localStorage.getItem("areAllObjectsLocked");
		if (storedLockState !== null) {
			setAreAllObjectsLocked(JSON.parse(storedLockState));
		}
	}, []);

	const lockAllObjects = () => {
		const allLocked = areAllObjectsLocked;
		const newLockState = !allLocked;

		setAreAllObjectsLocked(newLockState);

		// Update tables and features to be locked/unlocked
		setTables((prevTables) =>
			prevTables.map((table) => ({
				...table,
				isLocked: newLockState,
			}))
		);
		setFeatures((prevFeatures) =>
			prevFeatures.map((feature) => ({
				...feature,
				isLocked: newLockState,
			}))
		);

		// Save the new lock state to local storage
		localStorage.setItem(
			"areAllObjectsLocked",
			JSON.stringify(newLockState)
		);
	};

	return {
		areAllObjectsLocked,
		lockAllObjects,
	};
};
