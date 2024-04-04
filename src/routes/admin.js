// CARREGANDO MÓDULOS
import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import bcrypt from 'bcryptjs';

// Models
import '../../models/Usuario.js';
const Usuario = mongoose.model("usuarios");
import '../../models/Ficha.js';
const Ficha = mongoose.model("fichas");


// MAIN ADMIN
router.get('/', (req, res) =>{
    res.render("admin/admin", {css: [{css: "admmin"}]});
});


// FICHA
router.get('/fichas', (req, res) =>{
    Ficha.find().sort({date: 'desc'}).lean().then((fichas) =>{
        res.render("admin/fichas", {fichas: fichas, css: [{css: "admin"}]});
    }).catch((error) =>{
        console.log("Erro ao buscar fichas no banco de dados: " + error);
        req.flash("error_msg", "Erro ao buscar fichas no banco de dados");
        res.redirect("/admin");
    });
});

// Adicionar Ficha
router.get('/fichas/add', (req, res) =>{
    res.render("admin/addficha", {css: [{css: "admmin"}]});
});

router.post('/fichas/new', (req, res) =>{
    let erros = [];
    let armas = ["Mão"];
    let armaduras = ["Roupa"];
    let progress = [];
    if (req.body.motosserra) {armas.push("Motosserra");}
    if (req.body.arco) {armas.push("Arco");}
    if (req.body.fuzil) {armas.push("Fuzil");}
    if (req.body.espada) {armas.push("Espada");}
    if (req.body.rapieira) {armas.push("Rapieira");}
    if (req.body.pistola) {armas.push("Pistola");}
    if (req.body.lancaGranada) {armas.push("LançaGranada");}
    if (req.body.marteloDeGuerra) {armas.push("MarteloDeGuerra");}
    if (req.body.chicote) {armas.push("Chicote");}
    if(req.body.casaco) {armaduras.push("Casaco");}
    if(req.body.couroBatido) {armaduras.push("CouroBatido");}
    if(req.body.roupaDeAlgodao) {armaduras.push("RoupaDeAlgodao");}
    if(req.body.armaduraDeFerro) {armaduras.push("ArmaduraDeFerro");}
    if(req.body.colete) {armaduras.push("Colete");}
    if(req.body.armaduraDeGrafeno) {armaduras.push("ArmaduraDeGrafeno");}
    if(req.body.armaduraDeDiamante) {armaduras.push("ArmaduraDeDiamante");}
    if (req.body.metalGear) {armaduras.push("MetalGear");}
    if (req.body.adamantium) {armaduras.push("Adamantium");}
    if (req.body.denji) {progress.push({nome: "Denji", rep: parseInt(req.body.repdenji)})}
    if (req.body.simon) {progress.push({nome: "Simon", rep: parseInt(req.body.repsimon)})}
    if (!req.body.nick || req.body.nick==undefined || req.body.nick == null){
        erros.push({texto: "nick inválido"});
    }
    if (!(req.body.level >= 1 && req.body.level <= 20)) {
        erros.push({texto: "level inválido"});
    }
    if (!(req.body.gender=="N" || req.body.gender=="M" || req.body.gender=="F")) {
        erros.push({texto: "gender inválido"});
    }
    if (!(req.body.money >= 0)) {
        erros.push({texto: "money inválido"});
    }
    if (!(req.body.for >= 8 && req.body.for <= 20)) {
        erros.push({texto: "atributo for inválido"});
    }
    if (!(req.body.des >= 8 && req.body.des <= 20)) {
        erros.push({texto: "atributo des inválido"});
    }
    if (!(req.body.con >= 8 && req.body.con <= 20)) {
        erros.push({texto: "atributo con inválido"});
    }
    if (!(req.body.int >= 8 && req.body.int <= 20)) {
        erros.push({texto: "atributo int inválido"});
    }
    if (!(req.body.sab >= 8 && req.body.sab <= 20)) {
        erros.push({texto: "atributo sab inválido"});
    }
    if (!(req.body.car >= 8 && req.body.car <= 20)) {
        erros.push({texto: "atributo car inválido"});
    }
    if (armas.length > 5) {
        erros.push({texto: "selecione no máximo 4 armas"});
    }
    if (armaduras.length > 2) {
        erros.push({texto: "selecione no máximo 1 armadura"});
    }
    progress.forEach(function(personagem) {
        if (personagem.rep < 0 || personagem.rep > 100) {
            erros.push({texto: `reputação de ${personagem.nome} inválida`});
        }
    });
    if(erros.length > 0) {
        res.render("admin/addficha",  {erros: erros, css: [{css: "admin"}]});
    } else {
        const inventario = {
            armas: armas,
            armaduras: armaduras
        };
        const ca = 10 + Math.floor((parseInt(req.body.des)-10)/2);
        const hp = parseInt(req.body.level) * (10 + Math.floor((parseInt(req.body.con)-10)/2));
        const novaFicha = {
            nick: req.body.nick,
            level: req.body.level,
            gender: req.body.gender,
            ca: ca,
            hp: hp,
            inventory: inventario,
            money: req.body.money,
            attributes: {
                for: parseInt(req.body.for),
                des: parseInt(req.body.des),
                con: parseInt(req.body.con),
                int: parseInt(req.body.int),
                sab: parseInt(req.body.sab),
                car: parseInt(req.body.car)
            },
            progress: progress
        };
    
        new Ficha(novaFicha).save().then(() =>{
            console.log("Ficha salva com sucesso");
            req.flash("success_msg", "Ficha salva com sucesso");
            res.redirect("/admin/fichas");
        }).catch((error) =>{
            console.log("Erro ao criar ficha: " + error);
            req.flash("error_msg", "Erro ao criar ficha");
            res.redirect("/admin/fichas");
        });
    }
});

