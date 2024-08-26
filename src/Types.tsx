export type NavBarProps = {
	activeMode: "setup" | "vendor" | "";
	setActiveMode: (mode: "setup" | "vendor" | "") => void;
};

export type ButtonProps = {
	onClick: () => void;
	className?: string;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
};

export interface FeatureButtonProps extends ButtonProps {
	featureType: "door" | "obstacle" | "table-6" | "table-8" | "table-5";
	className?: string;
	buttonClassName?: string;
}

// Generic type parameter T for featureType
export interface FeatureInputButtonPairProps<
	T extends "door" | "obstacle" | "table-6" | "table-8" | "table-5"
> {
	featureType: T;
	buttonOnClick: (featureType: T, quantity: number) => void;
	inputClassName?: string;
	containerClassName?: string;
}
export interface RoomSetupModalProps {
	isOpen: boolean;
	onClose: () => void;
	addRoom: (name: string, width: string, depth: string) => void;
	editRoom?: (
		id: string,
		name: string,
		width: string,
		depth: string
	) => void;
	roomToEdit?: Room | null;
}

export interface RoomDetailsComponentProps {
	// addRoom: (name: string, width: string, depth: string) => void;
	openModal: () => void;
	openEditModal: (room: Room) => void;
	rooms: Room[];
}

export interface SideBarProps {
	activeMode: "setup" | "vendor" | "";
	// addObject: (
	// 	type: "door" | "obstacle",
	// 	id: string,
	// 	details?: string
	// ) => void;
	rooms: Room[];
	setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
	vendors: Vendor[];
	setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	features: Feature[];
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
	tables: Table[];
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	selectedRoomId: string | null;
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
	updateVendorDetails: (updatedVendor: Vendor) => void;
}

export interface SetupModeComponentProps {
	rooms: Room[];
	setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
	selectedRoomId: string | null;
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	tables: Table[];
}

