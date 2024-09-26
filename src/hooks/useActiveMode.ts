import { useState } from "react";

export const useActiveMode = () => {
	const [activeMode, setActiveMode] = useState<
		"setup" | "vendor" | "about" | ""
	>("setup");

	return { activeMode, setActiveMode };
};
