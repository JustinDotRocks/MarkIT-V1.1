import React, { useState } from "react";
import { ClearAllTablesButtonProps, Table } from "../Types";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const ClearAllTablesButton: React.FC<ClearAllTablesButtonProps> = ({
	tables,
	setTables,
	selectedRoomId,
}) => {
	const [, setIsModalOpen] = useState(false);
	const closeModal = () => setIsModalOpen(false);

	const handleClearTables = () => {
		if (selectedRoomId) {
			const filteredTables = tables.filter(
				(table) => table.roomId !== selectedRoomId
			);
			setTables(filteredTables);
		}
		closeModal();
	};

	return (
		<DeleteConfirmationModal
			message="Are you sure you want to delete this item?"
			onConfirm={handleClearTables}
			triggerComponent={
				<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
					Clear All Tables
				</button>
			}
		/>
	);
};

export default ClearAllTablesButton;
