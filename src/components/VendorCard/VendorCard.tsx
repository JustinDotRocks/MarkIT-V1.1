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
