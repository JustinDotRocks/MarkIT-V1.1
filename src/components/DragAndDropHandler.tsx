import React from "react";
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
}) => {
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

		const itemWidthPixels = itemWidthFeet * 25; // feetToPixels
		const itemHeightPixels = itemHeightFeet * 25; // feetToPixels

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

	const handleDragEnd = (e: any) => {
		const id = item.id;
		const x = e.target.x() / containerSize.width;
		const y = e.target.y() / containerSize.height;

		const foundItem = item.type.includes("table")
			? tables.find((table) => table.id === id)
			: features.find((feature) => feature.id === id);

		if (!foundItem || foundItem.isLocked) return;

		if (item.type.includes("table")) {
			setTables((prevTables) =>
				prevTables.map((table) =>
					table.id === id ? { ...table, x, y } : table
				)
			);
		} else {
			setFeatures((prevFeatures) =>
				prevFeatures.map((feature) =>
					feature.id === id ? { ...feature, x, y } : feature
				)
			);
		}

		// if (item.type.includes("table")) {
		// 	setTables((prevTables) => {
		// 		const updatedTables = prevTables.map((table) =>
		// 			table.id === id ? { ...table, x, y } : table
		// 		);
		// 		saveToLocalStorage(
		// 			getStorageKeys().TABLES,
		// 			updatedTables
		// 		);
		// 		return updatedTables;
		// 	});
		// } else {
		// 	setFeatures((prevFeatures) => {
		// 		const updatedFeatures = prevFeatures.map((feature) =>
		// 			feature.id === id ? { ...feature, x, y } : feature
		// 		);
		// 		saveToLocalStorage(
		// 			getStorageKeys().FEATURES,
		// 			updatedFeatures
		// 		);
		// 		return updatedFeatures;
		// 	});
		// }
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
		/>
	);
};

export default DragAndDropHandler;

// const handleDragMove = (e: any) => {
// 	const node = e.target;
// 	const id = node.attrs.id;
// 	const type = node.attrs.type;

// 	const item =
// 		type === "table"
// 			? tables.find((table) => table.id === id)
// 			: features.find((feature) => feature.id === id);

// 	if (item?.isLocked) {
// 		return; // Prevent dragging if the item is locked
// 	}

// 	// Get dimensions of the item being dragged
// 	const itemWidthFeet =
// 		type === "table"
// 			? tables.find((table) => table.id === id)?.type ===
// 			  "table-6"
// 				? 6
// 				: tables.find((table) => table.id === id)
// 						?.type === "table-8"
// 				? 8
// 				: 5
// 			: 1.5; // Assuming feature width is 1.5 feet for example
// 	const itemHeightFeet =
// 		type === "table"
// 			? 2.5 // Assuming table height is 2.5 feet for all types
// 			: 1.5; // Assuming feature height is 1.5 feet for example

// 	const itemWidthPixels = itemWidthFeet * feetToPixels;
// 	const itemHeightPixels = itemHeightFeet * feetToPixels;

// 	// Ensure x and y are within the bounds
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
// };

// const handleDragEnd = (id: string, type: "table" | "feature", e: any) => {
// 	const x = e.target.x() / containerSize.width;
// 	const y = e.target.y() / containerSize.height;

// 	const isLocked =
// 		type === "table"
// 			? tables.find((table) => table.id === id)?.isLocked
// 			: features.find((feature) => feature.id === id)
// 					?.isLocked;

// 	// If the object is locked, do nothing
// 	if (isLocked) return;

// 	if (type === "table") {
// 		setTables((prevTables) =>
// 			prevTables.map((table) =>
// 				table.id === id ? { ...table, x, y } : table
// 			)
// 		);
// 	} else {
// 		setFeatures((prevFeatures) =>
// 			prevFeatures.map((feature) =>
// 				feature.id === id ? { ...feature, x, y } : feature
// 			)
// 		);
// 	}
// };
