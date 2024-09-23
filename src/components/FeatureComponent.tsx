import React from "react";
import { Rect, Circle } from "react-konva";
import { DragAndDropComponentProps, Feature } from "../Types";
import { KonvaEventObject } from "konva/lib/Node";

const FeatureComponent: React.FC<DragAndDropComponentProps> = ({
	item,
	onDragMove,
	onDragEnd,
	onObjectClick,
	containerSize,
	feetToPixels,
	room,
	onTouchStart,
}) => {
	const feature = item as Feature;

	// Define dimensions for different feature types
	const featureDimensions: {
		[key: string]: { width?: number; height?: number; radius?: number };
	} = {
		door: { width: 2.1, height: 1 },
		obstacle: { width: 1, height: 1 },
	};

	const isDoor = feature.type === "door";
	const isObstacle = feature.type === "obstacle";

	// Calculate dimensions in pixels
	const dimensions = featureDimensions[feature.type] || {};

	const featureWidthPixels =
		(dimensions.width || 0) *
		feetToPixels *
		(containerSize.width /
			(room?.width ? parseFloat(room.width) * feetToPixels : 1));

	const featureHeightPixels =
		(dimensions.height || 0) *
		feetToPixels *
		(containerSize.width /
			(room?.width ? parseFloat(room.width) * feetToPixels : 1));

	const featureRadiusPixels =
		(dimensions.radius || 0) *
		feetToPixels *
		(containerSize.width /
			(room?.width
				? parseFloat(room.width) * (feetToPixels + 50)
				: 1));

	// Event handler for clicks and taps
	// const handleClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
	// 	e.cancelBubble = true; // Prevents event bubbling

	// 	const stage = e.target.getStage();
	// 	if (!stage) return;

	// 	// Get the pointer position relative to the stage
	// 	const pointerPosition = stage.getPointerPosition();
	// 	if (!pointerPosition) return;

	// 	// Get the stage's position and scale
	// 	const stageBox = stage.container().getBoundingClientRect();
	// 	const scale = stage.scaleX(); // Assuming uniform scaling

	// 	// Calculate the absolute position in the viewport
	// 	const x = stageBox.left + pointerPosition.x * scale;
	// 	const y = stageBox.top + pointerPosition.y * scale;

	// 	onObjectClick(feature.id, "feature", x, y, featureHeightPixels);
	// };
	const handleClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
		e.cancelBubble = true; // Prevent event bubbling

		onObjectClick(feature.id, "feature", feature.x, feature.y);
	};

	return (
		<>
			{isDoor || isObstacle ? (
				<Rect
					id={feature.id}
					type="feature"
					x={feature.x * containerSize.width}
					y={feature.y * containerSize.height}
					width={featureWidthPixels}
					height={featureHeightPixels}
					fill={isDoor ? "#be7327" : "black"} // Orange for doors, black for obstacles
					draggable={!feature.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					// onClick={(e) =>
					// 	onObjectClick(
					// 		feature.id,
					// 		"feature",
					// 		e.evt.clientX,
					// 		e.evt.clientY
					// 	)
					// }
					rotation={feature.rotation || 0}
					offsetX={featureWidthPixels / 2}
					offsetY={featureHeightPixels / 2}
					// onTouchStart={onTouchStart}
					// onTap={onTouchStart}
					onClick={handleClick}
					onTap={handleClick}
				/>
			) : null}
		</>
	);
};

export default FeatureComponent;
