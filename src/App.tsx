import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';

const App: React.FC = () => {
	const [activeMode, setActiveMode] = useState<'setup' | 'vendor' | ''>('');

	return (
		<div>
			<NavBar
				activeMode={activeMode}
				setActiveMode={setActiveMode}
			/>
			<SideBar activeMode={activeMode} />
		</div>
	);
};

export default App;
