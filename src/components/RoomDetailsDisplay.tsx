// RoomDetailsDisplay.tsx
import React from "react";
import { Room, RoomDetailsDisplayProps } from "../Types";

const RoomDetailsDisplay: React.FC<RoomDetailsDisplayProps> = ({
	rooms,
	openEditModal,
	removeRoom,
	setSelectedRoomId,
	openAddRoomModal,
	selectedRoomId,
}) => {
	// 	// Handle room deletion with confirmation prompt
	const handleRemoveRoom = (roomId: string) => {
		if (window.confirm("Are you sure you want to delete the room?")) {
			removeRoom(roomId);
		}
	};

	return (
		<div className="flex flex-wrap">
			<div className="flex flex-row space-x-4">
				{rooms.map((room) => (
					<div
						key={room.id}
						className={`room border p-4 rounded cursor-pointer hover:bg-gray-200 ${
							room.id === selectedRoomId
								? "bg-blue-200"
								: "bg-white"
						}`}
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
								onClick={() =>
									openEditModal(room)
								}
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
			<button
				onClick={openAddRoomModal}
				className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
			>
				Add Room
			</button>
		</div>
	);
};

export default RoomDetailsDisplay;
