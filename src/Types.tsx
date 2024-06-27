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
}

export interface FeatureInputButtonPairProps {
	inputType: string;
	inputName: string;
	inputMin?: number;
	inputMax?: number;
	inputValue: number | string;
	inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputPlaceholder?: string;
	featureType: "door" | "obstacle" | "table-6" | "table-8" | "table-5";
	buttonClassName?: string;
	buttonOnClick: () => void;
	inputClassName?: string;
	containerClassName?: string;
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
	) => void; // Add this line
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
	roomFeatures: RoomFeature[];
	setRoomFeatures: React.Dispatch<React.SetStateAction<RoomFeature[]>>;
	roomTables: RoomTable[];
	setRoomTables: React.Dispatch<React.SetStateAction<RoomTable[]>>;
	updateVendorDetails: (updatedVendor: Vendor) => void;
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
	roomName: string;
	signedIn: boolean;
	electricityRequired: boolean;
}

export type Feature = {
	id: string;
	type: "door" | "obstacle";
	details?: string;
	roomId?: string; // Stationary features can be associated with a room
};

export interface Table {
	id: string;
	type: "table-6" | "table-8" | "table-5";
	details?: string;
	roomId: string;
	vendorId?: string; // If a vendor is assigned to the table
	tableNumber: number;
	roomName: string;
}

export interface VendorCardProps extends VendorDetails {
	tables: Table[];
	rooms: Room[];
	updateTableAssignment: (tableId: string, vendorId: string) => void;
	deleteVendor: (vendorId: string) => void;
	updateVendorDetails: (updatedVendor: Vendor) => void;
}

// Intersection objects for rooms and features, and rooms and tables
export interface RoomFeature {
	id: string;
	roomId: string;
	featureId: string;
}

export interface RoomTable {
	id: string;
	roomId: string;
	tableId: string;
}
