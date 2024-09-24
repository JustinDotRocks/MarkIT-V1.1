import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { NavBarProps } from "../../Types";

const NavBar: React.FC<NavBarProps> = ({ activeMode, setActiveMode }) => {
	const toggleMode = (mode: "setup" | "vendor" | "about" | "") => {
		setActiveMode(activeMode === mode ? "" : mode);
	};
	return (
		<nav className="bg-customBlue text-white p-4">
			<div className="flex justify-between items-center">
				<div className="text-lg font-bold">
					<Link to="/">
						<Button onClick={() => toggleMode("")}>
							MarkIT
						</Button>
					</Link>
				</div>
				<div>
					<Link to="/venue">
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
					<Button onClick={() => toggleMode("about")}>
						About
					</Button>
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
