import React, { useState, useRef, useEffect } from "react";
import { AddTablesModalProps } from "../../Types";
import { handleClickOutside } from "../../utils/functions";
import { MdTableRestaurant } from "react-icons/md";

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

	useEffect(() => {
		if (isAddTablesModalOpen) {
			const outsideClickHandler = handleClickOutside(modalRef, () =>
				setIsAddTablesModalOpen(false)
			);
			document.addEventListener("mousedown", outsideClickHandler);
			return () => {
				document.removeEventListener(
					"mousedown",
					outsideClickHandler
				);
			};
		}
	}, [isAddTablesModalOpen, modalRef]);

	return (
		<>
			{selectedRoomId && (
				<button
					onClick={() => setIsAddTablesModalOpen(true)}
					className="bg-customGreen hover:bg-customGreenDark text-white font-bold py-1 px-2 rounded mr-2"
				>
					<MdTableRestaurant />
				</button>
			)}
			{isAddTablesModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div
						ref={modalRef}
						className="bg-white p-4 border-2 rounded shadow-lg w-full max-w-md sm:w-1/2 md:w-1/4"
					>
						<h2 className="text-xl font-bold text-customPurple mb-4">
							Add Table
						</h2>
						<div className="flex flex-col items-center">
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
								className="w-3/4 p-1 mb-4 rounded bg-gray-100 text-customPurple placeholder-customPurple"
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
										parseInt(
											e.target.value
										)
									)
								}
								min={1}
								placeholder="Quantity"
								className="w-3/4 p-1 mb-4 rounded bg-gray-100 text-customPurple placeholder-customPurple"
							/>
							<div className="flex justify-end">
								<button
									onClick={
										handleAddTableClick
									}
									className="bg-customPurple hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
								>
									Add Table
								</button>
								<button
									onClick={() =>
										setIsAddTablesModalOpen(
											false
										)
									}
									className="bg-customPurple hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddTablesModal;
