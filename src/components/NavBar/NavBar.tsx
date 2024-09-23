// src/components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { NavBarProps } from "../../Types";

const NavBar: React.FC<NavBarProps> = ({ activeMode, setActiveMode }) => {
	const toggleMode = (mode: "setup" | "vendor" | "about" | "") => {
		setActiveMode(activeMode === mode ? "" : mode); // Toggle mode or set to empty
	};
	return (
		// <nav className="bg-gray-800 text-white p-4">
		<nav className="bg-customBlue text-white p-4">
			<div className="flex justify-between items-center">
				<div className="text-lg font-bold">MarkIT</div>
				<div>
					{/* <Button
						className={`px-4 py-2 rounded ${
							activeMode === 'setup'
								? 'bg-blue-500'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
						onClick={() => toggleMode('setup')}
					>
						Setup Mode
					</Button> */}
					<Link to="/">
						<Button
							className={`px-4 py-2 rounded ${
								activeMode === ""
									? "bg-customLightBlue"
									: "bg-customBlue2 hover:bg-customLightBlue"
							}`}
							onClick={() => toggleMode("")}
						>
							Venue
						</Button>
					</Link>
					<Link to="/vendor-mode">
						<Button
							className={`ml-2 px-4 py-2 rounded ${
								activeMode === "vendor"
									? "bg-customLightBlue"
									: "bg-customBlue2 hover:bg-customLightBlue"
							}`}
							onClick={() => toggleMode("vendor")}
						>
							Vendor Mode
						</Button>
					</Link>
				</div>
				<Link to="/about">
					<Button
						// className={`ml-2 px-4 py-2 rounded ${
						// 	activeMode === "vendor"
						// 		? "bg-customLightBlue"
						// 		: "bg-customBlue2 hover:bg-customLightBlue"
						// }`}
						onClick={() => toggleMode("about")}
					>
						About
					</Button>
				</Link>
				{/* <a href="/about" className="hover:underline">
					About
				</a> */}
			</div>
		</nav>
	);
};

export default NavBar;
