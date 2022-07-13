import { useEffect, useState } from "react";

const Leaderboard = () => {
	const [board, setBoard] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const retrieveLeaderboard = async () => {
			const board = await fetch("/api/leaderboard");
			const res = await board.json();
			setBoard(res);
			setIsLoaded(true);
		};

		retrieveLeaderboard();
	}, []);
	return (
		<div>
			{isLoaded && (
				<div>
					{board.map((entry, i) => (
						<div key={i}>
							<div>{entry.username}</div>
							<div>{entry.wins}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Leaderboard;
