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

		if (!selectedObject) return defaultPosition;

		const stage = stageRef.current;
		if (!stage) {
			return defaultPosition;
		}
		const layer = stage.getLayers()[0];
		const node = layer.findOne<Konva.Node>(`#${selectedObject.id}`);

		if (node) {
			const transform = node.getAbsoluteTransform().copy();
			// Get the center point of the object
			const objectCenter: Position = {
				x: node.width() / 2,
				y: node.height() / 2,
			};
			// transform the node position to the screen coordinate system
			const position = transform.point(objectCenter); // Get position of the center

			// get the position of the stage container on the page
			const stageContainerRect = stage
				.container()
				.getBoundingClientRect();

			const absolutePosition: Position = {
				x: stageContainerRect.left + position.x * scale,
				y: stageContainerRect.top + position.y * scale,
			};

			return absolutePosition;
		}

		return defaultPosition;
	}, [selectedObject, stageRef, scale]);

	return getOptionsBarPosition;
};
