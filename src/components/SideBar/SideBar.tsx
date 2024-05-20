// import React, { useState } from 'react';
// import Button from '../Button/Button';
// import VendorCard from '../VendorCard/VendorCard';
// import { v4 as uuidv4 } from 'uuid'; // Importing the UUID function

// type SideBarProps = {
// 	activeMode: 'setup' | 'vendor' | '';
// 	addObject: (type: string, id: string, details?: string) => void;
// };

// interface VendorDetails {
// 	vendorName: string;
// 	vendorProducts: string;
// 	vendorDetails: string;
// 	tableNumber: string;
// 	roomName: string;
// 	signedIn: boolean;
// 	electricityRequired: boolean;
//   }

// const SideBar: React.FC<SideBarProps> = ({ activeMode, addObject }) => {
// 	//Setup State
// 	const [roomName, setRoomName] = useState('');
// 	const [roomWidth, setRoomWidth] = useState('');
// 	const [roomDepth, setRoomDepth] = useState('');
// 	// const [quantity, setQuantity] = useState(0); // State to handle quantity input
// 	const [doorQuantity, setDoorQuantity] = useState(0);
// 	const [obstacleQuantity, setObstacleQuantity] = useState(0);
// 	const [table6Quantity, setTable6Quantity] = useState(0);
// 	const [table8Quantity, setTable8Quantity] = useState(0);
// 	const [table5Quantity, setTable5Quantity] = useState(0);

// 	// Vendor State
// 	const [vendorName, setVendorName] = useState('');
// 	const [vendorProducts, setVendorProducts] = useState('');
// 	const [vendorDetails, setVendorDetails] = useState('');

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		const num = Math.min(Math.max(0, parseInt(value)), 30);
// 		switch (name) {
// 			case 'door-quantity':
// 				setDoorQuantity(isNaN(num) ? 0 : num);
// 				break;
// 			case 'obstacle-quantity':
// 				setObstacleQuantity(isNaN(num) ? 0 : num);
// 				break;
// 			case 'table-6-quantity':
// 				setTable6Quantity(isNaN(num) ? 0 : num);
// 				break;
// 			case 'table-8-quantity':
// 				setTable8Quantity(isNaN(num) ? 0 : num);
// 				break;
// 			case 'table-5-quantity':
// 				setTable5Quantity(isNaN(num) ? 0 : num);
// 				break;
// 			default:
// 				// Handle other inputs like room name, width, depth
// 				if (name === 'room-name') setRoomName(value);
// 				else if (name === 'room-width') setRoomWidth(value);
// 				else if (name === 'room-depth') setRoomDepth(value);
// 				break;
// 		}
// 	};

// 	//  addObject calls for clarity
// 	const addFeature = (type: string, quantity: number) => {
// 		for (let i = 0; i < quantity; i++) {
// 			const id = uuidv4(); // Generate a new UUID for each object

// 			if (type === 'room-detail') {
// 				const details = `Room Name: ${roomName}, Width: ${roomWidth}, Depth: ${roomDepth}`;
// 				addObject(type, details, id);
// 			} else {
// 				addObject(type, id, undefined);
// 			}
// 		}
// 	};
// 	const VendorSetup: React.FC = () => {
// 		const [vendors, setVendors] = useState<VendorDetails[]>([]);
// 		const [vendorDetails, setVendorDetails] = useState<VendorDetails>({
// 		  vendorName: '',
// 		  vendorProducts: '',
// 		  vendorDetails: '',
// 		  tableNumber: '',
// 		  roomName: '',
// 		  signedIn: false,
// 		  electricityRequired: false
// 		});

