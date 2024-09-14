// VendorSignInComponent.tsx
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { VendorSignInComponentProps } from "../Types";

const VendorSignInComponent: React.FC<VendorSignInComponentProps> = ({
	signedIn,
	onToggleSignedIn,
	size = 32,
	className = "",
}) => {
	// const [signedIn, setSignedIn] = useState(initialSignedIn);

	// const toggleSignedIn = () => {
	// 	const newSignedInState = !signedIn;
	// 	setSignedIn(newSignedInState);

	// 	// Communicate the change back to the parent component
	// 	if (onSignedInChange) {
	// 		onSignedInChange(newSignedInState);
	// 	}
	// };

	return (
		<button
			// onClick={toggleSignedIn}
			onClick={onToggleSignedIn}
			className={`focus:outline-none ${className}`}
			title={
				signedIn ? "Mark as not signed in" : "Mark as signed in"
			}
			aria-label={
				signedIn ? "Mark as not signed in" : "Mark as signed in"
			}
		>
			<FaCheckCircle
				className={signedIn ? "text-green-500" : "text-red-500"}
				size={size}
			/>
		</button>
	);
};

export default VendorSignInComponent;
