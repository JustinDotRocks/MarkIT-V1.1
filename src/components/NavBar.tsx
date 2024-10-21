import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button/Button";
import { NavBarProps } from "../Types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const NavBar: React.FC<NavBarProps> = ({
	activeMode,
	setActiveMode,
	rooms,
	selectedRoomId,
	setSelectedRoomId,
	openAddRoomModal,
}) => {
	const [isVenueDropdownOpen, setIsVenueDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null); // For detecting clicks outside

	const toggleMode = (mode: "setup" | "vendor" | "about" | "") => {
		setActiveMode(activeMode === mode ? "" : mode);
	};

	// Toggle the venue dropdown
	const toggleVenueDropdown = () => {
		setIsVenueDropdownOpen((prevState) => !prevState);
	};

	const handleRoomSelect = (roomId: string) => {
		setSelectedRoomId(roomId);
		setIsVenueDropdownOpen(false); // Close dropdown after selecting a room
	};

	// Handle click outside the dropdown to close it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsVenueDropdownOpen(false); // Close dropdown if clicked outside
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// return (
	// 	<nav className="fixed z-50 bg-white p-4 w-screen">
	// 		<div className="flex justify-between items-center">
	// 			<div className="text-md font-bold">
	// 				<Link to="/">
	// 					<Button
	// 						className="p-0 sm:px-4 sm:py-2 !text-customPurple text-2xl transform transition-transform duration-300 hover:scale-110 focus:scale-110"
	// 						onClick={() => toggleMode("")}
	// 					>
	// 						MarkIT
	// 					</Button>
	// 				</Link>
	// 			</div>
	// 			<div className="relative">
	// 				<div className="flex items-center space-x-2">
	// 					{/* Venue Button with Dropdown Arrow */}
	// 					<Link to="/venue">
	// 						<Button
	// 							className={`rounded p-0 sm:px-0 sm:py-1 md:px-4 !text-customPurple text-xl flex items-baseline transform transition-transform duration-300 hover:scale-110 focus:scale-110 ${
	// 								activeMode === ""
	// 									? "font-bold"
	// 									: "font-normal"
	// 							}`}
	// 							onClick={() => [
	// 								toggleVenueDropdown(),
	// 								toggleMode(""),
	// 							]}
	// 						>
	// 							Venue
	// 							{isVenueDropdownOpen ? (
	// 								<FaChevronUp className="ml-2 text-sm" />
	// 							) : (
	// 								<FaChevronDown className="ml-2 text-sm" />
	// 							)}
	// 						</Button>
	// 					</Link>
	// 				</div>

	// 				{isVenueDropdownOpen && (
	// 					<div
	// 						ref={dropdownRef}
	// 						className="absolute top-full mt-2 bg-white border border-customPurple rounded shadow-lg w-48 z-50"
	// 					>
	// 						{rooms.map((room) => (
	// 							<button
	// 								key={room.id}
	// 								className={`block w-full text-left px-4 py-2 hover:bg-customPurpleLight hover:text-white ${
	// 									room.id ===
	// 									selectedRoomId
	// 										? "bg-gray-100"
	// 										: ""
	// 								}`}
	// 								onClick={() =>
	// 									handleRoomSelect(
	// 										room.id
	// 									)
	// 								}
	// 							>
	// 								{room.name}
	// 							</button>
	// 						))}

	// 						{/* Divider */}
	// 						<hr className="border-t border-customPurple my-2" />

	// 						{/* Add Room Button */}
	// 						<button
	// 							className="block w-full text-left px-4 py-2 bg-customPurple text-white hover:bg-customPurpleLight rounded-b"
	// 							onClick={openAddRoomModal}
	// 						>
	// 							+ Add a Room
	// 						</button>
	// 					</div>
	// 				)}
	// 			</div>

	// 			{/* Vendor and About Buttons */}
	// 			<div>
	// 				<Link to="/vendor-mode">
	// 					<Button
	// 						className={`rounded p-0 sm:px-0 sm:py-1 md:px-4 !text-customPurple text-xl transform transition-transform duration-300 hover:scale-110 focus:scale-110 ${
	// 							activeMode === "vendor"
	// 								? "font-bold"
	// 								: "font-normal"
	// 						}`}
	// 						onClick={() => toggleMode("vendor")}
	// 					>
	// 						Vendors
	// 					</Button>
	// 				</Link>
	// 			</div>
	// 			<Link to="/about">
	// 				<Button
	// 					className="p-0 sm:px-4 sm:py-2 !text-customPurple text-xl transform transition-transform duration-300 hover:scale-110 focus:scale-110"
	// 					onClick={() => toggleMode("about")}
	// 				>
	// 					About
	// 				</Button>
	// 			</Link>
	// 		</div>
	// 	</nav>
	// );
	return (
		<nav className="fixed z-50 bg-white py-4 px-0 md:p-4 w-screen border-b border-customPurple">
			<div className="flex justify-between items-center">
				{/* Left: Logo or Home Link */}
				<div className=" ml-6 md:ml-0 font-bold">
					<Link to="/">
						<Button
							className="p-0 md:px-4 md:py-2 !text-customPurple text-xl md:text-2xl transform transition-transform duration-300 hover:scale-110 focus:scale-110"
							onClick={() => toggleMode("")}
						>
							MarkIT
						</Button>
					</Link>
				</div>

				{/* Right: Venue, Vendor, and About Links */}
				<div className="flex items-center space-x-0 md:space-x-6">
					{/* Grouped Venue and Vendor Links */}
					<div className="flex items-center space-x-0 md:space-x-2">
						{/* Venue Link with Dropdown */}
						<div className="relative">
							<Link to="/venue">
								<Button
									className={`rounded p-0 sm:px-0 sm:py-1 md:px-4 !text-customPurple text-xl flex items-baseline transform transition-transform duration-300 hover:scale-110 focus:scale-110 ${
										activeMode === ""
											? "font-bold"
											: "font-normal"
									}`}
									onClick={() => [
										toggleVenueDropdown(),
										toggleMode(""),
									]}
								>
									Venue
									{isVenueDropdownOpen ? (
										<FaChevronUp className="ml-2 text-sm" />
									) : (
										<FaChevronDown className="ml-2 text-sm" />
									)}
								</Button>
							</Link>

							{/* Dropdown for selecting rooms */}
							{isVenueDropdownOpen && (
								<div
									ref={dropdownRef}
									className="absolute top-full mt-2 bg-white border border-customPurple rounded shadow-lg w-48 z-50"
								>
									{rooms.map((room) => (
										<button
											key={room.id}
											className={`block w-full text-left px-4 py-2 hover:bg-customPurpleLight hover:text-white ${
												room.id ===
												selectedRoomId
													? "bg-gray-100"
													: ""
											}`}
											onClick={() =>
												handleRoomSelect(
													room.id
												)
											}
										>
											{room.name}
										</button>
									))}

									<hr className="border-t border-customPurple my-2" />
									<button
										className="block w-full text-left px-4 py-2 bg-customPurple text-white hover:bg-customPurpleLight rounded-b"
										onClick={
											openAddRoomModal
										}
									>
										+ Add a Room
									</button>
								</div>
							)}
						</div>

						{/* Vendor Link */}
						<Link to="/vendor-mode">
							<Button
								className={`rounded p-0 sm:px-0 sm:py-1 md:px-4 !text-customPurple text-lg md:text-xl transform transition-transform duration-300 hover:scale-110 focus:scale-110 ${
									activeMode === "vendor"
										? "font-bold"
										: "font-normal"
								}`}
								onClick={() =>
									toggleMode("vendor")
								}
							>
								Vendors
							</Button>
						</Link>
					</div>

					{/* About Link */}
					<Link to="/about">
						<Button
							className="p-0 sm:px-4 sm:py-2 !text-customPurple text-lg md:text-xl mr-8 md:mr-2 transform transition-transform duration-300 hover:scale-110 focus:scale-110"
							onClick={() => toggleMode("about")}
						>
							About
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
