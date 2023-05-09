import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import FlippableCard from "./FlippableCard";

export default function App() {
	const [cardContent, setCardContent] = useState({ front: "", back: "" });
	const [resetCard_FLAG, setResetCard_FLAG] = useState(0);

	const [difficulty, setDifficulty] = useState(1);

	function getNewQuestion() {
		fetch(`/api/getQuestion?d=${difficulty}`)
			.then((res) => res.json())
			.then((data) => {
				setCardContent({ front: `$${data.question}$`, back: `$${data.answer}$` });
				setResetCard_FLAG(resetCard_FLAG + 1);
			});
	}

	useEffect(() => {
		getNewQuestion();
	}, []);

	return (
		<>
			<FlippableCard frontContent={cardContent.front} backContent={cardContent.back} resetFront_FLAG={resetCard_FLAG} />
			<Button variant="outlined" endIcon={<ArrowForwardIcon />} onClick={getNewQuestion}>
				Next
			</Button>
		</>
	);
}
