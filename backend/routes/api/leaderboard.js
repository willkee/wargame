const express = require("express");
const asyncHandler = require("express-async-handler");

const { Leaderboard } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (_req, res) => {
		const lb = await Leaderboard.findAll({ order: [["wins", "DESC"]] });
		return res.json(lb);
	})
);

router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { username, wins } = req.body;
		const newEntry = await Leaderboard.create({ username, wins });
		const postedEntry = await Leaderboard.findByPk(newEntry.id);
		return res.json(postedEntry);
	})
);

router.put(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const entry = await Leaderboard.findByPk(id);
		const newWins = entry.wins + 1;

		if (entry) {
			if (req.body.username === entry.username) {
				await Leaderboard.update(
					{ wins: newWins },
					{ where: { id }, returning: true }
				);

				const updatedEntry = await Leaderboard.findByPk(id);
				return res.json(updatedEntry);
			}
		} else {
			throw new Error("Entry Not Found.");
		}
	})
);

// FOR API TESTING:

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const entry = await Leaderboard.findByPk(id);

		if (entry) {
			return res.json(entry);
		} else {
			throw new Error("Entry Not Found.");
		}
	})
);

router.delete(
	"/:id",
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const entry = await Leaderboard.findByPk(id);

		if (entry) {
			await Leaderboard.destroy({ where: { id } });
			return res.json({ id });
		} else {
			throw new Error("Entry Not Found.");
		}
	})
);
module.exports = router;
