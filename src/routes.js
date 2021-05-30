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
			DB.teams.splice(index, 1,null);
			res.status(200).json({ msg: "Time excluído." });
		}
	}
});

routes.put("/teams/:id", (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const index = DB.teams.findIndex((c) => c.id == id);
		if (index == -1) {
			res.status(404).json({ msg: "Time não existe." });
		} else {
			console.log(index)
			DB.teams.splice(index, 1, req.body);
			res.status(200).json({msg: "Time atualizado com sucesso"});
		}
	}
});

routes.post("/newTeam", (req,res) => {
  const {
	name,
	city,
	state,
	series,
	titles,
	payment,
  } = req.body;
  if (name && city && state && titles && payment != undefined){
		const id = DB.teams.length + 1;
	
		DB.teams.push({
			id,
			name,
			city,
			state,
			series,
			titles,
			payment,
		});
		  res.status(200).json({ msg: "Inserido com sucesso" });
		} else {
			if(name == undefined){ 
			res.status(400).json({ msg: "Campo nome não pode ser nulo" });
			}
			if(city == undefined){ 
			res.status(400).json({ msg: "Campo cidade não pode ser nulo" });
			}
			if(state == undefined){ 
			res.status(400).json({ msg:  "Campo estado não pode ser nulo" });
			}
			if(titles == undefined){ 
				res.status(400).json({ msg:  " Campo titulo não podem ser nulo" });
			}
		    if(payment == undefined){ 
				res.status(400).json({ msg: "Campo pagamento não pode ser nulo" });
				}	
	
  }
});

module.exports = routes;
