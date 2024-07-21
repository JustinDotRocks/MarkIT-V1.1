// import React, { useState } from "react";
// import { Room } from "../Types";

// interface RoomEditModalProps {
// 	room: Room;
// 	onClose: () => void;
// 	onSave: (updatedRoom: Room) => void;
// }

// const RoomEditModal: React.FC<RoomEditModalProps> = ({
// 	room,
// 	onClose,
// 	onSave,
// }) => {
// 	const [editedRoom, setEditedRoom] = useState<Room>(room);

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		setEditedRoom((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleSubmit = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		onSave(editedRoom);
// 	};

// 	return (
// 		<div className="modal">
// 			<div className="modal-content">
// 				<h2>Edit Room</h2>
// 				<form onSubmit={handleSubmit}>
// 					<label>
// 						Name:
// 						<input
// 							type="text"
// 							name="name"
// 							value={editedRoom.name}
// 							onChange={handleChange}
// 						/>
// 					</label>
// 					<label>
// 						Width:
// 						<input
// 							type="text"
// 							name="width"
// 							value={editedRoom.width}
// 							onChange={handleChange}
// 						/>
// 					</label>
// 					<label>
// 						Depth:
// 						<input
// 							type="text"
// 							name="depth"
// 							value={editedRoom.depth}
// 							onChange={handleChange}
// 						/>
// 					</label>
// 					<button type="submit">Save</button>
// 					<button type="button" onClick={onClose}>
// 						Cancel
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default RoomEditModal;

import React, { useState, useEffect } from "react";
import { RoomEditModalProps } from "../Types";

const RoomEditModal: React.FC<RoomEditModalProps> = ({
	isOpen,
	onClose,
	roomToEdit,
	onSave,
}) => {
	// Initialize state with existing room values
	const [roomName, setRoomName] = useState(roomToEdit.name);
	const [roomWidth, setRoomWidth] = useState(roomToEdit.width);
	const [roomDepth, setRoomDepth] = useState(roomToEdit.depth);

	// Sync state with prop changes
	useEffect(() => {
		setRoomName(roomToEdit.name);
		setRoomWidth(roomToEdit.width);
		setRoomDepth(roomToEdit.depth);
	}, [roomToEdit]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case "room-name":
				setRoomName(value);
				break;
			case "room-width":
				setRoomWidth(value);
				break;
			case "room-depth":
				setRoomDepth(value);
				break;
			default:
				break;
		}
	};

	const handleUpdateRoom = () => {
		onSave({
			...roomToEdit,
			name: roomName,
			width: roomWidth,
			depth: roomDepth,
		});
		onClose(); // Close the modal after updating the room
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-gray-800 p-8 rounded shadow-lg w-1/3">
				<h2 className="text-xl font-bold mb-4 text-white">
					Edit Room
				</h2>
				<input
					type="text"
					placeholder="Room Name"
					name="room-name"
					value={roomName}
					onChange={handleInputChange}
					className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
				/>
				<input
					type="text"
					placeholder="Room Width"
					name="room-width"
					value={roomWidth}
					onChange={handleInputChange}
					className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
				/>
				<input
					type="text"
					placeholder="Room Depth"
					name="room-depth"
					value={roomDepth}
					onChange={handleInputChange}
					className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
				/>
				<div className="flex justify-end">
					<button
						onClick={handleUpdateRoom}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					>
						Update Room
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

export default RoomEditModal;
