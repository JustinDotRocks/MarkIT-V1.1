import React from "react";
import { Feature, Room, Table, CanvasAreaProps } from "../../Types";

const CanvasArea: React.FC<CanvasAreaProps> = ({
	objects,
	removeObject,
	rooms,
	tables,
	removeRoom,
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
	const getDisplayLabel = (type: string, tableNumber?: number): string => {
		const label = displayNames[type] || type; // Get user-friendly name or default to type
		return tableNumber
			? `Table Number - ${tableNumber} - ${label}`
			: label;
	};

	const filteredFeatures = objects.filter(
		(feature) => feature.roomId === selectedRoomId
	);
	const filteredTables = tables.filter(
		(table) => table.roomId === selectedRoomId
	);

	return (
		<div className="flex-grow overflow-y-auto p-2 h-96">
			<div className="canvas-area">
				{rooms.map((room) => (
					<div key={room.id} className="room">
						{/* <h3>{room.name}</h3> */}
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
			{filteredFeatures.map((obj) => (
				<div
					key={obj.id}
					className="inline-block p-2 m-1 border border-gray-500 rounded bg-white"
				>
					<div className="flex justify-between items-center">
						<span>{getDisplayLabel(obj.type)}</span>
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
					className="inline-block p-2 m-1 border border-gray-500 rounded bg-white"
				>
					<div className="flex justify-between items-center">
						<span>
							{getDisplayLabel(
								table.type,
								table.tableNumber
							)}
						</span>
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
