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

	const warBattle = (spoilsOfWar) => {
		while (true) {
			let card1 = p1Deck[0];
			let card2 = p2Deck[0];
			let card1Val = values[card1[0]];
			let card2Val = values[card2[0]];
			console.log(card1Val, card2Val, "stage 1 war");
			spoilsOfWar.push(card1, card2);
			setP1Deck((prev) => prev.slice(1));
			setP2Deck((prev) => prev.slice(1));

			if (card1Val === card2Val) {
				console.log("vals equal");
				if (p1Deck.length < 2) {
					setP2Deck((prev) => [...prev, ...p1Deck]);
					break;
				} else if (p2Deck.length < 2) {
					setP1Deck((prev) => [...prev, ...p2Deck]);
					break;
				} else {
					// Face Down card:
					spoilsOfWar.push(p1Deck[0], p2Deck[0]);
					setP1Deck((prev) => prev.slice(1));
					setP2Deck((prev) => prev.slice(1));

					let card1Val = values[card1[0]];
					let card2Val = values[card2[0]];
					setP1Current(p1Deck[0]);
					setP2Current(p2Deck[0]);
					console.log(card1Val, card2Val, "stage 2 war");

					if (card1Val > card2Val) {
						setP1Deck((prev) => [...prev, ...spoilsOfWar]);
						break;
					} else if (card2Val > card1Val) {
						setP2Deck((prev) => [...prev, ...spoilsOfWar]);
						break;
					} else {
						continue;
					}
				}
			} else {
				if (card1Val > card2Val) {
					console.log(spoilsOfWar, "spoils");
					setP1Deck((prev) => [...prev, ...spoilsOfWar]);
					console.log(p1Deck, "p1");
				} else if (card2Val > card1Val) {
					console.log(spoilsOfWar, "spoils");
					setP2Deck((prev) => [...prev, ...spoilsOfWar]);
					console.log(p2Deck, "p2");
				}
				setP1Current([]);
				setP2Current([]);
				break;
			}
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
