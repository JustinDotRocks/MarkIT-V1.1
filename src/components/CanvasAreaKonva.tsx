import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import { Feature, Room, Table, CanvasAreaProps } from "../Types";

const CanvasAreaKonva: React.FC<CanvasAreaProps> = ({
	objects,
	removeObject,
	rooms,
	tables,
	removeRoom,
	selectedRoomId,
}) => {
	const room = rooms.find((r) => r.id === selectedRoomId);
	const canvasWidth = window.innerWidth * 0.9; // Use 70% of the window width
	const canvasHeight = window.innerHeight * 0.9; // Use 70% of the window height

	let roomWidth = 0;
	let roomHeight = 0;
	let scale = 1;

	if (room) {
		roomWidth = parseFloat(room.width);
		roomHeight = parseFloat(room.depth);

		// Calculate scale factor to fit the room within the canvas
		const scaleX = canvasWidth / roomWidth;
		const scaleY = canvasHeight / roomHeight;
		scale = Math.min(scaleX, scaleY); // Use the smaller scale factor

		// If the scale is still too large, further adjust to ensure the room fits within the canvas
		// if (scale * roomWidth > canvasWidth) {
		// 	scale = canvasWidth / roomWidth;
		// }
		// if (scale * roomHeight > canvasHeight) {
		// 	scale = canvasHeight / roomHeight;
		// }
	}

	return (
		<div className="flex-grow overflow-y-auto p-2 h-96">
			<div className="canvas-area">
				{rooms.map((room) => (
					<div key={room.id} className="room">
						<h3 className="flex justify-between items-center">
							<span>{room.name}</span>
							<button
								onClick={() =>
									removeRoom(room.id)
								} // ADD: Delete button for room
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
							>
								Delete
							</button>
						</h3>
						<p>Width: {room.width}</p>
						<p>Depth: {room.depth}</p>
					</div>
				))}
			</div>
			{room && (
				<Stage width={canvasWidth} height={canvasHeight}>
					<Layer scaleX={scale} scaleY={scale}>
						<Rect
							x={0}
							y={0}
							width={roomWidth}
							height={roomHeight}
							stroke="black"
							strokeWidth={2}
						/>
						{tables
							.filter(
								(table) =>
									table.roomId ===
									selectedRoomId
							)
							.map((table) => (
								<Rect
									key={table.id}
									x={
										Math.random() *
										(roomWidth - 100)
									}
									y={
										Math.random() *
										(roomHeight - 50)
									}
									width={100}
									height={50}
									fill="blue"
									draggable
								/>
							))}
						{objects
							.filter(
								(feature) =>
									feature.roomId ===
									selectedRoomId
							)
							.map((feature) => (
								<Rect
									key={feature.id}
									x={
										Math.random() *
										(roomWidth - 30)
									}
									y={
										Math.random() *
										(roomHeight - 30)
									}
									width={30}
									height={30}
									fill="red"
									draggable
								/>
							))}
					</Layer>
				</Stage>
			)}
		</div>
	);
};

export default CanvasAreaKonva;
