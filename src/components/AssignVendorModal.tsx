import React, { useState, useEffect } from "react";
import Button from "./Button/Button";
import { AssignVendorModalProps } from "../Types";

const AssignVendorModal: React.FC<AssignVendorModalProps> = ({
	isOpen,
	onClose,
	vendors,
	// onAssign,
	tables,
	rooms,
	setTables,
	selectedTableId,
}) => {
	const [selectedVendorId, setSelectedVendorId] = useState<string>("");

	// const handleAssign = () => {
	// 	if (selectedVendorId) {
	// 		onAssign(selectedVendorId);
	// 		onClose();
	// 	}
	// };

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden"; // Prevent background scrolling
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const handleAssignVendor = (vendorId: string) => {
		if (selectedTableId) {
			setTables((prevTables) =>
				prevTables.map((table) =>
					table.id === selectedTableId
						? { ...table, vendorId }
						: table
				)
			);
			setSelectedVendorId("");
			onClose(); // Close the modal after assignment
		}
	};

	// const handleRemoveVendor = (tableId: string) => {
	// 	setTables((prevTables) =>
	// 		prevTables.map((table) =>
	// 			table.id === tableId
	// 				? { ...table, vendorId: undefined }
	// 				: table
	// 		)
	// 	);
	// };

	// Helper function to determine if a vendor is assigned to any table
	const isVendorAssigned = (vendorId: string) => {
		return tables.some((table) => table.vendorId === vendorId);
	};

	// Function to find the room and table details for a vendor
	const getVendorAssignmentDetails = (vendorId: string) => {
		const assignedTable = tables.find(
			(table) => table.vendorId === vendorId
		);
		if (!assignedTable) return null;

		const assignedRoom = rooms.find(
			(room) => room.id === assignedTable.roomId
		);
		const roomName = assignedRoom ? assignedRoom.name : "Unknown Room";

		return {
			tableNumber: assignedTable.tableNumber,
			roomName,
			tableId: assignedTable.id,
		};
	};

	// const handleModalClose = (event: MouseEvent) => {
	// 	if (event.target === event.currentTarget) {
	// 		onClose();
	// 	}
	// };
	const handleModalClose: React.MouseEventHandler<HTMLDivElement> = (
		event
	) => {
		// Check if the click was on the backdrop, not the content inside the modal
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 flex items-center justify-center z-50"
			style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
			onClick={handleModalClose}
		>
			<div className="bg-white p-4 rounded-lg w-96 z-60">
				<h2 className="text-xl font-bold mb-4">
					Assign Vendor to Table
				</h2>
				<ul>
					{vendors.map((vendor) => {
						const isAssigned = isVendorAssigned(
							vendor.id
						);
						const assignmentDetails = isAssigned
							? getVendorAssignmentDetails(
									vendor.id
							  )
							: null;

						return (
							<li key={vendor.id} className="mb-2">
								<button
									onClick={() =>
										!isAssigned &&
										handleAssignVendor(
											vendor.id
										)
									}
									disabled={isAssigned}
									className={`py-2 px-4 rounded w-full font-bold ${
										isAssigned
											? "bg-gray-300 text-gray-600 cursor-not-allowed"
											: "bg-blue-500 hover:bg-blue-700 text-white"
									}`}
								>
									{vendor.name}
									{isAssigned && (
										<span className="text-sm">
											{" "}
											(Assigned to{" "}
											{
												assignmentDetails?.roomName
											}
											, Table{" "}
											{
												assignmentDetails?.tableNumber
											}
											)
										</span>
									)}
								</button>
								{/* {isAssigned && (
									<button
										onClick={() =>
											handleRemoveVendor(
												assignmentDetails?.tableId!
											)
										}
										className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
									>
										Remove Vendor
									</button>
								)} */}
							</li>
						);
					})}
				</ul>
				<button
					onClick={onClose}
					className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default AssignVendorModal;