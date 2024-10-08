import React, { useState, useRef, useEffect } from "react";
import { AddFeaturesModalProps } from "../../Types";
import { handleClickOutside } from "../../utils/functions";
import { FaDoorOpen } from "react-icons/fa";

const AddFeaturesModal: React.FC<AddFeaturesModalProps> = ({
	addFeature,
	selectedRoomId,
}) => {
	const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
		useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const [featureType, setFeatureType] = useState<"door" | "obstacle">(
		"door"
	);
	const [quantity, setQuantity] = useState<number>(1);

	const handleAddFeatureClick = () => {
		if (!selectedRoomId) return;

		const baseId = Date.now().toString(); // Base ID for unique identification
		const details = "";

		for (let i = 0; i < quantity; i++) {
			const id = `${baseId}-${i}`;
			addFeature({
				type: featureType,
				id,
				details,
			});
		}

		setIsAddFeaturesModalOpen(false);
	};

	useEffect(() => {
		if (isAddFeaturesModalOpen) {
			const outsideClickHandler = handleClickOutside(modalRef, () =>
				setIsAddFeaturesModalOpen(false)
			);
			document.addEventListener("mousedown", outsideClickHandler);
			return () => {
				document.removeEventListener(
					"mousedown",
					outsideClickHandler
				);
			};
		}
	}, [isAddFeaturesModalOpen, modalRef]);

	return (
		<>
			{selectedRoomId && (
				<button
					onClick={() => setIsAddFeaturesModalOpen(true)}
					className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-1 px-2 rounded ml-2"
				>
					<FaDoorOpen />
				</button>
			)}
			{isAddFeaturesModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div
						ref={modalRef}
						className="bg-customBlue p-8 rounded shadow-lg w-full max-w-md sm:w-1/2 md:w-1/3	"
					>
						<h2 className="text-xl text-white font-bold mb-4">
							Add Feature
						</h2>
						<select
							value={featureType}
							onChange={(e) =>
								setFeatureType(
									e.target.value as
										| "door"
										| "obstacle"
								)
							}
							className="w-full p-2 mb-4 rounded bg-customBlue2 text-white"
						>
							<option value="door">Door</option>
							<option value="obstacle">
								Obstacle
							</option>
						</select>
						<input
							type="number"
							value={quantity}
							onChange={(e) =>
								setQuantity(
									parseInt(e.target.value)
								)
							}
							min={1}
							className="w-full p-2 mb-4 rounded bg-customBlue2	 text-white"
							placeholder="Quantity"
						/>
						<div className="flex justify-end">
							<button
								onClick={handleAddFeatureClick}
								className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
							>
								Add Feature
							</button>
							<button
								onClick={() =>
									setIsAddFeaturesModalOpen(
										false
									)
								}
								className="bg-customBlue2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default AddFeaturesModal;
