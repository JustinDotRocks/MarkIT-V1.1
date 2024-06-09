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

export type SideBarProps = {
	activeMode: "setup" | "vendor" | "";
	addObject: (type: string, id: string, details?: string) => void;
};

export type CanvasObject = {
	id: string;
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
