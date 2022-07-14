"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Leaderboards",
			[
				{
					username: "demo",
					wins: 22,
				},
				{
					username: "will",
					wins: 44,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Leaderboards", null, {});
	},
};
