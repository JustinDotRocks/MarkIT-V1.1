import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Accordion Section Component
const AccordionSection: React.FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	// Toggle state for accordion
	const [isOpen, setIsOpen] = useState(false);

	// Function to toggle accordion open/close
	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="mb-6">
			<div
				className="flex justify-between items-center cursor-pointer mb-2"
				onClick={toggleAccordion}
			>
				<h3 className="text-xl font-bold">{title}</h3>
				{isOpen ? (
					<FaChevronUp className="text-customPurple" />
				) : (
					<FaChevronDown className="text-customPurple" />
				)}
			</div>
			{/* Conditionally render content based on isOpen */}
			{isOpen && <div className="ml-4">{children}</div>}
		</div>
	);
};

const AboutPage: React.FC = () => {
	return (
		<div className="container mx-auto mt-28 p-6 text-customPurple min-h-screen h-full">
			<h1 className="text-3xl font-bold mb-4">About MarkIT</h1>
			<p className="mb-6">
				Welcome to <strong>MarkIT</strong>, your all-in-one
				solution for managing vendors, rooms, and event layouts.
			</p>

			{/* Accordion Sections */}

			{/* Section 1: Add Rooms */}
			<AccordionSection title="1. Add Rooms">
				<p className="mb-2">
					<strong>Navigate to the Room Section:</strong> On
					the main dashboard, you'll find the option to
					manage rooms.
				</p>
				<p className="mb-2">
					<strong>Add a New Room:</strong>
				</p>
				<ul className="list-disc pl-6 mb-4">
					<li>
						Click the <strong>"Add Room"</strong>{" "}
						button.
					</li>
					<li>
						Enter the <strong>Room Name</strong>,{" "}
						<strong>Width</strong>, and{" "}
						<strong>Depth</strong>.
					</li>
					<li>
						Click <strong>"Add Room"</strong> to save.
					</li>
				</ul>
				<p className="mb-2">
					<strong>Select a Room:</strong>
				</p>
				<ul className="list-disc pl-6 mb-6">
					<li>Click a room button to select it.</li>
				</ul>
			</AccordionSection>

			{/* Section 2: Add Vendors */}
			<AccordionSection title="2. Add Vendors">
				<p className="mb-2">
					<strong>Navigate to the Vendor Section:</strong>{" "}
					Access the vendor management area from the main
					menu.
				</p>
				<p className="mb-2">
					<strong>Add a New Vendor:</strong>
				</p>
				<ul className="list-disc pl-6 mb-4">
					<li>
						Click the <strong>"Add Vendor"</strong>{" "}
						button.
					</li>
					<li>
						Fill in the vendor details and click{" "}
						<strong>"Add Vendor"</strong>.
					</li>
				</ul>
			</AccordionSection>

			{/* Section 3: Assign Tables to Vendors */}
			<AccordionSection title="3. Assign Tables to Vendors">
				<p className="mb-2">
					<strong>Access the Room Layout:</strong> Select a
					room to view its layout.
				</p>
				<ul className="list-disc pl-6 mb-4">
					<li>Drag and drop tables onto the room grid.</li>
					<li>
						Assign a vendor to a table by clicking on a
						table and selecting a vendor.
					</li>
				</ul>
			</AccordionSection>

			{/* Section 4: Manage Vendors */}
			<AccordionSection title="4. Manage Vendors">
				<p className="mb-2">
					<strong>Edit Vendor Details:</strong> Click{" "}
					<strong>"Edit Vendor"</strong> to update a
					vendor's information.
				</p>
				<p className="mb-2">
					<strong>Delete a Vendor:</strong> Click{" "}
					<strong>"Delete"</strong> on a vendor card.
				</p>
			</AccordionSection>

			{/* Section 5: Vendor Sign-In */}
			<AccordionSection title="5. Vendor Sign-In">
				<ul className="list-disc pl-6 mb-6">
					<li>
						Use the <strong>Sign-In</strong> icon to
						track vendor attendance.
					</li>
				</ul>
			</AccordionSection>

			{/* Section 6: Customize Room Layout */}
			<AccordionSection title="6. Customize Room Layout">
				<p className="mb-2">
					<strong>Zoom In and Out:</strong> Use the zoom
					slider or scroll to adjust the room layout view.
				</p>
				<p className="mb-2">
					<strong>Drag the Room:</strong> Click on an empty
					part of the room and drag it around the screen.
				</p>
				<p className="mb-2">
					<strong>Rotate Objects:</strong> Use the rotate
					handler to change the orientation of objects.
				</p>
			</AccordionSection>

			{/* Thank You Note */}
			<p className="text-center font-bold">
				Thank you for choosing <strong>MarkIT</strong> for your
				market planning needs!
			</p>
		</div>
	);
};

export default AboutPage;
