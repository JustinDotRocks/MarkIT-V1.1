import React, { useState } from "react";
import { SetupModeComponentProps, Room, Feature, Table } from "../Types";
import FeatureInputButtonPair from "./FeatureInputButtonPair";
import RoomDetailsComponent from "./RoomDetailsComponent";
import { v4 as uuidv4 } from "uuid";

const SetupModeComponent: React.FC<SetupModeComponentProps> = ({
	rooms,
	setRooms,
	setSelectedRoomId,
	selectedRoomId,
	setFeatures,
	setTables,
	tables,
}) => {
	const [doorQuantity, setDoorQuantity] = useState(0);
	const [obstacleQuantity, setObstacleQuantity] = useState(0);
	const [table6Quantity, setTable6Quantity] = useState(0);
	const [table8Quantity, setTable8Quantity] = useState(0);
	const [table5Quantity, setTable5Quantity] = useState(0);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case "door-quantity":
				setDoorQuantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "obstacle-quantity":
				setObstacleQuantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "table-6-quantity":
				setTable6Quantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "table-8-quantity":
				setTable8Quantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "table-5-quantity":
				setTable5Quantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			default:
				break;
		}
	};

	const addRoom = (name: string, width: string, depth: string) => {
		const newRoom: Room = {
			id: uuidv4(),
			name,
			width,
			depth,
			tables: [],
		};
		setRooms((prevRooms: Room[]) => [...prevRooms, newRoom]);
	};

	const addFeature = (type: "door" | "obstacle", quantity: number) => {
		if (!selectedRoomId) {
			alert("Please select a room first.");
			return;
		}

		for (let i = 0; i < quantity; i++) {
			const id = uuidv4();
			const newFeature: Feature = {
				id,
				type,
				roomId: selectedRoomId,
				x: 0,
				y: 0,
			};
			setFeatures((prevFeatures: Feature[]) => [
				...prevFeatures,
				newFeature,
			]);
		}
	};

	const addTableWithRoom = (
		type: "table-6" | "table-8" | "table-5",
		quantity: number
	) => {
		if (!selectedRoomId) {
			alert("Please select a room first.");
			return;
		}

		const existingTables = tables.filter(
			(table) => table.roomId === selectedRoomId
		);
		let nextTableNumber = existingTables.length + 1;

		for (let i = 0; i < quantity; i++) {
			const id = uuidv4();
			const newTable: Table = {
				id,
				type,
				roomId: selectedRoomId,
				tableNumber: nextTableNumber,
				x: 0,
				y: 0,
			};

			setTables((prevTables: Table[]) => [...prevTables, newTable]);
			nextTableNumber++;
		}
	};

	// Wrapper function to handle both features and tables
	const handleAddFeatureOrTable = (
		featureType:
			| "door"
			| "obstacle"
			| "table-6"
			| "table-8"
			| "table-5",
		quantity: number
	) => {
		if (featureType === "door" || featureType === "obstacle") {
			addFeature(featureType, quantity);
		} else {
			addTableWithRoom(featureType, quantity);
		}
	};

	return (
		<div className="space-y-4">
			<RoomDetailsComponent addRoom={addRoom} />
			<h2 className="text-lg font-bold">Select Room</h2>
			<select
				value={selectedRoomId || ""}
				onChange={(e) => setSelectedRoomId(e.target.value)}
				className="w-full p-2 rounded bg-gray-700 text-white"
			>
				<option value="" disabled>
					Select a room
				</option>
				{rooms.map((room) => (
					<option key={room.id} value={room.id}>
						{room.name}
					</option>
				))}
			</select>

			{/* Conditionally render the add features/tables section */}
			{selectedRoomId && (
				<>
					<h2 className="text-lg font-bold">
						Add Features
					</h2>
					<div className="flex flex-col justify-center items-center">
						<FeatureInputButtonPair
							featureType="door"
							buttonOnClick={
								handleAddFeatureOrTable
							}
						/>
						<FeatureInputButtonPair
							featureType="obstacle"
							buttonOnClick={
								handleAddFeatureOrTable
							}
						/>
					</div>
					<h2 className="text-lg font-bold">Add Tables</h2>
					<div className="flex flex-col justify-center items-center">
						<FeatureInputButtonPair
							featureType="table-6"
							buttonOnClick={
								handleAddFeatureOrTable
							}
						/>
						<FeatureInputButtonPair
							featureType="table-8"
							buttonOnClick={
								handleAddFeatureOrTable
							}
						/>
						<FeatureInputButtonPair
							featureType="table-5"
							buttonOnClick={
								handleAddFeatureOrTable
							}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default SetupModeComponent;
