import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import Leaderboard from "./components/Leaderboard";
import { shuffleDeck, deck } from "./CardDeck";

import "./index.css";

function App() {
	const [playerOne, setPlayerOne] = useState("");
	const [playerTwo, setPlayerTwo] = useState("");
	const [errors, setErrors] = useState([]);

	const [currentDeck, setCurrentDeck] = useState(deck);
	const [gameStarted, setGameStarted] = useState(false);

	useEffect(() => {
		setCurrentDeck((prev) => {
			shuffleDeck(prev);
			return [...prev];
		});
	}, [gameStarted]);

	const startGame = (e) => {
		e.preventDefault();
		setErrors([]);

		if (!playerOne || !playerTwo) {
			return setErrors(["Please enter both player names."]);
		}

		if (playerOne === playerTwo) {
			setPlayerOne("");
			setPlayerTwo("");
			return setErrors(["Please choose different user names."]);
		}

		if (
			playerOne.length < 4 ||
			playerOne.length > 30 ||
			playerTwo.length < 4 ||
			playerTwo.length > 30
		) {
			setPlayerOne("");
			setPlayerTwo("");
			return setErrors([
				"Please enter usernames between 4 and 30 characters.",
			]);
		}

		setGameStarted(true);
	};

	return (
		<div className="app_container">
			<Leaderboard />
			<div>
				<form className="username-form">
					<div className="error_container">
						{errors.length > 0 &&
							errors.map((err, i) => <div key={i}>{err}</div>)}
					</div>
					<input
						value={playerOne}
						onChange={(e) => setPlayerOne(e.target.value)}
						disabled={gameStarted}
						placeholder="Player One Username"
					></input>
					<input
						value={playerTwo}
						onChange={(e) => setPlayerTwo(e.target.value)}
						disabled={gameStarted}
						placeholder="Player Two Username"
					></input>
					<button
						onClick={startGame}
						type="button"
						disabled={gameStarted}
						className={
							gameStarted
								? "username_disabled_button"
								: "username_enabled_button"
						}
					>
						Start Game
					</button>
					<button
						type="button"
						className={
							!gameStarted
								? "username_disabled_button"
								: "username_enabled_button"
						}
						onClick={() => {
							setPlayerOne("");
							setPlayerTwo("");
							setGameStarted(false);
						}}
					>
						Reset Game
					</button>
				</form>
			</div>
			{gameStarted ? (
				<GameBoard deck={currentDeck} p1={playerOne} p2={playerTwo} />
			) : (
				<div className="game_not_started">
					<h2>Welcome to the card game of War!</h2>
					<div>Enter both usernames to start a new game.</div>
				</div>
			)}
		</div>
	);
}

export default App;
