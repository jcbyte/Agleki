import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

export default function App() {
	return (
		<>
			<Card variant="outlined" sx={{ minWidth: 275 }} style={{ margin: 10 }}>
				<CardActionArea
					onClick={() => {
						console.log("hello");
					}}
				>
					<CardContent>
						<Typography>Question</Typography>
						<Typography>Answer</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
}
