import React, { useState, useEffect } from "react";
import { RoomDetailsDisplayProps } from "../Types";

const RoomDetailsDisplay: React.FC<RoomDetailsDisplayProps> = ({
	rooms,
	setSelectedRoomId,
	openAddRoomModal,
	selectedRoomId,
}) => {
	const [isMobile, setIsMobile] = useState<boolean>(
		window.innerWidth < 640
	);

	// Update isMobile state based on window resize
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleRoomSelect = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedRoomId(event.target.value);
	};
	return (
		<div className="flex  sm:justify-start md:justify-center lg:justify-center items-center w-full">
			{isMobile ? (
				// Dropdown for mobile view
				// <div className="flex justify-start items-center ">
				<select
					value={selectedRoomId || ""}
					onChange={handleRoomSelect}
					className="p-2 border border-customBlue rounded bg-customBlue text-white w-1/2 sm:hidden"
				>
					<option value="" disabled>
						Select a Room
					</option>
					{rooms.map((room) => (
						<option key={room.id} value={room.id}>
							{room.name}
						</option>
					))}
				</select>
			) : (
				// </div>
				// Room buttons for desktop view
				<div className="flex flex-row space-x-4">
					{rooms.map((room) => (
						<div
							key={room.id}
							className={`room border p-2 rounded cursor-pointer hover:bg-customBlue2 ${
								room.id === selectedRoomId
									? "bg-customBlue2"
									: "bg-customBlue"
							}`}
							onClick={() =>
								setSelectedRoomId(room.id)
							}
						>
							<h3
								key={room.id}
								className={`flex justify-between items-center ${
									room.id === selectedRoomId
										? "text-white"
										: "text-white"
								}`}
							>
								<span>{room.name}</span>
							</h3>
						</div>
					))}
				</div>
			)}
			<button
				onClick={openAddRoomModal}
				className="ml-4 bg-customBlue hover:bg-green-700 text-white py-2 px-4 rounded"
			>
				+
			</button>
		</div>
	);
};

export default RoomDetailsDisplay;
