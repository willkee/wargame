import { useEffect, useState } from "react";
import { values } from "../../CardDeck";
import P1Hand from "./PlayerOne";
import P2Hand from "./PlayerTwo";

import "./GameBoard.css";

const GameBoard = ({ deck, p1, p2 }) => {
	const [p1Deck, setP1Deck] = useState([]);
	const [p2Deck, setP2Deck] = useState([]);

	const [p1Current, setP1Current] = useState([]);
	const [p2Current, setP2Current] = useState([]);

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setP1Deck(deck.slice(0, deck.length / 2));
		setP2Deck(deck.slice(deck.length / 2));
		setLoaded(true);
	}, [deck]);

	const drawCards = (e) => {
		e.preventDefault();

		setP1Current(p1Deck[0]);
		setP2Current(p2Deck[0]);
		setP1Deck((prev) => prev.slice(1));
		setP2Deck((prev) => prev.slice(1));
	};

	const determineWin = () => {
		const p1CardValue = values[p1Current[0]];
		const p2CardValue = values[p2Current[0]];

		console.log(p1Current, p2Current);
		console.log(p1CardValue, p2CardValue, "CARD VALUES");

		if (p1CardValue > p2CardValue) {
			setP1Deck((prev) => [...prev, p1Current, p2Current]);
			setP1Current([]);
			setP2Current([]);
		} else if (p1CardValue < p2CardValue) {
			setP2Deck((prev) => [...prev, p1Current, p2Current]);
			setP1Current([]);
			setP2Current([]);
		} else {
			const spoilsOfWar = [p1Current, p2Current];
			warBattle(spoilsOfWar);
			// setP1Deck((prev) => [...prev, p1Current]);
			// setP2Deck((prev) => [...prev, p2Current]);
			// setP1Current([]);
			// setP2Current([]);
		}
		return;
	};

	const warBattle = async (spoilsOfWar) => {
		while (true) {
			// If either player doesn't have enough cards for war, other player wins.
			if (p1Deck.length < 2) {
				setP2Deck((prev) => [...prev, ...p1Deck]);
				setP1Deck([]);
				break;
			} else if (p2Deck.length < 2) {
				setP1Deck((prev) => [...prev, ...p2Deck]);
				setP2Deck([]);
				break;
			}

			// Face down cards
			let card1_hidden = p1Deck[0];
			let card2_hidden = p2Deck[0];
			// Face up cards
			let card1_shown = p1Deck[1];
			let card2_shown = p2Deck[1];
			// Compare values of face up cards
			let card1Val = values[card1_shown[0]];
			let card2Val = values[card2_shown[0]];

			// Add face down and face up cards to spoils of war.
			spoilsOfWar.push(
				card1_hidden,
				card2_hidden,
				card1_shown,
				card2_shown
			);

			setP1Deck((prev) => prev.slice(2));
			setP2Deck((prev) => prev.slice(2));

			if (card1Val > card2Val) {
				console.log(spoilsOfWar, "spoils");
				setP1Deck((prev) => [...prev, ...spoilsOfWar]);
				console.log(p1Deck, "p1");
			} else if (card2Val > card1Val) {
				console.log(spoilsOfWar, "spoils");
				setP2Deck((prev) => [...prev, ...spoilsOfWar]);
				console.log(p2Deck, "p2");
			} else {
				setP1Current([card1_shown]);
				setP2Current([card2_shown]);
				continue;
			}
			setP1Current([]);
			setP2Current([]);
			break;
		}
	};

	return (
		<div>
			{loaded && (
				<>
					{p1Deck.length !== 0 && p2Deck.length !== 0 ? (
						<>
							<P1Hand name={p1} hand={p1Deck} />
							<div className="current-cards-container">
								Current Cards In Play
								<div>{p1Current}</div>
								<div>{p2Current}</div>
								<button
									onClick={drawCards}
									disabled={p1Current.length > 0}
								>
									Draw Cards
								</button>
								<button
									onClick={determineWin}
									disabled={p1Current.length === 0}
								>
									Continue
								</button>
							</div>
							<P2Hand name={p2} hand={p2Deck} />
						</>
					) : (
						<>
							<div>Game Over</div>
							<button>New Game</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default GameBoard;
