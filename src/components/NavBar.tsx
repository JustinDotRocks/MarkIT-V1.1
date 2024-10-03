import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button/Button";
import { NavBarProps } from "../Types";

const NavBar: React.FC<NavBarProps> = ({ activeMode, setActiveMode }) => {
	const toggleMode = (mode: "setup" | "vendor" | "about" | "") => {
		setActiveMode(activeMode === mode ? "" : mode);
	};
	return (
		<nav className="fixed z-50 bg-customBlue text-white p-4 w-screen">
			<div className="flex justify-between items-center">
				<div className="text-md font-bold">
					<Link to="/">
						<Button
							className="p-0 sm:px-4 sm:py-2"
							onClick={() => toggleMode("")}
						>
							MarkIT
						</Button>
					</Link>
				</div>
				<div>
					<Link to="/venue">
						<Button
							className={`rounded p-0 sm:px-4 sm:py-2 ${
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
							className={`ml-2 rounded p-0 sm:px-4 sm:py-2 ${
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
						className="p-0 sm:px-4 sm:py-2"
						onClick={() => toggleMode("about")}
					>
						About
					</Button>
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
