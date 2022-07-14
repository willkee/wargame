import React, { useEffect, useState } from "react";
import { Modal } from "../../context/modal";
import styles from "./leaderboard.module.css";

const Leaderboard = () => {
	const [board, setBoard] = useState([]);
	const [showLeaderboard, setShowLeaderboard] = useState(false);

	useEffect(() => {
		const retrieveLeaderboard = async () => {
			const board = await fetch("/api/leaderboard");
			const res = await board.json();
			setBoard(res);
		};

		retrieveLeaderboard();
	}, [showLeaderboard]);
	return (
		<div>
			<button
				className={styles.show}
				onClick={() => setShowLeaderboard(true)}
			>
				Show Leaderboard (Lifetime Wins)
			</button>
			{showLeaderboard && (
				<Modal onClose={() => setShowLeaderboard(false)}>
					<div className={styles.lb_container}>
						<h2>War Leaderboard</h2>
						<div className={styles.board_grid}>
							<div className={styles.board_header}>Username</div>
							<div className={styles.board_header}>Wins</div>
							{board.map((entry, i) => (
								<div className={styles.board_row} key={i}>
									<div>{entry.username}</div>
									<div>{entry.wins}</div>
								</div>
							))}
						</div>
						<button
							className={styles.close}
							onClick={() => setShowLeaderboard(false)}
						>
							Close Leaderboard
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Leaderboard;
