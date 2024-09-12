// import React from "react";
// import { FaLock, FaUnlock, FaUndo, FaRedo } from "react-icons/fa"; // Importing icons
// import { OptionsBarProps } from "../Types";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";

// const OptionsBar: React.FC<OptionsBarProps> = ({
// 	x,
// 	y,
// 	onDelete,
// 	onRotateCW,
// 	onRotateCCW,
// 	onToggleLock,
// 	isLocked,
// 	vendorName,
// 	onAddVendor,
// 	onRemoveVendor,
// 	objectType,
// 	// canvasWidth,
// 	// canvasHeight,
// }) => {
// 	// Define the width and height of the OptionsBar
// 	const optionsBarWidth = 400;
// 	const optionsBarHeight = 50;
// 	const margin = 5; // Margin between the object and the OptionsBar

// 	// Position directly below the object with the specified margin
// 	let adjustedX = x - optionsBarWidth / 2; // Center horizontally
// 	let adjustedY = y + margin; // Place below the object with a margin

// 	// // Ensure the OptionsBar stays within the horizontal boundaries of the canvas
// 	// if (adjustedX < 10) {
// 	// 	adjustedX = 10; // Add small padding from the left edge
// 	// } else if (adjustedX + optionsBarWidth > canvasWidth) {
// 	// 	adjustedX = canvasWidth - optionsBarWidth - 10; // Add small padding from the right edge
// 	// }

// 	// // Ensure the OptionsBar stays within the vertical boundaries of the canvas
// 	// if (adjustedY + optionsBarHeight > canvasHeight) {
// 	// 	// If it's too close to the bottom, position it above the object
// 	// 	adjustedY = y - optionsBarHeight - margin; // Position above with margin
// 	// }

// 	return (
// 		<div
// 			className="absolute flex flex-col items-center bg-gray-800 border border-black rounded p-2"
// 			style={{
// 				left: adjustedX,
// 				top: adjustedY,
// 				zIndex: 50,
// 				width: optionsBarWidth,
// 				height: optionsBarHeight,
// 			}}
// 		>
// 			{/* Vendor Name */}
// 			{vendorName && (
// 				<div className="text-white text-center mb-1">
// 					<p>{vendorName}</p>
// 				</div>
// 			)}
// 			{/* Buttons Row */}

// 			<div className="flex items-center flex-row space-x-2"></div>
// 			{/* Rotate Counter-Clockwise Button */}
// 			<button
// 				onClick={onRotateCCW}
// 				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
// 			>
// 				<FaUndo className="mr-1" />
// 			</button>
// 			{/* Rotate Clockwise Button */}

// 			<button
// 				onClick={onRotateCW}
// 				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
// 			>
// 				<FaRedo className="mr-1" />
// 			</button>
// 			<button
// 				onClick={onToggleLock}
// 				className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 m-1 rounded flex items-center"
// 			>
// 				{isLocked ? <FaLock /> : <FaUnlock />}
// 				{/* {isLocked ? "Unlock" : "Lock"} */}
// 			</button>
// 			{objectType === "table" && (
// 				<>
// 					{vendorName ? (
// 						<button
// 							onClick={onRemoveVendor}
// 							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 m-1 rounded"
// 						>
// 							Remove Vendor
// 						</button>
// 					) : (
// 						<button
// 							onClick={onAddVendor}
// 							className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 m-1 rounded"
// 						>
// 							Add Vendor
// 						</button>
// 					)}
// 				</>
// 			)}
// 			<DeleteConfirmationModal
// 				message="Are you sure you want to delete this item?"
// 				onConfirm={onDelete}
// 				triggerComponent={
// 					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
// 						Delete
// 					</button>
// 				}
// 			/>
// 		</div>
// 	);
// };

// export default OptionsBar;

import React from "react";
import { FaLock, FaUnlock, FaUndo, FaRedo } from "react-icons/fa"; // Importing icons
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
	// Define the width and height of the OptionsBar
	const optionsBarWidth = 400;
	const optionsBarHeight = 80; // Adjust height to accommodate vendor name
	const margin = 5; // Margin between the object and the OptionsBar

	// Position directly below the object with the specified margin
	let adjustedX = x - optionsBarWidth / 2; // Center horizontally
	let adjustedY = y + margin; // Place below the object with a margin

	return (
		<div
			className="absolute flex flex-col bg-gray-800 border border-black rounded p-2"
			style={{
				left: adjustedX,
				top: adjustedY,
				zIndex: 50,
				width: optionsBarWidth,
				height: optionsBarHeight,
			}}
		>
			{/* Vendor Name */}
			{vendorName && (
				<div className="text-white text-center mb-1">
					<p>{vendorName}</p>
				</div>
			)}

			{/* Buttons Row */}
			<div className="flex flex-row items-center justify-center space-x-2">
				{/* Rotate Counter-Clockwise Button */}
				<button
					onClick={onRotateCCW}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
				>
					<FaUndo className="mr-1" />
				</button>
				{/* Rotate Clockwise Button */}
				<button
					onClick={onRotateCW}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
				>
					<FaRedo className="mr-1" />
				</button>

				{/* Lock/Unlock Button */}
				<button
					onClick={onToggleLock}
					className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 m-1 rounded flex items-center"
				>
					{isLocked ? <FaUnlock /> : <FaLock />}
				</button>

				{/* Vendor Buttons */}
				{objectType === "table" && (
					<>
						{vendorName ? (
							<button
								onClick={onRemoveVendor}
								className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 m-1 rounded"
							>
								Remove Vendor
							</button>
						) : (
							<button
								onClick={onAddVendor}
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 m-1 rounded"
							>
								Add Vendor
							</button>
						)}
					</>
				)}

				{/* Delete Button */}
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
		</div>
	);
};

export default OptionsBar;
