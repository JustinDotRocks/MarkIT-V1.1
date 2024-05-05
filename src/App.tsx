import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';

const App: React.FC = () => {
	const [activeMode, setActiveMode] = useState<'setup' | 'vendor'>('setup');

	return (
		<div>
			<NavBar
				activeMode={activeMode}
				setActiveMode={setActiveMode}
			/>
			{activeMode === 'setup' && <SideBar />}
			{/* Other components here */}
		</div>
	);
};

export default App;
