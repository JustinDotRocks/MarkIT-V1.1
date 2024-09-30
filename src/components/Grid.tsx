import React from "react";
import { Line } from "react-konva";
import { GridProps } from "../Types";

const Grid: React.FC<GridProps> = ({ containerSize, gridSize }) => {
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
				stroke="#1f5160"
				strokeWidth={1}
				opacity={0.1}
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
				stroke="#1f5160"
				strokeWidth={1}
				opacity={0.1}
			/>
		);
	}

	return lines;
};

export default Grid;
