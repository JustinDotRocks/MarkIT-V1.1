// src/components/NavBar.tsx
import React from 'react';
import Button from '../Button/Button';

type NavBarProps = {
	activeMode: 'setup' | 'vendor' | '';
	setActiveMode: (mode: 'setup' | 'vendor' | '') => void;
};

const NavBar: React.FC<NavBarProps> = ({ activeMode, setActiveMode }) => {
	const toggleMode = (mode: 'setup' | 'vendor' | '') => {
		setActiveMode(activeMode === mode ? '' : mode); // Toggle mode or set to empty
	};
	return (
		<nav className='bg-gray-800 text-white p-4'>
			<div className='flex justify-between items-center'>
				<div className='text-lg font-bold'>MarkIT</div>
				<div>
					<Button
						className={`px-4 py-2 rounded ${
							activeMode === 'setup'
								? 'bg-blue-500'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
						onClick={() => toggleMode('setup')}
					>
						Setup Mode
					</Button>
					<Button
						className={`ml-2 px-4 py-2 rounded ${
							activeMode === 'vendor'
								? 'bg-blue-500'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
						onClick={() => toggleMode('vendor')}
					>
						Vendor Mode
					</Button>
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
