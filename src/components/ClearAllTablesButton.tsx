import React, { useState } from "react";
import { ClearAllTablesButtonProps } from "../Types";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import { MdTableRestaurant } from "react-icons/md";

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
				<button className="flex items-center bg-red-500 hover:bg-customPurpleLight text-white font-bold py-0 px-2 rounded">
					Remove <MdTableRestaurant className="ml-1" />
				</button>
			}
		/>
	);
};

export default ClearAllTablesButton;
