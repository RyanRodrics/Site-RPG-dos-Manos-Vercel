// CARREGANDO MÓDULOS
import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

// Models
import '../../models/Usuario.js';
const Usuario = mongoose.model("usuarios");
import '../../models/Ficha.js';
const Ficha = mongoose.model("fichas");

// SITE
router.get('/', (req, res) =>{
    res.render("herois2", {css: [{css: "herois2"}], js: [{js: "herois2"}], stars: "existo"});
});
router.get('/game',(req,res) => {
    console.log(req.user);
    res.render("games/gameHerois",{css:[{css:"gameHerois/load" },{css:"gameHerois/criacao"},{css:"gameHerois/jogo"}], js:[{js:"gameHerois/load"},{js: "gameHerois/buildLoad"}], user: req.user,stars:"EXISTO"});
});
router.get('/game/play',(req,res) => {
    res.render("gameplay",{css:[{css:"" }], js:[{js:""}]});
});

export default router;
