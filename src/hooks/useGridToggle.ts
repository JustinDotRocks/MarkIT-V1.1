import { useState } from "react";
import { GridMode } from "../Types";

export const useGridToggle = () => {
	const [showGrid, setShowGrid] = useState(false);
	const [gridMode, setGridMode] = useState<GridMode>("Drag");
	const [isDragging, setIsDragging] = useState(false);

	const toggleGrid = () => setShowGrid((prevShowGrid) => !prevShowGrid);

	const handleGlobalDragStart = () => {
		setIsDragging(true);
	};

	const handleGlobalDragEnd = () => {
		setIsDragging(false);
	};

	return {
		showGrid,
		gridMode,
		isDragging,
		toggleGrid,
		setGridMode,
		handleGlobalDragStart,
		handleGlobalDragEnd,
	};
};
