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
