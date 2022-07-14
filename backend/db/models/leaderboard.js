"use strict";
module.exports = (sequelize, DataTypes) => {
	const Leaderboard = sequelize.define(
		"Leaderboard",
		{
			username: {
				type: DataTypes.STRING(30),
				allowNull: false,
			},
			wins: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{}
	);
	Leaderboard.associate = function (models) {};
	return Leaderboard;
};