// Editar Ficha
router.get('/fichas/edit/:id', (req, res) =>{
    Ficha.findOne({_id: req.params.id}).lean().then((ficha) =>{
        res.render("admin/editficha", {ficha: ficha, css: [{css: "admin"}]});
    }).catch((error) =>{
        console.log("Erro ao buscar por ficha " + req.params.id + " :" + error);
        req.flash("error_msg", "Erro ao buscar por ficha " + req.params.id + " :" + error);
        res.redirect("/admin/fichas");
    });
});

router.post('/fichas/edit', (req, res) =>{
    let erros = [];
    let armas = ["Mão"];
    let armaduras = ["Roupa"];
    let progress = [];
    if (req.body.Motosserra) {armas.push("Motosserra");}
    if (req.body.Arco) {armas.push("Arco");}
    if (req.body.Fuzil) {armas.push("Fuzil");}
    if (req.body.Espada) {armas.push("Espada");}
    if (req.body.Rapieira) {armas.push("Rapieira");}
    if (req.body.Pistola) {armas.push("Pistola");}
    if (req.body.LancaGranada) {armas.push("LancaGranada");}
    if (req.body.MarteloDeGuerra) {armas.push("MarteloDeGuerra");}
    if (req.body.Chicote) {armas.push("Chicote");}
    if(req.body.Casaco) {armaduras.push("Casaco");}
    if(req.body.CouroBatido) {armaduras.push("CouroBatido");}
    if(req.body.RoupaDeAlgodao) {armaduras.push("RoupaDeAlgodao");}
    if(req.body.ArmaduraDeFerro) {armaduras.push("ArmaduraDeFerro");}
    if(req.body.Colete) {armaduras.push("Colete");}
    if(req.body.ArmaduraDeGrafeno) {armaduras.push("ArmaduraDeGrafeno");}
    if(req.body.ArmaduraDeDiamante) {armaduras.push("ArmaduraDeDiamante");}
    if (req.body.MetalGear) {armaduras.push("MetalGear");}
    if (req.body.Adamantium) {armaduras.push("Adamantium");}
    if (req.body.denji) {progress.push({nome: "Denji", rep: parseInt(req.body.repdenji)})}
    if (req.body.simon) {progress.push({nome: "Simon", rep: parseInt(req.body.repsimon)})}
    if (!req.body.nick || req.body.nick==undefined || req.body.nick == null){
        erros.push({texto: "nick inválido"});
    }
    if (!(req.body.level >= 1 && req.body.level <= 20)) {
        erros.push({texto: "level inválido"});
    }
    if (!(req.body.money >= 0)) {
        erros.push({texto: "money inválido"});
    }
    if (!(req.body.for >= 8 && req.body.for <= 20)) {
        erros.push({texto: "atributo for inválido"});
    }
    if (!(req.body.des >= 8 && req.body.des <= 20)) {
        erros.push({texto: "atributo for inválido"});
    }
    if (!(req.body.con >= 8 && req.body.con <= 20)) {
        erros.push({texto: "atributo for inválido"});
    }
    if (!(req.body.int >= 8 && req.body.int <= 20)) {
        erros.push({texto: "atributo for inválido"});
    }
    if (!(req.body.sab >= 8 && req.body.sab <= 20)) {
        erros.push({texto: "atributo for inválido"});
    }
    if (!(req.body.car >= 8 && req.body.car <= 20)) {
        erros.push({texto: "atributo for inválido"});
    } 
    if (armas.length > 5) {
        erros.push({texto: "selecione no máximo 4 armas"});
    }
    if (armaduras.length > 2) {
        erros.push({texto: "selecione no máximo 1 armadura"});
    }
    progress.forEach(function(personagem) {
        if (personagem.rep < 0 || personagem.rep > 100) {
            erros.push({texto: `reputação de ${personagem.nome} inválida`});
        }
    });
    if (erros.length > 0) {
        res.render("admin/editficha", {erros: erros, css: [{css: "admin"}]});
    } else {
        const inventario = {
            armas: armas,
            armaduras: armaduras
        };
        const ca = 10 + Math.floor((parseInt(req.body.des)-10)/2);
        const hp = parseInt(req.body.level) * (10 + Math.floor((parseInt(req.body.con)-10)/2));
        Ficha.findOne({_id: req.body.id}).then((ficha) =>{
            ficha.nick = req.body.nick;
            ficha.level = req.body.level;
            ficha.gender = req.body.gender;
            ficha.ca = ca;
            ficha.hp = hp;
            ficha.inventory = inventario;
            ficha.money = req.body.money;
            ficha.attributes = {
                for: parseInt(req.body.for),
                des: parseInt(req.body.des),
                con: parseInt(req.body.con),
                int: parseInt(req.body.int),
                sab: parseInt(req.body.sab),
                car: parseInt(req.body.car)
            };
            ficha.progress = progress;
            ficha.save().then(() =>{
                console.log("Ficha editada com sucesso");
                req.flash("success_msg", "Ficha editada com sucesso");
                res.redirect("/admin/fichas");
            }).catch((error) =>{
                console.log("Erro ao salvar edição da ficha " + req.body._id + ": " + error);
                req.flash("error_msg", "Erro ao salvar edição da ficha " + req.body._id + ": " + error);
                res.redirect("/admin/fichas");
            });
        }).catch((error) =>{
            console.log("Erro ao editar ficha " + req.body._id + ": " + error);
            req.flash("error_msg", "Erro ao editar ficha " + req.body._id + ": " + error);
            res.redirect("/admin/fichas");
        });
    }
});

