import React from "react";
import { Line } from "react-konva";
import { GridProps } from "../Types";

const Grid: React.FC<GridProps> = ({ containerSize, gridSize, isVisible }) => {
	if (!isVisible) return null;

	const lines = [];
	const countX = Math.ceil(containerSize.width / gridSize);
	const countY = Math.ceil(containerSize.height / gridSize);

	// Create vertical lines
	for (let i = 0; i <= countX; i++) {
		lines.push(
			<Line
				key={`v${i}`}
				points={[
					i * gridSize,
					0,
					i * gridSize,
					containerSize.height,
				]}
				stroke="#ddd"
				strokeWidth={1}
			/>
		);
	}

	// Create horizontal lines
	for (let j = 0; j <= countY; j++) {
		lines.push(
			<Line
				key={`h${j}`}
				points={[
					0,
					j * gridSize,
					containerSize.width,
					j * gridSize,
				]}
				stroke="#ddd"
				strokeWidth={1}
			/>
		);
	}

	return lines; // Return an array of Line components
};

export default Grid;
