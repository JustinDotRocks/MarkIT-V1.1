import { useEffect, useRef } from "react";
import Konva from "konva";

export const useTouchZoom = (
	stageRef: React.RefObject<Konva.Stage>,
	setScale: React.Dispatch<React.SetStateAction<number>>,
	setStagePosition: React.Dispatch<
		React.SetStateAction<{ x: number; y: number }>
	>
) => {
	const lastCenter = useRef<{ x: number; y: number } | null>(null);
	const lastDist = useRef(0);

	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;

		const content = stage.getContent();

		const handleTouchMove = (e: TouchEvent) => {
			e.preventDefault();
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];

			const stage = stageRef.current;
			if (!stage) return;

			if (touch1 && touch2) {
				// Pinch zoom
				if (stage.isDragging()) {
					stage.stopDrag();
				}

				const p1 = {
					x: touch1.clientX,
					y: touch1.clientY,
				};
				const p2 = {
					x: touch2.clientX,
					y: touch2.clientY,
				};

				// Calculate the center point between the two touches
				const center = {
					x: (p1.x + p2.x) / 2,
					y: (p1.y + p2.y) / 2,
				};

				// Calculate the distance between the two touches
				const dist = Math.sqrt(
					Math.pow(p1.x - p2.x, 2) +
						Math.pow(p1.y - p2.y, 2)
				);

				if (!lastCenter.current) {
					lastCenter.current = center;
				}

				if (!lastDist.current) {
					lastDist.current = dist;
				}

				// Calculate the scale factor
				const scale =
					stage.scaleX() * (dist / lastDist.current);

				// Limit the scale factor
				const newScale = Math.max(0.25, Math.min(3, scale));
				setScale(newScale);

				// Calculate the new position
				const pointer = stage.getPointerPosition();
				if (pointer) {
					const mousePointTo = {
						x: (pointer.x - stage.x()) / stage.scaleX(),
						y: (pointer.y - stage.y()) / stage.scaleY(),
					};

					const newPos = {
						x: pointer.x - mousePointTo.x * newScale,
						y: pointer.y - mousePointTo.y * newScale,
					};

					setStagePosition(newPos);
					stage.scale({ x: newScale, y: newScale });
					stage.position(newPos);
					stage.batchDraw();
				}

				lastDist.current = dist;
				lastCenter.current = center;
			} else if (touch1) {
				// Single touch - pan
				if (lastCenter.current) {
					const dx = touch1.clientX - lastCenter.current.x;
					const dy = touch1.clientY - lastCenter.current.y;

					const newPos = {
						x: stage.x() + dx,
						y: stage.y() + dy,
					};

					setStagePosition(newPos);
					stage.position(newPos);
					stage.batchDraw();

					lastCenter.current = {
						x: touch1.clientX,
						y: touch1.clientY,
					};
				}
			}
		};

		const handleTouchStart = (e: TouchEvent) => {
			e.preventDefault();
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];

			if (touch1 && touch2) {
				// Two-finger touch
				lastDist.current = 0;
				lastCenter.current = null;
			} else if (touch1) {
				lastCenter.current = {
					x: touch1.clientX,
					y: touch1.clientY,
				};
			}
		};

		const handleTouchEnd = (e: TouchEvent) => {
			e.preventDefault();
			if (e.touches.length < 2) {
				lastDist.current = 0;
				lastCenter.current = null;
			}
		};

		content.addEventListener("touchmove", handleTouchMove, {
			passive: false,
		});
		content.addEventListener("touchstart", handleTouchStart, {
			passive: false,
		});
		content.addEventListener("touchend", handleTouchEnd, {
			passive: false,
		});

		return () => {
			content.removeEventListener("touchmove", handleTouchMove);
			content.removeEventListener("touchstart", handleTouchStart);
			content.removeEventListener("touchend", handleTouchEnd);
		};
	}, [stageRef, setScale, setStagePosition]);
};
