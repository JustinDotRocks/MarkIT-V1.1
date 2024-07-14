import React, { useState } from "react";
import { RoomSetupModalProps } from "../Types"; // Updated import

const RoomSetupModal: React.FC<RoomSetupModalProps> = ({
	isOpen,
	onClose,
	addRoom,
}) => {
	const [roomName, setRoomName] = useState("");
	const [roomWidth, setRoomWidth] = useState("");
	const [roomDepth, setRoomDepth] = useState("");

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

	const handleAddRoom = () => {
		addRoom(roomName, roomWidth, roomDepth);
		setRoomName("");
		setRoomWidth("");
		setRoomDepth("");
		onClose(); // Close the modal after adding a room
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-gray-800 p-8 rounded shadow-lg w-1/3">
				<h2 className="text-xl font-bold mb-4">Add Room</h2>
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
						onClick={handleAddRoom}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					>
						Add Room
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

export default RoomSetupModal;
