import React, { useState } from "react";
import { AddTablesModalProps } from "../Types";

const AddTablesModal: React.FC<AddTablesModalProps> = ({
	isOpen,
	onClose,
	addTable,
	tables,
	selectedRoomId,
}) => {
	const [tableType, setTableType] = useState<
		"table-6" | "table-8" | "table-5"
	>("table-6");
	const [quantity, setQuantity] = useState<number>(1); // New state for quantity

	// const handleAddTableClick = () => {
	//     const baseId = Date.now().toString(); // Base ID for unique identification
	//     const details = ""; // Optional: Add any details if needed

	//     for (let i = 0; i < quantity; i++) {
	//         const id = `${baseId}-${i}`; // Generate unique ID for each table
	//         const existingTables = tables.filter(
	//             (table) => table.roomId === selectedRoomId
	//         );
	//         const nextTableNumber = existingTables.length + i + 1; // Calculate unique table number
	//         addTable({ type: tableType, id, details, tableNumber: nextTableNumber });
	//     }

	//     onClose(); // Close the modal after adding tables
	// };

	// const handleAddTableClick = () => {
	// 	if (!selectedRoomId) return;

	// 	const baseId = Date.now().toString(); // Base ID for unique identification
	// 	const details = ""; // Optional: Add any details if needed

	// 	// Get the existing tables for the selected room
	// 	const existingTables = tables.filter(
	// 		(table) => table.roomId === selectedRoomId
	// 	);

	// 	for (let i = 0; i < quantity; i++) {
	// 		const id = `${baseId}-${i}`;
	// 		const nextTableNumber = existingTables.length + i + 1; // Calculate unique table number
	// 		addTable({
	// 			type: tableType,
	// 			id,
	// 			details,
	// 			tableNumber: nextTableNumber,
	// 		});
	// 	}

	// 	onClose(); // Close the modal after adding tables
	// };
	const handleAddTableClick = () => {
		if (!selectedRoomId) return;

		const baseId = Date.now().toString(); // Base ID for unique identification
		const details = ""; // Optional: Add any details if needed

		// Get the existing tables for the selected room
		const existingTables = tables.filter(
			(table) => table.roomId === selectedRoomId
		);

		for (let i = 0; i < quantity; i++) {
			const id = `${baseId}-${i}`;
			const nextTableNumber = existingTables.length + i + 1; // Calculate unique table number
			addTable({
				type: tableType,
				id,
				details,
				tableNumber: nextTableNumber,
			});
		}

		onClose(); // Close the modal after adding tables
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-gray-800 p-8 rounded shadow-lg w-1/3">
				<h2 className="text-xl font-bold mb-4">Add Table</h2>
				<select
					value={tableType}
					onChange={(e) =>
						setTableType(
							e.target.value as
								| "table-6"
								| "table-8"
								| "table-5"
						)
					}
					className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
				>
					<option value="table-6">6-Seat Table</option>
					<option value="table-8">8-Seat Table</option>
					<option value="table-5">5-Seat Table</option>
				</select>
				<input
					type="number"
					value={quantity}
					onChange={(e) =>
						setQuantity(parseInt(e.target.value))
					}
					min={1}
					placeholder="Quantity"
					className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
				/>
				<div className="flex justify-end">
					<button
						onClick={handleAddTableClick}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					>
						Add Table
					</button>
					<button
						onClick={onClose}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTablesModal;
