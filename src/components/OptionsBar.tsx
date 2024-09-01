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
	canvasWidth,
	canvasHeight,
}) => {
	// Define canvas or container size (you can pass this as a prop if needed)
	// const canvasWidth = window.innerWidth * 0.9; // Example: 90% of the window width
	// const canvasHeight = window.innerHeight * 0.9; // Example: 90% of the window height

	// Calculate the width of the OptionsBar for positioning
	const optionsBarWidth = 400;
	const optionsBarHeight = 100;

	// Adjust position if near the edge
	let adjustedX = x;
	let adjustedY = y;

	// // Check if the OptionsBar would go off the left edge
	// if (x - optionsBarWidth / 2 < 0) {
	// 	adjustedX = optionsBarWidth / 2;
	// }
	// // Check if the OptionsBar would go off the right edge
	// else if (x + optionsBarWidth / 2 > canvasWidth) {
	// 	adjustedX = canvasWidth - optionsBarWidth / 2;
	// }

	// // Check if the OptionsBar would go off the top edge of the canvas
	// if (y - optionsBarHeight < 0) {
	// 	adjustedY = optionsBarHeight; // Move it below the object
	// }
	// // Check if the OptionsBar would go off the bottom edge of the canvas
	// else if (y + optionsBarHeight / 2 > canvasHeight) {
	// 	adjustedY = canvasHeight - optionsBarHeight / 2;
	// }

	// Center the OptionsBar above the object
	adjustedX = x - optionsBarWidth / 2;
	adjustedY = y - optionsBarHeight;

	// Ensure the OptionsBar remains within the canvas boundaries
	// if (adjustedX < 0) adjustedX = 0; // Left boundary
	// if (adjustedX + optionsBarWidth > window.innerWidth)
	// 	adjustedX = window.innerWidth - optionsBarWidth; // Right boundary
	// if (adjustedY < 0) adjustedY = y + 20; // If above the top, move it below the object
	// if (adjustedY + optionsBarHeight > window.innerHeight)
	// 	adjustedY = window.innerHeight - optionsBarHeight; // Bottom boundary
	// Ensure the OptionsBar stays within the left boundary
	if (adjustedX < 10) {
		adjustedX = 10; // Add small padding from the left edge
	} else if (adjustedX + optionsBarWidth > canvasWidth) {
		// Ensure the OptionsBar stays within the right boundary
		adjustedX = canvasWidth - optionsBarWidth - 10; // Add small padding from the right edge
	}

	// Ensure the OptionsBar stays within the top boundary
	if (adjustedY < 10) {
		adjustedY = y + 200; // Position below the object if it goes above the top
	} else if (adjustedY + optionsBarHeight > canvasHeight) {
		// Ensure the OptionsBar stays within the bottom boundary
		adjustedY = canvasHeight - optionsBarHeight + 100; // Add small padding from the bottom edge
	}

	return (
		<div
			className="relative bg-white border border-black rounded p-2"
			style={{
				left: adjustedX + 200,
				top: adjustedY - 675,
				zIndex: 50,
				width: optionsBarWidth,
				height: optionsBarHeight,
				transform: "translate(-50%, -100%)", // Center it horizontally and move it above
			}}
		>
			<p>{vendorName}</p>
			<div className="flex items-center justify-start">
				<DeleteConfirmationModal
					message="Are you sure you want to delete this item?"
					onConfirm={onDelete}
					triggerComponent={
						<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
							Delete
						</button>
					}
				/>
			</div>
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
