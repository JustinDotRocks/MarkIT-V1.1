import React from 'react';
import { CanvasObject, CanvasAreaProps } from '../../Types'; // Importing type

const CanvasArea: React.FC<CanvasAreaProps> = ({ objects }) => {
	// Dictionary to map internal type names to display labels
	const displayNames: { [key: string]: string } = {
		table6: "6' Table",
		table8: "8' Table",
		table5: "5' Round Table",
		door: 'Door',
		obstacle: 'Obstacle',
	};

	// Define a type for the groups object
	interface Groups {
		[key: string]: CanvasObject[];
	}

	// Function to group objects by type and return them along with their row index
	const groupObjectsByType = (objects: CanvasObject[]): Groups => {
		const groups: Groups = {};
		objects.forEach((obj) => {
			if (!groups[obj.type]) {
				groups[obj.type] = [];
			}
			groups[obj.type].push(obj);
		});
		return groups;
	};

	const objectGroups = groupObjectsByType(objects);

	// Function to provide a display label for an object type, handling optional details
	const getDisplayLabel = (type: string, details?: string): string => {
		const normalizedType = type.replace(/[^a-zA-Z0-9]/g, '');
		const label = displayNames[normalizedType] || type; // Get user-friendly name or default to type

		// Append details only if they are meaningful and add information
		if (details && details !== type && !details.includes(type)) {
			return `${label}: ${details}`;
		}
		return label;
	};

	return (
		<div className='flex-grow overflow-y-auto'>
			{Object.keys(objectGroups).map((type) => (
				<div
					key={type}
					className='flex flex-wrap items-start m-2' // Use margin for spacing between groups
				>
					{objectGroups[type].map((obj) => (
						<div
							key={obj.id}
							className='inline-block p-2 m-1 border border-gray-500 rounded bg-white'
						>
							{getDisplayLabel(
								obj.type,
								obj.details
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default CanvasArea;
