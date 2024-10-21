import React, { useState, useRef, useEffect } from "react";
import { RoomEditModalProps } from "../../Types";
import { handleClickOutside } from "../../utils/functions";
import { handleRoomInputChange } from "../../utils/functions";

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

	// Use the utility function for input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleRoomInputChange(e, setRoomName, setRoomWidth, setRoomDepth);
	};

	// Sync state with prop changes
	useEffect(() => {
		setRoomName(roomToEdit.name);
		setRoomWidth(roomToEdit.width);
		setRoomDepth(roomToEdit.depth);
	}, [roomToEdit]);

	const handleUpdateRoom = () => {
		onSave({
			...roomToEdit,
			name: roomName,
			width: roomWidth,
			depth: roomDepth,
		});
		if (onClose) onClose();
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

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
				<div
					ref={modalRef}
					className="bg-white p-4 rounded border-2 shadow-xl w-full max-w-md sm:w-1/2 md:w-1/4"
				>
					<h2 className="text-xl font-bold mb-4 text-customPurple">
						Edit Room
					</h2>
					<input
						type="text"
						placeholder="Room Name"
						name="room-name"
						value={roomName}
						onChange={handleInputChange}
						className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple"
					/>
					<input
						type="text"
						placeholder="Room Width"
						name="room-width"
						value={roomWidth}
						onChange={handleInputChange}
						className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple"
					/>
					<input
						type="text"
						placeholder="Room Depth"
						name="room-depth"
						value={roomDepth}
						onChange={handleInputChange}
						className="w-full p-1 mb-4 rounded bg-gray-100 text-customPurple"
					/>
					<div className="flex justify-end">
						<button
							onClick={handleUpdateRoom}
							className="bg-customPurple hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
						>
							Update Room
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
		</>
	);
};

export default RoomEditModal;
