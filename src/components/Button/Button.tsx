import React from 'react';
import { ButtonProps } from '../../Types';

// Button component definition
const Button: React.FC<ButtonProps> = ({
	onClick,
	className,
	children,
	type = 'button',
	disabled = false,
}) => {
	return (
		<button
			type={type}
			className={`px-4 py-2 rounded text-white ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
