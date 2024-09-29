import { useState } from "react";
import { Table, Feature } from "../Types";

export const useObjectSelection = (
	tables: Table[],
	features: Feature[],
	removeObjectFromCanvas: (id: string) => void
) => {
	const [selectedObject, setSelectedObject] = useState<{
		id: string;
		type: "table" | "feature";
		x: number;
		y: number;
	} | null>(null);

	const selectedTable =
		selectedObject && selectedObject.type === "table"
			? tables.find((table) => table.id === selectedObject.id)
			: null;

	const selectedFeature =
		selectedObject && selectedObject.type === "feature"
			? features.find((feature) => feature.id === selectedObject.id)
			: null;

	const handleObjectClick = (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
	) => {
		setSelectedObject({ id, type, x, y });
	};

	const handleStageClick = () => {
		setSelectedObject(null);
	};

	const handleDelete = () => {
		if (selectedObject) {
			removeObjectFromCanvas(selectedObject.id);
			setSelectedObject(null);
		}
	};

	return {
		selectedObject,
		selectedTable,
		selectedFeature,
		handleObjectClick,
		handleStageClick,
		handleDelete,
	};
};
