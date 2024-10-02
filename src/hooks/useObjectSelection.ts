import { useState } from "react";
import { Table, Feature, ObjectType, SelectedObject } from "../Types";
import { findById } from "../utils/functions";

export const useObjectSelection = (
	tables: Table[],
	features: Feature[],
	removeObjectFromCanvas: (id: string) => void
) => {
	const [selectedObject, setSelectedObject] =
		useState<SelectedObject | null>(null);

	const selectedTable =
		selectedObject && selectedObject.type === "table"
			? findById(tables, selectedObject.id)
			: null;

	const selectedFeature =
		selectedObject && selectedObject.type === "feature"
			? findById(features, selectedObject.id)
			: null;

	const handleObjectClick = (
		id: string,
		type: ObjectType,
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
