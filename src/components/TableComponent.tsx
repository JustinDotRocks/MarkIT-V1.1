import React from "react";
import { Rect, Circle, Text } from "react-konva";
import { DragAndDropComponentProps, Table } from "../Types";

const TableComponent: React.FC<DragAndDropComponentProps> = ({
	item,
	containerSize,
	room,
	feetToPixels,
	onDragMove,
	onDragEnd,
	onObjectClick,
}) => {
	const table = item as Table;
	const tableDimensions = {
		"table-6": { width: 6, height: 2.5 },
		"table-8": { width: 8, height: 2.5 },
		"table-5": { width: 5, height: 5 },
	};

	const dimensions = tableDimensions[table.type];
	const tableWidthPixels =
		dimensions.width *
		feetToPixels *
		(containerSize.width /
			(room?.width ? parseFloat(room.width) * feetToPixels : 1));
	const tableHeightPixels =
		dimensions.height *
		feetToPixels *
		(containerSize.width /
			(room?.width ? parseFloat(room.width) * feetToPixels : 1));

	const textX = table.x * containerSize.width + tableWidthPixels / 2;
	const textY = table.y * containerSize.height + tableHeightPixels / 2;

	const isCircle = table.type === "table-5";

	const getFontSizes = (roomWidthFeet: number, isCircle: boolean) => {
		if (roomWidthFeet < 50) {
			return {
				tableNumberFontSize: 16,
				xOffset: isCircle ? 40 : 38,
				yOffset: isCircle ? 50 : 0,
			};
		} else if (roomWidthFeet < 100) {
			return {
				tableNumberFontSize: 10,
				xOffset: isCircle ? 20 : 18,
				yOffset: isCircle ? 25 : 0,
			};
		} else if (roomWidthFeet < 150) {
			return {
				tableNumberFontSize: 8,
				xOffset: isCircle ? 12 : 12,
				yOffset: isCircle ? 15 : 0,
			};
		} else if (roomWidthFeet < 200) {
			return {
				tableNumberFontSize: 5,
				xOffset: isCircle ? 9 : 8,
				yOffset: isCircle ? 10 : 0,
			};
		} else {
			return {
				tableNumberFontSize: 4,
				xOffset: isCircle ? 6 : 5,
				yOffset: isCircle ? 7 : 0,
			};
		}
	};

	const { tableNumberFontSize, xOffset, yOffset } = room
		? getFontSizes(parseFloat(room.width), isCircle)
		: { tableNumberFontSize: 12, xOffset: 35, yOffset: 0 };

	return (
		<React.Fragment>
			{isCircle ? (
				<Circle
					id={table.id}
					type="table"
					x={table.x * containerSize.width}
					y={table.y * containerSize.height}
					radius={
						(dimensions.width *
							feetToPixels *
							(containerSize.width /
								(room?.width
									? parseFloat(room.width) *
									  feetToPixels
									: 1))) /
						2
					}
					fill="blue"
					draggable={!table.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					onClick={(e) =>
						onObjectClick(
							table.id,
							"table",
							e.evt.clientX,
							e.evt.clientY
						)
					}
					offsetX={0}
					offsetY={0}
					rotation={table.rotation || 0}
				/>
			) : (
				<Rect
					id={table.id}
					type="table"
					x={table.x * containerSize.width}
					y={table.y * containerSize.height}
					width={tableWidthPixels}
					height={tableHeightPixels}
					fill="blue"
					draggable={!table.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					rotation={table.rotation || 0}
					offsetX={tableWidthPixels / 2}
					offsetY={tableHeightPixels / 2}
					onClick={(e) =>
						onObjectClick(
							table.id,
							"table",
							e.evt.clientX,
							e.evt.clientY
						)
					}
				/>
			)}
			<Text
				x={textX - xOffset}
				y={textY - yOffset}
				text={`${table.tableNumber}`}
				fontSize={tableNumberFontSize}
				fill="white"
				draggable={!table.isLocked}
				onDragMove={onDragMove}
				onDragEnd={onDragEnd}
				onClick={(e) =>
					onObjectClick(
						table.id,
						"table",
						e.evt.clientX,
						e.evt.clientY
					)
				}
				rotation={table.rotation || 0}
				align="center"
				verticalAlign="middle"
				offsetX={tableWidthPixels / 2}
				offsetY={tableHeightPixels / 2}
			/>
		</React.Fragment>
	);
};

export default TableComponent;
