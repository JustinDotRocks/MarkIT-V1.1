import React from "react";
import { Rect, Circle, Text } from "react-konva";
import { DragAndDropComponentProps, Table } from "../Types";
import { KonvaEventObject } from "konva/lib/Node";

const TableComponent: React.FC<DragAndDropComponentProps> = ({
	item,
	containerSize,
	room,
	feetToPixels,
	onDragMove,
	onDragEnd,
	onObjectClick,
	vendors = [],
}) => {
	const table = item as Table;
	const tableDimensions = {
		"table-6": { width: 6, height: 2.5 },
		"table-8": { width: 8, height: 2.5 },
		"table-5": { width: 5, height: 5 },
	};

	const dimensions = tableDimensions[table.type];

	const scaleFactor =
		containerSize.width /
		(parseFloat(room?.depth || "1") * feetToPixels);

	const tableWidthPixels = dimensions.width * feetToPixels * scaleFactor;
	const tableHeightPixels = dimensions.height * feetToPixels * scaleFactor;

	const isCircle = table.type === "table-5";

	const getFontSizes = (roomWidthFeet: number, isCircle: boolean) => {
		if (roomWidthFeet < 50) {
			return {
				tableNumberFontSize: 28,
				xOffset: isCircle ? 40 : 38,
				yOffset: isCircle ? 50 : 0,
			};
		} else if (roomWidthFeet < 100) {
			return {
				tableNumberFontSize: 26,
				xOffset: isCircle ? 20 : 18,
				yOffset: isCircle ? 25 : 0,
			};
		} else if (roomWidthFeet < 150) {
			return {
				tableNumberFontSize: 24,
				xOffset: isCircle ? 12 : 12,
				yOffset: isCircle ? 15 : 0,
			};
		} else if (roomWidthFeet < 200) {
			return {
				tableNumberFontSize: 22,
				xOffset: isCircle ? 9 : 8,
				yOffset: isCircle ? 10 : 0,
			};
		} else {
			return {
				tableNumberFontSize: 20,
				xOffset: isCircle ? 6 : 5,
				yOffset: isCircle ? 7 : 0,
			};
		}
	};

	const { tableNumberFontSize } = room
		? getFontSizes(parseFloat(room.width), isCircle)
		: { tableNumberFontSize: 12 };

	// Calculate the radius based on the table's actual dimensions
	const circleRadiusPixels = isCircle
		? (dimensions.width * feetToPixels * scaleFactor) / 2
		: 0;

	// Determine the vendor associated with this table
	const associatedVendor = vendors.find(
		(vendor) => vendor.id === table.vendorId
	);

	const fillColor = associatedVendor
		? associatedVendor.signedIn
			? "#496f3d" // Green color to match "bg-green-500"
			: "#de5e46" // Red color to match "bg-red-500"
		: "#628b98"; // Grey color if no vendor is associated

	const handleClick = (e: KonvaEventObject<MouseEvent>) => {
		e.cancelBubble = true; // Prevent event bubbling

		onObjectClick(table.id, "table", table.x, table.y);
	};

	return (
		<React.Fragment>
			{isCircle ? (
				<Circle
					id={table.id}
					type="table"
					x={table.x * containerSize.width}
					y={table.y * containerSize.height}
					radius={circleRadiusPixels}
					fill={fillColor}
					draggable={!table.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					offsetX={0}
					offsetY={0}
					rotation={table.rotation || 0}
					onClick={handleClick}
					onTap={handleClick}
				/>
			) : (
				<Rect
					id={table.id}
					type="table"
					x={table.x * containerSize.width}
					y={table.y * containerSize.height}
					width={tableWidthPixels}
					height={tableHeightPixels}
					fill={fillColor}
					draggable={!table.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					rotation={table.rotation || 0}
					offsetX={tableWidthPixels / 2}
					offsetY={tableHeightPixels / 2}
					onClick={handleClick}
					onTap={handleClick}
				/>
			)}
			<Text
				x={table.x * containerSize.width}
				y={table.y * containerSize.height}
				text={`${table.tableNumber}`}
				fontSize={tableNumberFontSize}
				fill="white"
				draggable={!table.isLocked}
				onDragMove={onDragMove}
				onDragEnd={onDragEnd}
				onClick={handleClick}
				onTap={handleClick}
				rotation={table.rotation || 0}
				align="center"
				verticalAlign="middle"
				offsetX={isCircle ? 4 : tableWidthPixels / 20}
				offsetY={isCircle ? 8 : tableHeightPixels / 6}
			/>
		</React.Fragment>
	);
};

export default TableComponent;
