import React, { useState } from "react";
import { ClearAllTablesButtonProps, Vendor } from "../Types";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { clearTablesForRoom } from "../utils/functions";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
	STORAGE_KEYS,
} from "../utils/storageUtils";

const ClearAllTablesButton: React.FC<ClearAllTablesButtonProps> = ({
	tables,
	setTables,
	selectedRoomId,
	vendors,
	setVendors,
}) => {
	const [, setIsModalOpen] = useState(false);
	const closeModal = () => setIsModalOpen(false);

	const handleClearTables = () => {
		if (selectedRoomId) {
			// Remove tables associated with the selected room
			const updatedTables = clearTablesForRoom(
				tables,
				selectedRoomId
			);
			setTables(updatedTables);

			// Read vendors from local storage
			// const vendors: Vendor[] =
			// 	loadFromLocalStorage<Vendor[]>(STORAGE_KEYS.VENDORS) ||
			// 	[];

			// // Update vendors to remove the room assignment
			// const updatedVendors = vendors.map((vendor) => {
			// 	if (vendor.room === selectedRoomId) {
			// 		return {
			// 			...vendor,
			// 			room: null,
			// 		};
			// 	}
			// 	return vendor;
			// });
			const updatedVendors = vendors.map((vendor: Vendor) => {
				if (vendor.roomId === selectedRoomId) {
					return {
						...vendor,
						roomId: "",
						roomName: "",
					};
				}
				return vendor;
			});

			// Update the state
			setVendors(updatedVendors);

			// Save updated vendors back to local storage
			saveToLocalStorage(STORAGE_KEYS.VENDORS, updatedVendors);
		}

		closeModal();
	};

	return (
		<DeleteConfirmationModal
			message="Are you sure you want to delete ALL TABLES?"
			onConfirm={handleClearTables}
			triggerComponent={
				<button className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mb-1 rounded">
					<MdOutlineCancelPresentation className="" />
				</button>
			}
		/>
	);
};

export default ClearAllTablesButton;
