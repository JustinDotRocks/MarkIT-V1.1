// src/components/SideBar.tsx
import React, { useState } from 'react';

type SideBarProps = {
	activeMode: 'setup' | 'vendor' | '';
	addObject: (type: string, details?: string) => void;
};

const SideBar: React.FC<SideBarProps> = ({ activeMode, addObject }) => {
	//Setup State
	const [roomName, setRoomName] = useState('');
	const [roomWidth, setRoomWidth] = useState('');
	const [roomDepth, setRoomDepth] = useState('');
	// Vendor State
	const [vendorName, setVendorName] = useState('');
	const [products, setProducts] = useState('');
	const [details, setDetails] = useState('');

	const handleRoomDetailsChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		switch (name) {
			case 'room-name':
				setRoomName(value);
				break;
			case 'room-width':
				setRoomWidth(value);
				break;
			case 'room-depth':
				setRoomDepth(value);
				break;
			default:
				break;
		}
	};

	// Simplified addObject calls for clarity
	const addFeature = (type: string) => {
		// Check if we're adding room details and construct the details string accordingly
		if (type === 'room-detail') {
			const details = `Room Name: ${roomName}, Width: ${roomWidth}, Depth: ${roomDepth}`;
			addObject(type, details);
		} else {
			// For other features like doors, obstacles, or tables
			addObject(type);
		}
	};

	const handleVendorDetailsChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		switch (name) {
			case 'vendor-name':
				setVendorName(value);
				break;
			case 'products':
				setProducts(value);
				break;
			case 'details':
				setDetails(value);
				break;
			default:
				break;
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
							<button
								onClick={() =>
									addFeature('room-detail')
								}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
							>
								+
							</button>
						</div>
						<div className='mt-2'>
							<input
								type='text'
								name='room-name'
								value={roomName}
								onChange={
									handleRoomDetailsChange
								}
								placeholder='Room name'
								className='w-full p-2 rounded bg-gray-700 text-white'
							/>
							<input
								type='text'
								name='room-width'
								value={roomWidth}
								onChange={
									handleRoomDetailsChange
								}
								placeholder='Enter Room Width'
								className='w-full p-2 rounded bg-gray-700 text-white'
							/>
							<input
								type='text'
								name='room-depth'
								value={roomDepth}
								onChange={
									handleRoomDetailsChange
								}
								placeholder='Enter Room Depth'
								className='w-full p-2 rounded bg-gray-700 text-white'
							/>
						</div>
						<h2 className='text-lg font-bold'>
							Add Features
						</h2>
						<button
							onClick={() => addFeature('door')}
							className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
						>
							Add Door
						</button>
						<button
							onClick={() => addFeature('obstacle')}
							className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
						>
							Add Obstacle
						</button>
						<h2 className='text-lg font-bold'>
							Add Tables
						</h2>
						<button
							onClick={() => addFeature("table-6'")}
							className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
						>
							Add 6' Table
						</button>
						<button
							onClick={() => addFeature("table-8'")}
							className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
						>
							Add 8' Table
						</button>
						<button
							onClick={() => addFeature("table-5'")}
							className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
						>
							Add 5' Round Table
						</button>
					</div>
				</div>
			)}
			{activeMode === 'vendor' && (
				<div>
					<h2 className='text-lg font-bold'>
						Vendor Setup
					</h2>
					<input
						type='text'
						name='vendor-name'
						value={vendorName}
						onChange={handleVendorDetailsChange}
						placeholder='Vendor name'
						className='w-full p-2 rounded bg-gray-700 text-white'
					/>
					<input
						type='text'
						name='products'
						value={products}
						onChange={handleVendorDetailsChange}
						placeholder='Products'
						className='w-full p-2 rounded bg-gray-700 text-white'
					/>
					<textarea
						name='details'
						value={details}
						onChange={handleVendorDetailsChange}
						placeholder='Details'
						className='w-full p-2 rounded bg-gray-700 text-white'
						rows={3}
					/>
				</div>
			)}
		</aside>
	);
};

export default SideBar;
