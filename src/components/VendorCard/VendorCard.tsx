import React, { useState, useEffect } from "react";
import { VendorCardProps, Table } from "../../Types";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

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
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
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
		return `Table Number - ${table.tableNumber} - ${tableTypeLabel} `;
	};

	//  Filter out incomplete tables
	const validTables = tables.filter(
		(table) =>
			table.tableNumber !== undefined &&
			// table.roomName !== undefined &&
			(!selectedRoomId || table.roomId === selectedRoomId)
	);

	const handleSave = () => {
		updateVendorDetails(editableVendor);
		setIsEditing(false);
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

	return (
		<div className="card-container bg-gray-700 text-white rounded-lg shadow-md p-4 m-4 w-72">
			{/* Conditional rendering based on isEditing state** */}
			{isEditing ? (
				<>
					<div>
						<label>Vendor Name:</label>
						<input
							type="text"
							name="name"
							value={editableVendor.name}
							onChange={handleInputChange}
							className="bg-gray-600 text-white p-2 rounded w-full"
						/>
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
						className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
					>
						Cancel
					</button>
				</>
			) : (
				<>
					<div>Vendor Name: {vendorName}</div>
					<div>Products: {vendorProducts}</div>
					{/* <div className="flex justify-between items-center m-3 overflow-hidden">
						<div className="flex-1">
							Vendor Details:
							{isAccordionOpen
								? vendorDetails
								: truncateText(
										vendorDetails,
										20
								  )}
						</div>
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
					</div> */}
					<div className="flex justify-between items-center m-3">
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<span>Vendor Details:</span>
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

					<div>
						Electricity Required:{" "}
						{electricityRequired ? "Yes" : "No"}
					</div>

					<div className="mb-2">
						<label className="block text-white">
							Select Room:
						</label>
						<select
							name="selectedRoomId"
							value={selectedRoomId || ""}
							onChange={handleInputChange}
							className="w-full p-2 rounded bg-gray-700 text-white"
						>
							<option value="">
								Select a room
							</option>
							{rooms.map((room) => (
								<option
									key={room.id}
									value={room.id}
								>
									{room.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor={`table-${id}`}>
							Assign Table:
						</label>
						<select
							id={`table-${id}`}
							value={tableNumber}
							onChange={(e) =>
								updateTableAssignment(
									e.target.value,
									id
								)
							}
							className="bg-gray-600 text-white p-2 rounded w-full max-w-full box-border overflow-hidden"
							disabled={!selectedRoomId}
						>
							<option value="">
								Select a table
							</option>
							{validTables.map((table) => (
								<option
									key={table.id}
									value={table.id}
								>
									{getTableLabel(table)}
								</option>
							))}
						</select>
					</div>
					<div>
						<label>
							Signed In: {signedIn ? "Yes" : "No"}
							<input
								type="checkbox"
								name="signedIn"
								checked={
									editableVendor.signedIn
								}
								onChange={handleInputChange}
								className="form-checkbox h-5 w-5 text-blue-600"
							/>
						</label>
					</div>
					<button
						onClick={() => deleteVendor(id)}
						className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
					>
						Delete Vendor
					</button>
					<button
						onClick={() => setIsEditing(true)}
						className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
					>
						Edit Vendor
					</button>
				</>
			)}
		</div>
	);
};

export default VendorCard;
