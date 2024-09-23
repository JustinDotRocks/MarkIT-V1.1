import React from "react";
import { Group, Rect, Text } from "react-konva";
import { OptionsBarProps } from "../Types";

const OptionsBarKonva: React.FC<OptionsBarProps> = ({
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
	objectType,
	vendorId,
	updateVendorDetails,
	signedIn,
}) => {
	const optionsBarWidth = 150;
	const optionsBarHeight = 50;
	const margin = 5; // Margin between the object and the OptionsBar

	// Position the OptionsBar just below the object
	const adjustedX = x;
	const adjustedY = y + margin;

	return (
		<Group x={adjustedX} y={adjustedY}>
			<Rect
				width={optionsBarWidth}
				height={optionsBarHeight}
				fill="#1f5160"
				cornerRadius={5}
			/>
			<Text
				x={10}
				y={10}
				text="Options"
				fontSize={14}
				fill="white"
			/>
			{/* Add buttons or icons here as needed, using Konva components */}
			{/* Example: */}
			<Text
				x={10}
				y={30}
				text="Delete"
				fontSize={12}
				fill="white"
				onClick={onDelete}
			/>
			{/* Add more options as needed */}
		</Group>
	);
};

export default OptionsBarKonva;
