import React, { useState, useEffect } from "react";
import { IconButton, LinearProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import FlippableCard from "./FlippableCard";

export default function App() {
	const [cardContent, setCardContent] = useState({ front: "", back: "" });
	const [resetCard_FLAG, setResetCard_FLAG] = useState(0);

	const [difficulty, setDifficulty] = useState(0);

	function getWeightedDifficulty() {
		return difficulty / (difficulty + 1);
	}

	function getNewQuestion(prevSuccess) {
		fetch(`/api/getQuestion?d=${getWeightedDifficulty()}`)
			.then((res) => res.json())
			.then((data) => {
				setCardContent({ front: `$${data.question}$`, back: `$${data.answer}$` });
				setResetCard_FLAG((prev) => prev + 1);
			});
	}

	useEffect(() => {
		getNewQuestion();
	}, []);

	return (
		<>
			<FlippableCard frontContent={cardContent.front} backContent={cardContent.back} resetFront_FLAG={resetCard_FLAG} />
			<IconButton
				onClick={() => {
					setDifficulty((prev) => Math.max(prev - 1, 0));
					getNewQuestion();
				}}
			>
				<ClearIcon />
			</IconButton>
			<IconButton
				onClick={() => {
					setDifficulty((prev) => prev + 1);
					getNewQuestion();
				}}
			>
				<CheckIcon />
			</IconButton>
			<LinearProgress variant="determinate" value={getWeightedDifficulty() * 100} />
		</>
	);
}
