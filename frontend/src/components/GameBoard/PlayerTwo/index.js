import styles from "./p2.module.css";

const P2Hand = ({ hand, name }) => {
	return (
		<div className={styles.container}>
			<div>Player Two: {name}</div>
			<div>Cards remaining: {hand.length}</div>

			<div className={styles.deck}>
				{hand.map((card, i) => (
					<div className={styles.hand} key={i}>
						<div>{card[0]}</div>
						<div>{card[1]}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default P2Hand;
