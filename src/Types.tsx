export type NavBarProps = {
	activeMode: 'setup' | 'vendor' | '';
	setActiveMode: (mode: 'setup' | 'vendor' | '') => void;
};

export type ButtonProps = {
	onClick: () => void;
	className?: string;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
};

export type SideBarProps = {
	activeMode: 'setup' | 'vendor' | '';
	addObject: (type: string, id: string, details?: string) => void;
};

export type CanvasObject = {
	id: number;
	type: string;
	details?: string;
};

export interface CanvasAreaProps {
	objects: CanvasObject[];
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
