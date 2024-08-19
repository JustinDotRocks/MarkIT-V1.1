import React from "react";
import { SideBarProps } from "../../Types";
// import SetupModeComponent from "../SetupModeComponent";
import VendorModeComponent from "../VendorModeComponent";

const SideBar: React.FC<SideBarProps> = ({
	activeMode,
	rooms,
	setRooms,
	vendors,
	setVendors,
	features,
	setFeatures,
	tables,
	setTables,
	selectedRoomId,
	setSelectedRoomId,
	updateVendorDetails,
}) => {
	// const updateTableAssignment = (tableId: string, vendorId: string) => {
	// 	// Update the selected table to have the new vendorId
	// 	setTables((prevTables) =>
	// 		prevTables.map((table) =>
	// 			table.id === tableId
	// 				? { ...table, vendorId }
	// 				: table.vendorId === vendorId
	// 				? { ...table, vendorId: undefined }
	// 				: table
	// 		)
	// 	);
	// };

	// const deleteVendor = (vendorId: string) => {
	// 	// Remove vendor from the list
	// 	setVendors((prevVendors) =>
	// 		prevVendors.filter((vendor) => vendor.id !== vendorId)
	// 	);

	// 	// Unassign any tables associated with this vendor
	// 	setTables((prevTables) =>
	// 		prevTables.map((table) =>
	// 			table.vendorId === vendorId
	// 				? { ...table, vendorId: undefined }
	// 				: table
	// 		)
	// 	);
	// };

	return (
		<aside
			className={`w-full h-3/5 overflow-y-auto bg-gray-800 text-white p-4 transition-all duration-300 ${
				activeMode
					? "max-h-screen opacity-100 visible"
					: "max-h-0 opacity-0 invisible"
			} overflow-hidden`}
		>
			{/* {activeMode === "setup" ? (
				<SetupModeComponent
					rooms={rooms}
					setRooms={setRooms}
					setSelectedRoomId={setSelectedRoomId}
					selectedRoomId={selectedRoomId}
					setFeatures={setFeatures}
					setTables={setTables}
					tables={tables}
				/>
			) : ( */}
			{/* <VendorModeComponent
				setVendors={setVendors}
				vendors={vendors}
				tables={tables}
				rooms={rooms}
				updateTableAssignment={updateTableAssignment}
				deleteVendor={deleteVendor}
				updateVendorDetails={updateVendorDetails}
				selectedRoomId={selectedRoomId}
			/> */}
			{/* )} */}
		</aside>
	);
};

export default SideBar;
