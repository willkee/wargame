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

		if (playerOne === playerTwo) {
			setPlayerOne("");
			setPlayerTwo("");
			return setErrors(["Please choose different user names."]);
		}

		if (!playerOne || !playerTwo) {
			return setErrors(["Please enter both player names."]);
		}
		setGameStarted(true);
	};

	return (
		<div>
			<div>
				<div>
					{errors.length > 0 &&
						errors.map((err, i) => <div key={i}>{err}</div>)}
				</div>
				<form className="username-form">
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
					>
						Start Game
					</button>
					<button type="button" onClick={() => setGameStarted(false)}>
						Reset Game
					</button>
				</form>
			</div>
			{gameStarted ? (
				<GameBoard deck={currentDeck} p1={playerOne} p2={playerTwo} />
			) : (
				<div>Enter both usernames to start a new game.</div>
			)}
			<Leaderboard />
		</div>
	);
}

export default App;
