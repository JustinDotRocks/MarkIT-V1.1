import React from "react";
import { OptionsBarProps } from "../Types";

const OptionsBar: React.FC<OptionsBarProps> = ({
	x,
	y,
	onDelete,
	onRotateCW,
	onRotateCCW,
	onToggleLock,
	isLocked,
	vendorName,
	onAddVendor,
	onRemoveVendor,
}) => {
	return (
		<div
			className="absolute bg-white border border-black rounded p-2"
			style={{
				left: x,
				top: y - 10,
				zIndex: 50,
				transform: "translate(-50%, -100%)", // Center it horizontally and move it above
			}}
		>
			<p>{vendorName}</p>
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
			<button
				onClick={onToggleLock}
				className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
			>
				{isLocked ? "Unlock" : "Lock"}
			</button>
			<button onClick={onAddVendor}>Add Vendor</button>
			{vendorName && (
				<button
					onClick={onRemoveVendor}
					className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
				>
					Remove Vendor
				</button>
			)}
		</div>
	);
};

export default OptionsBar;

// import React from "react";
// import {
// 	FaTrashAlt,
// 	FaLock,
// 	FaUnlock,
// 	FaUserPlus,
// 	FaChevronDown,
// 	FaChevronUp,
// } from "react-icons/fa";
// import { OptionsBarProps } from "../Types";
// import Button from "../components/Button/Button";

// const OptionsBar: React.FC<OptionsBarProps> = ({
// 	x,
// 	y,
// 	onDelete,
// 	onRotateCW,
// 	onRotateCCW,
// 	onToggleLock,
// 	isLocked,
// 	onAddVendor,
// }) => {
// 	return (
// 		<div
// 			style={{ position: "absolute", top: y, left: x }}
// 			className="options-bar"
// 		>
// 			<Button onClick={onRotateCW}>
// 				<FaChevronDown />
// 			</Button>
// 			<Button onClick={onRotateCCW}>
// 				<FaChevronUp />
// 			</Button>
// 			<Button onClick={onToggleLock}>
// 				{isLocked ? <FaLock /> : <FaUnlock />}
// 			</Button>
// 			<Button onClick={onAddVendor}>
// 				{" "}
// 				{/* ADDED */}
// 				<FaUserPlus /> Add Vendor
// 			</Button>
// 			<Button onClick={onDelete}>
// 				<FaTrashAlt />
// 			</Button>
// 		</div>
// 	);
// };

// export default OptionsBar;
