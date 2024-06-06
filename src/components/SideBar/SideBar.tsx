import React, { useState } from "react";
import { VendorDetails, SideBarProps, InputProps } from "../../Types";
import Button from "../Button/Button";
import FeatureButton from "../FeatureButton/FeatureButton";
import VendorCard from "../VendorCard/VendorCard";
import Input from "../Input/Input";
import { v4 as uuidv4 } from "uuid"; // Importing the UUID function
import FeatureInputButtonPair from "../FeatureInputButtonPair";

const SideBar: React.FC<SideBarProps> = ({ activeMode, addObject }) => {
	// Setup State
	const [roomName, setRoomName] = useState("");
	const [roomWidth, setRoomWidth] = useState("");
	const [roomDepth, setRoomDepth] = useState("");
	const [doorQuantity, setDoorQuantity] = useState(0);
	const [obstacleQuantity, setObstacleQuantity] = useState(0);
	const [table6Quantity, setTable6Quantity] = useState(0);
	const [table8Quantity, setTable8Quantity] = useState(0);
	const [table5Quantity, setTable5Quantity] = useState(0);

	// Vendor State
	const [vendors, setVendors] = useState<VendorDetails[]>([]);
	const [vendorDetails, setVendorDetails] = useState<VendorDetails>({
		id: "",
		vendorName: "",
		vendorProducts: "",
		vendorDetails: "",
		tableNumber: "",
		roomName: "",
		signedIn: false,
		electricityRequired: false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const num = Math.min(Math.max(0, parseInt(value)), 30);
		switch (name) {
			case "door-quantity":
				setDoorQuantity(num);
				break;
			case "obstacle-quantity":
				setObstacleQuantity(num);
				break;
			case "table-6-quantity":
				setTable6Quantity(num);
				break;
			case "table-8-quantity":
				setTable8Quantity(num);
				break;
			case "table-5-quantity":
				setTable5Quantity(num);
				break;
			default:
				if (name === "room-name") setRoomName(value);
				else if (name === "room-width") setRoomWidth(value);
				else if (name === "room-depth") setRoomDepth(value);
				break;
		}
	};

	const handleVendorDetailsChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		if (type === "checkbox") {
			// Correctly handle checkbox state
			const checked = (e.target as HTMLInputElement).checked;
			setVendorDetails((prev) => ({
				...prev,
				[name]: checked,
			}));
		} else {
			setVendorDetails((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const addVendor = () => {
		const newVendor = { ...vendorDetails, id: uuidv4() }; // Adding a unique id to each new vendor
		setVendors([...vendors, newVendor]);
		// Resetting vendorDetails for next input
		setVendorDetails({
			id: "",
			vendorName: "",
			vendorProducts: "",
			vendorDetails: "",
			tableNumber: "",
			roomName: "",
			signedIn: false,
			electricityRequired: false,
		});
	};

	const addFeature = (type: string, quantity: number) => {
		for (let i = 0; i < quantity; i++) {
			const id = uuidv4(); // Generate a new UUID for each object
			if (type === "room-detail") {
				const details = `Room Name: ${roomName}, Width: ${roomWidth}, Depth: ${roomDepth}`;
				addObject(type, id, details);
			} else {
				addObject(type, id);
			}
		}
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
					<div>
						<div className="flex justify-between">
							<h2 className="text-lg font-bold">
								Room Setup
							</h2>
							<Button
								onClick={() =>
									addFeature(
										"room-detail",
										1
									)
								}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
							>
								+
							</Button>
						</div>
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
								inputOnChange={
									handleInputChange
								}
								inputPlaceholder="Qty"
								featureType="door"
								buttonOnClick={() =>
									addFeature(
										"door",
										doorQuantity
									)
								}
							/>
							<FeatureInputButtonPair
								inputType="number"
								inputName="obstacle-quantity"
								inputMin={0}
								inputMax={30}
								inputValue={obstacleQuantity}
								inputOnChange={
									handleInputChange
								}
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
						<h2 className="text-lg font-bold">
							Add Tables
						</h2>
						<div className="flex flex-col justify-center items-center">
							<FeatureInputButtonPair
								inputType="number"
								inputName="table-6-quantity"
								inputMin={0}
								inputMax={30}
								inputValue={table6Quantity}
								inputOnChange={
									handleInputChange
								}
								inputPlaceholder="Qty"
								featureType="table-6"
								buttonOnClick={() =>
									addFeature(
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
								inputOnChange={
									handleInputChange
								}
								inputPlaceholder="Qty"
								featureType="table-8"
								buttonOnClick={() =>
									addFeature(
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
								inputOnChange={
									handleInputChange
								}
								inputPlaceholder="Qty"
								featureType="table-5"
								buttonOnClick={() =>
									addFeature(
										"table-5",
										table5Quantity
									)
								}
							/>
						</div>
					</div>
				</div>
			)}
			{activeMode === "vendor" && (
				<div>
					<h2 className="text-lg font-bold">
						Vendor Setup
					</h2>
					<Button onClick={addVendor}>Add Vendor</Button>

					<Input
						type="text"
						name="vendorName"
						value={vendorDetails.vendorName}
						onChange={handleVendorDetailsChange}
						placeholder="Vendor name"
						className="w-full p-2 rounded bg-gray-700 text-white"
					/>
					<Input
						type="text"
						name="vendorProducts"
						value={vendorDetails.vendorProducts}
						onChange={handleVendorDetailsChange}
						placeholder="Products"
						className="w-full p-2 rounded bg-gray-700 text-white"
					/>
					<textarea
						name="vendorDetails"
						value={vendorDetails.vendorDetails}
						onChange={handleVendorDetailsChange}
						placeholder="Details"
						className="w-full p-2 rounded bg-gray-700 text-white"
						rows={3}
					/>
					{vendors.map((vendor) => (
						<VendorCard key={vendor.id} {...vendor} />
					))}
				</div>
			)}
		</aside>
	);
};

export default SideBar;
