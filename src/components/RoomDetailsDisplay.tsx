// RoomDetailsDisplay.tsx
import React from "react";
import { Room, RoomDetailsDisplayProps } from "../Types";

const RoomDetailsDisplay: React.FC<RoomDetailsDisplayProps> = ({
	rooms,
	openEditModal,
	removeRoom,
}) => {
	// 	// Handle room deletion with confirmation prompt
	const handleRemoveRoom = (roomId: string) => {
		if (window.confirm("Are you sure you want to delete the room?")) {
			removeRoom(roomId);
		}
	};

	return (
		<div className="flex flex-row">
			{rooms.map((room) => (
				<div key={room.id} className="room">
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
