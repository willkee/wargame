import { useEffect, useState } from "react";
import Player from "../Player";
import { shuffleDeck, deck, values } from "./deck";

const Cards = () => {
	const [gameOver, setGameOver] = useState(false);
	const [currentDeck, setCurrentDeck] = useState(deck);

	const [opponent, setOpponent] = useState([]);
	const [self, setSelf] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const [oppWin, setOppWin] = useState(false);
	const [selfWin, setSelfWin] = useState(false);

	useEffect(() => {
		setOpponent(currentDeck.slice(0, deck.length / 2));
		setSelf(currentDeck.slice(deck.length / 2));
		setLoaded(true);
	}, [currentDeck]);

	const shuffle = () => {
		setCurrentDeck((prev) => {
			shuffleDeck(prev);
			setGameOver(false);
			return [...prev];
		});
	};

	// const opponent = deck.slice(0, deck.length / 2)
	// const self = deck.slice(deck.length / 2)

	const makePlay = async (e) => {
		e.preventDefault();

		// pop last value from each deck and compare
		const [opponentPlay, selfPlay] = await removeCard();

		if (!opponentPlay) {
			setSelfWin(true);
			return;
		} else if (!selfPlay) {
			setOppWin(true);
			return;
		}

		if (values[opponentPlay[0]] > values[selfPlay[0]]) {
			console.log(opponent, "BEFORE SET OPP");
			await setOpponent((prev) => [...prev, opponentPlay, selfPlay]);
			console.log(opponent, "AFTER");
		} else if (values[opponentPlay[0]] < values[selfPlay[0]]) {
			await setSelf((prev) => [...prev, selfPlay, opponentPlay]);
		} else {
			const winningPlay = [];
			goToWar(opponentPlay, selfPlay, winningPlay);

			if (oppWin || selfWin) {
				setGameOver(true);
				return;
			}
		}
	};

	const removeCard = async () => {
		if (!opponent.length) return [null, true];
		if (!self.length) return [true, null];

		const opponentPlay = opponent[0];
		const selfPlay = self[0];

		setOpponent((state) => [...state.slice(1)]);
		setSelf((state) => [...state.slice(1)]);

		return [opponentPlay, selfPlay];
	};

	const goToWar = (lastOpponentPlay, lastSelfPlay, winningPlay) => {
		winningPlay.push(lastOpponentPlay, lastSelfPlay);

		for (let i = 0; i < 3; i++) {
			const [roundOpp, roundSelf] = removeCard();

			if (!roundOpp) return setSelfWin(true);
			if (!roundSelf) return setOppWin(true);

			winningPlay.push(roundOpp, roundSelf);
		}

		const [opponentPlay, selfPlay] = removeCard();

		if (opponentPlay[1] === selfPlay[1]) goToWar(opponentPlay, selfPlay);
	};

	return (
		<div>
			{loaded && (
				<>
					<div>
						<button onClick={shuffle} disabled={!gameOver}>
							New Game
						</button>

						<button
							disabled={gameOver}
							onClick={() => setGameOver(true)}
						>
							Forfeit Game
						</button>

						{/* {currentDeck.map((card) => (
					<div>
						{card[1]}
						{card[0]}
					</div>
				))} */}
					</div>
					<Player deck={opponent} />
					<Player deck={self} />
					<button onClick={makePlay}>Play Round</button>
				</>
			)}
		</div>
	);
};

export default Cards;