// Deletar Ficha
router.get('/fichas/deletar/:id', (req, res) =>{
    Ficha.deleteOne({_id: req.params.id}).then(() =>{
        console.log("Ficha deletada com sucesso");
        req.flash("success_msg", "Ficha deletada com sucesso");
        res.redirect("/admin/fichas");
    }).catch((error) =>{
        console.log("Erro ao deletar ficha " + req.params.id + ": " + error);
        req.flash("error_msg", "Erro ao deletar ficha " + req.params.id + ": " + error);
        res.redirect("/admin/fichas");
    });
});


// USUARIO
router.get('/usuarios', (req, res) =>{
    Usuario.find().sort({date: 'desc'}).lean().then((usuarios) =>{
        res.render("admin/usuarios", {usuarios: usuarios, css: [{css: "admin"}]});
    }).catch((error) =>{
        console.log("Erro ao buscar usuários no banco de dados: " + error);
        req.flash("error_msg", "Erro ao buscar usuários no banco de dados");
        res.redirect("/admin");
    });
});

// Adicionar Usuário
router.get('/usuarios/add', (req, res) =>{
    Ficha.find().sort({date: 'desc'}).lean().then((fichas) =>{
        res.render("admin/addusuario", {fichas: fichas, css: [{css: "admin"}]});   
    }).catch((error) =>{
        console.log("Erro ao listar as fichas: " + error)
        req.flash("error_msg", "Erro ao listar as fichas");
        res.redirect("/admin/usuarios");
    })  
});

