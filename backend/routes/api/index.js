const router = require("express").Router();
const leaderboardRouter = require("./leaderboard");

router.use("/leaderboard", leaderboardRouter);

module.exports = router;
