import { useState, useEffect } from "react";
import { Vendor, Table } from "../Types";

export const useVendorSelection = (
	selectedTable: Table | null,
	vendors: Vendor[]
) => {
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

	useEffect(() => {
		if (selectedTable && selectedTable.vendorId) {
			const vendor = vendors.find(
				(v) => v.id === selectedTable.vendorId
			);
			setSelectedVendor(vendor || null);
		} else {
			setSelectedVendor(null);
		}
	}, [selectedTable, vendors]);

	return {
		selectedVendor,
	};
};
