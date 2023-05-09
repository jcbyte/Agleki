import React, { useState, useEffect } from "react";
import { Card, CardActionArea, CardContent, IconButton, LinearProgress, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
const Latex = require("react-latex");

export default function App() {
	const [showingFront, setShowingFront] = useState(true);
	const [cardContent, setCardContent] = useState({ front: "", back: "" });
	const [title, setTitle] = useState("");
	const [difficulty, setDifficulty] = useState(0);

	function getWeightedDifficulty() {
		return difficulty / (difficulty + 4);
	}

	function getNewQuestion(prevSuccess) {
		fetch(`/api/getQuestion?d=${getWeightedDifficulty()}`)
			.then((res) => res.json())
			.then((data) => {
				setCardContent({ front: `$${data.question}$`, back: `$${data.answer}$` });
				setTitle(data.title);
				setShowingFront(true);
			});
	}

	useEffect(() => {
		getNewQuestion();
	}, []);

	return (
		<>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Typography variant="h5" component="h5" style={{ margin: "10px" }}>
					{title}
				</Typography>

				<Card
					variant="outlined"
					sx={{ minWidth: 400, minHeight: 300 }}
					style={{ margin: "10px" }}
					onClick={() => {
						setShowingFront((prev) => !prev);
					}}
				>
					<CardActionArea>
						{/* onClick event should be on CardActionArea */}
						<CardContent>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
								<Latex>{showingFront ? cardContent.front : cardContent.back}</Latex>
							</div>
						</CardContent>
					</CardActionArea>
				</Card>

				<div style={{ display: "flex" }}>
					<IconButton
						onClick={() => {
							setDifficulty((prev) => Math.max(prev - 1, 0));
							getNewQuestion();
						}}
						style={{ margin: "10px" }}
					>
						<ClearIcon fontSize="large" />
					</IconButton>
					<IconButton
						onClick={() => {
							setDifficulty((prev) => prev + 1);
							getNewQuestion();
						}}
						style={{ margin: "10px" }}
					>
						<CheckIcon fontSize="large" />
					</IconButton>
				</div>
			</div>

			<LinearProgress variant="determinate" value={getWeightedDifficulty() * 100} />
		</>
	);
}
