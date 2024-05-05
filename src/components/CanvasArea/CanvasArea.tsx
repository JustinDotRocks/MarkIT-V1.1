// src/components/CanvasArea.tsx
import React from 'react';
import { CanvasObject } from '../../Types'; // Importing type

interface CanvasAreaProps {
	objects: CanvasObject[];
}

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

	// Function to provide a display label for an object type, handling optional details
	const getDisplayLabel = (type: string, details?: string): string => {
		// Normalize the type key by removing all non-alphanumeric characters (if necessary)
		const normalizedType = type.replace(/[^a-zA-Z0-9]/g, '');
		const label = displayNames[normalizedType] || type; // Get user-friendly name or default to type

		// Append details only if they are meaningful and add information
		if (details && details !== type && !details.includes(type)) {
			return `${label}: ${details}`;
		}
		return label;
	};

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

	const rowHeight = 50; // Height for each row including padding
	const padding = 10; // Padding inside each object box

	return (
		// <div className='w-full h-screen overflow-y-auto bg-gray-200'>
		<div className='flex-grow bg-gray-200 overflow-y-auto'>
			{Object.keys(objectGroups).map((type, rowIndex) => (
				<div
					key={type}
					style={{
						top: `${rowIndex * rowHeight}px`,
						position: 'absolute',
						width: '100%',
					}}
				>
					{objectGroups[type].map((obj, index) => (
						<div
							key={index}
							className='p-2 border border-gray-500 rounded bg-white'
							style={{
								display: 'inline-block', // Display inline for horizontal flow
								marginLeft: `${
									index > 0 ? padding : 0
								}px`, // Add left margin except for the first item
								marginTop: '5px', // Margin top for all items
							}}
						>
							{/* {getDisplayLabel(obj.type)}{' '}
							{obj.details && `: ${obj.details}`} */}
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
