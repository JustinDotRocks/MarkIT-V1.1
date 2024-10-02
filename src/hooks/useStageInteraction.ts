import { useEffect } from "react";
import Konva from "konva";

export const useStageInteraction = (
	stageRef: React.RefObject<Konva.Stage>,
	handleWheel: (e: Konva.KonvaEventObject<WheelEvent>) => void
) => {
	useEffect(() => {
		const stage = stageRef.current;
		if (stage) {
			// Attach the wheel event handler for zooming
			stage.on("wheel", handleWheel);

			// Force an update to ensure all Konva internals are set up
			stage.batchDraw();

			return () => {
				stage.off("wheel", handleWheel);
			};
		}
	}, [handleWheel, stageRef]);
};
