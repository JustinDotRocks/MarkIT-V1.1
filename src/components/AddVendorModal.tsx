import React, { useState } from "react";
import { Vendor, AddVendorModalProps } from "../Types";
import Input from "./Input/Input";
import Button from "./Button/Button";
import { v4 as uuidv4 } from "uuid";

const AddVendorModal: React.FC<AddVendorModalProps> = ({
	isOpen,
	onClose,
	addVendor,
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

	const handleAddVendor = () => {
		const newVendor: Vendor = {
			id: uuidv4(),
			name: vendorName,
			products: vendorProducts,
			details: vendorDetails.details,
			roomId: selectedRoomId || "",
			signedIn: false,
			electricityRequired: vendorDetails.electricityRequired,
		};
		addVendor(newVendor);
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
		onClose();
	};

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center ${
				isOpen ? "visible" : "invisible"
			}`}
		>
			<div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-lg font-bold mb-4">Add Vendor</h2>
				<Input
					type="text"
					name="vendor-name"
					value={vendorName}
					onChange={handleInputChange}
					placeholder="Vendor name"
					className="w-full p-2 rounded bg-gray-700 text-white mb-4"
				/>
				<Input
					type="text"
					name="vendor-products"
					value={vendorProducts}
					onChange={handleInputChange}
					placeholder="Products"
					className="w-full p-2 rounded bg-gray-700 text-white mb-4"
				/>
				<textarea
					name="vendor-details"
					value={vendorDetails.details}
					onChange={handleVendorDetailsChange}
					placeholder="Details"
					className="w-full p-2 rounded bg-gray-700 text-white mb-4"
					rows={3}
				/>
				<div className="flex items-center mb-4">
					<label
						className="mr-2 text-gray-200"
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
								electricityRequired:
									e.target.checked,
							}))
						}
						className="form-checkbox h-5 w-5 text-blue-600"
					/>
				</div>
				<div className="flex justify-end space-x-4">
					<Button
						onClick={onClose}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
					>
						Cancel
					</Button>
					<Button
						onClick={handleAddVendor}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
					>
						Add Vendor
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddVendorModal;
