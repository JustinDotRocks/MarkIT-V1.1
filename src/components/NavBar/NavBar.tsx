// src/components/NavBar.tsx
import React from 'react';

type NavBarProps = {
	activeMode: 'setup' | 'vendor';
	setActiveMode: (mode: 'setup' | 'vendor') => void;
};

const NavBar: React.FC<NavBarProps> = ({ activeMode, setActiveMode }) => {
	return (
		<nav className='bg-gray-800 text-white p-4'>
			<div className='flex justify-between items-center'>
				<div className='text-lg font-bold'>MarkIT</div>
				<div>
					<button
						className={`px-4 py-2 rounded ${
							activeMode === 'setup'
								? 'bg-blue-500'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
						onClick={() => setActiveMode('setup')}
					>
						Setup Mode
					</button>
					<button
						className={`ml-2 px-4 py-2 rounded ${
							activeMode === 'vendor'
								? 'bg-blue-500'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
						onClick={() => setActiveMode('vendor')}
					>
						Vendor Mode
					</button>
				</div>
				<a
					href='/about'
					className='hover:underline'
				>
					About
				</a>
			</div>
		</nav>
	);
};

export default NavBar;
