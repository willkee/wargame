import { useState } from "react";

const GameBoard = () => {
	const [playerOne, setPlayerOne] = useState("");
	const [playerTwo, setPlayerTwo] = useState("");

	return (
		<div>
			<form>
				<input
					value={playerOne}
					onChange={(e) => setPlayerOne(e.target.value)}
				></input>
				<input
					value={playerTwo}
					onChange={(e) => setPlayerTwo(e.target.value)}
				></input>
				<button disabled={!playerOne || !playerTwo}>Start Game</button>
			</form>
		</div>
	);
};

export default GameBoard;