// 	// const handleVendorDetailsChange = (
// 	// 	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	// ) => {
// 	// 	const { name, value } = e.target;
// 	// 	switch (name) {
// 	// 		case 'vendor-name':
// 	// 			setVendorName(value);
// 	// 			break;
// 	// 		case 'products':
// 	// 			setProducts(value);
// 	// 			break;
// 	// 		case 'details':
// 	// 			setDetails(value);
// 	// 			break;
// 	// 		default:
// 	// 			break;
// 	// 	}
// 	// };
// 	// const handleVendorDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 	// 	const { name, value, type, checked } = e.target;
// 	// 	setVendorDetails(prev => ({
// 	// 	  ...prev,
// 	// 	  [name]: type === 'checkbox' ? checked : value
// 	// 	}));
// 	//   };
// 	const handleVendorDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 		const { name, value, type } = e.target;
// 		if (type === 'checkbox') {
// 			// Explicitly cast the target to HTMLInputElement to access 'checked'
// 			const checked = (e.target as HTMLInputElement).checked;
// 			setVendorDetails(prev => ({
// 				...prev,
// 				[name]: checked
// 			}));
// 		} else {
// 			setVendorDetails(prev => ({
// 				...prev,
// 				[name]: value
// 			}));
// 		}
// 	};

// 	  const addVendor = () => {
// 		setVendors([...vendors, vendorDetails]);
// 		setVendorDetails({
// 		  vendorName: '',
// 		  vendorProducts: '',
// 		  vendorDetails: '',
// 		  tableNumber: '',
// 		  roomName: '',
// 		  signedIn: false,
// 		  electricityRequired: false
// 		});
// 	  };

// 	return (
// 		<aside
// 			className={`w-full h-3/5 overflow-y-auto bg-gray-800 text-white p-4 transition-all duration-300 ${
// 				activeMode
// 					? 'max-h-screen opacity-100 visible'
// 					: 'max-h-0 opacity-0 invisible'
// 			} overflow-hidden`}
// 		>
// 			{activeMode === 'setup' && (
// 				<div className='space-y-4'>
// 					<div>
// 						<div className='flex justify-between'>
// 							<h2 className='text-lg font-bold'>
// 								Room Setup
// 							</h2>

