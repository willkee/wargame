const Player = ({ deck }) => {
	return (
		<div>
			<table>
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
			<div>{deck?.slice(1)}</div>
		</div>
	);
};

export default Player;
