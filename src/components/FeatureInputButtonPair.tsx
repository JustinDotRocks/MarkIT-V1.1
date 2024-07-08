import React, { useState } from "react";
import { FeatureInputButtonPairProps } from "../Types";
import Input from "./Input/Input";
import FeatureButton from "./FeatureButton/FeatureButton";

// ADDED: Generic type parameter T
const FeatureInputButtonPair: React.FC<
	FeatureInputButtonPairProps<
		"door" | "obstacle" | "table-6" | "table-8" | "table-5"
	>
> = ({ featureType, buttonOnClick, inputClassName, containerClassName }) => {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleButtonClick = () => {
		buttonOnClick(featureType, parseInt(inputValue));
		setInputValue(""); // Reset input after button click
	};

	return (
		<div className={`flex items-center w-full ${containerClassName}`}>
			<Input
				type="number"
				name={`${featureType}-quantity`}
				min={0}
				max={30}
				value={inputValue}
				onChange={handleInputChange}
				className={`w-1/3 p-2 rounded bg-gray-700 text-white mr-2 ${inputClassName}`}
				placeholder="Qty"
			/>
			<FeatureButton
				featureType={featureType}
				onClick={handleButtonClick}
			/>
		</div>
	);
};

export default FeatureInputButtonPair;
