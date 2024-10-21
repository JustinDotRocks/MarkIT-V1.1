import React, { useState, useEffect } from "react";
import { VendorCardProps, Table, Vendor } from "../Types";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import VendorSignInComponent from "./VendorSignInComponent";
import EditVendorModal from "./Modals/EditVendorModal";

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
	deleteVendor,
	updateVendorDetails,
	vendors,
}) => {
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
	const [, setSelectedRoomId] = useState<string | "">(roomId);
	const [, setErrorMessage] = useState<string | null>(null); // Error message for duplicate name

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

	const handleSave = (updatedVendor: Vendor) => {
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
		updateVendorDetails(updatedVendor);
		// Update editableVendor with the new details
		setEditableVendor(updatedVendor);
		setIsModalOpen(false); // Close the modal
		setErrorMessage(null); // Clear any previous error
	};

	// Check if vendor details are present
	const hasDetails = vendorDetails && vendorDetails.trim() !== "";

	// Define background color based on signedIn state
	const backgroundColor = signedIn ? "bg-white" : "bg-white";

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
			className={`card-container ${backgroundColor} text-customPurple border-2 rounded-lg shadow-xl p-4 m-4 w-72 relative`}
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
			<>
				<div className="flex font-bold m-2">
					Vendor:
					<div className=" ml-2">{vendorName}</div>
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

				<div className="m-2 text-customPurple">
					<strong>Room:</strong>
					{assignedRoom ? " " + assignedRoom.name : " None"}
				</div>
				<div className="m-2 text-customPurple">
					<strong>Table:</strong>
					{assignedTable
						? " " + getTableLabel(assignedTable)
						: " None"}
				</div>
				<div className="flex items-center justify-end mt-6">
					<button
						onClick={() => setIsModalOpen(true)}
						className="mt-2 bg-customPurple hover:bg-customPurpleLight text-white font-bold py-1 px-2 mr-4 rounded"
					>
						Edit Vendor
					</button>
					<DeleteConfirmationModal
						message="Are you sure you want to delete this Vendor?"
						onConfirm={() => deleteVendor(id)}
						triggerComponent={
							<button className="bg-customRed hover:bg-red-900 text-white font-bold mt-2 py-1 px-2 rounded">
								Delete
							</button>
						}
					/>
				</div>
			</>
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
