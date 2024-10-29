import { useCallback } from "react";
import Konva from "konva";
import { SelectedObject, Position } from "../Types";

export const useOptionsBarPosition = (
	selectedObject: SelectedObject | null,
	stageRef: React.RefObject<Konva.Stage>
	// scale: number
) => {
	const getOptionsBarPosition = useCallback((): Position => {
		const defaultPosition: Position = { x: 0, y: 0 };

		// if (!selectedObject) return defaultPosition;
		if (!selectedObject || !stageRef.current) return defaultPosition;

		const stage = stageRef.current;

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
	}, [selectedObject, stageRef]);

	return getOptionsBarPosition;
};
