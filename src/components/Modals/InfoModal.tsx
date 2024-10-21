import React, { useState, useRef, useEffect } from "react";
import { InfoModalProps } from "../../Types";
import { handleClickOutside } from "../../utils/functions";
import { FiInfo } from "react-icons/fi";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const InfoModal: React.FC<InfoModalProps> = ({
	room,
	openEditModal,
	removeRoom,
	selectedRoomId,
}) => {
	const [isRoomInfoModalOpen, setIsRoomInfoModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isRoomInfoModalOpen) {
			const outsideClickHandler = handleClickOutside(modalRef, () =>
				setIsRoomInfoModalOpen(false)
			);
			document.addEventListener("mousedown", outsideClickHandler);
			return () => {
				document.removeEventListener(
					"mousedown",
					outsideClickHandler
				);
			};
		}
	}, [isRoomInfoModalOpen, modalRef]);

	return (
		<>
			{selectedRoomId && (
				<div
					onClick={() => setIsRoomInfoModalOpen(true)}
					className="cursor-pointer text-customPurple hover:text-customPurpleLight inline-block ml-0"
				>
					<FiInfo size={24} />
				</div>
			)}
			{isRoomInfoModalOpen && (
				<div
					className="fixed bg-white text-customPurple p-4 border-2 rounded shadow-lg z-50 top-2/3  md:top-36 md:right-58"
					ref={modalRef}
				>
					<h2 className="text-xl font-bold mb-2">
						Room Information
					</h2>
					<p>
						<strong>Name:</strong> {room.name}
					</p>
					<p>
						<strong>Width:</strong> {room.width} ft
					</p>
					<p>
						<strong>Height:</strong> {room.depth} ft
					</p>
					<div className="flex justify-between mt-4">
						<button
							onClick={() => openEditModal(room)}
							className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-1 px-4 rounded mr-2"
						>
							Edit Room
						</button>
						<DeleteConfirmationModal
							message="Are you sure you want to delete this Room?"
							onConfirm={() => removeRoom(room.id)}
							triggerComponent={
								<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
									Delete
								</button>
							}
						/>
					</div>
					<button
						onClick={() =>
							setIsRoomInfoModalOpen(false)
						}
						className="mt-4 text-customPurple font-bold"
					>
						Close
					</button>
				</div>
			)}
		</>
	);
};

export default InfoModal;
