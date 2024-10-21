import React from "react";
import { LockAllObjectsButtonProps } from "../Types";
import { FaLock, FaUnlock } from "react-icons/fa";

const LockAllObjectsButton: React.FC<LockAllObjectsButtonProps> = ({
	areAllObjectsLocked,
	lockAllObjects,
}) => {
	return (
		<button
			onClick={lockAllObjects}
			className="bg-customPurple hover:bg-customPurpleLight text-white font-bold py-1 px-2 mb-1 rounded"
		>
			{areAllObjectsLocked ? <FaLock /> : <FaUnlock />}
		</button>
	);
};

export default LockAllObjectsButton;
