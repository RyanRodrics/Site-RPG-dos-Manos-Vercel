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
    const fichaSalvar = JSON.parse(req.body.salvar);
    if(fichaSalvar.player.idFicha) {
        Ficha.findOne({_id: fichaSalvar.player.idFicha}).then((ficha) =>{ 
            ficha.level = fichaSalvar.player.level;
            ficha.hp = fichaSalvar.player.hp;
            ficha.inventory = fichaSalvar.player.inventory;
            ficha.money = fichaSalvar.player.money;
            ficha.attributes = fichaSalvar.player.attributes;
            ficha.progress = fichaSalvar.player.progress; 
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
    } else {
        const novaFicha = {
            nick: fichaSalvar.player.nick,
            level: fichaSalvar.player.level,
            gender: fichaSalvar.player.gender,
            ca: fichaSalvar.player.ca,
            hp: fichaSalvar.player.hp,
            inventory: fichaSalvar.player.inventory,
            money: fichaSalvar.player.money,
            attributes: fichaSalvar.player.attributes,
            progress: fichaSalvar.player.progress
        };
        new Ficha(novaFicha).save().then((ficha) =>{
            console.log("Ficha salva com sucesso");
            req.flash("success_msg", "Ficha salva com sucesso");
            Usuario.findOne({_id: fichaSalvar.usuarioId}).then((user) =>{
                let save1 = null;
                if(fichaSalvar.gameSaves.save1 != null) {save1 = new mongoose.Types.ObjectId(fichaSalvar.gameSaves.save1);}
                let save2 = null;
                if(fichaSalvar.gameSaves.save2 != null) {save2 = new mongoose.Types.ObjectId(fichaSalvar.gameSaves.save2);}
                let save3 = null;
                if(fichaSalvar.gameSaves.save3 != null) {save3 = new mongoose.Types.ObjectId(fichaSalvar.gameSaves.save3);}
                let save4 = null;
                if(fichaSalvar.gameSaves.save4 != null) {save4 = new mongoose.Types.ObjectId(fichaSalvar.gameSaves.save4);}
                switch (fichaSalvar.index) {
                    case 0:
                        save1 = new mongoose.Types.ObjectId(ficha._id);
                        break;
                    case 1:
                        save2 = new mongoose.Types.ObjectId(ficha._id);
                        break;
                    case 2:
                        save3 = new mongoose.Types.ObjectId(ficha._id);
                        break;
                    case 3:
                        save4 = new mongoose.Types.ObjectId(ficha._id);
                        break;
                    default:
                        console.log(fichaSalvar.index);
                        break;        
                }
                const gameSaves = {
                    save1: save1,
                    save2: save2,
                    save3: save3,
                    save4: save4
                }
                user.gameSaves = gameSaves;
                user.save().then(() =>{
                    console.log("Usuário editado com sucesso");
                    req.flash("success_msg", "Usuário editado com sucesso");
                    res.redirect("/herois2/game");
                }).catch((error) =>{
                    console.log("Erro ao salvar edição do usuário " + error);
                    req.flash("error_msg", "Erro ao salvar edição do usuário " + error);
                    res.redirect("/herois2/game");
                });
            }).catch((error) =>{
                console.log(error);
            });
        }).catch((error) =>{
            console.log("Erro ao criar ficha: " + error);
            req.flash("error_msg", "Erro ao criar ficha");
            res.redirect("/herois2/game");
        });
    } 
});

export default router;
