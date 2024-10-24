import { useCallback } from "react";
import Konva from "konva";
import { SelectedObject, Position } from "../Types";

export const useOptionsBarPosition = (
	selectedObject: SelectedObject | null,
	stageRef: React.RefObject<Konva.Stage>,
	scale: number
) => {
	const getOptionsBarPosition = useCallback((): Position => {
		const defaultPosition: Position = { x: 0, y: 0 };

		// if (!selectedObject) return defaultPosition;
		if (!selectedObject || !stageRef.current) return defaultPosition;

		const stage = stageRef.current;
		// if (!stage) {
		// 	return defaultPosition;
		// }
		// const layer = stage.getLayers()[0];
		// const node = layer.findOne<Konva.Node>(`#${selectedObject.id}`);
		const node = stage.findOne<Konva.Node>(`#${selectedObject.id}`);

		if (!node) {
			return defaultPosition;
		}

		// Get the node's bounding box in the stage coordinate system
		const nodeRect = node.getClientRect({ relativeTo: stage });

		// Get the top-left corner of the node's bounding box
		const nodePosition = {
			x: nodeRect.x + nodeRect.width / 2,
			y: nodeRect.y + nodeRect.height / 2,
		};

		// Apply the stage's absolute transform to the node's position
		const transform = stage.getAbsoluteTransform();
		const position = transform.point(nodePosition);

		// Get the position of the canvas in the screen coordinate system
		const containerRect = stage.container().getBoundingClientRect();

		// The final position is the sum of the container's position and the transformed node position
		const absolutePosition = {
			x: containerRect.left + position.x,
			y: containerRect.top + position.y,
		};

		return absolutePosition;

		// if (node) {
		// 	const transform = node.getAbsoluteTransform().copy();
		// 	// Get the center point of the object
		// 	const objectCenter: Position = {
		// 		x: node.width() / 2,
		// 		y: node.height() / 2,
		// 	};
		// 	// transform the node position to the screen coordinate system
		// 	const position = transform.point(objectCenter); // Get position of the center

		// 	// get the position of the stage container on the page
		// 	const stageContainerRect = stage
		// 		.container()
		// 		.getBoundingClientRect();

		// 	const absolutePosition: Position = {
		// 		x: stageContainerRect.left + position.x * scale,
		// 		y: stageContainerRect.top + position.y * scale,
		// 	};

		// 	return absolutePosition;
		// }
		// if (node) {
		// 	// Get the node's absolute position
		// 	const nodePosition = node.getAbsolutePosition();

		// 	// Account for the stage's absolute position and transformations
		// 	const stageTransform = stage
		// 		.getAbsoluteTransform()
		// 		.copy()
		// 		.invert();

		// 	// Transform the node position to the stage's coordinate system
		// 	const transformedPosition =
		// 		stageTransform.point(nodePosition);

		// 	// Get the position relative to the container (DOM element)
		// 	const containerRect = stage
		// 		.container()
		// 		.getBoundingClientRect();

		// 	// Calculate the absolute position on the screen
		// 	const absolutePosition: Position = {
		// 		x:
		// 			containerRect.left +
		// 			transformedPosition.x * stage.scaleX(),
		// 		y:
		// 			containerRect.top +
		// 			transformedPosition.y * stage.scaleY(),
		// 	};

		// 	return absolutePosition;
		// }

		// return defaultPosition;
	}, [selectedObject, stageRef]);
	// , scale

	return getOptionsBarPosition;
};
