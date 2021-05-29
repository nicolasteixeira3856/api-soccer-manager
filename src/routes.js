const express = require("express");
const routes = express.Router();
const DB = require("./teams");

routes.get("/teams", (req, res) => {
	res.status(200).json(DB.teams);
});

routes.get("/teams/:id", (req, res) => {
	if (isNaN(req.params.id)) {
		//id is not a number bad request
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const teams = DB.teams.find((c) => c.id == id);
		if (teams != undefined) {
			res.status(200).json(teams);
		} else {
			res.status(404).json({ msg: "Time não existe." });
		}
	}
});

routes.delete("/teams/:id", (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const index = DB.teams.findIndex((c) => c.id == id);
		if (index == -1) {
			res.status(404).json({ msg: "Time não existe." });
		} else {
			console.log(index)
			DB.teams.splice(index, 1);
			res.status(200).json({ msg: "Time excluído." });
		}
	}
});

module.exports = routes;
