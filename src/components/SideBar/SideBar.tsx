import React, { useState, useEffect } from "react";
import {
	SideBarProps,
	Feature,
	Room,
	Vendor,
	Table,
	RoomFeature,
	RoomTable,
} from "../../Types";
import FeatureInputButtonPair from "../FeatureInputButtonPair";
import Input from "../Input/Input";
import Button from "../Button/Button";
import VendorCard from "../VendorCard/VendorCard";
import { v4 as uuidv4 } from "uuid"; // Importing the UUID function
import {
	saveToLocalStorage,
	loadFromLocalStorage,
	STORAGE_KEYS,
} from "../../Storage";

const SideBar: React.FC<SideBarProps> = ({
	activeMode,
	addObject,
	addTable,
	rooms,
	setRooms,
	vendors,
	setVendors,
	features,
	setFeatures,
	tables,
	setTables,
	selectedRoomId,
	setSelectedRoomId,
	roomFeatures,
	setRoomFeatures,
	roomTables,
	setRoomTables,
	updateVendorDetails,
}) => {
	const [roomName, setRoomName] = useState("");
	const [roomWidth, setRoomWidth] = useState("");
	const [roomDepth, setRoomDepth] = useState("");

	// const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

	const [doorQuantity, setDoorQuantity] = useState(0);
	const [obstacleQuantity, setObstacleQuantity] = useState(0);

	const [table6Quantity, setTable6Quantity] = useState(0);
	const [table8Quantity, setTable8Quantity] = useState(0);
	const [table5Quantity, setTable5Quantity] = useState(0);

	const [vendorName, setVendorName] = useState("");
	const [vendorProducts, setVendorProducts] = useState("");
	const [vendorDetails, setVendorDetails] = useState<Vendor>({
		id: "",
		name: "",
		products: "",
		details: "",
		// tableId: "",
		roomName: "",
		signedIn: false,
		electricityRequired: false,
	});

	// Load vendors from localStorage on component mount
	useEffect(() => {
		const storedVendors = loadFromLocalStorage<Vendor[]>(
			STORAGE_KEYS.VENDORS
		);
		if (storedVendors) {
			setVendors(storedVendors);
		}
	}, [setVendors]);

	// Update localStorage whenever vendors state changes
	useEffect(() => {
		saveToLocalStorage(STORAGE_KEYS.VENDORS, vendors);
	}, [vendors]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case "door-quantity":
				setDoorQuantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "obstacle-quantity":
				setObstacleQuantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "room-name":
				setRoomName(value);
				break;
			case "room-width":
				setRoomWidth(value);
				break;
			case "room-depth":
				setRoomDepth(value);
				break;
			case "table-6-quantity":
				setTable6Quantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "table-8-quantity":
				setTable8Quantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "table-5-quantity":
				setTable5Quantity(
					Math.min(Math.max(0, parseInt(value)), 30)
				);
				break;
			case "vendor-name":
				setVendorName(value);
				break;
			case "vendor-products":
				setVendorProducts(value);
				break;
			case "vendor-details":
				setVendorDetails((prev) => ({
					...prev,
					details: value,
				}));
				break;
			default:
				break;
		}
	};

	const handleVendorDetailsChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;

		// Handle checkbox input separately
		if (type === "checkbox") {
			const checked = (e.target as HTMLInputElement).checked;
			setVendorDetails((prev) => ({
				...prev,
				[name]: checked,
			}));
		} else {
			// For text and other input types
			setVendorDetails((prev) => ({
				...prev,
				// [name]: value,
				details: value,
			}));
		}
	};

	const addRoom = () => {
		const newRoom: Room = {
			id: uuidv4(),
			name: roomName,
			width: roomWidth,
			depth: roomDepth,
			tables: [],
		};
		setRooms((prevRooms: Room[]) => [...prevRooms, newRoom]);
		setRoomName("");
		setRoomWidth("");
		setRoomDepth("");
	};

	const addVendor = () => {
		const newVendor: Vendor = {
			id: uuidv4(),
			name: vendorName,
			products: vendorProducts,
			details: vendorDetails.details,
			// tableId: "",
			roomName: "",
			signedIn: false,
			// electricityRequired: false,
			electricityRequired: vendorDetails.electricityRequired,
		};
		setVendors((prevVendors: Vendor[]) => [...prevVendors, newVendor]);
		setVendorName("");
		setVendorProducts("");
		setVendorDetails({
			id: "",
			name: "",
			products: "",
			details: "",
			// tableId: "",
			roomName: "",
			signedIn: false,
			electricityRequired: false,
		});
	};

	const addFeature = (type: "door" | "obstacle", quantity: number) => {
		if (!selectedRoomId) {
			alert("Please select a room first.");
			return;
		}

		for (let i = 0; i < quantity; i++) {
			const id = uuidv4();
			const newFeature: Feature = {
				id,
				type,
				roomId: selectedRoomId, // Associate with the selected room
			};
			setFeatures((prevFeatures: Feature[]) => [
				...prevFeatures,
				newFeature,
			]);

			// ADDED: Add the feature to the roomFeatures intersection object
			const newRoomFeature: RoomFeature = {
				id: uuidv4(),
				roomId: selectedRoomId,
				featureId: newFeature.id,
			};
			setRoomFeatures((prevRoomFeatures: RoomFeature[]) => [
				...prevRoomFeatures,
				newRoomFeature,
			]);
		}
	};

	const addTableWithRoom = (
		type: "table-6" | "table-8" | "table-5",
		quantity: number
	) => {
		if (!selectedRoomId) {
			alert("Please select a room first.");
			return;
		}

		// Get the next table number for the selected room
		const existingTables = tables.filter(
			(table) => table.roomId === selectedRoomId
		);

		let nextTableNumber = existingTables.length + 1;

		// Find the name of the selected room
		const roomName =
			rooms.find((room) => room.id === selectedRoomId)?.name ||
			"Unknown Room";

		for (let i = 0; i < quantity; i++) {
			const id = uuidv4();
			// const tableNumber = `Table-${id.substring(0, 6)}`; // Generate a unique table number, e.g., Table-123abc

			const newTable: Table = {
				id,
				type,
				roomId: selectedRoomId,
				tableNumber: nextTableNumber,
				roomName,
			};

			setTables((prevTables: Table[]) => [...prevTables, newTable]);
			nextTableNumber++; // Increment for the next table

			// ADDED: Add the table to the roomTables intersection object
			const newRoomTable: RoomTable = {
				id: uuidv4(),
				roomId: selectedRoomId,
				tableId: newTable.id,
			};
			setRoomTables((prevRoomTables: RoomTable[]) => [
				...prevRoomTables,
				newRoomTable,
			]);
		}
	};

	const updateTableAssignment = (tableId: string, vendorId: string) => {
		// Update the selected table to have the new vendorId
		setTables((prevTables) =>
			prevTables.map((table) =>
				table.id === tableId
					? { ...table, vendorId }
					: table.vendorId === vendorId
					? { ...table, vendorId: undefined }
					: table
			)
		);
	};

	// ADDED: Function to handle vendor deletion
	const deleteVendor = (vendorId: string) => {
		// Remove vendor from the list
		setVendors((prevVendors) =>
			prevVendors.filter((vendor) => vendor.id !== vendorId)
		);

		// Unassign any tables associated with this vendor
		setTables((prevTables) =>
			prevTables.map((table) =>
				table.vendorId === vendorId
					? { ...table, vendorId: undefined }
					: table
			)
		);
	};

	return (
		<aside
			className={`w-full h-3/5 overflow-y-auto bg-gray-800 text-white p-4 transition-all duration-300 ${
				activeMode
					? "max-h-screen opacity-100 visible"
					: "max-h-0 opacity-0 invisible"
			} overflow-hidden`}
		>
			{activeMode === "setup" && (
				<div className="space-y-4">
					<h2 className="text-lg font-bold">Room Setup</h2>
					<Button
						onClick={addRoom}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
					>
						+
					</Button>
					<div className="mt-2">
						<Input
							type="text"
							name="room-name"
							value={roomName}
							onChange={handleInputChange}
							placeholder="Room name"
							className="w-full p-2 rounded bg-gray-700 text-white"
						/>
						<Input
							type="text"
							name="room-width"
							value={roomWidth}
							onChange={handleInputChange}
							placeholder="Enter Room Width"
							className="w-full p-2 rounded bg-gray-700 text-white"
						/>
						<Input
							type="text"
							name="room-depth"
							value={roomDepth}
							onChange={handleInputChange}
							placeholder="Enter Room Depth"
							className="w-full p-2 rounded bg-gray-700 text-white"
						/>
					</div>

					<h2 className="text-lg font-bold">Select Room</h2>
					{/* Room Selection Dropdown */}
					<select
						value={selectedRoomId || ""}
						onChange={(e) =>
							setSelectedRoomId(e.target.value)
						}
						className="w-full p-2 rounded bg-gray-700 text-white"
					>
						<option value="" disabled>
							Select a room
						</option>
						{rooms.map((room) => (
							<option key={room.id} value={room.id}>
								{room.name}
							</option>
						))}
					</select>

					<h2 className="text-lg font-bold">
						Add Features
					</h2>
					<div className="flex flex-col justify-center items-center">
						<FeatureInputButtonPair
							inputType="number"
							inputName="door-quantity"
							inputMin={0}
							inputMax={30}
							inputValue={doorQuantity}
							inputOnChange={handleInputChange}
							inputPlaceholder="Qty"
							featureType="door"
							buttonOnClick={() =>
								addFeature("door", doorQuantity)
							}
						/>
						<FeatureInputButtonPair
							inputType="number"
							inputName="obstacle-quantity"
							inputMin={0}
							inputMax={30}
							inputValue={obstacleQuantity}
							inputOnChange={handleInputChange}
							inputPlaceholder="Qty"
							featureType="obstacle"
							buttonOnClick={() =>
								addFeature(
									"obstacle",
									obstacleQuantity
								)
							}
						/>
					</div>
					<h2 className="text-lg font-bold">Add Tables</h2>
					<div className="flex flex-col justify-center items-center">
						<FeatureInputButtonPair
							inputType="number"
							inputName="table-6-quantity"
							inputMin={0}
							inputMax={30}
							inputValue={table6Quantity}
							inputOnChange={handleInputChange}
							inputPlaceholder="Qty"
							featureType="table-6"
							buttonOnClick={() =>
								addTableWithRoom(
									"table-6",
									table6Quantity
								)
							}
						/>
						<FeatureInputButtonPair
							inputType="number"
							inputName="table-8-quantity"
							inputMin={0}
							inputMax={30}
							inputValue={table8Quantity}
							inputOnChange={handleInputChange}
							inputPlaceholder="Qty"
							featureType="table-8"
							buttonOnClick={() =>
								addTableWithRoom(
									"table-8",
									table8Quantity
								)
							}
						/>
						<FeatureInputButtonPair
							inputType="number"
							inputName="table-5-quantity"
							inputMin={0}
							inputMax={30}
							inputValue={table5Quantity}
							inputOnChange={handleInputChange}
							inputPlaceholder="Qty"
							featureType="table-5"
							buttonOnClick={() =>
								addTableWithRoom(
									"table-5",
									table5Quantity
								)
							}
						/>
					</div>
				</div>
			)}
			{activeMode === "vendor" && (
				<div>
					<h2 className="text-lg font-bold">
						Vendor Setup
					</h2>
					<Button
						onClick={addVendor}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
					>
						Add Vendor
					</Button>
					<Input
						type="text"
						name="vendor-name"
						value={vendorName}
						onChange={handleInputChange}
						placeholder="Vendor name"
						className="w-full p-2 rounded bg-gray-700 text-white"
					/>
					<Input
						type="text"
						name="vendor-products"
						value={vendorProducts}
						onChange={handleInputChange}
						placeholder="Products"
						className="w-full p-2 rounded bg-gray-700 text-white"
					/>
					<textarea
						name="vendor-details"
						value={vendorDetails.details}
						onChange={handleVendorDetailsChange}
						placeholder="Details"
						className="w-full p-2 rounded bg-gray-700 text-white"
						rows={3}
					/>

					{/* ADDED: Checkbox for electricity requirement */}
					<div className="flex items-center mt-2">
						<label
							className="mr-2 ml-2 text-gray-200"
							htmlFor="vendor-electricity-required"
						>
							Electricity Required
						</label>
						<input
							type="checkbox"
							id="vendor-electricity-required"
							name="vendor-electricity-required"
							checked={
								vendorDetails.electricityRequired
							}
							onChange={(e) =>
								setVendorDetails((prev) => ({
									...prev,
									electricityRequired:
										e.target.checked,
								}))
							}
							className="form-checkbox h-5 w-5 text-blue-600"
						/>
					</div>

					{/* Render Vendor Cards */}
					<div className="mt-4 space-y-4">
						{vendors.map((vendor) => {
							const associatedTable = tables.find(
								(table) =>
									table.vendorId ===
									vendor.id
							);

							return (
								<VendorCard
									key={vendor.id}
									id={vendor.id}
									vendorName={vendor.name}
									vendorProducts={
										vendor.products
									}
									vendorDetails={
										vendor.details
									}
									tableNumber={
										associatedTable
											? associatedTable.id
											: ""
									}
									roomName="" // Optional: Could be set if needed
									signedIn={vendor.signedIn}
									electricityRequired={
										vendor.electricityRequired
									}
									tables={tables.filter(
										(table) =>
											!table.vendorId ||
											table.vendorId ===
												vendor.id
									)}
									rooms={rooms}
									updateTableAssignment={
										updateTableAssignment
									}
									deleteVendor={
										deleteVendor
									}
									updateVendorDetails={
										updateVendorDetails
									}
								/>
							);
						})}
					</div>
				</div>
			)}
		</aside>
	);
};

export default SideBar;
