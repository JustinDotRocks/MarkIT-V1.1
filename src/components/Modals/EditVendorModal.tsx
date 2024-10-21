import React, { useState, useRef, useEffect } from "react";
import { Vendor, EditVendorModalProps } from "../../Types";
import { handleClickOutside } from "../../utils/functions";

const EditVendorModal: React.FC<EditVendorModalProps> = ({
	vendorToEdit,
	onSave,
	onClose,
	vendors,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	// Initialize state with existing vendor values
	const [editableVendor, setEditableVendor] =
		useState<Vendor>(vendorToEdit);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Sync state with prop changes
	useEffect(() => {
		setEditableVendor(vendorToEdit);
	}, [vendorToEdit]);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type } = e.target;
		const isChecked = (e.target as HTMLInputElement).checked;

		setEditableVendor((prev) => ({
			...prev,
			[name]: type === "checkbox" ? isChecked : value,
		}));
	};

	const handleUpdateVendor = () => {
		// Check for duplicate vendor name
		const existingVendor = vendors.find(
			(vendor) =>
				vendor.name.toLowerCase() ===
					editableVendor.name.toLowerCase() &&
				vendor.id !== editableVendor.id // Exclude the current vendor from the check
		);

		if (existingVendor) {
			// Show an error message if the vendor name already exists
			setErrorMessage("A vendor with this name already exists.");
			return;
		}

		onSave(editableVendor);
		if (onClose) onClose();
		setErrorMessage(null); // Clear any previous error
	};

	useEffect(() => {
		// Use the extracted handleClickOutside function
		const outsideClickHandler = handleClickOutside(modalRef, onClose);
		document.addEventListener("mousedown", outsideClickHandler);
		return () => {
			document.removeEventListener(
				"mousedown",
				outsideClickHandler
			);
		};
	}, [modalRef, onClose]);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="bg-white p-4 rounded border-2 shadow-xl w-full max-w-md sm:w-1/2 md:w-1/4"
			>
				<h2 className="text-xl font-bold mb-4 text-customPurple">
					Edit Vendor
				</h2>
				<div>
					<label className="text-customPurple">
						Vendor Name:
					</label>
					<input
						type="text"
						name="name"
						value={editableVendor.name}
						onChange={handleInputChange}
						className={`w-full p-1 mb-4 rounded bg-gray-100 text-customPurple ${
							errorMessage
								? "border-2 border-red-500"
								: ""
						}`}
					/>
					{errorMessage && (
						<p className="text-red-500 mt-1">
							{errorMessage}
						</p>
					)}
				</div>
				<div>
					{/* <label className="text-customPurple">
						Products:
					</label> */}
					<input
						type="text"
						name="products"
						placeholder="Products"
						value={editableVendor.products}
						onChange={handleInputChange}
						className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple placeholder:text-customPurple"
					/>
				</div>
				<div>
					{/* <label className="text-white">
						Vendor Details:
					</label> */}
					<textarea
						name="details"
						placeholder="Details"
						value={editableVendor.details}
						onChange={handleInputChange}
						className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple placeholder:text-customPurple"
					/>
				</div>
				<div className="mb-4">
					<label className="text-customPurple flex items-center">
						<input
							type="checkbox"
							name="electricityRequired"
							checked={
								editableVendor.electricityRequired
							}
							onChange={handleInputChange}
							className="form-checkbox h-6 w-6 text-blue-600 mr-2"
						/>
						Electricity Required
					</label>
				</div>
				{/* Add any additional fields as needed */}
				<div className="flex justify-end">
					<button
						onClick={handleUpdateVendor}
						className="bg-customPurple hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
					>
						Save
					</button>
					<button
						onClick={onClose}
						className="bg-customRed hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditVendorModal;
