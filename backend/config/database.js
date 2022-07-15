const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
	development: {
		username,
		password,
		database,
		host,
		dialect: "postgres",
		seederStorage: "sequelize",
	},
	test: {
		username,
		password,
		database: "wargame_db_test",
		host,
		dialect: "postgres",
		seederStorage: "sequelize",
		logging: false,
	},
	production: {
		use_env_variable: "DATABASE_URL",
		dialect: "postgres",
		seederStorage: "sequelize",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
