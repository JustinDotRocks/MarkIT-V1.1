import React from "react";
import { FeatureButtonProps } from "../../Types";
import Button from "../Button/Button";

const FeatureButton: React.FC<FeatureButtonProps> = ({
	featureType,
	onClick,
	buttonClassName,
	className,
	...props
}) => {
	// Define button text based on the feature type
	const buttonText = (() => {
		switch (featureType) {
			case "door":
				return "Add Door";
			case "obstacle":
				return "Add Obstacle";
			case "table-6":
				return "Add 6' Table";
			case "table-8":
				return "Add 8' Table";
			case "table-5":
				return "Add 5' Round Table";
			default:
				return "Add Feature";
		}
	})();

	return (
		<Button
			onClick={onClick}
			className={`w-1/2 p-2 mt-2 rounded bg-blue-500 hover:bg-blue-600 ${buttonClassName}`}
			{...props}
		>
			{buttonText}
		</Button>
	);
};

export default FeatureButton;
