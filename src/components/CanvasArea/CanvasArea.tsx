import React from "react";
import { CanvasObject, Feature, Room } from "../../Types";

interface CanvasAreaProps {
	objects: Feature[];
	rooms: Room[];
	removeObject: (id: string) => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
	objects,
	removeObject,
	rooms,
}) => {
	// Dictionary to map internal type names to display labels
	const displayNames: { [key: string]: string } = {
		door: "Door",
		obstacle: "Obstacle",
		"table-6": "6' Table",
		"table-8": "8' Table",
		"table-5": "5' Round Table",
	};

	// Function to provide a display label for an object type, handling optional details
	const getDisplayLabel = (type: string, details?: string): string => {
		const label = displayNames[type] || type; // Get user-friendly name or default to type
		// if (details && details !== type && !details.includes(type)) {
		// 	return `${label}: ${details}`;
		// }
		// return label;
		return details ? `${label}: ${details}` : label;
	};

	return (
		<div className="flex-grow overflow-y-auto p-2">
			<div className="canvas-area">
				{rooms.map((room) => (
					<div key={room.id} className="room">
						<h3>{room.name}</h3>
						<p>Width: {room.width}</p>
						<p>Depth: {room.depth}</p>
						{/* Render tables or other details here */}
					</div>
				))}
			</div>
			{objects.map((obj) => (
				<div
					key={obj.id}
					className="inline-block p-2 m-1 border border-gray-500 rounded bg-white"
				>
					<div className="flex justify-between items-center">
						<span>
							{getDisplayLabel(
								obj.type,
								obj.details
							)}
						</span>
						<button
							onClick={() => removeObject(obj.id)}
							className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default CanvasArea;
