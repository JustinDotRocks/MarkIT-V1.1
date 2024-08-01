import React from "react";
import { OptionsBarProps } from "../Types";

const OptionsBar: React.FC<OptionsBarProps> = ({
	x,
	y,
	onDelete,
	onRotateCW,
	onRotateCCW,
}) => {
	return (
		<div
			className="absolute bg-white border border-black rounded p-2"
			style={{
				left: x,
				top: y - 10,
				zIndex: 1000,
				transform: "translate(-50%, -100%)", // Center it horizontally and move it above
			}}
		>
			<button
				onClick={onDelete}
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
			>
				Delete
			</button>
			<button
				onClick={onRotateCCW}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				Rotate CCW
			</button>
			<button
				onClick={onRotateCW}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
			>
				Rotate CW
			</button>
		</div>
	);
};

export default OptionsBar;
