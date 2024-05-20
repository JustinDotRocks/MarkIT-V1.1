export type CanvasObject = {
	id: number;
	type: string;
	details?: string;
};

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
