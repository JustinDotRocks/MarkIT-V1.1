// Utility to save data to localStorage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
	try {
		const serializedData = JSON.stringify(data);
		localStorage.setItem(key, serializedData);
	} catch (error) {
		console.error(
			`Error saving data to localStorage with key: ${key}`,
			error
		);
	}
};

// Utility to load data from localStorage
export const loadFromLocalStorage = <T>(key: string): T | null => {
	try {
		const serializedData = localStorage.getItem(key);
		if (serializedData === null) {
			return null;
		}
		return JSON.parse(serializedData) as T;
	} catch (error) {
		console.error(
			`Error loading data from localStorage with key: ${key}`,
			error
		);
		return null;
	}
};

// Utility to remove data from localStorage
export const removeFromLocalStorage = (key: string): void => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error(
			`Error removing data from localStorage with key: ${key}`,
			error
		);
	}
};

// Utility to get storage keys in a centralized manner
export const getStorageKeys = () => ({
	ROOMS: "rooms",
	TABLES: "tables",
	VENDORS: "vendors",
	FEATURES: "features",
});
