import React, { useState } from "react";
import { DeleteConfirmationModalProps } from "../../Types";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
	onConfirm,
	message = "Are you sure you want to delete this item?",
	triggerComponent,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDeleteClick = () => {
		setIsModalOpen(true);
	};

	const handleConfirmDelete = () => {
		onConfirm();
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false); // Close the modal without deleting
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent the modal backdrop from triggering the delete confirmation
	};

	return (
		<>
			<div onClick={handleDeleteClick}>{triggerComponent}</div>

			{isModalOpen && (
				<div
					className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
					onClick={handleCancel} // Close modal when clicking outside of the content
				>
					<div
						className="bg-white p-6 border-2 shadow-lg rounded"
						onClick={handleModalClick} // Prevent clicks inside the modal from closing it
					>
						<p className="text-customPurple">
							{message}
						</p>
						<div className="flex justify-end mt-4">
							<button
								onClick={handleConfirmDelete}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
							>
								Delete
							</button>
							<button
								onClick={handleCancel}
								className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-2 px-4 rounded"
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

export default DeleteConfirmationModal;
