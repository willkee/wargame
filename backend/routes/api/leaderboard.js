const express = require("express");
const asyncHandler = require("express-async-handler");

const { Leaderboard } = require("../../models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		try {
			const leaderboard = await Leaderboard.findAll({
				order: [["wins", "DESC"]],
			});
			return res.json(leaderboard);
		} catch (err) {
			console.error("Error: ", err);
		}
	})
);

module.exports = router;
