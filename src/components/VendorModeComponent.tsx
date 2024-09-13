import React, { useState, useEffect } from "react";
import { VendorModeComponentProps, Vendor } from "../Types";
import Button from "./Button/Button";
import VendorCard from "./VendorCard/VendorCard";
import AddVendorModal from "./AddVendorModal"; // Import the modal
import {
	saveToLocalStorage,
	loadFromLocalStorage,
	STORAGE_KEYS,
} from "../Storage";

const VendorModeComponent: React.FC<VendorModeComponentProps> = ({
	setVendors,
	vendors,
	tables,
	rooms,
	updateTableAssignment,
	deleteVendor,
	updateVendorDetails,
	selectedRoomId,
}) => {
	const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);

	useEffect(() => {
		const storedVendors = loadFromLocalStorage<Vendor[]>(
			STORAGE_KEYS.VENDORS
		);
		if (storedVendors) {
			setVendors(storedVendors);
		}
	}, [setVendors]);

	useEffect(() => {
		saveToLocalStorage(STORAGE_KEYS.VENDORS, vendors);
	}, [vendors]);

	const openAddVendorModal = () => setIsAddVendorModalOpen(true);
	const closeAddVendorModal = () => setIsAddVendorModalOpen(false);

	const addVendor = (newVendor: Vendor) => {
		setVendors((prevVendors: Vendor[]) => [...prevVendors, newVendor]);
	};

	return (
		<div>
			{/* <h2 className="text-lg font-bold">Vendor Setup</h2> */}
			{/* <Button
				onClick={openAddVendorModal}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				Add Vendor
			</Button> */}

			<AddVendorModal
				isOpen={isAddVendorModalOpen}
				onClose={closeAddVendorModal}
				addVendor={addVendor}
				selectedRoomId={selectedRoomId}
			/>

			<div className="flex flex-wrap mt-4 space-y-4">
				{vendors.map((vendor) => {
					const associatedTable = tables.find(
						(table) => table.vendorId === vendor.id
					);
					return (
						<VendorCard
							key={vendor.id}
							id={vendor.id}
							vendorName={vendor.name}
							vendorProducts={vendor.products}
							vendorDetails={vendor.details}
							tableNumber={
								associatedTable
									? associatedTable.id
									: ""
							}
							roomName=""
							roomId=""
							signedIn={vendor.signedIn}
							electricityRequired={
								vendor.electricityRequired
							}
							tables={tables.filter(
								(table) =>
									!table.vendorId ||
									table.vendorId ===
										vendor.id
							)}
							rooms={rooms}
							updateTableAssignment={
								updateTableAssignment
							}
							deleteVendor={deleteVendor}
							updateVendorDetails={
								updateVendorDetails
							}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default VendorModeComponent;
