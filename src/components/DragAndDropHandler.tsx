import React, { useRef } from "react";
import { DragAndDropHandlerProps } from "../Types";

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
	vendors,
	stageRef,
	setShowGrid,
}) => {
	const handleDragMove = (e: any) => {
		const node = e.target;
		const id = item.id;
		const type = item.type;

		setShowGrid(true);

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

		node.x(x);
		node.y(y);
	};

	// const checkCollision = (currentItem: any, items: any[], type: string) => {
	// 	const currentItemX = currentItem.x * containerSize.width;
	// 	const currentItemY = currentItem.y * containerSize.height;
	// 	const currentItemWidth =
	// 		currentItem.width || currentItem.radius * 2; // Use radius for circles
	// 	const currentItemHeight =
	// 		currentItem.height || currentItem.radius * 2;

	// 	return items.some((otherItem) => {
	// 		if (otherItem.id === currentItem.id) return false; // Skip self

	// 		const otherX = otherItem.x * containerSize.width;
	// 		const otherY = otherItem.y * containerSize.height;
	// 		const otherWidth = otherItem.width || otherItem.radius * 2;
	// 		const otherHeight = otherItem.height || otherItem.radius * 2;

	// 		// Basic collision detection: checks if bounding boxes overlap
	// 		const collisionDetected = !(
	// 			(
	// 				currentItemX + currentItemWidth <= otherX || // Current right is left of other left
	// 				currentItemX >= otherX + otherWidth || // Current left is right of other right
	// 				currentItemY + currentItemHeight <= otherY || // Current bottom is above other top
	// 				currentItemY >= otherY + otherHeight
	// 			) // Current top is below other bottom
	// 		);

	// 		// Log for debugging if collision is detected
	// 		if (collisionDetected) {
	// 			console.log(
	// 				"Collision Detected between:",
	// 				currentItem,
	// 				otherItem
	// 			);
	// 		}

	// 		return collisionDetected;
	// 	});
	// };

	// const handleDragEnd = (e: any) => {
	// 	const id = item.id;
	// 	const x = e.target.x() / containerSize.width;
	// 	const y = e.target.y() / containerSize.height;

	// 	if (item.type.includes("table")) {
	// 		setTables((prevTables) => {
	// 			const updatedTables = prevTables.map((table) =>
	// 				table.id === id ? { ...table, x, y } : table
	// 			);
	// 			return updatedTables;
	// 		});
	// 	} else {
	// 		setFeatures((prevFeatures) => {
	// 			const updatedFeatures = prevFeatures.map((feature) =>
	// 				feature.id === id ? { ...feature, x, y } : feature
	// 			);
	// 			return updatedFeatures;
	// 		});
	// 	}

	// 	const foundItem = item.type.includes("table")
	// 		? tables.find((table) => table.id === id)
	// 		: features.find((feature) => feature.id === id);

	// 	if (!foundItem || foundItem.isLocked) return;
	// };
	const handleDragEnd = (e: any) => {
		const id = item.id;
		const node = e.target;
		const x = node.x() / containerSize.width;
		const y = node.y() / containerSize.height;

		setShowGrid(false);

		// Ensure stageRef.current is available
		if (!stageRef.current) {
			console.error("Stage reference is not available.");
			return;
		}

		// Define a helper function to check for collisions
		const isColliding = (otherItem: any, otherNode: any) => {
			if (otherItem.id === id) return false; // Skip self
			const otherRect = otherNode.getClientRect();
			const currentItemRect = node.getClientRect();

			// Basic collision detection between bounding boxes
			return !(
				currentItemRect.x + currentItemRect.width <=
					otherRect.x ||
				currentItemRect.x >= otherRect.x + otherRect.width ||
				currentItemRect.y + currentItemRect.height <=
					otherRect.y ||
				currentItemRect.y >= otherRect.y + otherRect.height
			);
		};

		// Check collisions with other tables
		const collidesWithTable = tables.some((table) => {
			const tableNode = stageRef.current.findOne(`#${table.id}`);
			return tableNode && isColliding(table, tableNode);
		});

		// Check collisions with other features
		const collidesWithFeature = features.some((feature) => {
			const featureNode = stageRef.current.findOne(
				`#${feature.id}`
			);
			return featureNode && isColliding(feature, featureNode);
		});

		// Allow the drop only if there is no collision
		if (collidesWithTable || collidesWithFeature) {
			node.position({
				x: item.x * containerSize.width,
				y: item.y * containerSize.height,
			});
			console.log("Collision detected, reverting position");
			return; // Prevent updating the state with the new position
		}

		// Update state with new positions if no collision
		if (item.type.includes("table")) {
			setTables((prevTables) => {
				const updatedTables = prevTables.map((table) =>
					table.id === id ? { ...table, x, y } : table
				);
				return updatedTables;
			});
		} else {
			setFeatures((prevFeatures) => {
				const updatedFeatures = prevFeatures.map((feature) =>
					feature.id === id ? { ...feature, x, y } : feature
				);
				return updatedFeatures;
			});
		}
	};

	return (
		<Component
			item={item}
			onDragMove={handleDragMove}
			onDragEnd={handleDragEnd}
			onObjectClick={onObjectClick}
			containerSize={containerSize}
			feetToPixels={feetToPixels}
			room={room}
			vendors={vendors}
		/>
	);
};

export default DragAndDropHandler;