router.post('/usuarios/new', (req, res) =>{
    let erros = [];
    if (!req.body.username || req.body.username==undefined || req.body.username == null){
        erros.push({texto: "username inválido"});
    }
    if (!req.body.nickname || req.body.nickname==undefined || req.body.nickname == null){
        erros.push({texto: "nickname inválido"});
    }
    if (!req.body.password || req.body.password==undefined || req.body.password == null){
        erros.push({texto: "password inválida"});
    }
    /*if (!(parseInt(req.body.eAdmin) == 0 || parseInt(req.body.eAdmin) == 1)) {
        erros.push({texto: "eAdmin inválido"});
    }*/
    if(erros.length > 0) {
        res.render("admin/addusuario", {erros: erros, css: [{css: "admin"}]});
    } else {
        Usuario.findOne({username: req.body.username}).lean().then((usuario) =>{
            if (usuario) {
                req.flash("error_msg", "Já existe uma conta com este username no nosso sistema");
                res.redirect("/admin/usuarios/add");
            } else {
                let save1 = null;
                if(req.body.save1 != 0) {save1 = new mongoose.Types.ObjectId(req.body.save1);}
                let save2 = null;
                if(req.body.save2 != 0) {save2 = new mongoose.Types.ObjectId(req.body.save2);}
                let save3 = null;
                if(req.body.save3 != 0) {save3 = new mongoose.Types.ObjectId(req.body.save3);}
                let save4 = null;
                if(req.body.save4 != 0) {save4 = new mongoose.Types.ObjectId(req.body.save4);}
                const novoUsuario = new Usuario({
                    username: req.body.username,
                    nickname: req.body.nickname,
                    password: req.body.password,
                    token: req.body.token,
                    //eAdmin: parseInt(req.body.eAdmin),
                    gameSaves: {
                        save1: save1,
                        save2: save2,
                        save3: save3,
                        save4: save4
                    }
                });
                bcrypt.genSalt(10, (error, salt) =>{
                    bcrypt.hash(novoUsuario.password, salt, (error, hash) =>{
                        if (error) {
                            req.flash("error_msg", "Erro ao encriptar a senha");
                            res.redirect("/admin/usuarios/add");
                        } else {
                            novoUsuario.password = hash;
                            novoUsuario.save().then(() =>{
                                console.log("Usuário salvo com sucesso");
                                req.flash("success_msg", "Usuário salvo com sucesso");
                                res.redirect("/admin/usuarios");
                            }).catch((error) =>{
                                console.log("Erro ao criar usuário: " + error);
                                req.flash("error_msg", "Erro ao criar usuário");
                                res.redirect("/admin/usuários");
                            });   
                        }
                    });
                });
            }
        }).catch((error) =>{
            console.log("Erro: " + error);
        });
    }
});

