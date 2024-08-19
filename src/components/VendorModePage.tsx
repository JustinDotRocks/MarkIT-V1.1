import React from "react";
import VendorModeComponent from "./VendorModeComponent";
import { VendorModePageProps, Table, Vendor } from "../Types";

const VendorModePage: React.FC<VendorModePageProps> = ({
	vendors,
	setVendors,
	tables,
	setTables,
	rooms,
	updateVendorDetails,
	selectedRoomId,
	setSelectedRoomId,
}) => {
	const updateTableAssignment = (tableId: string, vendorId: string) => {
		// Update the selected table to have the new vendorId
		setTables((prevTables: Table[]) =>
			prevTables.map((table: Table) =>
				table.id === tableId
					? { ...table, vendorId }
					: table.vendorId === vendorId
					? { ...table, vendorId: undefined }
					: table
			)
		);
	};

	const deleteVendor = (vendorId: string) => {
		// Remove vendor from the list
		setVendors((prevVendors: Vendor[]) =>
			prevVendors.filter((vendor: Vendor) => vendor.id !== vendorId)
		);

		// Unassign any tables associated with this vendor
		setTables((prevTables: Table[]) =>
			prevTables.map((table: Table) =>
				table.vendorId === vendorId
					? { ...table, vendorId: undefined }
					: table
			)
		);
	};
	return (
		<div className="vendor-mode-page p-4">
			<h2 className="text-lg font-bold mb-4">Vendor Mode</h2>
			<VendorModeComponent
				vendors={vendors}
				setVendors={setVendors}
				tables={tables}
				setTables={setTables}
				rooms={rooms}
				updateTableAssignment={updateTableAssignment}
				deleteVendor={deleteVendor}
				updateVendorDetails={updateVendorDetails}
				selectedRoomId={selectedRoomId}
				setSelectedRoomId={setSelectedRoomId}
			/>
		</div>
	);
};

export default VendorModePage;
