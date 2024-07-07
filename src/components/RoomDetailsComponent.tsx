import React, { useState } from "react";
import Input from "./Input/Input";
import Button from "./Button/Button";
import { RoomDetailsComponentProps } from "../Types"; // Updated import

const RoomDetailsComponent: React.FC<RoomDetailsComponentProps> = ({
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
	};

	return (
		<div>
			<h2 className="text-lg font-bold">Room Setup</h2>
			<Button
				onClick={handleAddRoom}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				+
			</Button>
			<div className="mt-2">
				<Input
					type="text"
					name="room-name"
					value={roomName}
					onChange={handleInputChange}
					placeholder="Room name"
					className="w-full p-2 rounded bg-gray-700 text-white"
				/>
				<Input
					type="text"
					name="room-width"
					value={roomWidth}
					onChange={handleInputChange}
					placeholder="Enter Room Width"
					className="w-full p-2 rounded bg-gray-700 text-white"
				/>
				<Input
					type="text"
					name="room-depth"
					value={roomDepth}
					onChange={handleInputChange}
					placeholder="Enter Room Depth"
					className="w-full p-2 rounded bg-gray-700 text-white"
				/>
			</div>
		</div>
	);
};

export default RoomDetailsComponent;
