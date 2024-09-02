import React from "react";
import { Rect, Circle } from "react-konva";
import { DragAndDropComponentProps, Feature } from "../Types";

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

	console.log("FeatureComponent rendering feature:", feature);

	// Define dimensions for different feature types
	const featureDimensions: {
		[key: string]: { width?: number; height?: number; radius?: number };
	} = {
		door: { width: 1.5, height: 1 },
		obstacle: { radius: 2 },
	};

	const isDoor = feature.type === "door";

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

	return (
		<>
			{isDoor ? (
				<Rect
					id={feature.id}
					type="feature"
					x={feature.x * containerSize.width}
					y={feature.y * containerSize.height}
					width={featureWidthPixels}
					height={featureHeightPixels}
					fill="orange"
					draggable={!feature.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					onClick={(e) =>
						onObjectClick(
							feature.id,
							"feature",
							e.evt.clientX,
							e.evt.clientY
						)
					}
					rotation={feature.rotation || 0}
					offsetX={featureWidthPixels / 2}
					offsetY={featureHeightPixels / 2}
				/>
			) : (
				<Circle
					id={feature.id}
					type="feature"
					x={feature.x * containerSize.width}
					y={feature.y * containerSize.height}
					radius={featureRadiusPixels}
					fill="black"
					draggable={!feature.isLocked}
					onDragMove={onDragMove}
					onDragEnd={onDragEnd}
					onClick={(e) =>
						onObjectClick(
							feature.id,
							"feature",
							e.evt.clientX,
							e.evt.clientY
						)
					}
					rotation={feature.rotation || 0}
					offsetX={featureWidthPixels / 2}
					offsetY={featureHeightPixels / 2}
				/>
			)}
		</>
	);
};

export default FeatureComponent;
