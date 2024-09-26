import React from "react";
import { FaLock, FaUnlock, FaUndo, FaRedo } from "react-icons/fa"; // Importing icons
import { OptionsBarProps } from "../Types";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import VendorSignInComponent from "./VendorSignInComponent";

const OptionsBar: React.FC<OptionsBarProps> = ({
	x,
	y,
	// height,
	onDelete,
	onRotateCW,
	onRotateCCW,
	onToggleLock,
	isLocked,
	vendorName,
	onAddVendor,
	onRemoveVendor,
	objectType,
	vendorId,
	updateVendorDetails,
	signedIn,
	// stageRotation,
	// isMobile,
}) => {
	// Define the width and height of the OptionsBar
	const optionsBarWidth = 400;
	const optionsBarHeight = 100; // Adjust height to accommodate vendor name
	const margin = 5; // Margin between the object and the OptionsBar

	// Position directly below the object with the specified margin
	let adjustedX = x - optionsBarWidth / 2; // Center horizontally
	let adjustedY = y + margin; // Place below the object with a margin

	// Ensure the OptionsBar stays within the viewport
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	// Adjust X to keep the OptionsBar within the viewport
	adjustedX = Math.max(
		0,
		Math.min(adjustedX, viewportWidth - optionsBarWidth)
	);

	// Adjust Y if the OptionsBar goes off the bottom of the viewport
	if (adjustedY + optionsBarHeight > viewportHeight) {
		// Place the OptionsBar above the object if it would go off-screen
		adjustedY = y - optionsBarHeight - margin;
		if (adjustedY < 0) {
			adjustedY = viewportHeight / 2 - optionsBarHeight / 2; // Center vertically if necessary
		}
	}

	// Function to handle signedIn state change
	const toggleSignedIn = () => {
		if (!vendorId || !updateVendorDetails) return;

		const newSignedInState = !signedIn;

		// Update the vendor's signedIn status
		updateVendorDetails({
			id: vendorId,
			signedIn: newSignedInState,
		});
	};

	// const optionsBarRotation = isMobile ? stageRotation - 90 : 0;

	return (
		<div
			className=" flex flex-col justify-center text-md bg-customBlue border border-black rounded p-2"
			style={{
				// left: adjustedX,
				// top: adjustedY,
				// zIndex: 50,
				width: optionsBarWidth,
				height: optionsBarHeight,
				// transform: `rotate(${optionsBarRotation}deg)`,
			}}
		>
			{/* Vendor Name */}
			{vendorName && (
				<div className="flex justify-between items-center text-white mb-1">
					<p className="text-center text-lg flex-grow text-bold">
						{vendorName}
					</p>
					{/* Sign-In Button */}
					<div className="	 ">
						<VendorSignInComponent
							signedIn={signedIn || false}
							onToggleSignedIn={toggleSignedIn}
							size={28}
						/>
					</div>
				</div>
			)}

			{/* Buttons Row */}
			<div className="flex flex-row items-center justify-center space-x-2">
				{/* Rotate Counter-Clockwise Button */}
				<button
					onClick={onRotateCCW}
					className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
				>
					<FaUndo className="mr-1" />
				</button>
				{/* Rotate Clockwise Button */}
				<button
					onClick={onRotateCW}
					className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
				>
					<FaRedo className="mr-1" />
				</button>

				{/* Lock/Unlock Button */}
				<button
					onClick={onToggleLock}
					className="bg-customBlue2 hover:bg-gray-700 text-white font-bold py-2 px-4 m-1 rounded flex items-center"
				>
					{isLocked ? <FaUnlock /> : <FaLock />}
				</button>

				{/* Vendor Buttons */}
				{objectType === "table" && (
					<>
						{vendorName ? (
							<button
								onClick={onRemoveVendor}
								className="bg-customBlue2 hover:bg-yellow-700 text-white font-bold py-1 px-2 m-1 rounded"
							>
								Unasign
							</button>
						) : (
							<button
								onClick={onAddVendor}
								className="bg-customBlue2 hover:bg-green-700 text-white font-bold py-1 px-2 m-1 rounded"
							>
								Asign
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
