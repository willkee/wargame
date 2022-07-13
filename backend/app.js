const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { ValidationError } = require("sequelize");

const routes = require("./routes");

const environment = process.env.NODE_ENV || "development";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

if (environment === "production") app.use(cors());

app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
);

app.use(routes);

// Error Handling

app.use((_req, _res, next) => {
	const err = new Error("The requested resource is not found.");
	err.title = "Resource Not Found.";
	err.status = 404;
	err.errors = ["The requested resource is not found."];
	next(err);
});

app.use((err, _req, _res, next) => {
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = "Validation Error";
	}
	next(err);
});

app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	res.json({
		title: err.title || "Server Error",
		message: err.message,
		errors: err.errors,
		stack: environment === "production" ? null : err.stack,
	});
});

module.exports = app;
