import React, { useState } from "react";
import { DeleteConfirmationModalProps } from "../Types";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
	// isOpen,
	// onClose,
	onConfirm,
	message = "Are you sure you want to delete this item?",
	triggerComponent,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDeleteClick = () => {
		setIsModalOpen(true);
	};

	const handleConfirmDelete = () => {
		onConfirm(); // Call the onConfirm function passed as a prop
		setIsModalOpen(false); // Close the modal after confirming
	};

	const handleCancel = () => {
		setIsModalOpen(false); // Close the modal without deleting
	};

	// if (!isOpen) return null;

	// return (
	// 	<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
	// 		<div className="bg-gray-800 p-8 rounded shadow-lg w-3/4">
	// 			<h2 className="text-xl font-bold text-white mb-4">
	// 				Confirm Delete
	// 			</h2>
	// 			<p className="text-white mb-8">{message}</p>
	// 			<div className="flex justify-end">
	// 				<button
	// 					onClick={onConfirm}
	// 					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
	// 				>
	// 					Delete
	// 				</button>
	// 				<button
	// 					onClick={onClose}
	// 					className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
	// 				>
	// 					Cancel
	// 				</button>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	return (
		<>
			<div onClick={handleDeleteClick}>{triggerComponent}</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg">
						<p className="text-black">{message}</p>
						<div className="flex justify-end mt-4">
							<button
								onClick={handleConfirmDelete}
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
							>
								Delete
							</button>
							<button
								onClick={handleCancel}
								className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
