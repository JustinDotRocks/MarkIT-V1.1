import React from "react";
import { ClearAllTablesButtonProps, Table } from "../Types";

const ClearAllTablesButton: React.FC<ClearAllTablesButtonProps> = ({
	tables,
	setTables,
	selectedRoomId,
}) => {
	// const handleClearTables = () => {
	// 	// Filter out tables that belong to the selected room
	// 	const updatedTables = tables.filter(
	// 		(table) => table.roomId !== selectedRoomId
	// 	);
	// 	// Update the state with the remaining tables
	// 	setTables(updatedTables);
	// };
	const handleClearTables = () => {
		if (selectedRoomId) {
			const filteredTables = tables.filter(
				(table) => table.roomId !== selectedRoomId
			);
			setTables(filteredTables);
		}
	};

	return (
		<button
			onClick={handleClearTables}
			className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
		>
			Clear All Tables
		</button>
	);
};

export default ClearAllTablesButton;
