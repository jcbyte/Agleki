import React, { useState, useEffect } from "react";
import { Card, CardActionArea, CardContent, IconButton, LinearProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const Latex = require("react-latex");

export default function App() {
	const [showingFront, setShowingFront] = useState(true);
	const [cardContent, setCardContent] = useState({ front: "", back: "" });

	const [difficulty, setDifficulty] = useState(0);

	function getWeightedDifficulty() {
		return difficulty / (difficulty + 4);
	}

	function getNewQuestion(prevSuccess) {
		fetch(`/api/getQuestion?d=${getWeightedDifficulty()}`)
			.then((res) => res.json())
			.then((data) => {
				setCardContent({ front: `$${data.question}$`, back: `$${data.answer}$` });
				setShowingFront(true);
			});
	}

	useEffect(() => {
		getNewQuestion();
	}, []);

	return (
		<>
			<Card variant="outlined" sx={{ minWidth: 275 }} style={{ margin: 10 }}>
				<CardActionArea
					onClick={() => {
						setShowingFront((prev) => !prev);
					}}
				>
					<CardContent>
						<Latex>{showingFront ? cardContent.front : cardContent.back}</Latex>
					</CardContent>
				</CardActionArea>
			</Card>

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
