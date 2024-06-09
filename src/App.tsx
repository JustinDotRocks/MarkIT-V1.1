// import React, { useState } from 'react';
// import NavBar from './components/NavBar/NavBar';
// import SideBar from './components/SideBar/SideBar';
// import CanvasArea from './components/CanvasArea/CanvasArea';
// import { CanvasObject } from './Types';

// const App: React.FC = () => {
// 	const [activeMode, setActiveMode] = useState<'setup' | 'vendor' | ''>(
// 		'setup'
// 	);
// 	const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>([]);

// 	const addObjectToCanvas = (type: string, details?: string) => {
// 		const newObject: CanvasObject = {
// 			id: canvasObjects.length + 1,
// 			type: type,
// 			details: details,
// 		};
// 		setCanvasObjects((prevObjects) => [...prevObjects, newObject]);
// 	};

// 	return (
// 		<div className='flex flex-col h-screen'>
// 			<NavBar
// 				activeMode={activeMode}
// 				setActiveMode={setActiveMode}
// 			/>
// 			<div className='relative flex flex-col flex-grow overflow-scroll'>
// 				<SideBar
// 					activeMode={activeMode}
// 					addObject={addObjectToCanvas}
// 				/>
// 				<div className='absolute top-2/3 bottom-0 w-full h-screen'>
// 					<CanvasArea objects={canvasObjects} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default App;

import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import CanvasArea from "./components/CanvasArea/CanvasArea";
import { CanvasObject } from "./Types";

const App: React.FC = () => {
	const [activeMode, setActiveMode] = useState<"setup" | "vendor" | "">(
		"setup"
	);
	const [features, setFeatures] = useState<CanvasObject[]>([]);

	const addObjectToCanvas = (
		type: string,
		id: string,
		details?: string
	) => {
		const newObject: CanvasObject = { id, type, details };
		setFeatures((prevFeatures) => [...prevFeatures, newObject]);
	};

	const removeObjectFromCanvas = (id: string) => {
		setFeatures((prevFeatures) =>
			prevFeatures.filter((feature) => feature.id !== id)
		);
	};

	return (
		<div className="flex flex-col h-screen">
			<NavBar
				activeMode={activeMode}
				setActiveMode={setActiveMode}
			/>

			<div className="relative flex flex-col flex-grow overflow-scroll">
				<SideBar
					activeMode={activeMode}
					addObject={addObjectToCanvas}
				/>

				<CanvasArea
					objects={features}
					removeObject={removeObjectFromCanvas}
				/>
			</div>
		</div>
	);
};

export default App;
