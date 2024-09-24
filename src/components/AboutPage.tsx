import React from "react";

const AboutPage: React.FC = () => {
	return (
		<div className="container mx-auto p-6 text-customBlue">
			{/* Header */}
			<h1 className="text-3xl font-bold mb-4">About MarkIT</h1>
			<p className="mb-6">
				Welcome to <strong>MarkIT</strong>, your all-in-one
				solution for managing vendors, rooms, and event layouts.{" "}
				<strong>MarkIT</strong> is designed to streamline the
				process of organizing Markets by allowing you to add
				rooms, manage vendors, assign tables, and customize
				layouts with ease.
			</p>

			{/* How to Use MarkIT */}
			<h2 className="text-2xl font-bold mb-4">How to Use MarkIT</h2>

			{/* Section 1: Add Rooms */}
			<h3 className="text-xl font-bold mb-2">1. Add Rooms</h3>
			<p className="mb-2">
				<strong>Navigate to the Room Section</strong>: On the
				main dashboard, you'll find the option to manage rooms.
			</p>
			<p className="mb-2">
				<strong>Add a New Room</strong>:
			</p>
			<ul className="list-disc pl-6 mb-4">
				<li>
					Click the <strong>"Add Room"</strong> button.
				</li>
				<li>
					A modal will appear prompting you to enter the{" "}
					<strong>Room Name</strong>, <strong>Width</strong>
					, and <strong>Depth</strong>.
				</li>
				<li>
					Fill in the required details and click{" "}
					<strong>"Add Room"</strong>.
				</li>
			</ul>
			<p className="mb-2">
				<strong>Select a Room</strong>:
			</p>
			<ul className="list-disc pl-6 mb-6">
				<li>
					Rooms are displayed as buttons on the dashboard.
					Click on a room to select it.
				</li>
			</ul>

			{/* Section 2: Add Vendors */}
			<h3 className="text-xl font-bold mb-2">2. Add Vendors</h3>
			<p className="mb-2">
				<strong>Navigate to the Vendor Section</strong>: Access
				the vendor management area from the main menu.
			</p>
			<p className="mb-2">
				<strong>Add a New Vendor</strong>:
			</p>
			<ul className="list-disc pl-6 mb-4">
				<li>
					Click the <strong>"Add Vendor"</strong> button.
				</li>
				<li>
					Fill in the <strong>Vendor Name</strong>,{" "}
					<strong>Products</strong>, and any additional{" "}
					<strong>Details</strong>.
				</li>
				<li>
					Indicate if{" "}
					<strong>Electricity is Required</strong> by
					checking the box.
				</li>
				<li>
					Click <strong>"Add Vendor"</strong> to save.
				</li>
			</ul>
			<p className="mb-6">
				<strong>Note</strong>: Vendor names must be unique. The
				app will alert you if a duplicate name is entered.
			</p>

			{/* Section 3: Assign Tables to Vendors */}
			<h3 className="text-xl font-bold mb-2">
				3. Assign Tables to Vendors
			</h3>
			<p className="mb-2">
				<strong>Access the Room Layout</strong>: Select a room
				to view its layout.
			</p>
			<p className="mb-2">
				<strong>Add Tables</strong>:
			</p>
			<ul className="list-disc pl-6 mb-4">
				<li>
					Use the table tools to add different types of
					tables (e.g., 6' Table, 8' Table, 5' Round Table).
				</li>
				<li>Drag and drop tables onto the room grid.</li>
			</ul>
			<p className="mb-2">
				<strong>Assign a Vendor to a Table</strong>:
			</p>
			<ul className="list-disc pl-6 mb-6">
				<li>
					Click on a table to open the{" "}
					<strong>Options Bar</strong>.
				</li>
				<li>
					Select <strong>"Add Vendor"</strong> and choose a
					vendor from the list.
				</li>
				<li>The vendor will now be assigned to that table.</li>
			</ul>

			{/* Section 4: Manage Vendors */}
			<h3 className="text-xl font-bold mb-2">4. Manage Vendors</h3>
			<p className="mb-2">
				<strong>Edit Vendor Details</strong>:
			</p>
			<ul className="list-disc pl-6 mb-4">
				<li>Navigate to the vendor list.</li>
				<li>
					Click <strong>"Edit Vendor"</strong> on a vendor
					card.
				</li>
				<li>
					Update the vendor's information. The app prevents
					changing the name to an existing vendor's name.
				</li>
			</ul>
			<p className="mb-2">
				<strong>Delete a Vendor</strong>:
			</p>
			<ul className="list-disc pl-6 mb-6">
				<li>
					Click <strong>"Delete"</strong> on the vendor
					card.
				</li>
				<li>Confirm the deletion in the prompt.</li>
			</ul>

			{/* Section 5: Vendor Sign-In */}
			<h3 className="text-xl font-bold mb-2">5. Vendor Sign-In</h3>
			<p className="mb-2">
				<strong>Track Vendor Attendance</strong>:
			</p>
			<ul className="list-disc pl-6 mb-6">
				<li>
					On the vendor card, there's a{" "}
					<strong>Sign-In</strong> icon.
				</li>
				<li>
					Click the icon to toggle the vendor's{" "}
					<strong>Signed In</strong> status.
				</li>
				<li>
					A green check indicates the vendor has signed in.
				</li>
			</ul>

			{/* Section 6: Customize Room Layout */}
			<h3 className="text-xl font-bold mb-2">
				6. Customize Room Layout
			</h3>
			<p className="mb-2">
				<strong>Zoom In and Out</strong>:
			</p>
			<ul className="list-disc pl-6 mb-4">
				<li>
					Scroll using your <strong>Trackpad</strong> or{" "}
					<strong>Mouse Wheel</strong> or use the{" "}
					<strong>Zoom Slider</strong> on the right edge of
					the screen to adjust the zoom level of the room
					layout.
				</li>
			</ul>
			<p className="mb-2">
				<strong>Rotate Objects</strong>:
			</p>
			<ul className="list-disc pl-6 mb-4">
				<li>
					Select an object (table or feature) and use the{" "}
					<strong>Rotate Handler</strong> to adjust its
					orientation.
				</li>
			</ul>
			<p className="mb-2">
				<strong>Lock Objects</strong>:
			</p>
			<ul className="list-disc pl-6 mb-6">
				<li>
					Use the <strong>Options Bar</strong> to lock
					objects in place, preventing accidental movement.
				</li>
			</ul>

			{/* Additional Features */}
			<h2 className="text-2xl font-bold mb-4">
				Additional Features
			</h2>
			<ul className="list-disc pl-6 mb-6">
				<li>
					<strong>Responsive Design</strong>: While{" "}
					<strong>MarkIT</strong> is optimized for desktop
					use, it features responsive design to ensure
					usability on various screen sizes.
				</li>
				<li>
					<strong>Custom Icons</strong>: The app uses
					intuitive icons (like the custom arrow in
					dropdowns) for a better user experience.
				</li>
				<li>
					<strong>Error Handling</strong>: Input fields
					provide immediate feedback, highlighting errors in
					red and displaying messages to guide corrections.
				</li>
			</ul>

			{/* Need Help */}
			<h2 className="text-2xl font-bold mb-4">Need Help?</h2>
			<p className="mb-6">
				If you have any questions or encounter issues, feel free
				to reach out to our support team or consult the help
				documentation within the app.
			</p>

			{/* Thank You Note */}
			<p className="text-center font-bold">
				Thank you for choosing <strong>MarkIT</strong> for your
				event planning needs. We continually strive to improve
				your experience, so please don't hesitate to provide
				feedback!
			</p>
		</div>
	);
};

export default AboutPage;
