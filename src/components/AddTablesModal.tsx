import React, { useState } from "react";
import { AddTablesModalProps } from "../Types";

const AddTablesModal: React.FC<AddTablesModalProps> = ({
	isOpen,
	onClose,
	addTable,
}) => {
	const [tableType, setTableType] = useState<
		"table-6" | "table-8" | "table-5"
	>("table-6");

	// Generate an ID and details (if necessary) before calling addTableToCanvas
	const handleAddTableClick = () => {
		const id = Date.now().toString();
		const details = "";
		addTable({ type: tableType, id, details });
		onClose();
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
