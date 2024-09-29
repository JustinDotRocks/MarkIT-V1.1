import { useState } from "react";
import { Vendor, Table, Room } from "../Types";

export const useVendorManagement = (
	tables: Table[],
	setTables: React.Dispatch<React.SetStateAction<Table[]>>,
	vendors: Vendor[],
	setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>
) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTableId, setSelectedTableId] = useState<string | null>(
		null
	);

	const handleAddVendorClick = (tableId: string) => {
		setSelectedTableId(tableId);
		setIsModalOpen(true);
	};

	const handleRemoveVendor = (tableId: string) => {
		// Update table state to remove vendorId from the table
		setTables((prevTables) =>
			prevTables.map((table) =>
				table.id === tableId
					? { ...table, vendorId: undefined }
					: table
			)
		);

		// Update vendors after the table state has been modified
		setVendors((prevVendors) => {
			// Find the vendor associated with the table
			const associatedVendor = prevVendors.find((vendor) =>
				tables.some(
					(table) =>
						table.id === tableId &&
						table.vendorId === vendor.id
				)
			);

			if (associatedVendor) {
				// Remove room and table association from the vendor
				localStorage.removeItem(
					`vendor-${associatedVendor.id}-roomId`
				);
				return prevVendors.map((vendor) =>
					vendor.id === associatedVendor.id
						? {
								...vendor,
								signedIn: false,
								roomId: "",
								roomName: "",
						  }
						: vendor
				);
			}
			return prevVendors;
		});
	};

	return {
		isModalOpen,
		selectedTableId,
		setIsModalOpen,
		handleAddVendorClick,
		handleRemoveVendor,
	};
};
