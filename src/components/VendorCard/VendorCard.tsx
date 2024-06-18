import React from "react";
import { VendorDetails, VendorCardProps, Table } from "../../Types";

// const VendorCard: React.FC<VendorCardProps> = ({
// 	id,
// 	vendorName,
// 	vendorProducts,
// 	vendorDetails,
// 	tableNumber,
// 	roomName,
// 	signedIn,
// 	electricityRequired,
// 	tables,
// 	updateTableAssignment,
// }) => {

// 	return (
// 		<div className="card-container bg-gray-700 rounded-lg shadow-md p-4 m-4">
// 			<div>Vendor Name: {vendorName}</div>
// 			<div>Products: {vendorProducts}</div>
// 			<div>Vendor Details: {vendorDetails}</div>
// 			<div>Table Number: {tableNumber}</div>
// 			<div>Room Name: {roomName}</div>
// 			<div>Signed In: {signedIn ? "Yes" : "No"}</div>
// 			<div>
// 				Electricity Required:{" "}
// 				{electricityRequired ? "Yes" : "No"}
// 			</div>
// 			<div>
// 				<label htmlFor={`table-select-${id}`}>
// 					Assign Table:
// 				</label>
// 				<select
// 					id={`table-select-${id}`}
// 					value={tableNumber}
// 					onChange={(e) =>
// 						updateTableAssignment(e.target.value, id)
// 					}
// 					className="w-full p-2 rounded bg-gray-700 text-white mt-2"
// 				>
// 					<option value="">Select Table</option>
// 					{tables.map((table) => (
// 						<option key={table.id} value={table.id}>
// 							{table.type} - Room: {table.roomId}
// 						</option>
// 					))}
// 				</select>
// 			</div>
// 		</div>
// 	);
// };
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
	const getRoomName = (roomId: string) => {
		const room = tables.find((table) => table.roomId === roomId);
		return room ? room.roomName : "Unknown Room";
	};

	return (
		<div className="card-container bg-gray-700 rounded-lg shadow-md p-4 m-4">
			<div>Vendor Name: {vendorName}</div>
			<div>Products: {vendorProducts}</div>
			<div>Vendor Details: {vendorDetails}</div>
			<div>Table Number: {tableNumber}</div>
			<div>Room Name: {roomName}</div>
			<div>Signed In: {signedIn ? "Yes" : "No"}</div>
			<div>
				Electricity Required:{" "}
				{electricityRequired ? "Yes" : "No"}
			</div>

			<select
				value={tableNumber}
				onChange={(e) =>
					updateTableAssignment(e.target.value, id)
				}
				className="w-full p-2 rounded bg-gray-700 text-white mt-2"
			>
				<option value="" disabled>
					Select a table
				</option>
				{tables.map((table) => (
					<option key={table.id} value={table.id}>
						Table Number: {table.tableNumber} - Room:{" "}
						{getRoomName(table.roomId)}
					</option>
				))}
			</select>
		</div>
	);
};

export default VendorCard;
