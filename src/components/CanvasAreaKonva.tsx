import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const CanvasAreaKonva: React.FC = () => {
	return (
		<div className="flex-grow overflow-y-auto p-2 h-96">
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					<Text text="Try to drag the rect" x={10} y={10} />
					<Rect
						x={20}
						y={20}
						width={100}
						height={100}
						fill="red"
						draggable
					/>
				</Layer>
			</Stage>
		</div>
	);
};

export default CanvasAreaKonva;
