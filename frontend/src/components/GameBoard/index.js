import { useEffect, useState } from "react";
import { shuffleDeck, deck, values } from "../../CardDeck";
import P1Hand from "./PlayerOne";
import P2Hand from "./PlayerTwo";

const GameBoard = ({ deck }) => {
	const [gameOver, setGameOver] = useState(false);
	const [currentDeck, setCurrentDeck] = useState(deck);

	const [p1Deck, setP1Deck] = useState([]);
	const [p2Deck, setP2Deck] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const [p1Win, setP1Win] = useState(false);
	const [p2Win, setP2Win] = useState(false);

	useEffect(() => {
		setP1Deck(deck.slice(0, deck.length / 2));
		setP2Deck(deck.slice(deck.length / 2));
		setLoaded(true);
	}, [deck]);

	// const shuffle = () => {
	// 	setCurrentDeck((prev) => {
	// 		shuffleDeck(prev);
	// 		setGameOver(false);
	// 		return [...prev];
	// 	});
	// };

	const makePlay = async (e) => {
		e.preventDefault();

		// pop last value from each deck and compare
		const [p1Card, p2Card] = await removeCard();

		if (!p1Card) return setP2Win(true);
		if (!p2Card) return setP1Win(true);

		const p1CardValue = values[p1Card[0]];
		const p2CardValue = values[p2Card[0]];

		if (p1CardValue > p2CardValue) {
			await setP1Deck((prev) => [...prev, p1Card, p2Card]);
		} else if (p1CardValue < p2CardValue) {
			await setP2Deck((prev) => [...prev, p2Card, p1Card]);
		} else {
			const winningPlay = [];
			goToWar(p1Card, p2Card, winningPlay);

			if (p1Win || p2Win) return setGameOver(true);
		}
	};

	const removeCard = async () => {
		if (!p1Deck.length) return [false, true];
		if (!p2Deck.length) return [true, false];

		// Take the first card off the top of the deck.
		const p1Card = p1Deck[0];
		const p2Card = p2Deck[0];

		setP1Deck((state) => [...state.slice(1)]);
		setP2Deck((state) => [...state.slice(1)]);

		return [p1Card, p2Card];
	};

	const goToWar = async (currentP1Card, currentP2Card, winningPlay) => {
		winningPlay.push(currentP1Card, currentP2Card);

		const res = await removeCard();
		console.log(res, "RES from remove card");

		const [p1FaceDown, p2FaceDown] = res;

		// During "War", if one player runs out of cards, the other player wins.
		if (!p1FaceDown) return setP2Win(true);
		if (!p2FaceDown) return setP1Win(true);

		// We are adding face down cards to array of current cards in play.
		winningPlay.push(p1FaceDown, p2FaceDown);

		const [p1FaceUp, p2FaceUp] = removeCard();

		if (p1FaceUp[0] === p2FaceUp[0]) goToWar(p1FaceUp, p2FaceUp);

		console.log(p1FaceUp, "P1", p2FaceUp, "P2");
	};
	return (
		<div>
			{loaded && (
				<>
					<P1Hand hand={p1Deck} />
					<P2Hand hand={p2Deck} />
					<button onClick={makePlay}>Play Round</button>
				</>
			)}
			{/* <table>
				<thead></thead>
				<tbody>
					<tr>
						<td>Number of Cards</td>
						<td>Current Card</td>
					</tr>
					<tr>
						<td>{deck?.length - 1}</td>
						<td>{deck && deck[0]}</td>
					</tr>
				</tbody>
			</table>
			<div>{deck?.slice(1)}</div> */}
		</div>
	);
};

export default GameBoard;
