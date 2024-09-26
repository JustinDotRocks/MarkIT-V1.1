import { useState, useEffect } from "react";
import { Room } from "../Types"; // Adjust the import based on your structure
import {
	loadFromLocalStorage,
	saveToLocalStorage,
	getStorageKeys,
} from "../utils/storageUtils";

export const useRooms = () => {
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

	// Remove a room and associated objects (e.g., features, tables)
	const removeRoom = (roomId: string) => {
		setRooms((prevRooms) =>
			prevRooms.filter((room) => room.id !== roomId)
		);
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
