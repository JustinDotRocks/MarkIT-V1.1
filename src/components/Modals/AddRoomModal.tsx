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
				className="bg-white p-8 rounded border-2 shadow-lg w-full max-w-md sm:w-1/2 md:w-1/4"
			>
				<h2 className="text-xl text-customPurple font-bold mb-4">
					Add Room
				</h2>
				<input
					type="text"
					placeholder="Room Name"
					name="room-name"
					value={roomName}
					onChange={handleInputChange}
					className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple placeholder-customPurpleLight"
				/>
				<input
					type="text"
					placeholder="Room Width (Feet)"
					name="room-width"
					value={roomWidth}
					onChange={handleInputChange}
					className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple placeholder-customPurpleLight"
				/>
				<input
					type="text"
					placeholder="Room Depth (Feet)"
					name="room-depth"
					value={roomDepth}
					onChange={handleInputChange}
					className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple placeholder-customPurpleLight"
				/>
				<div className="flex justify-end">
					<button
						onClick={handleAddRoom}
						className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-1 px-2 rounded mr-2"
					>
						Add Room
					</button>
					<button
						onClick={onClose}
						className="bg-customPurple hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default RoomSetupModal;