// 							<Button
// 								onClick={() =>
// 									addFeature(
// 										'room-detail',
// 										1
// 									)
// 								}
// 								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
// 							>
// 								+
// 							</Button>
// 						</div>
// 						<div className='mt-2'>
// 							<input
// 								type='text'
// 								name='room-name'
// 								value={roomName}
// 								onChange={handleInputChange}
// 								placeholder='Room name'
// 								className='w-full p-2 rounded bg-gray-700 text-white'
// 							/>
// 							<input
// 								type='text'
// 								name='room-width'
// 								value={roomWidth}
// 								onChange={handleInputChange}
// 								placeholder='Enter Room Width'
// 								className='w-full p-2 rounded bg-gray-700 text-white'
// 							/>
// 							<input
// 								type='text'
// 								name='room-depth'
// 								value={roomDepth}
// 								onChange={handleInputChange}
// 								placeholder='Enter Room Depth'
// 								className='w-full p-2 rounded bg-gray-700 text-white'
// 							/>
// 						</div>
// 						<h2 className='text-lg font-bold'>
// 							Add Features
// 						</h2>
// 						<div className='flex flex-col justify-center items-center'>
// 							<div className='flex items-center w-full'>
// 								<input
// 									type='number'
// 									name='door-quantity'
// 									min='0'
// 									max='30'
// 									value={doorQuantity}
// 									onChange={
// 										handleInputChange
// 									}
// 									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
// 									placeholder='Qty'
// 								/>
// 								<Button
// 									onClick={() =>
// 										addFeature(
// 											'door',
// 											doorQuantity
// 										)
// 									}
// 									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
// 								>
// 									Add Door
// 								</Button>
// 							</div>
// 							<div className='flex items-center w-full'>
// 								<input
// 									type='number'
// 									name='obstacle-quantity'
// 									min='0'
// 									max='30'
// 									value={obstacleQuantity}
// 									onChange={
// 										handleInputChange
// 									}
// 									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
// 									placeholder='Qty'
// 								/>
// 								<Button
// 									onClick={() =>
// 										addFeature(
// 											'obstacle-quantity',
// 											obstacleQuantity
// 										)
// 									}
// 									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
// 								>
// 									Add Obstacle
// 								</Button>
// 							</div>
// 						</div>
// 						<h2 className='text-lg font-bold'>
// 							Add Tables
// 						</h2>
// 						<div className='flex flex-col justify-center items-center'>
// 							<div className='flex items-center w-full'>
// 								<input
// 									type='number'
// 									name='table-6-quantity'
// 									min='0'
// 									max='30'
// 									value={table6Quantity}
// 									onChange={
// 										handleInputChange
// 									}
// 									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
// 									placeholder='Qty'
// 								/>
// 								<Button
// 									onClick={() =>
// 										addFeature(
// 											"table-6'",
// 											table6Quantity
// 										)
// 									}
// 									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
// 								>
// 									Add 6' Table
// 								</Button>
// 							</div>
// 							<div className='flex items-center w-full'>
// 								<input
// 									type='number'
// 									name='table-8-quantity'
// 									min='0'
// 									max='30'
// 									value={table8Quantity}
// 									onChange={
// 										handleInputChange
// 									}
// 									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
// 									placeholder='Qty'
// 								/>
// 								<Button
// 									onClick={() =>
// 										addFeature(
// 											"table-8'",
// 											table8Quantity
// 										)
// 									}
// 									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
// 								>
// 									Add 8' Table
// 								</Button>
// 							</div>
// 							<div className='flex items-center w-full'>
// 								<input
// 									type='number'
// 									name='table-5-quantity'
// 									min='0'
// 									max='30'
// 									value={table5Quantity}
// 									onChange={
// 										handleInputChange
// 									}
// 									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
// 									placeholder='Qty'
// 								/>
// 								<Button
// 									onClick={() =>
// 										addFeature(
// 											"table-5'",
// 											table5Quantity
// 										)
// 									}
// 									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
// 								>
// 									Add 5' Round Table
// 								</Button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			{activeMode === 'vendor' && (
// 				<div>
// 					<h2 className='text-lg font-bold'>
// 						Vendor Setup
// 					</h2>
// 					<input
// 						type='text'
// 						name='vendor-name'
// 						value={vendorDetails.vendorName}
// 						onChange={handleVendorDetailsChange}
// 						placeholder='Vendor name'
// 						className='w-full p-2 rounded bg-gray-700 text-white'
// 					/>
// 					<input
// 						type='text'
// 						name='vendorProducts'
// 						value={vendorDetails.vendorProducts}
// 						onChange={handleVendorDetailsChange}
// 						placeholder='Products'
// 						className='w-full p-2 rounded bg-gray-700 text-white'
// 					/>
// 					<textarea
// 						name='vendorDetails'
// 						value={vendorDetails.vendorDetails}
// 						onChange={handleVendorDetailsChange}
// 						placeholder='Details'
// 						className='w-full p-2 rounded bg-gray-700 text-white'
// 						rows={3}
// 					/>
// 					<Button onClick={addVendor}>Add Vendor</Button>
// 					{vendors.map((vendor, index) => (
// 						<VendorCard key={index} {...vendor} />
// 					))}
// 				</div>
// 			)}
// 		</aside>
// 	);
// };

// export default SideBar;

import React, { useState } from 'react';
import { VendorDetails } from '../../Types';
import Button from '../Button/Button';
import VendorCard from '../VendorCard/VendorCard';
import { v4 as uuidv4 } from 'uuid'; // Importing the UUID function

type SideBarProps = {
	activeMode: 'setup' | 'vendor' | '';
	addObject: (type: string, id: string, details?: string) => void;
};

