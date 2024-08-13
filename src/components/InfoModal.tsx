// InfoModal.tsx
import React from "react";
import { InfoModalProps } from "../Types";

const InfoModal: React.FC<InfoModalProps> = ({
	isOpen,
	onClose,
	room,
	openEditModal,
	removeRoom,
}) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed bg-gray-800 text-white p-4 rounded shadow-lg"
			style={{ top: "50px", right: "50px" }}
		>
			<h2 className="text-xl font-bold mb-2">Room Information</h2>
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
					className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
				>
					Edit Room
				</button>
				<button
					onClick={() => removeRoom(room.id)}
					className="bg-red-500 text-white py-1 px-4 rounded"
				>
					Delete Room
				</button>
			</div>
			<button onClick={onClose} className="mt-4 text-white">
				Close
			</button>
		</div>
	);
};

export default InfoModal;
