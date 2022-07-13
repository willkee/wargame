import Cards from "./components/Cards";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Leaderboard from "./components/Leaderboard";

function App() {
	return (
		<div>
			<GameBoard />
			<Player />
			<Cards />
			<Leaderboard />
		</div>
	);
}

export default App;
