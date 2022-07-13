import styles from "./p1.css";

const P1Hand = ({ hand }) => {
	console.log(hand);
	return (
		<div style={{ display: "flex" }}>
			{hand.map((card, i) => (
				<div style={{ display: "flex" }} key={i}>
					<div>{card[0]}</div>
					<div>{card[1]}</div>
				</div>
			))}
		</div>
	);
};

export default P1Hand;
