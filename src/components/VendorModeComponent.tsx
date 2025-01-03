import React, { useState, useEffect } from "react";
import { VendorModeComponentProps, Vendor } from "../Types";
import VendorCard from "./VendorCard";
import AddVendorModal from "./Modals/AddVendorModal";
import {
	saveToLocalStorage,
	loadFromLocalStorage,
	STORAGE_KEYS,
} from "../utils/storageUtils";

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

	const closeAddVendorModal = () => setIsAddVendorModalOpen(false);

	const addVendor = (newVendor: Vendor) => {
		setVendors((prevVendors: Vendor[]) => [...prevVendors, newVendor]);
	};

	return (
		<div className="h-full min-h-screen">
			<AddVendorModal
				isOpen={isAddVendorModalOpen}
				onClose={closeAddVendorModal}
				addVendor={addVendor}
				selectedRoomId={selectedRoomId}
				vendors={vendors}
			/>
			<div className=" flex items-center flex-col md:grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 mt-4">
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
							vendors={vendors}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default VendorModeComponent;
