import React, { useState } from "react";
import { VendorDetails, VendorCardProps, Table } from "../../Types";

const VendorCard: React.FC<VendorCardProps> = ({
	id,
	vendorName,
	vendorProducts,
	vendorDetails,
	tableNumber,
	roomName,
	signedIn,
	electricityRequired,
	tables,
	updateTableAssignment,
	deleteVendor,
	updateVendorDetails,
}) => {
	// ADD: State to toggle edit mode
	const [isEditing, setIsEditing] = useState(false);
	// const [editedVendorName, setEditedVendorName] = useState(vendorName);
	// const [editedVendorProducts, setEditedVendorProducts] = useState(vendorProducts);
	// const [editedVendorDetails, setEditedVendorDetails] = useState(vendorDetails);
	// const [editedSignedIn, setEditedSignedIn] = useState(signedIn);
	// const [editedElectricityRequired, setEditedElectricityRequired] = useState(electricityRequired);
	const [editableVendor, setEditableVendor] = useState({
		id,
		name: vendorName,
		products: vendorProducts,
		details: vendorDetails,
		signedIn,
		electricityRequired,
		roomName: roomName,
	});

	// Function to provide a display label for a table
	const getTableLabel = (table: Table): string => {
		const tableTypeLabels: { [key: string]: string } = {
			"table-6": "6' Table",
			"table-8": "8' Table",
			"table-5": "5' Round Table",
		};
		const tableTypeLabel = tableTypeLabels[table.type] || table.type;
		return `Table Number - ${table.tableNumber} - ${tableTypeLabel} - Room: ${table.roomName}`;
	};

	//  Filter out incomplete tables
	const validTables = tables.filter(
		(table) =>
			table.tableNumber !== undefined &&
			table.roomName !== undefined
	);

	// const handleSave = () => {
	// 	// Update the vendor details in the state
	// 	const updatedVendor: VendorDetails = {
	// 	  id,
	// 	  vendorName: editedVendorName,
	// 	  vendorProducts: editedVendorProducts,
	// 	  vendorDetails: editedVendorDetails,
	// 	  tableNumber,
	// 	  roomName,
	// 	  signedIn: editedSignedIn,
	// 	  electricityRequired: editedElectricityRequired,
	// 	};

	// 	// Implement a function to update the vendor in state and local storage
	// 	updateVendorDetails(updatedVendor);
	// 	setIsEditing(false);
	//   };
	const handleSave = () => {
		// **ADDED: Call updateVendorDetails with the updated vendor details**
		updateVendorDetails(editableVendor);
		setIsEditing(false);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		const isChecked = (e.target as HTMLInputElement).checked;
		setEditableVendor((prev) => ({
			...prev,
			[name]: type === "checkbox" ? isChecked : value,
		}));
	};

	// return (
	// 	<div className="card-container bg-gray-700 rounded-lg shadow-md p-4 m-4">
	// 		<div>Vendor Name: {vendorName}</div>
	// 		<div>Products: {vendorProducts}</div>
	// 		<div>Vendor Details: {vendorDetails}</div>
	// 		{/* <div>Table Number: {tableNumber}</div>
	// 		<div>Room Name: {roomName}</div> */}
	// 		<div>Signed In: {signedIn ? "Yes" : "No"}</div>
	// 		<div>
	// 			Electricity Required:
	// 			{electricityRequired ? "Yes" : "No"}
	// 		</div>

	// 		{/* Dropdown for assigning tables */}
	// 		<div>
	// 			<label htmlFor={`table-${id}`}>Assign Table:</label>
	// 			<select
	// 				id={`table-${id}`}
	// 				value={tableNumber}
	// 				onChange={(e) =>
	// 					updateTableAssignment(e.target.value, id)
	// 				}
	// 				className="bg-gray-600 text-white p-2 rounded w-full max-w-full box-border overflow-hidden"
	// 			>
	// 				<option value="">Select a table</option>
	// 				{validTables.map((table) => (
	// 					<option key={table.id} value={table.id}>
	// 						{/* {`Table Number: ${table.tableNumber}`}
	// 						- Room: {table.roomName} */}
	// 						{getTableLabel(table)}
	// 					</option>
	// 				))}
	// 			</select>
	// 		</div>
	// 		{/* ADDED: Delete Vendor Button */}
	// 		<button
	// 			onClick={() => deleteVendor(id)}
	// 			className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
	// 		>
	// 			Delete Vendor
	// 		</button>
	// 	</div>
	// );

	return (
		<div className="card-container bg-gray-700 rounded-lg shadow-md p-4 m-4">
			{/* **ADDED: Conditional rendering based on isEditing state** */}
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
								name="signedIn"
								checked={
									editableVendor.signedIn
								}
								onChange={handleInputChange}
								className="form-checkbox h-5 w-5 text-blue-600"
							/>
							Signed In
						</label>
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
					<div>Vendor Details: {vendorDetails}</div>
					<div>Signed In: {signedIn ? "Yes" : "No"}</div>
					<div>
						Electricity Required:{" "}
						{electricityRequired ? "Yes" : "No"}
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
					<button
						onClick={() => deleteVendor(id)}
						className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
					>
						Delete Vendor
					</button>
					{/* **ADDED: Edit Vendor Button** */}
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
