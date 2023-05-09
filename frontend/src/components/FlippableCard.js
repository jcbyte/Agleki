import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

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
						<Typography>{showingFront ? frontContent : backContent}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
}
