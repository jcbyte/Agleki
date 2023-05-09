import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
//import { Latex } from "react-latex";

var Latex = require("react-latex");

export default function FlippableCard({ frontContent, backContent, resetFront_FLAG }) {
	const [showingFront, setShowingFront] = useState(true);

	useEffect(() => {
		setShowingFront(true);
	}, [resetFront_FLAG]);

	return (
		<>
			<Card variant="outlined" sx={{ minWidth: 275 }} style={{ margin: 10 }}>
				<CardActionArea
					onClick={() => {
						setShowingFront(!showingFront);
					}}
				>
					<CardContent>
						<Latex>{"$" + (showingFront ? frontContent : backContent) + "$"}</Latex>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
}
