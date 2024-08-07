// import { Table, Feature, DragAndDropHandlerProps } from "../Types";

// export const handleDragMove = (e: any, params: DragAndDropHandlerProps) => {
// 	const { containerSize, tables, features } = params;
// 	const node = e.target;
// 	const id = node.attrs.id;
// 	const type = node.attrs.type;

// 	const item =
// 		type === "table"
// 			? tables.find((table) => table.id === id)
// 			: features.find((feature) => feature.id === id);

// 	console.log("handleDragMove", { id, type, containerSize, item });

// 	if (item?.isLocked) {
// 		return; // Prevent dragging if the item is locked
// 	}

// 	// Get dimensions of the item being dragged
// 	const itemWidthFeet =
// 		type === "table"
// 			? tables.find((table) => table.id === id)?.type === "table-6"
// 				? 6
// 				: tables.find((table) => table.id === id)?.type ===
// 				  "table-8"
// 				? 8
// 				: 5
// 			: 1.5; // Assuming feature width is 1.5 feet for example
// 	const itemHeightFeet =
// 		type === "table"
// 			? 2.5 // Assuming table height is 2.5 feet for all types
// 			: 1.5; // Assuming feature height is 1.5 feet for example

// 	const itemWidthPixels = itemWidthFeet * 25; // feetToPixels
// 	const itemHeightPixels = itemHeightFeet * 25; // feetToPixels

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

// export const handleDragEnd = (
// 	id: string,
// 	type: "table" | "feature",
// 	e: any,
// 	params: DragAndDropHandlerProps
// ) => {
// 	const { containerSize, tables, features, setTables, setFeatures } =
// 		params;
// 	const x = e.target.x() / containerSize.width;
// 	const y = e.target.y() / containerSize.height;

// 	console.log("handleDragEnd coordinates calculated", { x, y });

// 	// const isLocked =
// 	// 	type === "table"
// 	// 		? tables.find((table) => table.id === id)?.isLocked
// 	// 		: features.find((feature) => feature.id === id)?.isLocked;

// 	// // If the object is locked, do nothing
// 	// if (isLocked) return;
// 	const item =
// 		type === "table"
// 			? tables.find((table) => table.id === id)
// 			: features.find((feature) => feature.id === id);

// 	console.log("handleDragEnd", { id, type, item });

// 	// If the object is not found or is locked, do nothing
// 	if (!item || item.isLocked) return;

// 	if (!item) {
// 		console.error(`Item not found: ${type} with id ${id}`);
// 		return;
// 	}

// 	if (item.isLocked) {
// 		console.warn(`Item is locked: ${type} with id ${id}`);
// 		return;
// 	}

// 	console.log("Updating item position", { id, type, x, y });

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

import React from "react";
import { Table, Feature, DragAndDropHandlerProps } from "../Types";

const DragAndDropHandler: React.FC<DragAndDropHandlerProps> = ({
	item,
	containerSize,
	tables,
	features,
	setTables,
	setFeatures,
	onObjectClick,
	Component,
}) => {
	// const isTable = (item: any): item is Table => {
	// 	return ["table-6", "table-8", "table-5"].includes(item.type);
	// };

	const handleDragMove = (e: any) => {
		const node = e.target;
		const id = node.attrs.id;
		const type = item.type;

		// const foundItem = isTable(item)
		// 	? tables.find((table) => table.id === id)
		// 	: features.find((feature) => feature.id === id);
		const foundItem = type.includes("table")
			? tables.find((table) => table.id === id)
			: features.find((feature) => feature.id === id);

		if (foundItem?.isLocked) {
			return; // Prevent dragging if the item is locked
		}

		// const itemWidthFeet = isTable(foundItem)
		// 	? foundItem?.type === "table-6"
		// 		? 6
		// 		: foundItem?.type === "table-8"
		// 		? 8
		// 		: 5
		// 	: 1.5; // Assuming feature width is 1.5 feet for example
		// const itemHeightFeet = isTable(foundItem)
		// 	? 2.5 // Assuming table height is 2.5 feet for all types
		// 	: 1.5; // Assuming feature height is 1.5 feet for example
		const itemWidthFeet =
			type === "table-6" ? 6 : type === "table-8" ? 8 : 5; // Handle table types
		const itemHeightFeet = type.includes("table") ? 2.5 : 1.5; // Assuming feature height is 1.5 feet for example

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

		// const foundItem = isTable(item)
		// 	? tables.find((table) => table.id === id)
		// 	: features.find((feature) => feature.id === id);
		const foundItem = item.type.includes("table")
			? tables.find((table) => table.id === id)
			: features.find((feature) => feature.id === id);

		if (!foundItem || foundItem.isLocked) return;

		// if (isTable(item)) {
		// 	setTables((prevTables) =>
		// 		prevTables.map((table) =>
		// 			table.id === id ? { ...table, x, y } : table
		// 		)
		// 	);
		// } else {
		// 	setFeatures((prevFeatures) =>
		// 		prevFeatures.map((feature) =>
		// 			feature.id === id ? { ...feature, x, y } : feature
		// 		)
		// 	);
		// }
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
	};

	return (
		<Component
			item={item}
			onDragMove={handleDragMove}
			onDragEnd={handleDragEnd}
			onObjectClick={onObjectClick}
		/>
	);
};

export default DragAndDropHandler;
