import React, { useState, useRef, useEffect } from "react";
import { RoomSetupModalProps } from "../../Types";
import {
	handleRoomInputChange,
	handleClickOutside,
} from "../../utils/functions";

const RoomSetupModal: React.FC<RoomSetupModalProps> = ({
	isOpen,
	onClose,
	addRoom,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const [roomName, setRoomName] = useState("");
	const [roomWidth, setRoomWidth] = useState("");
	const [roomDepth, setRoomDepth] = useState("");

	// Use the utility function for input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleRoomInputChange(e, setRoomName, setRoomWidth, setRoomDepth);
	};

	const handleAddRoom = () => {
		addRoom(roomName, roomWidth, roomDepth);
		setRoomName("");
		setRoomWidth("");
		setRoomDepth("");
		onClose();
	};

	useEffect(() => {
		// Use the extracted handleClickOutside function
		const outsideClickHandler = handleClickOutside(modalRef, onClose);
		document.addEventListener("mousedown", outsideClickHandler);
		return () => {
			document.removeEventListener(
				"mousedown",
				outsideClickHandler
			);
		};
	}, [modalRef, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="bg-customBlue p-8 rounded shadow-lg w-full max-w-md sm:w-1/2 md:w-1/3"
			>
				<h2 className="text-xl text-white font-bold mb-4">
					Add Room
				</h2>
				<input
					type="text"
					placeholder="Room Name"
					name="room-name"
					value={roomName}
					onChange={handleInputChange}
					className="w-full p-2 mb-4 rounded bg-customBlue2 text-white placeholder-white"
				/>
				<input
					type="text"
					placeholder="Room Width"
					name="room-width"
					value={roomWidth}
					onChange={handleInputChange}
					className="w-full p-2 mb-4 rounded bg-customBlue2 text-white placeholder-white"
				/>
				<input
					type="text"
					placeholder="Room Depth"
					name="room-depth"
					value={roomDepth}
					onChange={handleInputChange}
					className="w-full p-2 mb-4 rounded bg-customBlue2 text-white placeholder-white"
				/>
				<div className="flex justify-end">
					<button
						onClick={handleAddRoom}
						className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
					>
						Add Room
					</button>
					<button
						onClick={onClose}
						className="bg-customBlue2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default RoomSetupModal;
