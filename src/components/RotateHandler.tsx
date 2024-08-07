// RotateHandler.tsx
import React from "react";
import { RotateHandlerProps } from "../Types";

const RotateHandler: React.FC<RotateHandlerProps> = ({
	item,
	setTables,
	setFeatures,
	children,
}) => {
	const rotateObject = (angle: number) => {
		if (
			"type" in item &&
			(item.type === "table-6" ||
				item.type === "table-8" ||
				item.type === "table-5")
		) {
			setTables((prevTables) =>
				prevTables.map((table) => {
					if (table.id === item.id) {
						if (table.isLocked) return table; // If the table is locked, don't rotate
						const newRotation =
							((table.rotation || 0) + angle) % 360;
						return { ...table, rotation: newRotation };
					}
					return table;
				})
			);
		} else {
			setFeatures((prevFeatures) =>
				prevFeatures.map((feature) => {
					if (feature.id === item.id) {
						if (feature.isLocked) return feature; // If the feature is locked, don't rotate
						const newRotation =
							((feature.rotation || 0) + angle) %
							360;
						return {
							...feature,
							rotation: newRotation,
						};
					}
					return feature;
				})
			);
		}
	};

	const rotateCW = () => {
		rotateObject(45);
	};

	const rotateCCW = () => {
		rotateObject(-45);
	};

	return <>{children({ rotateCW, rotateCCW })}</>;
};

export default RotateHandler;

// const rotateObject = (
// 	id: string,
// 	type: "table" | "feature",
// 	angle: number
// ) => {
// 	if (type === "table") {
// 		setTables((prevTables) =>
// 			prevTables.map((table) => {
// 				if (table.id === id) {
// 					// Check if the table is locked
// 					if (table.isLocked) return table;

// 					// Update rotation
// 					const newRotation =
// 						((table.rotation || 0) + angle) % 360;
// 					return { ...table, rotation: newRotation };
// 				}
// 				return table;
// 			})
// 		);
// 	} else {
// 		setFeatures((prevFeatures) =>
// 			prevFeatures.map((feature) => {
// 				if (feature.id === id) {
// 					// Check if the feature is locked
// 					if (feature.isLocked) return feature;

// 					// Update rotation
// 					const newRotation =
// 						((feature.rotation || 0) + angle) %
// 						360;
// 					return {
// 						...feature,
// 						rotation: newRotation,
// 					};
// 				}
// 				return feature;
// 			})
// 		);
// 	}
// };

// const rotateCW = () => {
// 	if (selectedObject) {
// 		rotateObject(selectedObject.id, selectedObject.type, 45);
// 	}
// };

// const rotateCCW = () => {
// 	if (selectedObject) {
// 		rotateObject(selectedObject.id, selectedObject.type, -45);
// 	}
// };
