// import React from 'react';
// import { useState } from 'react';
// interface VendorDetails {
// 	vendorName: string;
// 	products: string;
// 	details: string;
// 	tableNumber: string;
// 	roomName: string;
// 	signedIn: boolean;
// 	electricityRequired: boolean;
// }

// interface VendorCardProps extends VendorDetails {}

// // const VendorCard: React.FC<VendorCardProps> = ({
// // 	vendorName,
// // 	products,
// // 	details,
// // 	tableNumber,
// // 	roomName,
// // 	signedIn,
// // 	electricityRequired,
// // }) => {
// // 	return (
// // 		<div className='card-container bg-white rounded-lg shadow-md p-4'>
// // 			<div>Vendor Name: {vendorName}</div>
// // 			<div>Products: {products}</div>
// // 			<div>Vendor Details: {details}</div>
// // 			<div>Table Number: {tableNumber}</div>
// // 			<div>Room Name: {roomName}</div>
// // 			<div>Signed In: {signedIn ? 'Yes' : 'No'}</div>
// // 			<div>
// // 				Electricity Required:{' '}
// // 				{electricityRequired ? 'Yes' : 'No'}
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default VendorCard;
// const VendorSetup: React.FC = () => {
// 	const [vendorDetails, setVendorDetails] = useState<VendorDetails>({
// 		vendorName: '',
// 		products: '',
// 		details: '',
// 		tableNumber: '',
// 		roomName: '',
// 		signedIn: false,
// 		electricityRequired: false,
// 	});

// 	// Correctly type the event for HTML input elements
// 	// const handleVendorDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 	//   const { name, value, type, checked } = e.target;
// 	//   setVendorDetails(prev => ({
// 	//     ...prev,
// 	//     [name]: type === 'checkbox' ? checked : value
// 	//   }));
// 	// };
// 	const handleVendorDetailsChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value, type } = e.target;
// 		if (type === 'checkbox') {
// 			const { checked } = e.target as HTMLInputElement; // Type assertion here
// 			setVendorDetails((prev) => ({
// 				...prev,
// 				[name]: checked,
// 			}));
// 		} else {
// 			setVendorDetails((prev) => ({
// 				...prev,
// 				[name]: value,
// 			}));
// 		}
// 	};

// 	return (
// 		<div>
// 			<input
// 				type='text'
// 				name='vendorName'
// 				value={vendorDetails.vendorName}
// 				onChange={handleVendorDetailsChange}
// 				placeholder='Enter vendor name'
// 			/>
// 			{/* Additional input fields for other properties */}
// 		</div>
// 	);
// };

// export default VendorSetup;

import React from 'react';
import { VendorDetails } from '../../Types';

const VendorCard: React.FC<VendorDetails> = ({
	vendorName,
	vendorProducts,
	vendorDetails,
	tableNumber,
	roomName,
	signedIn,
	electricityRequired,
}) => {
	return (
		<div className='card-container bg-gray-700 rounded-lg shadow-md p-4 m-4'>
			<div>Vendor Name: {vendorName}</div>
			<div>Products: {vendorProducts}</div>
			<div>Vendor Details: {vendorDetails}</div>
			<div>Table Number: {tableNumber}</div>
			<div>Room Name: {roomName}</div>
			<div>Signed In: {signedIn ? 'Yes' : 'No'}</div>
			<div>
				Electricity Required:{' '}
				{electricityRequired ? 'Yes' : 'No'}
			</div>
		</div>
	);
};

export default VendorCard;
