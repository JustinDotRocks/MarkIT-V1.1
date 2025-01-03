import React from "react";
import { ButtonProps } from "../../Types";

const Button: React.FC<ButtonProps> = ({
	onClick,
	className,
	children,
	type = "button",
	disabled = false,
}) => {
	return (
		<button
			type={type}
			className={` px-2 md:px-4 py-2 rounded text-white ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
