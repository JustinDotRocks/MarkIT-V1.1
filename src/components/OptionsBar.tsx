import React from "react";
import { OptionsBarProps } from "../Types";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const OptionsBar: React.FC<OptionsBarProps> = ({
	x,
	y,
	onDelete,
	onRotateCW,
	onRotateCCW,
	onToggleLock,
	isLocked,
	vendorName,
	onAddVendor,
	onRemoveVendor,
	objectType,
}) => {
	return (
		<div
			className="absolute bg-white border border-black rounded p-2"
			style={{
				left: x,
				top: y - 10,
				zIndex: 50,
				transform: "translate(-50%, -100%)", // Center it horizontally and move it above
			}}
		>
			<p>{vendorName}</p>
			{/* <button
				// onClick={onDelete}
				onClick={handleDeleteClick} // Open the confirmation modal
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
			>
				Delete
			</button> */}
			<DeleteConfirmationModal
				message="Are you sure you want to delete this item?"
				onConfirm={onDelete}
				triggerComponent={
					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
						Delete
					</button>
				}
			/>
			<button
				onClick={onRotateCCW}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				Rotate CCW
			</button>
			<button
				onClick={onRotateCW}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				Rotate CW
			</button>
			<button
				onClick={onToggleLock}
				className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
			>
				{isLocked ? "Unlock" : "Lock"}
			</button>
			{objectType === "table" && (
				<>
					{vendorName ? (
						<button
							onClick={onRemoveVendor}
							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 mr-2 rounded"
						>
							Remove Vendor
						</button>
					) : (
						<button
							onClick={onAddVendor}
							className="bg-green-500 hover:bg-yellgreenow-700 text-white font-bold py-1 px-2 mr-2 rounded"
						>
							Add Vendor
						</button>
					)}
				</>
			)}
			{/* <DeleteConfirmationModal
				isOpen={isModalOpen}
				onClose={handleCancel}
				onConfirm={handleConfirmDelete}
				message="Are you sure you want to delete this item?"
			/> */}
		</div>
	);
};

export default OptionsBar;
