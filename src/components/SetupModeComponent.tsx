import React, { useState } from "react";
import { SetupModeComponentProps, Room, Feature, Table } from "../Types";
import FeatureInputButtonPair from "./FeatureInputButtonPair";
import RoomDetailsComponent from "./RoomDetailsComponent";
import RoomSetupModal from "./AddRoomModal";
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);

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

	const editRoom = (
		id: string,
		name: string,
		width: string,
		depth: string
	) => {
		setRooms((prevRooms) =>
			prevRooms.map((room) =>
				room.id === id ? { ...room, name, width, depth } : room
			)
		);
	};

	// Function to open edit modal with room details
	const openEditModal = (room: Room) => {
		setRoomToEdit(room);
		setIsModalOpen(true);
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
			{/* <RoomDetailsComponent addRoom={addRoom} /> */}
			<RoomDetailsComponent
				openModal={() => setIsModalOpen(true)}
				openEditModal={openEditModal}
				rooms={rooms}
			/>
			<RoomSetupModal
				isOpen={isModalOpen}
				// onClose={() => setIsModalOpen(false) }
				onClose={() => {
					setIsModalOpen(false);
					setRoomToEdit(null); // Reset roomToEdit when modal closes
				}}
				addRoom={addRoom}
				editRoom={editRoom}
				roomToEdit={roomToEdit}
			/>
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
