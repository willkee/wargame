const express = require("express");
const asyncHandler = require("express-async-handler");

const { Leaderboard } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		console.log("test1");
		try {
			console.log("test2");
			const lb = await Leaderboard.findAll({
				order: [["wins", "DESC"]],
			});
			console.log("test4");
			res.json(lb);
		} catch (err) {
			console.log("test3");
			console.error("Error", err);
		}
	})
);

router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { username, wins } = req.body;

		try {
			const newEntry = await Leaderboard.create({
				username,
				wins,
			});

			const postedEntry = await Leaderboard.findByPk(newEntry.id);
			return res.json(postedEntry);
		} catch (err) {
			console.error("Error: ", err);
		}
	})
);

router.put(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const entry = await Leaderboard.findByPk(id);
		const newWins = entry.wins + 1;

		try {
			if (entry) {
				if (req.body.username === entry.username) {
					await Leaderboard.update(
						{ wins: newWins },
						{
							where: { id },
							returning: true,
						}
					);

					const updatedEntry = await Leaderboard.findByPk(id);
					return res.json(updatedEntry);
				}
			}
		} catch (err) {
			console.error("Error: ", err);
		}
	})
);

module.exports = router;
