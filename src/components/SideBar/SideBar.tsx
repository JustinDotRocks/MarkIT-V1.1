// src/components/SideBar.tsx
import React, { useState } from 'react';

type SideBarProps = {
	activeMode: 'setup' | 'vendor';
};

const SideBar: React.FC<SideBarProps> = ({ activeMode }) => {
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
		switch (e.target.name) {
			case 'room-name':
				setRoomName(e.target.value);
				break;
			case 'room-width':
				setRoomWidth(e.target.value);
				break;
			case 'room-depth':
				setRoomDepth(e.target.value);
				break;
			default:
				break;
		}
	};

	const logRoomDetails = () => {
		console.log(
			`Room Name: ${roomName}, Width: ${roomWidth}, Depth: ${roomDepth}`
		);
	};

	const handleAddDoorClick = () => {
		console.log('Add Door button clicked.');
	};

	const handleAddObstacleClick = () => {
		console.log('Add Obstacle button clicked.');
	};

	const logAddTable = (tableType: string) => {
		console.log(`Add ${tableType} Table button clicked.`);
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
		<aside className='w-64 bg-gray-800 text-white p-4'>
			{activeMode === 'setup' && (
				<div className='space-y-4'>
					{/* Room Setup */}
					<div>
						<div className='flex justify-between'>
							<h2 className='text-lg font-bold'>
								Room Setup
							</h2>
							<button
								onClick={logRoomDetails}
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
						</div>
						<div className='mt-2'>
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
						</div>
						<div className='mt-2'>
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
					</div>

					{/* Add Door and Other Actions */}
					<div>
						<h2 className='text-lg font-bold'>
							Add Features
						</h2>
						<button
							className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
							onClick={handleAddDoorClick}
						>
							Add Door
						</button>
						<button
							className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
							onClick={handleAddObstacleClick}
						>
							Add Obstacle
						</button>
						{/* Add Tables Section */}
						<div>
							<h2 className='text-lg font-bold'>
								Add Tables
							</h2>
							<button
								onClick={() =>
									logAddTable(
										"8' Rectangle"
									)
								}
								className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
							>
								Add 8' Rectangle
							</button>
							<button
								onClick={() =>
									logAddTable(
										"6' Rectangle"
									)
								}
								className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
							>
								Add 6' Rectangle
							</button>
							<button
								onClick={() =>
									logAddTable("5' Round")
								}
								className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'
							>
								Add 5' Round
							</button>
						</div>
					</div>
				</div>
			)}
			{activeMode === 'vendor' && (
				<div>
					<h2 className='text-lg font-bold'>
						Vendor Setup
					</h2>
					<div className='mt-2'>
						<input
							type='text'
							name='vendor-name'
							value={vendorName}
							onChange={handleVendorDetailsChange}
							placeholder='Vendor name'
							className='w-full p-2 rounded bg-gray-700 text-white'
						/>
					</div>
					<div className='mt-2'>
						<input
							type='text'
							name='products'
							value={products}
							onChange={handleVendorDetailsChange}
							placeholder='Products'
							className='w-full p-2 rounded bg-gray-700 text-white'
						/>
					</div>
					<div className='mt-2'>
						<textarea
							name='details'
							value={details}
							onChange={handleVendorDetailsChange}
							placeholder='Details'
							className='w-full p-2 rounded bg-gray-700 text-white'
							rows={3}
						/>
					</div>
				</div>
			)}
		</aside>
	);
};

export default SideBar;
