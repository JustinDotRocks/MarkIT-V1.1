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
	vendors,
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

	const handleDragEnd = (e: any) => {
		const id = item.id;
		const x = e.target.x() / containerSize.width;
		const y = e.target.y() / containerSize.height;

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

		const foundItem = item.type.includes("table")
			? tables.find((table) => table.id === id)
			: features.find((feature) => feature.id === id);

		if (!foundItem || foundItem.isLocked) return;
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
