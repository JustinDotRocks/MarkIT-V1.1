import React from "react";
import { Link } from "react-router-dom"; // Import Link component

const LandingPage: React.FC = () => {
	return (
		<div
			className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
			style={{
				backgroundImage:
					"url(/path-to-your-background-image.jpg)", // Replace with your image path
			}}
		>
			{/* White opacity overlay */}
			<div className="absolute inset-0 bg-customWhite opacity-50"></div>

			{/* Content */}
			<div className="relative z-10 text-center text-customBlue p-6">
				<h1 className="text-4xl font-bold mb-4">
					Welcome to MarkIT
				</h1>
				<p className="text-xl mb-6">
					Organize your Market with ease. Add rooms, manage
					vendors, and customize layouts.
				</p>
				<Link
					to="/venue" // Navigate to the venue page
					className="bg-customBlue hover:bg-customBlue2 text-white font-bold py-3 px-6 rounded inline-block"
				>
					Go to Venue
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