const SideBar: React.FC<SideBarProps> = ({ activeMode, addObject }) => {
	// Setup State
	const [roomName, setRoomName] = useState('');
	const [roomWidth, setRoomWidth] = useState('');
	const [roomDepth, setRoomDepth] = useState('');
	const [doorQuantity, setDoorQuantity] = useState(0);
	const [obstacleQuantity, setObstacleQuantity] = useState(0);
	const [table6Quantity, setTable6Quantity] = useState(0);
	const [table8Quantity, setTable8Quantity] = useState(0);
	const [table5Quantity, setTable5Quantity] = useState(0);

	// Vendor State
	const [vendors, setVendors] = useState<VendorDetails[]>([]);
	const [vendorDetails, setVendorDetails] = useState<VendorDetails>({
		id: '',
		vendorName: '',
		vendorProducts: '',
		vendorDetails: '',
		tableNumber: '',
		roomName: '',
		signedIn: false,
		electricityRequired: false,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const num = Math.min(Math.max(0, parseInt(value)), 30);
		switch (name) {
			case 'door-quantity':
				setDoorQuantity(num);
				break;
			case 'obstacle-quantity':
				setObstacleQuantity(num);
				break;
			case 'table-6-quantity':
				setTable6Quantity(num);
				break;
			case 'table-8-quantity':
				setTable8Quantity(num);
				break;
			case 'table-5-quantity':
				setTable5Quantity(num);
				break;
			default:
				if (name === 'room-name') setRoomName(value);
				else if (name === 'room-width') setRoomWidth(value);
				else if (name === 'room-depth') setRoomDepth(value);
				break;
		}
	};

	// const handleVendorDetailsChange = (
	// 	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) => {
	// 	const { name, type, value } = e.target;
	// 	const isChecked =
	// 		type === 'checkbox'
	// 			? (e.target as HTMLInputElement).checked
	// 			: value;
	// 	setVendorDetails((prev) => ({
	// 		...prev,
	// 		[name]: isChecked,
	// 	}));
	// };
	const handleVendorDetailsChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		if (type === 'checkbox') {
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

	// const addVendor = () => {
	// 	setVendors((prev) => [...prev, vendorDetails]);
	// 	setVendorDetails({
	// 		vendorName: '',
	// 		vendorProducts: '',
	// 		vendorDetails: '',
	// 		tableNumber: '',
	// 		roomName: '',
	// 		signedIn: false,
	// 		electricityRequired: false,
	// 	});
	// };
	// const addVendor = () => {
	// 	setVendors((vendors) => [...vendors, vendorDetails]);
	// 	setVendorDetails({
	// 		vendorName: '',
	// 		vendorProducts: '',
	// 		vendorDetails: '',
	// 		tableNumber: '',
	// 		roomName: '',
	// 		signedIn: false,
	// 		electricityRequired: false,
	// 	});
	// };
	const addVendor = () => {
		const newVendor = { ...vendorDetails, id: uuidv4() }; // Adding a unique id to each new vendor
		setVendors([...vendors, newVendor]);
		// Resetting vendorDetails for next input
		setVendorDetails({
			id: '',
			vendorName: '',
			vendorProducts: '',
			vendorDetails: '',
			tableNumber: '',
			roomName: '',
			signedIn: false,
			electricityRequired: false,
		});
	};

	const addFeature = (type: string, quantity: number) => {
		for (let i = 0; i < quantity; i++) {
			const id = uuidv4(); // Generate a new UUID for each object
			if (type === 'room-detail') {
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
					? 'max-h-screen opacity-100 visible'
					: 'max-h-0 opacity-0 invisible'
			} overflow-hidden`}
		>
			{activeMode === 'setup' && (
				<div className='space-y-4'>
					<div>
						<div className='flex justify-between'>
							<h2 className='text-lg font-bold'>
								Room Setup
							</h2>
							<Button
								onClick={() =>
									addFeature(
										'room-detail',
										1
									)
								}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
							>
								+
							</Button>
						</div>
						<div className='mt-2'>
							<input
								type='text'
								name='room-name'
								value={roomName}
								onChange={handleInputChange}
								placeholder='Room name'
								className='w-full p-2 rounded bg-gray-700 text-white'
							/>
							<input
								type='text'
								name='room-width'
								value={roomWidth}
								onChange={handleInputChange}
								placeholder='Enter Room Width'
								className='w-full p-2 rounded bg-gray-700 text-white'
							/>
							<input
								type='text'
								name='room-depth'
								value={roomDepth}
								onChange={handleInputChange}
								placeholder='Enter Room Depth'
								className='w-full p-2 rounded bg-gray-700 text-white'
							/>
						</div>
						<h2 className='text-lg font-bold'>
							Add Features
						</h2>
						<div className='flex flex-col justify-center items-center'>
							<div className='flex items-center w-full'>
								<input
									type='number'
									name='door-quantity'
									min='0'
									max='30'
									value={doorQuantity}
									onChange={
										handleInputChange
									}
									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
									placeholder='Qty'
								/>
								<Button
									onClick={() =>
										addFeature(
											'door',
											doorQuantity
										)
									}
									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
								>
									Add Door
								</Button>
							</div>
							<div className='flex items-center w-full'>
								<input
									type='number'
									name='obstacle-quantity'
									min='0'
									max='30'
									value={obstacleQuantity}
									onChange={
										handleInputChange
									}
									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
									placeholder='Qty'
								/>
								<Button
									onClick={() =>
										addFeature(
											'obstacle-quantity',
											obstacleQuantity
										)
									}
									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
								>
									Add Obstacle
								</Button>
							</div>
						</div>
						<h2 className='text-lg font-bold'>
							Add Tables
						</h2>
						<div className='flex flex-col justify-center items-center'>
							<div className='flex items-center w-full'>
								<input
									type='number'
									name='table-6-quantity'
									min='0'
									max='30'
									value={table6Quantity}
									onChange={
										handleInputChange
									}
									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
									placeholder='Qty'
								/>
								<Button
									onClick={() =>
										addFeature(
											"table-6'",
											table6Quantity
										)
									}
									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
								>
									Add 6' Table
								</Button>
							</div>
							<div className='flex items-center w-full'>
								<input
									type='number'
									name='table-8-quantity'
									min='0'
									max='30'
									value={table8Quantity}
									onChange={
										handleInputChange
									}
									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
									placeholder='Qty'
								/>
								<Button
									onClick={() =>
										addFeature(
											"table-8'",
											table8Quantity
										)
									}
									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
								>
									Add 8' Table
								</Button>
							</div>
							<div className='flex items-center w-full'>
								<input
									type='number'
									name='table-5-quantity'
									min='0'
									max='30'
									value={table5Quantity}
									onChange={
										handleInputChange
									}
									className='w-1/3 p-2 rounded bg-gray-700 text-white mr-2'
									placeholder='Qty'
								/>
								<Button
									onClick={() =>
										addFeature(
											"table-5'",
											table5Quantity
										)
									}
									className='w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
								>
									Add 5' Round Table
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
			{activeMode === 'vendor' && (
				<div>
					<h2 className='text-lg font-bold'>
						Vendor Setup
					</h2>
					<Button onClick={addVendor}>Add Vendor</Button>

					<input
						type='text'
						name='vendorName'
						value={vendorDetails.vendorName}
						onChange={handleVendorDetailsChange}
						placeholder='Vendor name'
						className='w-full p-2 rounded bg-gray-700 text-white'
					/>
					<input
						type='text'
						name='vendorProducts'
						value={vendorDetails.vendorProducts}
						onChange={handleVendorDetailsChange}
						placeholder='Products'
						className='w-full p-2 rounded bg-gray-700 text-white'
					/>
					<textarea
						name='vendorDetails'
						value={vendorDetails.vendorDetails}
						onChange={handleVendorDetailsChange}
						placeholder='Details'
						className='w-full p-2 rounded bg-gray-700 text-white'
						rows={3}
					/>
					{vendors.map((vendor) => (
						<VendorCard
							key={vendor.id}
							{...vendor}
						/>
					))}
				</div>
			)}
		</aside>
	);
};

export default SideBar;
