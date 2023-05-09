import React from "react";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import FlippableCard from "./FlippableCard";

export default function App() {
	return (
		<>
			<FlippableCard frontContent="Question" backContent="Answer" />
			<Button variant="outlined" endIcon={<ArrowForwardIcon />}>
				Next
			</Button>
		</>
	);
}
