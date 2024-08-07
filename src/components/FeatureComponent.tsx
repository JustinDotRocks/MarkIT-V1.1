// import React from "react";
// import { Rect, Circle } from "react-konva";
// import { Feature, Room, FeatureComponentProps } from "../Types";

// const FeatureComponent: React.FC<FeatureComponentProps> = ({
// 	feature,
// 	containerSize,
// 	room,
// 	feetToPixels,
// 	handleDragMove,
// 	handleDragEnd,
// 	handleObjectClick,
// }) => {
// 	const isDoor = feature.type === "door";

// 	// const onDragEndHandler = (e: any) => {
// 	// 	handleDragEnd(feature.id, "feature", e);
// 	// };

// 	return (
// 		<React.Fragment>
// 			{isDoor ? (
// 				<Rect
// 					id={feature.id}
// 					type="feature"
// 					x={feature.x * containerSize.width}
// 					y={feature.y * containerSize.height}
// 					width={
// 						2 *
// 						feetToPixels *
// 						(containerSize.width /
// 							(room?.width
// 								? parseFloat(room.width) *
// 								  feetToPixels
// 								: 1))
// 					}
// 					height={
// 						2 *
// 						feetToPixels *
// 						(containerSize.width /
// 							(room?.width
// 								? parseFloat(room.width) *
// 								  feetToPixels
// 								: 1))
// 					}
// 					fill="green"
// 					draggable={!feature.isLocked}
// 					// onDragMove={(e) => handleDragMove(e)}
// 					// onDragEnd={(e) =>
// 					// 	handleDragEnd(feature.id, "feature", e)
// 					// }
// 					onClick={(e) =>
// 						handleObjectClick(
// 							feature.id,
// 							"feature",
// 							e.evt.clientX,
// 							e.evt.clientY
// 						)
// 					}
// 				/>
// 			) : (
// 				<Circle
// 					id={feature.id}
// 					type="feature"
// 					x={feature.x * containerSize.width}
// 					y={feature.y * containerSize.height}
// 					radius={15}
// 					fill="red"
// 					draggable={!feature.isLocked}
// 					// onDragMove={(e) => handleDragMove(e)}
// 					// onDragEnd={(e) =>
// 					// 	handleDragEnd(feature.id, "feature", e)
// 					// }
// 					onClick={(e) =>
// 						handleObjectClick(
// 							feature.id,
// 							"feature",
// 							e.evt.clientX,
// 							e.evt.clientY
// 						)
// 					}
// 					rotation={feature.rotation || 0}
// 				/>
// 			)}
// 		</React.Fragment>
// 	);
// };

// export default FeatureComponent;

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
	const isDoor = feature.type === "door";

	return (
		<React.Fragment>
			{isDoor ? (
				<Rect
					id={feature.id}
					type="feature"
					x={feature.x * containerSize.width}
					y={feature.y * containerSize.height}
					width={
						2 *
						feetToPixels *
						(containerSize.width /
							(room?.width
								? parseFloat(room.width) *
								  feetToPixels
								: 1))
					}
					height={
						2 *
						feetToPixels *
						(containerSize.width /
							(room?.width
								? parseFloat(room.width) *
								  feetToPixels
								: 1))
					}
					fill="green"
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
				/>
			) : (
				<Circle
					id={feature.id}
					type="feature"
					x={feature.x * containerSize.width}
					y={feature.y * containerSize.height}
					radius={15}
					fill="red"
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
				/>
			)}
		</React.Fragment>
	);
};

export default FeatureComponent;
