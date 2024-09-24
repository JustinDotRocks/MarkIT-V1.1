import React, { useState, useRef, useEffect } from "react";
import { RoomEditModalProps } from "../Types";

const RoomEditModal: React.FC<RoomEditModalProps> = ({
	roomToEdit,
	onSave,
	onClose,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

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
		if (onClose) onClose();
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			if (onClose) onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
				<div
					ref={modalRef}
					className="bg-customBlue p-8 rounded shadow-lg w-full max-w-md sm:w-1/2 md:w-1/3"
				>
					<h2 className="text-xl font-bold mb-4 text-white">
						Edit Room
					</h2>
					<input
						type="text"
						placeholder="Room Name"
						name="room-name"
						value={roomName}
						onChange={handleInputChange}
						className="w-full p-2 mb-4 rounded bg-customBlue2 text-white"
					/>
					<input
						type="text"
						placeholder="Room Width"
						name="room-width"
						value={roomWidth}
						onChange={handleInputChange}
						className="w-full p-2 mb-4 rounded bg-customBlue2 text-white"
					/>
					<input
						type="text"
						placeholder="Room Depth"
						name="room-depth"
						value={roomDepth}
						onChange={handleInputChange}
						className="w-full p-2 mb-4 rounded bg-customBlue2 text-white"
					/>
					<div className="flex justify-end">
						<button
							onClick={handleUpdateRoom}
							className="bg-customBlue2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
						>
							Update Room
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
		</>
	);
};

export default RoomEditModal;
