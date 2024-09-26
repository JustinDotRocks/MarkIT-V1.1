// Utility functions for handling localStorage

export const saveToLocalStorage = <T>(key: string, value: T): void => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.error("Error saving to localStorage", e);
	}
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
	try {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : null;
	} catch (e) {
		console.error("Error loading from localStorage", e);
		return null;
	}
};

// Utility function to get storage keys
export const getStorageKeys = () => ({
	ROOMS: "rooms",
	TABLES: "tables",
	VENDORS: "vendors",
	FEATURES: "features",
});

// Example of a utility function to format dates (you can add any others you need)
export const formatDate = (date: Date): string => {
	return date.toISOString().split("T")[0];
};

// Example of a helper function for calculating something
export const calculateArea = (width: number, height: number): number => {
	return width * height;
};
