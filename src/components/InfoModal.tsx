// InfoModal.tsx
import React, { useState, useRef, useEffect } from "react";
import { InfoModalProps } from "../Types";
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

	const handleClickOutside = (event: MouseEvent) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			setIsRoomInfoModalOpen(false);
		}
	};

	useEffect(() => {
		if (isRoomInfoModalOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isRoomInfoModalOpen]);

	return (
		<>
			{selectedRoomId && (
				<div
					onClick={() => setIsRoomInfoModalOpen(true)}
					className="cursor-pointer text-customBlue2 inline-block ml-2"
				>
					<FiInfo size={24} />
				</div>
			)}
			{isRoomInfoModalOpen && (
				<div
					className="fixed bg-customBlue text-white p-4 rounded shadow-lg z-50"
					style={{ top: "200px", right: "250px" }}
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
							className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
						>
							Edit Room
						</button>
						{/* <button
							onClick={() => removeRoom(room.id)}
							className="bg-red-500 text-white py-1 px-4 rounded"
						>
							Delete Room
						</button> */}
						<DeleteConfirmationModal
							message="Are you sure you want to delete this Room?"
							onConfirm={() => removeRoom(room.id)}
							triggerComponent={
								<button className="bg-customBlue2 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
									Delete
								</button>
							}
						/>
					</div>
					<button
						onClick={() =>
							setIsRoomInfoModalOpen(false)
						}
						className="mt-4 text-white font-bold"
					>
						Close
					</button>
				</div>
			)}
		</>
	);
};

export default InfoModal;
