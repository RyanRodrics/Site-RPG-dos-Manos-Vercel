// CARREGANDO MÓDULOS
import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import bcrypt from "bcryptjs";
import passport from 'passport';

// Models
import '../../models/Usuario.js';
const Usuario = mongoose.model("usuarios");
import '../../models/Ficha.js';
const Ficha = mongoose.model("fichas");

// SITE
router.get('/', (req, res) =>{
    res.send("Usuarios");
});

router.get('/registro', (req, res) =>{
    res.send("Rota de Registro");
});

router.post('/login', (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuario",
        failureFlash: true
    })(req, res, next)
})

export default router;