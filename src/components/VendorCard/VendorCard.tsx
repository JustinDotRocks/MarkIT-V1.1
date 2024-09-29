import React, { useState, useEffect } from "react";
import { VendorCardProps, Table } from "../../Types";
import {
	FaChevronUp,
	FaChevronDown,
	FaCheckCircle,
	// FaSignInAlt,
	// FaUserCheck,
	// FaToggleOn,
	// FaToggleOff,
} from "react-icons/fa";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import VendorSignInComponent from "../VendorSignInComponent";
import EditVendorModal from "../EditVendorModal";

const VendorCard: React.FC<VendorCardProps> = ({
	id,
	vendorName,
	vendorProducts,
	vendorDetails,
	tableNumber,
	roomId,
	signedIn,
	electricityRequired,
	tables,
	rooms,
	updateTableAssignment,
	deleteVendor,
	updateVendorDetails,
	vendors,
}) => {
	// const [isEditing, setIsEditing] = useState(false);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
	const [editableVendor, setEditableVendor] = useState({
		id,
		name: vendorName,
		products: vendorProducts,
		details: vendorDetails,
		signedIn,
		electricityRequired,
		roomId,
	});
	const [selectedRoomId, setSelectedRoomId] = useState<string | "">(roomId);
	const [currentRoomName, setCurrentRoomName] = useState<string>("");
	const [currentTableLabel, setCurrentTableLabel] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message for duplicate name

	const truncateText = (text: string, maxLength: number) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + "...";
		}
		return text;
	};

	const toggleAccordion = () => {
		setIsAccordionOpen(!isAccordionOpen);
	};

	useEffect(() => {
		if (!editableVendor.roomId) return;

		const selectedRoom = rooms.find(
			(room) => room.id === editableVendor.roomId
		);
		setEditableVendor((prev) => ({
			...prev,
			roomName: selectedRoom ? selectedRoom.name : "",
		}));
	}, [editableVendor.roomId, rooms]);

	useEffect(() => {
		const savedRoomId = localStorage.getItem(`vendor-${id}-roomId`);
		if (savedRoomId) {
			setEditableVendor((prev) => ({
				...prev,
				roomId: savedRoomId,
			}));
			setSelectedRoomId(savedRoomId); // Ensure selectedRoomId state is also updated
		}
	}, [id]);

	useEffect(() => {
		if (editableVendor.roomId) {
			localStorage.setItem(
				`vendor-${id}-roomId`,
				editableVendor.roomId
			);
		}
	}, [editableVendor.roomId, id]);

	// Function to provide a display label for a table
	const getTableLabel = (table: Table): string => {
		const tableTypeLabels: { [key: string]: string } = {
			"table-6": "6' Table",
			"table-8": "8' Table",
			"table-5": "5' Round Table",
		};
		const tableTypeLabel = tableTypeLabels[table.type] || table.type;
		return `Table ${table.tableNumber}: ${tableTypeLabel}`;
	};

	//  Filter out incomplete tables
	const validTables = tables.filter(
		(table) =>
			table.tableNumber !== undefined &&
			// table.roomName !== undefined &&
			(!selectedRoomId || table.roomId === selectedRoomId)
	);

	// const handleSave = () => {
	// 	updateVendorDetails(editableVendor);
	// 	setIsEditing(false);
	// };
	const handleSave = (updatedVendor: any) => {
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

		// Save changes
		// updateVendorDetails(editableVendor);
		updateVendorDetails(updatedVendor);
		// Update editableVendor with the new details
		setEditableVendor(updatedVendor);
		// setIsEditing(false);
		setIsModalOpen(false); // Close the modal
		setErrorMessage(null); // Clear any previous error
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type } = e.target;
		const isChecked = (e.target as HTMLInputElement).checked;

		if (name === "selectedRoomId") {
			setSelectedRoomId(value);
			const selectedRoom = rooms.find((room) => room.id === value);
			setEditableVendor((prev) => ({
				...prev,
				roomId: value,
				roomName: selectedRoom ? selectedRoom.name : "",
			}));
			setCurrentRoomName(selectedRoom ? selectedRoom.name : ""); // Update current room display
			localStorage.setItem(`vendor-${id}-roomId`, value); // Save to local storage
			updateTableAssignment("", id); // Reset table selection when room changes
		} else {
			setEditableVendor((prev) => ({
				...prev,
				[name]: type === "checkbox" ? isChecked : value,
			}));
			if (name === "signedIn") {
				// **Directly update signedIn state**
				updateVendorDetails({
					...editableVendor,
					[name]: isChecked,
				});
			}
		}
	};

	// Check if vendor details are present
	const hasDetails = vendorDetails && vendorDetails.trim() !== "";

	// Define background color based on signedIn state
	const backgroundColor = signedIn ? "bg-customBlue" : "bg-customBlue";

	// Get assigned room and table details
	const assignedRoom = rooms.find(
		(room) => room.id === editableVendor.roomId
	);
	const assignedTable = tables.find((table) => table.id === tableNumber);

	// Check if both room and table are selected
	const isRoomAndTableSelected = editableVendor.roomId && tableNumber;

	// Function to toggle the signedIn state
	const toggleSignedIn = () => {
		const newSignedInState = !signedIn;

		// Update the application state via updateVendorDetails
		updateVendorDetails({
			id,
			name: vendorName,
			products: vendorProducts,
			details: vendorDetails,
			signedIn: newSignedInState,
			electricityRequired,
			roomId,
		});
	};

	return (
		<div
			className={`card-container ${backgroundColor} text-white rounded-lg shadow-md p-4 m-4 w-72 relative`}
		>
			{isRoomAndTableSelected && (
				<div className="absolute top-2 right-2">
					<VendorSignInComponent
						signedIn={signedIn}
						onToggleSignedIn={toggleSignedIn}
						size={28}
					/>
				</div>
			)}
			{/* Conditional rendering based on isEditing state** */}
			{/* {isEditing ? (
				<>
					<div>
						<label>Vendor Name:</label>
						<input
							type="text"
							name="name"
							value={editableVendor.name}
							onChange={handleInputChange}
							// className="bg-gray-600 text-white p-2 rounded w-full"
							className={`bg-gray-600 text-white p-2 rounded w-full ${
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
						<label>Products:</label>
						<input
							type="text"
							name="products"
							value={editableVendor.products}
							onChange={handleInputChange}
							className="bg-gray-600 text-white p-2 rounded w-full"
						/>
					</div>
					<div>
						<label>Vendor Details:</label>
						<textarea
							name="details"
							value={editableVendor.details}
							onChange={handleInputChange}
							className="bg-gray-600 text-white p-2 rounded w-full"
						/>
					</div>
					<div>
						<label>
							<input
								type="checkbox"
								name="electricityRequired"
								checked={
									editableVendor.electricityRequired
								}
								onChange={handleInputChange}
								className="form-checkbox h-5 w-5 text-blue-600"
							/>
							Electricity Required
						</label>
					</div>

					<button
						onClick={handleSave}
						className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
					>
						Save
					</button>
					<button
						onClick={() => setIsEditing(false)}
						className="mt-2 bg-customRed hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
					>
						Cancel
					</button>
				</>
			) : ( */}
			<>
				<div className="flex m-2">
					Vendor:
					<div className="font-bold ml-2">{vendorName}</div>
				</div>
				<div className="m-2">Products: {vendorProducts}</div>
				<div className="flex justify-between items-center m-2">
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<span>Vendor Details:</span>
							{hasDetails && (
								<button
									onClick={toggleAccordion}
									className="focus:outline-none ml-2"
								>
									{isAccordionOpen ? (
										<FaChevronUp />
									) : (
										<FaChevronDown />
									)}
								</button>
							)}
						</div>
						<div
							className={`transition-all duration-300 ease-in-out overflow-hidden ${
								isAccordionOpen
									? "max-h-full"
									: "max-h-0"
							}`}
						>
							<span className="block mt-2">
								{vendorDetails}
							</span>
						</div>
					</div>
				</div>
				<div className="m-2">
					Electricity?: {electricityRequired ? "Yes" : "No"}
				</div>

				<div className="m-2 text-white">
					<strong>Room:</strong>
					{assignedRoom ? " " + assignedRoom.name : " None"}
				</div>
				<div className="m-2 text-white">
					<strong>Table:</strong>
					{assignedTable
						? " " + getTableLabel(assignedTable)
						: " None"}
				</div>
				<div className="flex items-center justify-end mt-6">
					<button
						// onClick={() => setIsEditing(true)}
						onClick={() => setIsModalOpen(true)} // Open the modal
						className="mt-2 bg-customBlue2 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-4 rounded"
					>
						Edit Vendor
					</button>
					<DeleteConfirmationModal
						message="Are you sure you want to delete this Vendor?"
						onConfirm={() => deleteVendor(id)}
						triggerComponent={
							<button className="bg-customRed hover:bg-red-700 text-white font-bold mt-2 py-1 px-2 rounded">
								Delete
							</button>
						}
					/>
				</div>
			</>
			{/* )} */}
			{/* Render the VendorEditModal when isModalOpen is true */}
			{isModalOpen && (
				<EditVendorModal
					vendorToEdit={editableVendor}
					onSave={handleSave}
					onClose={() => setIsModalOpen(false)}
					vendors={vendors} // Pass vendors for duplicate name checking
				/>
			)}
		</div>
	);
};

export default VendorCard;
