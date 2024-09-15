import React from "react";
import { DragAndDropHandlerProps } from "../Types";

const DragAndDropHandler: React.FC<DragAndDropHandlerProps> = ({
	item,
	containerSize,
	tables,
	feetToPixels,
	room,
	features,
	setTables,
	setFeatures,
	onObjectClick,
	Component,
	vendors,
	stageRef,
	setShowGrid,
	// onDragStart,
	// onDragEnd,
	onGlobalDragStart,
	onGlobalDragEnd,
	gridSize,
}) => {
	const handleDragMove = (e: any) => {
		const node = e.target;
		const id = item.id;
		const type = item.type;

		if (onGlobalDragStart) {
			onGlobalDragStart();
		}

		setShowGrid(true);

		const foundItem = type.includes("table")
			? tables.find((table) => table.id === id)
			: features.find((feature) => feature.id === id);

		if (foundItem?.isLocked) {
			return; // Prevent dragging if the item is locked
		}

		const itemWidthFeet =
			type === "table-6" ? 6 : type === "table-8" ? 8 : 5;
		const itemHeightFeet = type.includes("table") ? 2.5 : 1.5;

		const itemWidthPixels = itemWidthFeet;
		const itemHeightPixels = itemHeightFeet;

		let x = node.x();
		let y = node.y();

		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x + itemWidthPixels > containerSize.width)
			x = containerSize.width - itemWidthPixels;
		if (y + itemHeightPixels > containerSize.height)
			y = containerSize.height - itemHeightPixels;

		node.x(x);
		node.y(y);
	};

	const handleDragStart = (e: any) => {
		if (onGlobalDragStart) {
			onGlobalDragStart();
		}
		// Additional internal logic if needed
	};

	const handleDragEnd = (e: any) => {
		const id = item.id;
		const node = e.target;
		const x = node.x() / containerSize.width;
		const y = node.y() / containerSize.height;

		if (onGlobalDragEnd) {
			onGlobalDragEnd();
		}

		setShowGrid(false);

		// Ensure stageRef.current is available
		if (!stageRef.current) {
			console.error("Stage reference is not available.");
			return;
		}

		// Define a helper function to check for collisions
		const isColliding = (otherItem: any, otherNode: any) => {
			if (otherItem.id === id) return false; // Skip self
			const otherRect = otherNode.getClientRect();
			const currentItemRect = node.getClientRect();

			// Basic collision detection between bounding boxes
			return !(
				currentItemRect.x + currentItemRect.width <=
					otherRect.x ||
				currentItemRect.x >= otherRect.x + otherRect.width ||
				currentItemRect.y + currentItemRect.height <=
					otherRect.y ||
				currentItemRect.y >= otherRect.y + otherRect.height
			);
		};

		// Check collisions with other tables
		const collidesWithTable = tables.some((table) => {
			const tableNode = stageRef.current.findOne(`#${table.id}`);
			return tableNode && isColliding(table, tableNode);
		});

		// Check collisions with other features
		const collidesWithFeature = features.some((feature) => {
			const featureNode = stageRef.current.findOne(
				`#${feature.id}`
			);
			return featureNode && isColliding(feature, featureNode);
		});

		// Allow the drop only if there is no collision
		if (collidesWithTable || collidesWithFeature) {
			node.position({
				x: item.x * containerSize.width,
				y: item.y * containerSize.height,
			});
			console.log("Collision detected, reverting position");
			return; // Prevent updating the state with the new position
		}

		// Update state with new positions if no collision
		if (item.type.includes("table")) {
			setTables((prevTables) => {
				const updatedTables = prevTables.map((table) =>
					table.id === id ? { ...table, x, y } : table
				);
				return updatedTables;
			});
		} else {
			setFeatures((prevFeatures) => {
				const updatedFeatures = prevFeatures.map((feature) =>
					feature.id === id ? { ...feature, x, y } : feature
				);
				return updatedFeatures;
			});
		}
	};

	return (
		<Component
			item={item}
			onDragMove={handleDragMove}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onObjectClick={onObjectClick}
			containerSize={containerSize}
			feetToPixels={feetToPixels}
			room={room}
			vendors={vendors}
		/>
	);
};

export default DragAndDropHandler;

// import React from "react";
// import { Group } from "react-konva";
// import { DragAndDropHandlerProps } from "../Types";

