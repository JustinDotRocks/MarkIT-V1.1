import { GridMode, Table, Vendor } from "../Types";

export const handleRoomInputChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	setRoomName: React.Dispatch<React.SetStateAction<string>>,
	setRoomWidth: React.Dispatch<React.SetStateAction<string>>,
	setRoomDepth: React.Dispatch<React.SetStateAction<string>>
) => {
	const { name, value } = e.target;
	switch (name) {
		case "room-name":
			setRoomName(value);
			break;
		case "room-width":
			setRoomWidth(value);
			break;
		case "room-depth":
			setRoomDepth(value);
			break;
		default:
			break;
	}
};

export const handleClickOutside =
	(modalRef: React.RefObject<HTMLDivElement>, onClose: () => void) =>
	(event: MouseEvent) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			onClose();
		}
	};

export const cycleGridMode = (
	setGridMode: React.Dispatch<React.SetStateAction<GridMode>>
) => {
	setGridMode((prevMode) => {
		switch (prevMode) {
			case "Off":
				return "Drag";
			case "Drag":
				return "On";
			case "On":
				return "Off";
			default:
				return "Off";
		}
	});
};

export const findById = <T extends { id: string }>(
	items: T[],
	id: string
): T | undefined => items.find((item) => item.id === id);

// Utility to clear all tables from a specific room and unassign vendors
export const clearTablesForRoom = (
	tables: Table[],
	roomId: string
): Table[] => {
	return tables.filter((table) => table.roomId !== roomId);
};
