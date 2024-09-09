import React from "react";
import { LockAllObjectsButtonProps } from "../Types";

const LockAllObjectsButton: React.FC<LockAllObjectsButtonProps> = ({
	areAllObjectsLocked,
	lockAllObjects,
}) => {
	return (
		<button
			onClick={lockAllObjects}
			className="bg-customBlue2 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
		>
			{areAllObjectsLocked
				? "Unlock All Objects"
				: "Lock All Objects"}
		</button>
	);
};

export default LockAllObjectsButton;
