import React from "react";
import Button from "./Button/Button";
import { RoomDetailsComponentProps, Room } from "../Types";

const RoomDetailsComponent: React.FC<RoomDetailsComponentProps> = ({
	openModal,
}) => {
	return (
		<div>
			<h2 className="text-lg font-bold">Room Setup</h2>
			<Button
				onClick={openModal}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				+
			</Button>
		</div>
	);
};

export default RoomDetailsComponent;
