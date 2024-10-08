import React from "react";
import { Rect } from "react-konva";
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
}) => {
	const feature = item as Feature;

	// Define dimensions for different feature types
	const featureDimensions: {
		[key: string]: { width: number; height: number; radius?: number };
	} = {
		door: { width: 3, height: 1.5 },
		obstacle: { width: 1, height: 1 },
	};

	const isDoor = feature.type === "door";
	const isObstacle = feature.type === "obstacle";

	const scaleFactor =
		containerSize.width /
		(parseFloat(room?.depth || "1") * feetToPixels);

	// Calculate dimensions in pixels
	const dimensions = featureDimensions[feature.type];

	const featureWidthPixels = dimensions.width * feetToPixels * scaleFactor;
	const featureHeightPixels =
		dimensions.height * feetToPixels * scaleFactor;

	const handleClick = (e: KonvaEventObject<MouseEvent>) => {
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
					fill={isDoor ? "#be7327" : "black"}
					draggable={!feature.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					rotation={feature.rotation || 0}
					offsetX={featureWidthPixels / 2}
					offsetY={featureHeightPixels / 2}
					onClick={handleClick}
					onTap={handleClick}
				/>
			) : null}
		</>
	);
};

export default FeatureComponent;
