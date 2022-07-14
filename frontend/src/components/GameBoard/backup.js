// import { useEffect, useState } from "react";
// import { shuffleDeck, deck, values } from "../../CardDeck";
// import P1Hand from "./PlayerOne";
// import P2Hand from "./PlayerTwo";

// import "./GameBoard.css";

// const GameBoard = ({ p1, p2 }) => {
// 	const [currentDeck, setCurrentDeck] = useState(deck);

// 	// const [gameOver, setGameOver] = useState(false);
// 	const [p1Deck, setP1Deck] = useState([]);
// 	const [p2Deck, setP2Deck] = useState([]);
// 	const [loaded, setLoaded] = useState(false);
// 	// const [p1Win, setP1Win] = useState(false);
// 	// const [p2Win, setP2Win] = useState(false);
// 	const [war, setWar] = useState(false);
// 	const [warCards, setWarCards] = useState([]);
// 	// const [p1Current, setP1Current] = useState("");
// 	// const [p2Current, setP2Current] = useState("");
// 	useEffect(() => {
// 		newGame();
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	const newGame = async () => {
// 		setCurrentDeck((prev) => {
// 			shuffleDeck(prev);
// 			return [...prev];
// 		});
// 		setP1Deck(currentDeck?.slice(0, 26));
// 		setP2Deck(currentDeck?.slice(26));
// 		setLoaded(true);
// 		console.log(deck, currentDeck, p1Deck, p2Deck, "use effect");
// 	};

// 	function PlayRound() {
// 		const p1Hand = p1Deck[0];
// 		const p2Hand = p2Deck[0];
// 		setP1Deck((prev) => prev.slice(1));
// 		setP2Deck((prev) => prev.slice(1));
// 		if (values[p1Hand[0]] > values[p2Hand[0]]) {
// 			setP1Deck((prev) => [...prev, p1Hand, p2Hand]);
// 		} else if (values[p1Hand[0]] < values[p2Hand[0]]) {
// 			setP2Deck((prev) => [...prev, p1Hand, p2Hand]);
// 		} else {
// 			setWar(true);
// 			setWarCards((prev) => [...prev, p1Hand, p2Hand]);
// 			while (p1Deck.length !== 0 && p2Deck.length !== 0) {
// 				const down1 = p1Deck[0];
// 				const down2 = p2Deck[0];
// 				setP1Deck((prev) => prev.slice(1));
// 				setP2Deck((prev) => prev.slice(1));

// 				setWarCards((prev) => [...prev, down1, down2]);
// 				const up1 = p1Deck[0];
// 				const up2 = p2Deck[0];
// 				setP1Deck((prev) => prev.slice(1));
// 				setP2Deck((prev) => prev.slice(1));

// 				if (up1 > up2) {
// 					setWarCards((prev) => [...prev, up1, up2]);
// 					setP1Deck((prev) => [...prev, ...warCards]);
// 					setWar(false);
// 					break;
// 				} else if (up1 < up2) {
// 					setWarCards((prev) => [...prev, up1, up2]);
// 					setP2Deck((prev) => [...prev, ...warCards]);
// 					setWar(false);
// 					break;
// 				} else {
// 					setWarCards((prev) => [...prev, up1, up2]);
// 				}
// 			}
// 		}
// 	}

// 	// const makePlay = async (e) => {
// 	// 	e.preventDefault();
// 	// 	// pop last value from each deck and compare
// 	// 	const [p1Card, p2Card] = await removeCard();
// 	// 	if (!p1Card) return setP2Win(true);
// 	// 	if (!p2Card) return setP1Win(true);
// 	// 	const p1CardValue = values[p1Card[0]];
// 	// 	const p2CardValue = values[p2Card[0]];
// 	// 	if (p1CardValue > p2CardValue) {
// 	// 		await setP1Deck((prev) => [...prev, p1Card, p2Card]);
// 	// 	} else if (p1CardValue < p2CardValue) {
// 	// 		await setP2Deck((prev) => [...prev, p2Card, p1Card]);
// 	// 	} else if (p1CardValue === p2CardValue) {
// 	// 		setWar(true);
// 	// 		setWarCards([]);
// 	// 		goToWar(p1Card, p2Card);
// 	// 		if (p1Win || p2Win) return setGameOver(true);
// 	// 	}
// 	// };
// 	// const removeCard = async () => {
// 	// 	if (!p1Deck.length) return [false, true];
// 	// 	if (!p2Deck.length) return [true, false];
// 	// 	// Take the first card off the top of the deck.
// 	// 	const p1Card = p1Deck[0];
// 	// 	const p2Card = p2Deck[0];
// 	// 	setP1Deck((state) => {
// 	// 		console.log(state, "p1 State");
// 	// 		return [...state].slice(1);
// 	// 	});
// 	// 	console.log(p1Deck, "after state change P1");
// 	// 	setP2Deck((state) => {
// 	// 		console.log(state, "p2 State");
// 	// 		return [...state].slice(1);
// 	// 	});
// 	// 	console.log(p2Deck, "after state change P2");
// 	// 	return [p1Card, p2Card];
// 	// };
// 	// const goToWar = async (currentP1Card, currentP2Card) => {
// 	// 	setWarCards((prev) => [...prev, currentP1Card, currentP2Card]);
// 	// 	const res = await removeCard();
// 	// 	const [p1FaceDown, p2FaceDown] = res;
// 	// 	// During "War", if one player runs out of cards, the other player wins.
// 	// 	if (!p1FaceDown) return setP2Win(true);
// 	// 	if (!p2FaceDown) return setP1Win(true);
// 	// 	// We are adding face down cards to array of current cards in play.
// 	// 	setWarCards((prev) => [...prev, p1FaceDown, p2FaceDown]);
// 	// 	const [p1FaceUp, p2FaceUp] = await removeCard();
// 	// 	// if (p1FaceUp[0] === p2FaceUp[0]) goToWar(p1FaceUp, p2FaceUp);
// 	// 	if (p1FaceUp[0] > p2FaceUp[0]) {
// 	// 		setP1Deck((prev) => {
// 	// 			setWar(false);
// 	// 			return [...prev, ...warCards];
// 	// 		});
// 	// 	} else {
// 	// 		setWar(false);
// 	// 		setP2Deck((prev) => {
// 	// 			return [...prev, ...warCards];
// 	// 		});
// 	// 	}
// 	// };
// // 	return (
// // 		<div>
// // 			{loaded && (
// // 				<>
// // 					<P1Hand name={p1} hand={p1Deck} />
// // 					{!war ? (
// // 						<div className="current-cards-container">
// // 							Current Cards In Play
// // 							<div>{p1Deck[0]}</div>
// // 							<div>{p2Deck[0]}</div>
// // 							<button onClick={PlayRound}>Play Round</button>
// // 						</div>
// // 					) : (
// // 						<div className="current-cards-container">
// // 							War Cards
// // 							<div>
// // 								{warCards.map((card) => (
// // 									<>
// // 										<div>{card[0]}</div>
// // 										<div>{card[1]}</div>
// // 									</>
// // 								))}
// // 							</div>
// // 						</div>
// // 					)}
// // 					<P2Hand name={p2} hand={p2Deck.slice(1)} />
// // 				</>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default GameBoard;
