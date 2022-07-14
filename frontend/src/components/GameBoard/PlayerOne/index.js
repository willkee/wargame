import styles from "./p1.module.css";

const P1Hand = ({ hand, name }) => {
	return (
		<div className={styles.container}>
			<div>Player One: {name}</div>
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

export default P1Hand;
