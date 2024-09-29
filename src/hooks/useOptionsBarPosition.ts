import { useCallback } from "react";

export const useOptionsBarPosition = (
	selectedObject: any,
	stageRef: React.RefObject<any>,
	scale: number
) => {
	const getOptionsBarPosition = useCallback(() => {
		if (!selectedObject) return { x: 0, y: 0 };

		const stage = stageRef.current;
		const layer = stage.getLayers()[0];
		const node = layer.findOne(`#${selectedObject.id}`);

		if (node) {
			const transform = node.getAbsoluteTransform().copy();
			// Get the center point of the object
			const objectCenter = {
				x: node.width() / 2,
				y: node.height() / 2,
			};
			// transform the node position to the screen coordinate system
			const position = transform.point(objectCenter); // Get position of the center

			// get the position of the stage container on the page
			const stageContainerRect = stage
				.container()
				.getBoundingClientRect();

			// calculate the absolute position on the screen
			const absoluteX =
				stageContainerRect.left + position.x * scale;
			const absoluteY = stageContainerRect.top + position.y * scale;

			return { x: absoluteX, y: absoluteY };
		}

		return { x: 0, y: 0 };
	}, [selectedObject, stageRef, scale]);

	return getOptionsBarPosition;
};
