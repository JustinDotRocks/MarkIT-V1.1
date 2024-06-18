import React from "react";
import { Feature, Room, Table } from "../../Types";

interface CanvasAreaProps {
	objects: Feature[];
	rooms: Room[];
	tables: Table[]; // Add tables to the props
	removeObject: (id: string) => void;
	selectedRoomId: string | null;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
	objects,
	removeObject,
	rooms,
	tables,
	selectedRoomId,
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
		return details ? `${label}: ${details}` : label;
	};

	const filteredObjects = objects.filter(
		(obj) => obj.roomId === selectedRoomId
	);
	const filteredTables = tables.filter(
		(table) => table.roomId === selectedRoomId
	);

	return (
		<div className="flex-grow overflow-y-auto p-2">
			<div className="canvas-area">
				{rooms.map((room) => (
					<div key={room.id} className="room">
						<h3>{room.name}</h3>
						<p>Width: {room.width}</p>
						<p>Depth: {room.depth}</p>
						{/* Optionally, render tables related to this room */}
					</div>
				))}
			</div>
			{filteredObjects.map((obj) => (
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
			{filteredTables.map((table) => (
				<div
					key={table.id}
					className="inline-block p-2 m-1 border border-gray-500 rounded bg-lightgreen"
				>
					<div className="flex justify-between items-center">
						<span>{getDisplayLabel(table.type)}</span>
						<button
							onClick={() => removeObject(table.id)}
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
