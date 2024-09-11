// RoomDetailsDisplay.tsx
import React from "react";
import { RoomDetailsDisplayProps } from "../Types";

const RoomDetailsDisplay: React.FC<RoomDetailsDisplayProps> = ({
	rooms,
	setSelectedRoomId,
	openAddRoomModal,
	selectedRoomId,
}) => {
	return (
		<div className="flex flex-wrap justify-center">
			<div className="flex flex-row space-x-4">
				{rooms.map((room) => (
					<div
						key={room.id}
						className={`room border p-2 rounded cursor-pointer hover:bg-gray-600 ${
							room.id === selectedRoomId
								? "bg-customBlue2"
								: "bg-customBlue"
						}`}
						onClick={() => setSelectedRoomId(room.id)}
					>
						<h3
							key={room.id}
							className={`flex justify-between items-center ${
								room.id === selectedRoomId
									? "text-white"
									: "text-white"
							}`}
						>
							<span>{room.name}</span>
						</h3>
					</div>
				))}
			</div>
			<button
				onClick={openAddRoomModal}
				className="ml-4 bg-customBlue hover:bg-green-700 text-white py-1 px-2 rounded"
			>
				Add Room
			</button>
		</div>
	);
};

export default RoomDetailsDisplay;
