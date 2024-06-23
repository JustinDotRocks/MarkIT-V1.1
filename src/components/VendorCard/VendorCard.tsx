import React from "react";
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
}) => {
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

	return (
		<div className="card-container bg-gray-700 rounded-lg shadow-md p-4 m-4">
			<div>Vendor Name: {vendorName}</div>
			<div>Products: {vendorProducts}</div>
			<div>Vendor Details: {vendorDetails}</div>
			{/* <div>Table Number: {tableNumber}</div>
			<div>Room Name: {roomName}</div> */}
			<div>Signed In: {signedIn ? "Yes" : "No"}</div>
			<div>
				Electricity Required:{" "}
				{electricityRequired ? "Yes" : "No"}
			</div>

			{/* Dropdown for assigning tables */}
			<div>
				<label htmlFor={`table-${id}`}>Assign Table:</label>
				<select
					id={`table-${id}`}
					value={tableNumber}
					onChange={(e) =>
						updateTableAssignment(e.target.value, id)
					}
					className="bg-gray-600 text-white p-2 rounded w-full max-w-full box-border overflow-hidden"
				>
					<option value="">Select a table</option>
					{validTables.map((table) => (
						<option key={table.id} value={table.id}>
							{/* {`Table Number: ${table.tableNumber}`}
							- Room: {table.roomName} */}
							{getTableLabel(table)}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default VendorCard;
