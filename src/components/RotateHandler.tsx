import React from "react";
import { RotateHandlerProps, Table, Feature } from "../Types";

const RotateHandler: React.FC<RotateHandlerProps> = ({
	item,
	setTables,
	setFeatures,
	children,
}) => {
	const rotateObject = (angle: number) => {
		// Check if the item is a Table
		if (
			(item as Table).type === "table-6" ||
			(item as Table).type === "table-8" ||
			(item as Table).type === "table-5"
		) {
			setTables((prevTables) =>
				prevTables.map((table) => {
					if (table.id === item.id) {
						if (table.isLocked) return table; // Skip rotation if locked
						const newRotation =
							((table.rotation || 0) + angle) % 360;
						return { ...table, rotation: newRotation };
					}
					return table;
				})
			);
		}
		// Check if the item is a Feature
		else if (
			(item as Feature).type === "door" ||
			(item as Feature).type === "obstacle"
		) {
			setFeatures((prevFeatures) =>
				prevFeatures.map((feature) => {
					if (feature.id === item.id) {
						if (feature.isLocked) return feature; // Skip rotation if locked
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

	const rotateCW = () => rotateObject(15);
	const rotateCCW = () => rotateObject(-15);

	return <>{children({ rotateCW, rotateCCW })}</>;
};

export default RotateHandler;