// const DragAndDropHandler: React.FC<DragAndDropHandlerProps> = ({
//   item,
//   containerSize,
//   tables,
//   feetToPixels,
//   room,
//   features,
//   setTables,
//   setFeatures,
//   onObjectClick,
//   Component,
//   vendors,
//   stageRef,
//   onDragStart,
//   onDragEnd,
//   gridSize,
// }) => {
//   const handleDragMove = (e: any) => {
//     const node = e.target;
//     const id = item.id;
//     const type = item.type;

//     const foundItem = type.includes("table")
//       ? tables.find((table) => table.id === id)
//       : features.find((feature) => feature.id === id);

//     if (foundItem?.isLocked) {
//       return; // Prevent dragging if the item is locked
//     }

//     // Constrain movement within container boundaries
//     const itemWidthFeet =
//       type === "table-6" ? 6 : type === "table-8" ? 8 : 5;
//     const itemHeightFeet = type.includes("table") ? 2.5 : 1.5;

//     const itemWidthPixels = itemWidthFeet * feetToPixels;
//     const itemHeightPixels = itemHeightFeet * feetToPixels;

//     let x = node.x();
//     let y = node.y();

//     if (x < 0) x = 0;
//     if (y < 0) y = 0;
//     if (x + itemWidthPixels > containerSize.width)
//       x = containerSize.width - itemWidthPixels;
//     if (y + itemHeightPixels > containerSize.height)
//       y = containerSize.height - itemHeightPixels;

//     node.x(x);
//     node.y(y);
//   };

//   const handleDragStartInternal = (e: any) => {
//     if (onDragStart) {
//       onDragStart();
//     }
//   };

//   const handleDragEndInternal = (e: any) => {
//     const id = item.id;
//     const node = e.target;
//     const x = node.x() / containerSize.width;
//     const y = node.y() / containerSize.height;

//     if (onDragEnd) {
//       onDragEnd();
//     }

//     // Ensure stageRef.current is available
//     if (!stageRef.current) {
//       console.error("Stage reference is not available.");
//       return;
//     }

//     // Define a helper function to check for collisions
//     const isColliding = (otherItem: any, otherNode: any) => {
//       if (otherItem.id === id) return false; // Skip self
//       const otherRect = otherNode.getClientRect();
//       const currentItemRect = node.getClientRect();

//       // Basic collision detection between bounding boxes
//       return !(
//         currentItemRect.x + currentItemRect.width <= otherRect.x ||
//         currentItemRect.x >= otherRect.x + otherRect.width ||
//         currentItemRect.y + currentItemRect.height <= otherRect.y ||
//         currentItemRect.y >= otherRect.y + otherRect.height
//       );
//     };

//     // Check collisions with other tables
//     const collidesWithTable = tables.some((table) => {
//       if (table.id === id) return false;
//       const tableNode = stageRef.current.findOne(`#${table.id}`);
//       return tableNode && isColliding(table, tableNode);
//     });

//     // Check collisions with other features
//     const collidesWithFeature = features.some((feature) => {
//       if (feature.id === id) return false;
//       const featureNode = stageRef.current.findOne(`#${feature.id}`);
//       return featureNode && isColliding(feature, featureNode);
//     });

//     // Allow the drop only if there is no collision
//     if (collidesWithTable || collidesWithFeature) {
//       node.position({
//         x: item.x * containerSize.width,
//         y: item.y * containerSize.height,
//       });
//       console.log("Collision detected, reverting position");
//       return; // Prevent updating the state with the new position
//     }

//     // Update state with new positions if no collision
//     if (item.type.includes("table")) {
//       setTables((prevTables) => {
//         const updatedTables = prevTables.map((table) =>
//           table.id === id ? { ...table, x, y } : table
//         );
//         return updatedTables;
//       });
//     } else {
//       setFeatures((prevFeatures) => {
//         const updatedFeatures = prevFeatures.map((feature) =>
//           feature.id === id ? { ...feature, x, y } : feature
//         );
//         return updatedFeatures;
//       });
//     }
//   };

//   return (
//     <Group
//       draggable={!item.isLocked} // Make draggable only if not locked
//       onDragStart={handleDragStartInternal}
//       onDragMove={handleDragMove}
//       onDragEnd={handleDragEndInternal}
//       onClick={(e) => {
//         e.cancelBubble = true;
//         onObjectClick(item.id, item.type, e.target.x(), e.target.y());
//       }}
//       x={item.x * containerSize.width}
//       y={item.y * containerSize.height}
//       rotation={item.rotation || 0}
//       id={item.id}
//     >
//       <Component
//         item={item}
//         containerSize={containerSize}
//         feetToPixels={feetToPixels}
//         room={room}
//         vendors={vendors}
//       />
//     </Group>
//   );
// };

// export default DragAndDropHandler;