export interface VendorModeComponentProps {
	setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	vendors: Vendor[];
	tables: Table[];
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	rooms: Room[];
	updateTableAssignment: (tableId: string, vendorId: string) => void;
	deleteVendor: (vendorId: string) => void;
	updateVendorDetails: (updatedVendor: Vendor) => void;
	selectedRoomId: string | null;
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface VendorModePageProps {
	vendors: Vendor[];
	setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	tables: Table[];
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	rooms: Room[];
	updateVendorDetails: (updatedVendor: Vendor) => void;
	selectedRoomId: string | null;
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
	// No updateTableAssignment and deleteVendor here
}

export type CanvasObject = {
	id: string;
	type: string;
	details?: string;
};
// export type CanvasObject = Table | Feature;

export interface CanvasAreaProps {
	objects: Feature[];
	tables: Table[];
	rooms: Room[];
	// removeObject: (id: string) => void;
	removeRoom: (id: string) => void;
	selectedRoomId: string | null;
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
	features: Feature[];
	vendors: Vendor[];
	openEditModal: (room: Room) => void;
	removeObjectFromCanvas: (id: string) => void;
	toggleLockObject: (id: string, type: "table" | "feature") => void;
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
	openAddRoomModal: () => void;
	// addTable: (type: "table-6" | "table-8" | "table-5") => void;
	addTable: (tableData: {
		type: "table-6" | "table-8" | "table-5";
		id: string;
		details?: string;
		tableNumber: number;
	}) => void;
	addFeature: (featureData: {
		type: "door" | "obstacle";
		id: string;
		details?: string;
	}) => void; // Add this line
	areAllObjectsLocked: boolean;
	setAreAllObjectsLocked: React.Dispatch<React.SetStateAction<boolean>>;
	handleRemoveVendor?: (tableId: string) => void;
}

export interface VendorDetails {
	id: string;
	vendorName: string;
	vendorProducts: string;
	vendorDetails: string;
	tableNumber: string;
	roomName: string;
	signedIn: boolean;
	electricityRequired: boolean;
}

export interface InputProps {
	type?: string;
	name: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
	min?: number;
	max?: number;
}

export interface Room {
	id: string;
	name: string;
	width: string;
	depth: string;
	tables: string[]; // Array of table IDs
}

export interface Vendor {
	id: string;
	name: string;
	products: string;
	details: string;
	// tableId: string;
	// roomName: string;
	roomId: string;
	signedIn: boolean;
	electricityRequired: boolean;
}

export type Feature = {
	id: string;
	type: "door" | "obstacle";
	details?: string;
	roomId?: string; // Stationary features can be associated with a room
	x: number;
	y: number;
	rotation?: number;
	isLocked?: boolean;
};

export interface Table {
	id: string;
	type: "table-6" | "table-8" | "table-5";
	details?: string;
	roomId: string;
	vendorId?: string; // If a vendor is assigned to the table
	tableNumber: number;
	// roomName: string;
	x: number;
	y: number;
	rotation?: number;
	isLocked?: boolean;
}

export interface VendorCardProps extends VendorDetails {
	tables: Table[];
	rooms: Room[];
	roomId: string;
	updateTableAssignment: (tableId: string, vendorId: string) => void;
	deleteVendor: (vendorId: string) => void;
	updateVendorDetails: (updatedVendor: Vendor) => void;
}

export interface RoomEditModalProps {
	// room: Room;
	onClose: () => void;
	onSave: (updatedRoom: Room) => void;
	isOpen: boolean;
	roomToEdit: Room;
	selectedRoomId: string | null;
}

export interface OptionsBarProps {
	x: number;
	y: number;
	onDelete: () => void;
	onRotateCW: () => void;
	onRotateCCW: () => void;
	onToggleLock: () => void;
	isLocked: boolean;
	vendorName: string;
	onAddVendor: () => void;
	onRemoveVendor: () => void;
	objectType: "table" | "feature";
}

export interface RoomDetailsDisplayProps {
	rooms: Room[];
	handleRemoveRoom: (roomId: string) => void;
	openEditModal: (room: Room) => void;
	removeRoom: (id: string) => void;
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
	openAddRoomModal: () => void;
	selectedRoomId: string | null;
}

export interface LockAllObjectsButtonProps {
	areAllObjectsLocked: boolean;
	lockAllObjects: () => void;
}

export interface TableComponentProps {
	table: Table;
	containerSize: { width: number; height: number };
	room: Room | undefined;
	feetToPixels: number;
	handleDragMove: (e: any) => void;
	handleDragEnd: (id: string, type: "table" | "feature", e: any) => void;
	handleObjectClick: (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
	) => void;
}

export interface FeatureComponentProps {
	feature: Feature;
	containerSize: { width: number; height: number };
	room: Room | undefined;
	feetToPixels: number;
	handleDragMove: (e: any) => void;
	handleDragEnd: (id: string, type: "table" | "feature", e: any) => void;
	handleObjectClick: (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
	) => void;
}

export interface DragAndDropComponentProps {
	item: Table | Feature;
	containerSize: { width: number; height: number };
	room: Room | undefined;
	feetToPixels: number;
	onDragMove: (e: any) => void;
	onDragEnd: (e: any) => void;
	// onDragStart: (e: any) => void;
	onObjectClick: (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
	) => void;
}

export interface DragAndDropHandlerProps {
	item: Table | Feature;
	// item: CanvasObject;
	containerSize: { width: number; height: number };
	room: Room | undefined;
	feetToPixels: number;
	tables: Table[];
	features: Feature[];
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
	onObjectClick: (
		id: string,
		type: "table" | "feature",
		x: number,
		y: number
	) => void;
	Component: React.FC<DragAndDropComponentProps>;
}

export interface RotateHandlerProps {
	item: Table | Feature;
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
	children: (props: {
		rotateCW: () => void;
		rotateCCW: () => void;
	}) => React.ReactNode;
}

export interface AddTablesModalProps {
	isOpen: boolean;
	onClose: () => void;
	addTable: (tableData: {
		type: "table-6" | "table-8" | "table-5";
		id: string;
		details?: string;
		tableNumber: number;
	}) => void;
	tables: Table[];
	selectedRoomId: string | null;
}

export interface AddFeaturesModalProps {
	isOpen: boolean;
	onClose: () => void;
	addFeature: (featureData: {
		type: "door" | "obstacle";
		id: string;
		details?: string;
	}) => void;
	features: Feature[];
	selectedRoomId: string | null;
}

export interface InfoModalProps {
	isOpen: boolean;
	onClose: () => void;
	room: Room;
	openEditModal: (room: Room) => void;
	removeRoom: (roomId: string) => void;
	selectedRoomId: string | null;
	// roomToEdit: Room | null;
	// isRoomEditModalOpen: boolean;
	// setIsRoomEditModalOpen: (isOpen: boolean) => void;
	// updateRoom: (updatedRoom: Room) => void;
}

export interface AddVendorModalProps {
	isOpen: boolean;
	onClose: () => void;
	addVendor: (newVendor: Vendor) => void;
	selectedRoomId: string | null;
}

export interface AssignVendorModalProps {
	isOpen: boolean;
	onClose: () => void;
	vendors: Vendor[];
	// onAssign: (vendorId: string) => void;
	tables: Table[];
	rooms: Room[];
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	selectedTableId: string | null;
}

export interface RoomOptionsProps {
	areAllObjectsLocked: boolean;
	lockAllObjects: () => void;
	selectedRoomId: string | null;
	// toggleRoomInfoModal: () => void;
	addTable: (tableData: {
		type: "table-6" | "table-8" | "table-5";
		id: string;
		details?: string;
		tableNumber: number;
	}) => void;
	tables: Table[];
	addFeature: (featureData: {
		type: "door" | "obstacle";
		id: string;
		details?: string;
	}) => void;
	features: Feature[];
	room: Room | null;
	removeRoom: (roomId: string) => void;
	openEditModal: (room: Room) => void;
	rooms: Room[];
	setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
	openAddRoomModal: () => void;
}
