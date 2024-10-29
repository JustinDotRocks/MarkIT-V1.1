import React from "react";
import { FaLock, FaUnlock, FaUndo, FaRedo } from "react-icons/fa";
import { OptionsBarProps } from "../Types";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import VendorSignInComponent from "./VendorSignInComponent";

const OptionsBar: React.FC<OptionsBarProps> = ({
	// x,
	// y,
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
	vendors,
}) => {
	// Function to handle signedIn state change
	const toggleSignedIn = () => {
		if (!vendorId || !updateVendorDetails) return;

		const newSignedInState = !signedIn;

		// Find the vendor with the given id
		const vendor = vendors.find((v) => v.id === vendorId);

		if (!vendor) {
			console.error(`Vendor with id ${vendorId} not found`);
			return;
		}

		// Update the vendor's signedIn status
		updateVendorDetails({
			...vendor, // Spread the existing vendor properties
			signedIn: newSignedInState,
		});
	};

	return (
		<div className=" flex flex-col justify-center text-md bg-white border border-customPurple rounded p-2">
			{/* Vendor Name */}
			{vendorName && (
				<div className="flex justify-between items-center text-customPurple mb-1">
					<p className="text-center text-lg flex-grow text-bold">
						{vendorName}
					</p>
					{/* Sign-In Button */}
					<div className="">
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
					className="bg-customPurple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
				>
					<FaUndo className="mr-1" />
				</button>
				{/* Rotate Clockwise Button */}
				<button
					onClick={onRotateCW}
					className="bg-customPurple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
				>
					<FaRedo className="mr-1" />
				</button>

				{/* Lock/Unlock Button */}
				<button
					onClick={onToggleLock}
					className="bg-customPurple hover:bg-gray-700 text-white font-bold py-2 px-4 m-1 rounded flex items-center"
				>
					{isLocked ? <FaUnlock /> : <FaLock />}
				</button>

				{/* Vendor Buttons */}
				{objectType === "table" && (
					<>
						{vendorName ? (
							<button
								onClick={onRemoveVendor}
								className="bg-customYellow hover:bg-yellow-700 text-white font-bold py-1 px-2 m-1 rounded"
							>
								Unassign
							</button>
						) : (
							<button
								onClick={onAddVendor}
								className="bg-green-700 hover:bg-green-900 text-white font-bold py-1 px-2 m-1 rounded"
							>
								Assign
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
