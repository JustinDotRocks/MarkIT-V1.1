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

export interface RoomDetailsComponentProps {
	addRoom: (name: string, width: string, depth: string) => void;
}

export interface SideBarProps {
	activeMode: "setup" | "vendor" | "";
	addObject: (
		type: "door" | "obstacle",
		id: string,
		details?: string
	) => void;
	addTable: (
		type: "table-6" | "table-8" | "table-5",
		id: string,
		details?: string
	) => void;
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
	rooms: Room[];
	updateTableAssignment: (tableId: string, vendorId: string) => void;
	deleteVendor: (vendorId: string) => void;
	updateVendorDetails: (updatedVendor: Vendor) => void;
	selectedRoomId: string | null;
}

export type CanvasObject = {
	id: string;
	type: string;
	details?: string;
};

export interface CanvasAreaProps {
	objects: Feature[];
	tables: Table[];
	rooms: Room[];
	removeObject: (id: string) => void;
	removeRoom: (id: string) => void;
	selectedRoomId: string | null;
	setTables: React.Dispatch<React.SetStateAction<Table[]>>;
	setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
	features: Feature[];
	vendors: Vendor[];
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
}

export interface VendorCardProps extends VendorDetails {
	tables: Table[];
	rooms: Room[];
	roomId: string;
	updateTableAssignment: (tableId: string, vendorId: string) => void;
	deleteVendor: (vendorId: string) => void;
	updateVendorDetails: (updatedVendor: Vendor) => void;
}
