// RoomDetailsDisplay.tsx
import React from "react";
import { Room, RoomDetailsDisplayProps } from "../Types";

const RoomDetailsDisplay: React.FC<RoomDetailsDisplayProps> = ({
	rooms,
	openEditModal,
	removeRoom,
	setSelectedRoomId,
}) => {
	// 	// Handle room deletion with confirmation prompt
	const handleRemoveRoom = (roomId: string) => {
		if (window.confirm("Are you sure you want to delete the room?")) {
			removeRoom(roomId);
		}
	};

	return (
		<div className="flex flex-wrap">
			{rooms.map((room) => (
				<div
					key={room.id}
					className="room border-2 border-gray-300 rounded-lg p-4 m-2 hover:bg-gray-100 cursor-pointer active:bg-gray-200 transition-all duration-200"
					onClick={() => setSelectedRoomId(room.id)}
				>
					<h3 className="flex justify-between items-center">
						<span>{room.name}</span>
						<button
							onClick={() =>
								handleRemoveRoom(room.id)
							}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
						>
							Delete
						</button>
						<button
							onClick={() => openEditModal(room)}
							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
						>
							Edit
						</button>
					</h3>
					<p>Width: {room.width}</p>
					<p>Depth: {room.depth}</p>
				</div>
			))}
		</div>
	);
};

export default RoomDetailsDisplay;
