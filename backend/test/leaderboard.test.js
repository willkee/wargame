const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");

describe("GET /api/leaderboard", () => {
	it("Returns a 200 status code", (done) => {
		request(app).get("/api/leaderboard").expect(200, done);
	});
	it("Entries are in an array", (done) => {
		request(app)
			.get("/api/leaderboard")
			.end((err, res) => {
				expect(res.body).to.be.an("array");
				if (err) return done(err);
				done();
			});
	});
	it("Entries have a username property", (done) => {
		request(app)
			.get("/api/leaderboard")
			.end((err, res) => {
				if (err) return done(err);
				res.body.map((entry) =>
					expect(entry).to.have.property("username")
				);
				done();
			});
	});
	it("Entries have a wins property", (done) => {
		request(app)
			.get("/api/leaderboard")
			.end((err, res) => {
				if (err) return done(err);
				res.body.map((entry) => expect(entry).to.have.property("wins"));
				done();
			});
	});
});

describe("POST /api/leaderboard", () => {
	let id;

	it("Adds a new leaderboard entry", (done) => {
		request(app)
			.post("/api/leaderboard")
			.send({ username: "api_testing", wins: 1 })
			.expect(200)
			.end((err, res) => {
				id = res.body.id;
				if (err) return done(err);
				done();
			});
	});
	it("Deletes entry that was created", (done) => {
		request(app).delete(`/api/leaderboard/${id}`).expect(200, done);
	});
});

describe("PUT /api/leaderboard", () => {
	let id;
	let username;
	let prevWins;

	it("Find entry to modify", (done) => {
		request(app)
			.get("/api/leaderboard")
			.expect(200)
			.end((err, res) => {
				id = res.body[0].id;
				username = res.body[0].username;
				prevWins = res.body[0].wins;
				if (err) return done(err);
				done();
			});
	});
	it("Increment wins by 1", (done) => {
		request(app)
			.put(`/api/leaderboard/${id}`)
			.send({ username, wins: prevWins + 1 })
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});
	it("Confirm wins were incremented", (done) => {
		request(app)
			.get(`/api/leaderboard/${id}`)
			.expect(200)
			.end((err, res) => {
				expect(res.body.wins).to.equal(prevWins + 1);
				if (err) return done(err);
				done();
			});
	});
});
