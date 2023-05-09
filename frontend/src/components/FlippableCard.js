import React, { useState } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

export default function FlippableCard({ frontContent, backContent }) {
	const [showingFront, setShowingFront] = useState(true);

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
