import React from "react";
import { FeatureInputButtonPairProps } from "../Types";
import Input from "./Input/Input";
import FeatureButton from "./FeatureButton/FeatureButton";

const FeatureInputButtonPair: React.FC<FeatureInputButtonPairProps> = ({
	inputType,
	inputName,
	inputMin,
	inputMax,
	inputValue,
	inputOnChange,
	inputPlaceholder,
	featureType,
	buttonOnClick,
	inputClassName,
	containerClassName,
}) => {
	return (
		<div className={`flex items-center w-full ${containerClassName}`}>
			<Input
				type={inputType}
				name={inputName}
				min={inputMin}
				max={inputMax}
				value={inputValue}
				onChange={inputOnChange}
				className={`w-1/3 p-2 rounded bg-gray-700 text-white mr-2 ${inputClassName}`}
				placeholder={inputPlaceholder}
			/>
			<FeatureButton
				featureType={featureType}
				onClick={buttonOnClick}
			/>
		</div>
	);
};

export default FeatureInputButtonPair;
