import React, { useState, useEffect } from "react";
import { VendorModeComponentProps, Vendor, Table } from "../Types";
import Input from "./Input/Input";
import Button from "./Button/Button";
import VendorCard from "./VendorCard/VendorCard";
import { v4 as uuidv4 } from "uuid";
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
	const [vendorName, setVendorName] = useState("");
	const [vendorProducts, setVendorProducts] = useState("");
	const [vendorDetails, setVendorDetails] = useState<Vendor>({
		id: "",
		name: "",
		products: "",
		details: "",
		roomId: "",
		signedIn: false,
		electricityRequired: false,
	});

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case "vendor-name":
				setVendorName(value);
				break;
			case "vendor-products":
				setVendorProducts(value);
				break;
			case "vendor-details":
				setVendorDetails((prev) => ({
					...prev,
					details: value,
				}));
				break;
			default:
				break;
		}
	};

	const handleVendorDetailsChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;

		if (type === "checkbox") {
			const checked = (e.target as HTMLInputElement).checked;
			setVendorDetails((prev) => ({
				...prev,
				[name]: checked,
			}));
		} else {
			setVendorDetails((prev) => ({
				...prev,
				details: value,
			}));
		}
	};

	const addVendor = () => {
		const newVendor: Vendor = {
			id: uuidv4(),
			name: vendorName,
			products: vendorProducts,
			details: vendorDetails.details,
			roomId: selectedRoomId || "",
			signedIn: false,
			electricityRequired: vendorDetails.electricityRequired,
		};
		setVendors((prevVendors: Vendor[]) => [...prevVendors, newVendor]);
		setVendorName("");
		setVendorProducts("");
		setVendorDetails({
			id: "",
			name: "",
			products: "",
			details: "",
			roomId: selectedRoomId || "",
			signedIn: false,
			electricityRequired: false,
		});
	};

	return (
		<div>
			<h2 className="text-lg font-bold">Vendor Setup</h2>
			<Button
				onClick={addVendor}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				Add Vendor
			</Button>
			<Input
				type="text"
				name="vendor-name"
				value={vendorName}
				onChange={handleInputChange}
				placeholder="Vendor name"
				className="w-full p-2 rounded bg-gray-700 text-white"
			/>
			<Input
				type="text"
				name="vendor-products"
				value={vendorProducts}
				onChange={handleInputChange}
				placeholder="Products"
				className="w-full p-2 rounded bg-gray-700 text-white"
			/>
			<textarea
				name="vendor-details"
				value={vendorDetails.details}
				onChange={handleVendorDetailsChange}
				placeholder="Details"
				className="w-full p-2 rounded bg-gray-700 text-white"
				rows={3}
			/>
			<div className="flex items-center mt-2">
				<label
					className="mr-2 ml-2 text-gray-200"
					htmlFor="vendor-electricity-required"
				>
					Electricity Required
				</label>
				<input
					type="checkbox"
					id="vendor-electricity-required"
					name="vendor-electricity-required"
					checked={vendorDetails.electricityRequired}
					onChange={(e) =>
						setVendorDetails((prev) => ({
							...prev,
							electricityRequired: e.target.checked,
						}))
					}
					className="form-checkbox h-5 w-5 text-blue-600"
				/>
			</div>
			<div className="mt-4 space-y-4">
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