// Editar Usuários
router.get('/usuarios/edit/:id', (req, res) =>{
    Usuario.findOne({_id: req.params.id}).lean().then((usuario) =>{
        Ficha.find().sort({date: 'desc'}).lean().then((fichas) =>{
            res.render("admin/editusuario", {usuario: usuario, fichas: fichas, css: [{css: "admin"}]});
        }).catch((error) =>{
            console.log("Erro ao buscar por usuário " + req.params.id + " :" + error);
            req.flash("error_msg", "Erro ao buscar por usuário " + req.params.id + " :" + error);
            res.redirect("/admin/usuarios");
        });
    }).catch((error) =>{
        console.log("Erro ao buscar por usuário " + req.params.id + " :" + error);
        req.flash("error_msg", "Erro ao buscar por usuário " + req.params.id + " :" + error);
        res.redirect("/admin/usuarios");
    });
});

router.post('/usuarios/edit', (req, res) =>{
    let erros = [];
    if (!req.body.username || req.body.username==undefined || req.body.username == null){
        erros.push({texto: "username inválido"});
    }
    if (!req.body.password || req.body.password==undefined || req.body.password == null){
        erros.push({texto: "password inválido"});
    }
    /*if (!(parseInt(req.body.eAdmin) == 0 || parseInt(req.body.eAdmin) == 1)) {
        erros.push({texto: "eAdmin inválido"});
    }*/
    if(erros.length > 0) {
        res.render("admin/addusuario", {erros: erros, css: [{css: "admin"}]});
    } else {
        let save1 = null;
        if(req.body.save1 != 0) {save1 = new mongoose.Types.ObjectId(req.body.save1);}
        let save2 = null;
        if(req.body.save2 != 0) {save2 = new mongoose.Types.ObjectId(req.body.save2);}
        let save3 = null;
        if(req.body.save3 != 0) {save3 = new mongoose.Types.ObjectId(req.body.save3);}
        let save4 = null;
        if(req.body.save4 != 0) {save4 = new mongoose.Types.ObjectId(req.body.save4);}
        const gameSaves = {
            save1: save1,
            save2: save2,
            save3: save3,
            save4: save4
        }
        let senhahash = "";
        bcrypt.genSalt(10, (error, salt) =>{
            bcrypt.hash(req.body.password, salt, (error, hash) =>{
                if (error) {
                    req.flash("error_msg", "Erro ao encriptar a senha");
                    res.redirect("/admin/usuarios/edit");
                } else {
                    senhahash = hash;
                    Usuario.findOne({_id: req.body.id}).then((usuario) =>{
                        usuario.username = req.body.username;
                        usuario.nickname = req.body.nickname;
                        usuario.password = senhahash;
                        usuario.token = req.body.token;
                        //usuario.eAdmin = parseInt(req.body.eAdmin);
                        usuario.gameSaves = gameSaves;
                        usuario.save().then(() =>{
                            console.log("Usuário editado com sucesso");
                            req.flash("success_msg", "Usuário editado com sucesso");
                            res.redirect("/admin/usuarios");
                        }).catch((error) =>{
                            console.log("Erro ao salvar edição do usuário " + req.body._id + ": " + error);
                            req.flash("error_msg", "Erro ao salvar edição do usuário " + req.body._id + ": " + error);
                            res.redirect("/admin/usuarios");
                        });
                    }).catch((error) =>{
                        console.log("Erro ao editar usuário " + req.body._id + ": " + error);
                        req.flash("error_msg", "Erro ao editar usuário " + req.body._id + ": " + error);
                        res.redirect("/admin/usuarios");
                    });
                }
            });
        });
    }
});

// Deletar Usuário
router.get('/usuarios/deletar/:id', (req, res) =>{
    Usuario.deleteOne({_id: req.params.id}).then(() =>{
        console.log("Usuário deletado com sucesso");
        req.flash("success_msg", "Usuário deletado com sucesso");
        res.redirect("/admin/usuarios");
    }).catch((error) =>{
        console.log("Erro ao deletar usuário " + req.params.id + ": " + error);
        req.flash("error_msg", "Erro ao deletar usuário " + req.params.id + ": " + error);
        res.redirect("/admin/usuarios");
    });
});

export default router;