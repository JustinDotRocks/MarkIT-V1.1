import React from "react";
import { DragAndDropHandlerProps, Table, Feature } from "../Types";

const DragAndDropHandler: React.FC<DragAndDropHandlerProps> = ({
	item,
	containerSize,
	tables,
	feetToPixels,
	room,
	features,
	setTables,
	setFeatures,
	onObjectClick,
	Component,
}) => {
	// const handleDragMove = (e: any) => {
	// 	const node = e.target;
	// 	const id = item.id;
	// 	const type = item.type;

	// 	const foundItem = type.includes("table")
	// 		? tables.find((table) => table.id === id)
	// 		: features.find((feature) => feature.id === id);

	// 	if (foundItem?.isLocked) {
	// 		return; // Prevent dragging if the item is locked
	// 	}

	// 	const itemWidthFeet =
	// 		type === "table-6" ? 6 : type === "table-8" ? 8 : 5;
	// 	const itemHeightFeet = type.includes("table") ? 2.5 : 1.5;

	// 	const itemWidthPixels = itemWidthFeet * 25; // feetToPixels
	// 	const itemHeightPixels = itemHeightFeet * 25; // feetToPixels

	// 	let x = node.x();
	// 	let y = node.y();

	// 	if (x < 0) x = 0;
	// 	if (y < 0) y = 0;
	// 	if (x + itemWidthPixels > containerSize.width)
	// 		x = containerSize.width - itemWidthPixels;
	// 	if (y + itemHeightPixels > containerSize.height)
	// 		y = containerSize.height - itemHeightPixels;

	// 	node.x(x);
	// 	node.y(y);

	// 	// Check for overlaps
	// 	// const isOverlapping = tables.concat(features).some((object) => {
	// 	// 	if (object.id === id) return false; // Skip itself

	// 	// 	const objBox = object.getClientRect();
	// 	// 	const nodeBox = {
	// 	// 		x: x,
	// 	// 		y: y,
	// 	// 		width: itemWidthPixels,
	// 	// 		height: itemHeightPixels,
	// 	// 	};

	// 	// 	return (
	// 	// 		nodeBox.x < objBox.x + objBox.width &&
	// 	// 		nodeBox.x + nodeBox.width > objBox.x &&
	// 	// 		nodeBox.y < objBox.y + objBox.height &&
	// 	// 		nodeBox.y + nodeBox.height > objBox.y
	// 	// 	);
	// 	// });

	// 	// if (!isOverlapping) {
	// 	// 	node.x(x);
	// 	// 	node.y(y);
	// 	// }
	// };

	// const handleDragMove = (e: any) => {
	// 	const node = e.target;
	// 	const id = item.id;
	// 	const type = item.type;

	// 	const foundItem = type.includes("table")
	// 		? tables.find((table) => table.id === id)
	// 		: features.find((feature) => feature.id === id);

	// 	if (!foundItem || foundItem.isLocked) return; // Ensure item exists and is not locked

	// 	const itemWidthFeet =
	// 		type === "table-6" ? 6 : type === "table-8" ? 8 : 5;
	// 	const itemHeightFeet = type.includes("table") ? 2.5 : 1.5;

	// 	const itemWidthPixels = itemWidthFeet * feetToPixels;
	// 	const itemHeightPixels = itemHeightFeet * feetToPixels;

	// 	let x = node.x();
	// 	let y = node.y();

	// 	if (x < 0) x = 0;
	// 	if (y < 0) y = 0;
	// 	if (x + itemWidthPixels > containerSize.width)
	// 		x = containerSize.width - itemWidthPixels;
	// 	if (y + itemHeightPixels > containerSize.height)
	// 		y = containerSize.height - itemHeightPixels;

	// 	const tempObject = {
	// 		...foundItem,
	// 		x: x / containerSize.width,
	// 		y: y / containerSize.height,
	// 	};

	// 	// Simplified collision check
	// 	const isOverlapping = false;
	// 	// const isOverlapping = checkCollision(tempObject, [
	// 	// 	...tables,
	// 	// 	...features,
	// 	// ]);

	// 	// if (!isOverlapping) {
	// 	// 	node.x(x);
	// 	// 	node.y(y);
	// 	// } else {
	// 	// 	// Reset to the original position if overlapping
	// 	// 	node.x(foundItem.x * containerSize.width);
	// 	// 	node.y(foundItem.y * containerSize.height);
	// 	// }
	// };

	// const checkCollision = (
	// 	movingObject: Table | Feature,
	// 	objects: (Table | Feature)[]
	// ) => {
	// 	const movingBox = {
	// 		x: movingObject.x,
	// 		y: movingObject.y,
	// 		width: movingObject.type === "table-5" ? 5 : 8, // Adjust based on object type
	// 		height: movingObject.type === "table-5" ? 5 : 2.5, // Adjust based on object type
	// 	};

	// 	return objects.some((obj) => {
	// 		if (obj.id === movingObject.id) return false; // Skip the same object
	// 		const objBox = {
	// 			x: obj.x,
	// 			y: obj.y,
	// 			width: obj.type === "table-5" ? 5 : 8, // Adjust based on object type
	// 			height: obj.type === "table-5" ? 5 : 2.5, // Adjust based on object type
	// 		};

	// 		return (
	// 			movingBox.x < objBox.x + objBox.width &&
	// 			movingBox.x + movingBox.width > objBox.x &&
	// 			movingBox.y < objBox.y + objBox.height &&
	// 			movingBox.y + movingBox.height > objBox.y
	// 		);
	// 	});
	// };

	const handleDragMove = (e: any) => {
		const node = e.target;
		const id = item.id;
		const type = item.type;

		const foundItem = type.includes("table")
			? tables.find((table) => table.id === id)
			: features.find((feature) => feature.id === id);

		if (foundItem?.isLocked) {
			return; // Prevent dragging if the item is locked
		}

		const itemWidthFeet =
			type === "table-6" ? 6 : type === "table-8" ? 8 : 5;
		const itemHeightFeet = type.includes("table") ? 2.5 : 1.5;

		const itemWidthPixels = itemWidthFeet;
		const itemHeightPixels = itemHeightFeet;

		let x = node.x();
		let y = node.y();

		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x + itemWidthPixels > containerSize.width)
			x = containerSize.width - itemWidthPixels;
		if (y + itemHeightPixels > containerSize.height)
			y = containerSize.height - itemHeightPixels;

		// Allow the object to be dragged to the edges of the room
		// if (room) {
		// 	x = Math.max(
		// 		0,
		// 		Math.min(x, containerSize.width - itemWidthPixels)
		// 	);
		// 	y = Math.max(
		// 		0,
		// 		Math.min(y, containerSize.height - itemHeightPixels)
		// 	);
		// }

		node.x(x);
		node.y(y);
	};

	// const checkCollision = (
	// 	movingObject: Table | Feature,
	// 	objects: (Table | Feature)[]
	// ) => {
	// 	const movingBox = {
	// 		x: movingObject.x * containerSize.width, // Convert to pixels
	// 		y: movingObject.y * containerSize.height, // Convert to pixels
	// 		width: movingObject.type.includes("table")
	// 			? movingObject.type === "table-6"
	// 				? 6 * feetToPixels
	// 				: movingObject.type === "table-8"
	// 				? 8 * feetToPixels
	// 				: 5 * feetToPixels
	// 			: 5 * feetToPixels, // Adjust width based on object type
	// 		height: movingObject.type.includes("table")
	// 			? 2.5 * feetToPixels
	// 			: 1.5 * feetToPixels, // Adjust height based on object type
	// 	};

	// 	const tolerance = 5; // Tolerance in pixels

	// 	return objects.some((obj) => {
	// 		if (obj.id === movingObject.id) return false; // Skip the same object

	// 		const objBox = {
	// 			x: obj.x * containerSize.width, // Convert to pixels
	// 			y: obj.y * containerSize.height, // Convert to pixels
	// 			width: obj.type.includes("table")
	// 				? obj.type === "table-6"
	// 					? 6 * feetToPixels
	// 					: obj.type === "table-8"
	// 					? 8 * feetToPixels
	// 					: 5 * feetToPixels
	// 				: 5 * feetToPixels, // Adjust width based on object type
	// 			height: obj.type.includes("table")
	// 				? 2.5 * feetToPixels
	// 				: 1.5 * feetToPixels, // Adjust height based on object type
	// 		};

	// 		return (
	// 			movingBox.x + tolerance < objBox.x + objBox.width &&
	// 			movingBox.x + movingBox.width - tolerance > objBox.x &&
	// 			movingBox.y + tolerance < objBox.y + objBox.height &&
	// 			movingBox.y + movingBox.height - tolerance > objBox.y
	// 		);
	// 	});
	// };

	// const handleDragEnd = (e: any) => {
	// 	const id = item.id;
	// 	const x = e.target.x() / containerSize.width;
	// 	const y = e.target.y() / containerSize.height;

	// 	console.log(`DragEnd for ${id}: x=${x}, y=${y}`);

	// 	if (item.type.includes("table")) {
	// 		setTables((prevTables) => {
	// 			const updatedTables = prevTables.map((table) =>
	// 				table.id === id ? { ...table, x, y } : table
	// 			);
	// 			console.log("Updated Tables: ", updatedTables);
	// 			return updatedTables;
	// 		});
	// 	} else {
	// 		setFeatures((prevFeatures) => {
	// 			const updatedFeatures = prevFeatures.map((feature) =>
	// 				feature.id === id ? { ...feature, x, y } : feature
	// 			);
	// 			console.log("Updated Features: ", updatedFeatures);
	// 			return updatedFeatures;
	// 		});
	// 	}

	// 	const foundItem = item.type.includes("table")
	// 		? tables.find((table) => table.id === id)
	// 		: features.find((feature) => feature.id === id);

	// 	if (!foundItem || foundItem.isLocked) return;
	// };
	// const handleDragEnd = (e: any) => {
	// 	const id = item.id;
	// 	const x = e.target.x() / containerSize.width;
	// 	const y = e.target.y() / containerSize.height;

	// 	console.log(`DragEnd for ${id}: x=${x}, y=${y}`);

	// 	const foundItem = item.type.includes("table")
	// 		? tables.find((table) => table.id === id)
	// 		: features.find((feature) => feature.id === id);

	// 	if (!foundItem || foundItem.isLocked) return;

	// 	// Create a temporary object with new position to check for collisions
	// 	// const tempObject = {
	// 	// 	...foundItem,
	// 	// 	x: x,
	// 	// 	y: y,
	// 	// };

	// 	// const isOverlapping = checkCollision(
	// 	// 	tempObject,
	// 	// 	tables.concat(features)
	// 	// );
	// 	// const isOverlapping = item.type.includes("table")
	// 	// 	? checkCollision(
	// 	// 			tempObject as Table,
	// 	// 			tables.concat(tables as Table[])
	// 	// 	  )
	// 	// 	: checkCollision(
	// 	// 			tempObject as Feature,
	// 	// 			features.concat(features as Feature[])
	// 	// 	  );

	// 	// if (!isOverlapping) {
	// 	// 	if (item.type.includes("table")) {
	// 	// 		setTables((prevTables) => {
	// 	// 			const updatedTables = prevTables.map((table) =>
	// 	// 				table.id === id ? { ...table, x, y } : table
	// 	// 			);
	// 	// 			console.log("Updated Tables: ", updatedTables);
	// 	// 			return updatedTables;
	// 	// 		});
	// 	// 	} else {
	// 	// 		setFeatures((prevFeatures) => {
	// 	// 			const updatedFeatures = prevFeatures.map(
	// 	// 				(feature) =>
	// 	// 					feature.id === id
	// 	// 						? { ...feature, x, y }
	// 	// 						: feature
	// 	// 			);
	// 	// 			console.log(
	// 	// 				"Updated Features: ",
	// 	// 				updatedFeatures
	// 	// 			);
	// 	// 			return updatedFeatures;
	// 	// 		});
	// 	// 	}
	// 	// } else {
	// 	// 	// Reset to the original position if overlapping
	// 	// 	e.target.position({
	// 	// 		x: foundItem.x * containerSize.width,
	// 	// 		y: foundItem.y * containerSize.height,
	// 	// 	});
	// 	// }
	// 	// if (!isOverlapping) {
	// 	// 	if (item.type.includes("table")) {
	// 	// 		setTables((prevTables) => {
	// 	// 			const updatedTables = prevTables.map((table) =>
	// 	// 				table.id === id ? { ...table, x, y } : table
	// 	// 			);
	// 	// 			console.log("Updated Tables: ", updatedTables);
	// 	// 			return updatedTables;
	// 	// 		});
	// 	// 	} else {
	// 	// 		setFeatures((prevFeatures) => {
	// 	// 			const updatedFeatures = prevFeatures.map(
	// 	// 				(feature) =>
	// 	// 					feature.id === id
	// 	// 						? { ...feature, x, y }
	// 	// 						: feature
	// 	// 			);
	// 	// 			console.log(
	// 	// 				"Updated Features: ",
	// 	// 				updatedFeatures
	// 	// 			);
	// 	// 			return updatedFeatures;
	// 	// 		});
	// 	// 	}
	// 	// } else if (foundItem) {
	// 	// 	// Ensure foundItem is defined before accessing its properties
	// 	// 	// Reset to the original position if overlapping
	// 	// 	e.target.position({
	// 	// 		x: foundItem.x * containerSize.width,
	// 	// 		y: foundItem.y * containerSize.height,
	// 	// 	});
	// 	// }
	// };
	// const handleDragEnd = (e: any) => {
	// 	const id = item.id;
	// 	const x = e.target.x() / containerSize.width;
	// 	const y = e.target.y() / containerSize.height;

	// 	console.log(`DragEnd for ${id}: x=${x}, y=${y}`);

	// 	const foundItem = item.type.includes("table")
	// 		? tables.find((table) => table.id === id)
	// 		: features.find((feature) => feature.id === id);

	// 	if (!foundItem || foundItem.isLocked) return;

	// 	// Create a temporary object with new position to check for collisions
	// 	const tempObject = {
	// 		...foundItem,
	// 		x: x,
	// 		y: y,
	// 	};

	// 	// Simplified collision check
	// 	const isOverlapping = false;

	// 	if (!isOverlapping) {
	// 		if (item.type.includes("table")) {
	// 			setTables((prevTables) => {
	// 				const updatedTables = prevTables.map((table) =>
	// 					table.id === id ? { ...table, x, y } : table
	// 				);
	// 				console.log("Updated Tables: ", updatedTables);
	// 				return updatedTables;
	// 			});
	// 		} else {
	// 			setFeatures((prevFeatures) => {
	// 				const updatedFeatures = prevFeatures.map(
	// 					(feature) =>
	// 						feature.id === id
	// 							? { ...feature, x, y }
	// 							: feature
	// 				);
	// 				console.log(
	// 					"Updated Features: ",
	// 					updatedFeatures
	// 				);
	// 				return updatedFeatures;
	// 			});
	// 		}
	// 	} else {
	// 		// Reset to the original position if overlapping
	// 		e.target.position({
	// 			x: foundItem.x * containerSize.width,
	// 			y: foundItem.y * containerSize.height,
	// 		});
	// 	}
	// };
	const handleDragEnd = (e: any) => {
		const id = item.id;
		const x = e.target.x() / containerSize.width;
		const y = e.target.y() / containerSize.height;

		console.log(`DragEnd for ${id}: x=${x}, y=${y}`);

		if (item.type.includes("table")) {
			setTables((prevTables) => {
				const updatedTables = prevTables.map((table) =>
					table.id === id ? { ...table, x, y } : table
				);
				console.log("Updated Tables: ", updatedTables);
				return updatedTables;
			});
		} else {
			setFeatures((prevFeatures) => {
				const updatedFeatures = prevFeatures.map((feature) =>
					feature.id === id ? { ...feature, x, y } : feature
				);
				console.log("Updated Features: ", updatedFeatures);
				return updatedFeatures;
			});
		}

		const foundItem = item.type.includes("table")
			? tables.find((table) => table.id === id)
			: features.find((feature) => feature.id === id);

		if (!foundItem || foundItem.isLocked) return;
	};

	// const areObjectsOverlapping = (object1: any, object2: any) => {
	// 	const obj1Box = object1.getClientRect();
	// 	const obj2Box = object2.getClientRect();

	// 	return (
	// 		obj1Box.x < obj2Box.x + obj2Box.width &&
	// 		obj1Box.x + obj1Box.width > obj2Box.x &&
	// 		obj1Box.y < obj2Box.y + obj2Box.height &&
	// 		obj1Box.y + obj1Box.height > obj2Box.y
	// 	);
	// };

	// const handleDragStart = (e: any) => {
	// 	const draggedObject = e.target;
	// 	draggedObject.startX = draggedObject.x();
	// 	draggedObject.startY = draggedObject.y();
	// };

	return (
		<Component
			item={item}
			onDragMove={handleDragMove}
			onDragEnd={handleDragEnd}
			// onDragStart={handleDragStart}
			onObjectClick={onObjectClick}
			containerSize={containerSize}
			feetToPixels={feetToPixels}
			room={room}
		/>
	);
};

export default DragAndDropHandler;
