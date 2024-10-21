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
					className="bg-customOrange2 hover:bg-customYellow text-white font-bold py-1 px-2 rounded "
				>
					<FaDoorOpen />
				</button>
			)}
			{isAddFeaturesModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div
						ref={modalRef}
						className="bg-white p-4 rounded  border-2 shadow-lg w-full max-w-md sm:w-1/2 md:w-1/4"
					>
						<h2 className="text-xl text-customPurple font-bold mb-4">
							Add Feature
						</h2>
						<div className="flex flex-col items-center">
							<select
								value={featureType}
								onChange={(e) =>
									setFeatureType(
										e.target.value as
											| "door"
											| "obstacle"
									)
								}
								className="w-3/4 p-1 mb-4 rounded bg-gray-100 text-customPurple"
							>
								<option value="door">
									Door
								</option>
								<option value="obstacle">
									Obstacle
								</option>
							</select>
							<input
								type="number"
								value={quantity}
								onChange={(e) =>
									setQuantity(
										parseInt(
											e.target.value
										)
									)
								}
								min={1}
								className="w-3/4 p-1 mb-4 rounded bg-gray-100	 text-customPurple"
								placeholder="Quantity"
							/>
							<div className="flex justify-end">
								<button
									onClick={
										handleAddFeatureClick
									}
									className="bg-customPurple hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
								>
									Add Feature
								</button>
								<button
									onClick={() =>
										setIsAddFeaturesModalOpen(
											false
										)
									}
									className="bg-customPurple hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddFeaturesModal;
