// src/components/SideBar.tsx
import React, { useState } from 'react';

type SideBarProps = {
	// Add props as needed, based on what you'll be passing from parent components
};

const SideBar: React.FC<SideBarProps> = () => {
	const [roomName, setRoomName] = useState('');
	const [roomWidth, setRoomWidth] = useState('');
	const [roomDepth, setRoomDepth] = useState('');

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

	return (
		<aside className='w-64 bg-gray-800 text-white p-4'>
			<div className='space-y-4'>
				{/* Room Setup */}
				<div>
					<h2 className='text-lg font-bold'>Room Setup</h2>
					<div className='mt-2'>
						<input
							type='text'
							name='room-name'
							value={roomName}
							onChange={handleRoomDetailsChange}
							placeholder='Room name'
							className='w-full p-2 rounded bg-gray-700 text-white'
						/>
					</div>
					<div className='mt-2'>
						<input
							type='text'
							name='room-width'
							value={roomWidth}
							onChange={handleRoomDetailsChange}
							placeholder='Enter Room Width'
							className='w-full p-2 rounded bg-gray-700 text-white'
						/>
					</div>
					<div className='mt-2'>
						<input
							type='text'
							name='room-depth'
							value={roomDepth}
							onChange={handleRoomDetailsChange}
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
					<button className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'>
						Add Door
					</button>
					<button className='w-full p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600'>
						Add Obstacle
					</button>
					{/* More buttons can be added similarly */}
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
