import { useState, useEffect } from "react";
import { Vendor } from "../Types";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
	getStorageKeys,
} from "../utils/storageUtils";

export const useVendors = () => {
	// Vendor state
	const [vendors, setVendors] = useState<Vendor[]>(
		() => loadFromLocalStorage<Vendor[]>(getStorageKeys().VENDORS) || []
	);

	// Update vendor details
	const updateVendorDetails = (updatedVendor: Vendor) => {
		setVendors((prevVendors) =>
			prevVendors.map((vendor) =>
				vendor.id === updatedVendor.id
					? { ...vendor, ...updatedVendor }
					: vendor
			)
		);
	};

	// Save vendors to localStorage whenever they change
	useEffect(() => {
		saveToLocalStorage(getStorageKeys().VENDORS, vendors);
	}, [vendors]);

	return { vendors, setVendors, updateVendorDetails };
};
