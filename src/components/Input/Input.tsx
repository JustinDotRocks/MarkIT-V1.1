// src/components/Input/Input.tsx
import React from "react";
import { InputProps } from "../../Types";

const Input: React.FC<InputProps> = ({
	type = "text",
	name,
	value,
	onChange,
	placeholder,
	className,
	min,
	max,
}) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`w-1/2 p-2 rounded bg-customBlue2 text-white placeholder-white ${className}`}
			min={min}
			max={max}
		/>
	);
};

export default Input;
