import React, { useState } from "react";
import { AddFeaturesModalProps } from "../Types";

const AddFeaturesModal: React.FC<AddFeaturesModalProps> = ({
	isOpen,
	onClose,
	addFeature,
	features,
	selectedRoomId,
}) => {
	const [featureType, setFeatureType] = useState<"door" | "obstacle">(
		"door"
	);
	const [quantity, setQuantity] = useState<number>(1);

	// const handleAddFeatureClick = () => {
	// 	if (!selectedRoomId) return;

	// 	const baseId = Date.now().toString(); // Base ID for unique identification
	// 	const details = ""; // Optional: Add any details if needed

	// 	// Get the existing features for the selected room
	// 	const existingFeatures = features.filter(
	// 		(feature) => feature.roomId === selectedRoomId
	// 	);

	// 	const id = `${baseId}-feature`;
	// 	addFeature({
	// 		type: featureType,
	// 		id,
	// 		details,
	// 	});

	// 	onClose(); // Close the modal after adding the feature
	// };
	const handleAddFeatureClick = () => {
		if (!selectedRoomId) return;

		const baseId = Date.now().toString(); // Base ID for unique identification
		const details = ""; // Optional: Add any details if needed

		// Get the existing features for the selected room
		console.log("Selected Room ID:", selectedRoomId);
		console.log("Features before addition:", features);

		// Get the existing features for the selected room
		const existingFeatures = features.filter(
			(feature) => feature.roomId === selectedRoomId
		);

		for (let i = 0; i < quantity; i++) {
			const id = `${baseId}-${i}`;
			console.log("Adding Feature:", {
				type: featureType,
				id,
				details,
			});
			addFeature({
				type: featureType,
				id,
				details,
			});
		}

		console.log("Updated Features:", features); // Log the updated features array

		onClose(); // Close the modal after adding features
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-gray-800 p-8 rounded shadow-lg w-1/3">
				<h2 className="text-xl font-bold mb-4">Add Feature</h2>
				<select
					value={featureType}
					onChange={(e) =>
						setFeatureType(
							e.target.value as "door" | "obstacle"
						)
					}
					className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
				>
					<option value="door">Door</option>
					<option value="obstacle">Obstacle</option>
				</select>
				<input
					type="number"
					value={quantity}
					onChange={(e) =>
						setQuantity(parseInt(e.target.value))
					}
					min={1}
					className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
					placeholder="Quantity"
				/>
				<div className="flex justify-end">
					<button
						onClick={handleAddFeatureClick}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					>
						Add Feature
					</button>
					<button
						onClick={onClose}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddFeaturesModal;
