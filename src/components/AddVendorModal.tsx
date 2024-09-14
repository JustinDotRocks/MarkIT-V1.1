import React, { useState, useRef, useEffect } from "react";
import { Vendor, AddVendorModalProps } from "../Types";
import Input from "./Input/Input";
import Button from "./Button/Button";
import { v4 as uuidv4 } from "uuid";

const AddVendorModal: React.FC<AddVendorModalProps> = ({
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

	const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

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
		setIsAddVendorModalOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			setIsAddVendorModalOpen(false);
		}
	};

	useEffect(() => {
		if (isAddVendorModalOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isAddVendorModalOpen]);

	return (
		<>
			<button
				onClick={() => setIsAddVendorModalOpen(true)}
				className="bg-customBlue hover:bg-blue-700 text-white font-bold py-1 px-2 ml-4 rounded"
			>
				Add Vendor
			</button>
			{isAddVendorModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div
						ref={modalRef}
						className="bg-customBlue text-white p-6 rounded-lg shadow-lg w-96"
					>
						<h2 className="text-lg font-bold mb-4">
							Add Vendor
						</h2>
						<Input
							type="text"
							name="vendor-name"
							value={vendorName}
							onChange={handleInputChange}
							placeholder="Vendor name"
							className="w-full p-2 rounded  text-white placeholder-white mb-4"
						/>
						<Input
							type="text"
							name="vendor-products"
							value={vendorProducts}
							onChange={handleInputChange}
							placeholder="Products"
							className="w-full p-2 rounded bg-customBlue2 text-white placeholder-white mb-4"
						/>
						<textarea
							name="vendor-details"
							value={vendorDetails.details}
							onChange={handleVendorDetailsChange}
							placeholder="Details"
							className="w-full p-2 rounded bg-customBlue2 text-white placeholder-white mb-4"
							rows={3}
						/>
						<div className="flex items-center mb-4">
							<label
								className="mr-2 text-white"
								htmlFor="vendor-electricity-required"
							>
								Electricity Required
							</label>
							<input
								type="checkbox"
								id="vendor-electricity-required"
								name="electricityRequired"
								checked={
									vendorDetails.electricityRequired
								}
								onChange={(e) =>
									setVendorDetails(
										(prev) => ({
											...prev,
											electricityRequired:
												e.target
													.checked,
										})
									)
								}
								className="form-checkbox h-5 w-5 text-customBlue2"
							/>
						</div>
						<div className="flex justify-end space-x-4">
							<Button
								onClick={() =>
									setIsAddVendorModalOpen(
										false
									)
								}
								className="bg-customBlue2 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
							>
								Cancel
							</Button>
							<Button
								onClick={handleAddVendor}
								className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
							>
								Add Vendor
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddVendorModal;
