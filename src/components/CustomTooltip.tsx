import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#4a235a",
		color: "#ffffff",
		zIndex: 100,
		fontSize: 14,
	},
}));

export default CustomTooltip;
