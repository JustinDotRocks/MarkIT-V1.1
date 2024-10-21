import { useState, useEffect } from "react";
import { Room, Table } from "../Types";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
	getStorageKeys,
} from "../utils/storageUtils";
import { clearTablesForRoom } from "../utils/functions";

export const useRooms = (
	tables: Table[],
	setTables: React.Dispatch<React.SetStateAction<Table[]>>
) => {
	const [rooms, setRooms] = useState<Room[]>(
		() => loadFromLocalStorage<Room[]>(getStorageKeys().ROOMS) || []
	);
	const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
	const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
	const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	// Persist the rooms to localStorage whenever they change
	useEffect(() => {
		saveToLocalStorage(getStorageKeys().ROOMS, rooms);
	}, [rooms]);

	// Add a new room
	const addRoom = (name: string, width: string, depth: string) => {
		const newRoom: Room = {
			id: Date.now().toString(),
			name,
			width,
			depth,
			tables: [],
		};
		setRooms((prevRooms) => [...prevRooms, newRoom]);
	};

	// Update an existing room
	const updateRoom = (updatedRoom: Room) => {
		setRooms((prevRooms) =>
			prevRooms.map((room) =>
				room.id === updatedRoom.id ? updatedRoom : room
			)
		);
	};

	const removeRoom = (roomId: string) => {
		// Remove the room from the list
		setRooms((prevRooms) =>
			prevRooms.filter((room) => room.id !== roomId)
		);

		// Remove tables associated with the room
		const updatedTables = clearTablesForRoom(tables, roomId);
		setTables(updatedTables);

		if (selectedRoomId === roomId) {
			setSelectedRoomId(null);
		}
	};

	// Open and close modals
	const openRoomModal = () => setIsRoomModalOpen(true);
	const closeRoomModal = () => setIsRoomModalOpen(false);

	const openEditModal = (room: Room) => {
		setRoomToEdit(room);
		setIsModalOpen(true);
	};

	const closeEditModal = () => {
		setIsModalOpen(false);
		setRoomToEdit(null);
	};

	return {
		rooms,
		selectedRoomId,
		setSelectedRoomId,
		roomToEdit,
		isRoomModalOpen,
		isModalOpen,
		addRoom,
		updateRoom,
		removeRoom,
		openRoomModal,
		closeRoomModal,
		openEditModal,
		closeEditModal,
	};
};
