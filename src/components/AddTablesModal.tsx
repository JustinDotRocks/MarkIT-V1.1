import React, { useState, useRef, useEffect } from "react";
import { AddTablesModalProps } from "../Types";

const AddTablesModal: React.FC<AddTablesModalProps> = ({
	addTable,
	tables,
	selectedRoomId,
}) => {
	const [isAddTablesModalOpen, setIsAddTablesModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const [tableType, setTableType] = useState<
		"table-6" | "table-8" | "table-5"
	>("table-6");
	const [quantity, setQuantity] = useState<number>(1);

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

		setIsAddTablesModalOpen(false); // Close the modal after adding tables
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			setIsAddTablesModalOpen(false);
		}
	};

	useEffect(() => {
		if (isAddTablesModalOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isAddTablesModalOpen]);

	return (
		<>
			{selectedRoomId && (
				<button
					onClick={() => setIsAddTablesModalOpen(true)}
					className="bg-customBlue2 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
				>
					Add Tables
				</button>
			)}
			{isAddTablesModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div
						ref={modalRef}
						className="bg-gray-800 p-8 rounded shadow-lg w-1/3"
					>
						<h2 className="text-xl font-bold text-white mb-4">
							Add Table
						</h2>
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
							<option value="table-6">
								6-Foot Table
							</option>
							<option value="table-8">
								8-Foot Table
							</option>
							<option value="table-5">
								5-Foot Round Table
							</option>
						</select>
						<input
							type="number"
							value={quantity}
							onChange={(e) =>
								setQuantity(
									parseInt(e.target.value)
								)
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
								onClick={() =>
									setIsAddTablesModalOpen(
										false
									)
								}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddTablesModal;
