import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LandingPageProps } from "../Types";

const LandingPage: React.FC<LandingPageProps> = ({
	roomsLength,
	openAddRoomModal,
}) => {
	const navigate = useNavigate(); // Initialize navigate here

	const handleGetStarted = () => {
		if (roomsLength === 0) {
			openAddRoomModal(); // Open the add room modal if no rooms exist
		}
		navigate("/venue"); // Always navigate to venue
	};

	return (
		<div
			className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
			style={{
				backgroundImage:
					"url(/path-to-your-background-image.jpg)", // Replace with your image path
			}}
		>
			{/* White opacity overlay */}
			<div className="absolute inset-0 bg-white opacity-50"></div>

			{/* Content */}
			<div className="relative z-10 text-center text-customPurple p-6">
				<h1 className="text-4xl font-bold mb-4">
					Welcome to MarkIT
				</h1>
				<p className="text-xl mb-6">
					Organize your Market with ease. Add rooms, manage
					vendors, and customize layouts.
				</p>
				<Link
					to="/venue" // Navigate to the venue page
					onClick={handleGetStarted}
					className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-3 px-6 rounded inline-block"
				>
					Get Started
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
