import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import FlippableCard from "./FlippableCard";

export default function App() {
	const [cardContent, setCardContent] = useState({ front: "q1", back: "a1" });
	const [resetCard_FLAG, setResetCard_FLAG] = useState(0);

	function getNewQuestion() {
		fetch("/api/getQuestion")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setCardContent({ front: data.Question, back: data.Answer });
				setResetCard_FLAG(resetCard_FLAG + 1);
			});
	}

	return (
		<>
			<FlippableCard frontContent={cardContent.front} backContent={cardContent.back} resetFront_FLAG={resetCard_FLAG} />
			<Button variant="outlined" endIcon={<ArrowForwardIcon />} onClick={getNewQuestion}>
				Next
			</Button>
		</>
	);
}
