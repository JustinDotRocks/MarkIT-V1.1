import { useState, useEffect } from "react";
import { Room } from "../Types";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { feetToPixels } from "../utils/constants";
// import { useTouchZoom } from "./useTouchZoom";

export const useCanvasSize = (
	room: Room | undefined,
	containerRef: React.RefObject<HTMLDivElement>,
	stageRef: React.RefObject<Konva.Stage>
) => {
	const [containerSize, setContainerSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [stageRotation, setStageRotation] = useState(0);
	const [scale, setScale] = useState(1);
	const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateContainerSize = () => {
			if (containerRef.current && room) {
				const containerWidth = containerRef.current.clientWidth;
				const containerHeight =
					containerRef.current.clientHeight;

				const roomWidthFeet = parseFloat(room.width);
				const roomHeightFeet = parseFloat(room.depth);

				let roomWidthPixels = roomWidthFeet * feetToPixels;
				let roomHeightPixels = roomHeightFeet * feetToPixels;

				const isMobile = window.innerWidth < 768;
				const isPortraitMode =
					window.innerHeight > window.innerWidth;

				// Rotation logic for mobile and desktop
				if (isMobile && isPortraitMode) {
					[roomWidthPixels, roomHeightPixels] = [
						roomHeightPixels,
						roomWidthPixels,
					];
					if (roomWidthFeet > roomHeightFeet) {
						setStageRotation(0); // No rotation needed
					} else {
						setStageRotation(90); // Rotate to fit width along y-axis
					}
				} else {
					// In desktop, make sure the greater dimension is aligned with x-axis
					if (roomHeightFeet > roomWidthFeet) {
						[roomWidthPixels, roomHeightPixels] = [
							roomHeightPixels,
							roomWidthPixels,
						];
						setStageRotation(0); // No rotation needed
					} else {
						[roomWidthPixels, roomHeightPixels] = [
							roomHeightPixels,
							roomWidthPixels,
						];
						setStageRotation(90); // Rotate to fit height along x-axis
					}
				}

				// Compute the scale factor to fit the room within the container
				const scaleX = containerWidth / roomWidthPixels;
				const scaleY = containerHeight / roomHeightPixels;
				const scale = Math.min(scaleX, scaleY);

				setScale(scale);

				// Set the offset of the stage to rotate around the center
				const containerCenterX = containerWidth / 2;
				const containerCenterY = containerHeight / 2;

				setContainerSize({
					width: roomWidthPixels,
					height: roomHeightPixels,
				});

				setStagePosition({
					x: containerCenterX,
					y: containerCenterY,
				});

				if (stageRef.current) {
					stageRef.current.offsetX(roomWidthPixels / 2);
					stageRef.current.offsetY(roomHeightPixels / 2);
					stageRef.current.scale({ x: scale, y: scale });
					stageRef.current.position({
						x: containerCenterX,
						y: containerCenterY,
					});
					stageRef.current.batchDraw(); // Update the stage
				}
			}
		};

		updateContainerSize();
		window.addEventListener("resize", updateContainerSize);

		return () => {
			window.removeEventListener("resize", updateContainerSize);
		};
	}, [room]);

	// Handle zooming with mouse wheel
	const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
		e.evt.preventDefault();

		const stage = stageRef.current;
		if (!stage) return;
		const oldScale = stage.scaleX();
		const pointer = stage.getPointerPosition() || { x: 0, y: 0 };

		const scaleBy = 1.01; // Zoom factor
		let direction = e.evt.deltaY > 0 ? 1 : -1;

		// Revert zoom direction when using ctrlKey (for touchpads)
		if (e.evt.ctrlKey) {
			direction = -direction;
		}

		const newScale =
			direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

		setScale(newScale);

		const mousePointTo = {
			x: (pointer.x - stage.x()) / oldScale,
			y: (pointer.y - stage.y()) / oldScale,
		};

		const newPos = {
			x: pointer.x - mousePointTo.x * newScale,
			y: pointer.y - mousePointTo.y * newScale,
		};

		setStagePosition(newPos);
		stage.scale({ x: newScale, y: newScale });
		stage.position(newPos);
		stage.batchDraw(); // Update the stage
	};

	// Handle zoom slider change
	const handleZoomChange = (newScale: number) => {
		const stage = stageRef.current;

		if (stage) {
			const oldScale = stage.scaleX();
			const pointer = stage.getPointerPosition() || { x: 0, y: 0 };

			setScale(newScale);

			const mousePointTo = {
				x: (pointer.x - stage.x()) / oldScale,
				y: (pointer.y - stage.y()) / oldScale,
			};

			const newPos = {
				x: pointer.x - mousePointTo.x * newScale,
				y: pointer.y - mousePointTo.y * newScale,
			};

			setStagePosition(newPos);
			stage.scale({ x: newScale, y: newScale });
			stage.position(newPos);
			stage.batchDraw(); // Update the stage
		}
	};
	// useTouchZoom(stageRef, setScale, setStagePosition);

	return {
		containerSize,
		stageRotation,
		scale,
		stagePosition,
		handleWheel,
		handleZoomChange,
		setScale,
		setStagePosition,
	};
};
