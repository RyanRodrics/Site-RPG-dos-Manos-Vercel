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
    async function getFichas (user) {
        let fichas = {
            ficha1: null,
            ficha2: null,
            ficha3: null,
            ficha4: null
        };
        await Ficha.findOne({_id: user.gameSaves.save1}).then((ficha) =>{
            fichas.ficha1 = ficha;
        }).catch((error) =>{
            console.log("Erro ao buscar save1" + error);
        });
        await Ficha.findOne({_id: user.gameSaves.save2}).then((ficha) =>{
            fichas.ficha2 = ficha;
        }).catch((error) =>{
            console.log("Erro ao buscar save1" + error);
        });
        await Ficha.findOne({_id: user.gameSaves.save3}).then((ficha) =>{
            fichas.ficha3 = ficha;
        }).catch((error) =>{
            console.log("Erro ao buscar save1" + error);
        });
        await Ficha.findOne({_id: user.gameSaves.save4}).then((ficha) =>{
            fichas.ficha4 = ficha;
        }).catch((error) =>{
            console.log("Erro ao buscar save1" + error);
        });
        return Promise.resolve(fichas);
    }
    let user;
    if (req.user) {
        user = {
            id: req.user._id,
            nickname: req.user.nickname,
            gameSaves: req.user.gameSaves
        };
        getFichas(user).then((fichas) =>{
            user = JSON.stringify(user);
            fichas = JSON.stringify(fichas);
            res.render("games/gameHerois/loads",{user: user, fichas: fichas, css:[{css:"gameHerois/load" },{css:"gameHerois/criacao"},{css:"gameHerois/jogo"}], js:[{js:"gameHerois/load"},{js: "gameHerois/buildLoad"}],stars:"EXISTO"});
        }).catch((error) =>{
            console.log("Erro ao buscar saves " + error);
        });   
    }
    else {
        res.render("games/gameHerois/loads",{user: user, css:[{css:"gameHerois/load" },{css:"gameHerois/criacao"},{css:"gameHerois/jogo"}], js:[{js:"gameHerois/load"},{js: "gameHerois/buildLoad"}],stars:"EXISTO"});
    }
});

router.get('/game/play',(req,res) => {
    res.render("games/gameHerois/play",{css:[{css:"gameHerois/load" },{css:"gameHerois/criacao"},{css:"gameHerois/jogo"}], js:[{js:"gameHerois/classes"},{js:"gameHerois/criacao"},{js:"gameHerois/jogo"},{js:"gameHerois/criacao"}],stars:"EXISTO"});
});

router.post('/game/save', (req, res) =>{
    const ficha = JSON.parse(req.body.salvar);
    Ficha.findOne({_id: ficha._id}).lean().then((ficha) =>{
        ficha.save().then(() =>{
            console.log("Save realizado com sucesso");
            req.flash("success_msg", "Save realizado com sucesso");
            res.redirect("/herois2/game");
        }).catch((error) =>{
            console.log("Erro ao salvar edição da ficha " + error);
            req.flash("error_msg", "Erro ao salvar edição da ficha " + error);
            res.redirect("/herois2/game");
        });
    }).catch((error) =>{
        console.log("Erro no salvamento " + error);
    });
});

export default router;
