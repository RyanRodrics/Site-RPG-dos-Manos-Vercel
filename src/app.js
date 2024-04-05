// CARREGANDO MÓDULOS
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
//import auth from '../config/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from './routes/admin.js';
import usuario from './routes/usuario.js';
import herois2 from './routes/herois2.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 9000;

// Models
import '../models/Usuario.js';
const Usuario = mongoose.model("usuarios");
import '../models/Ficha.js';
const Ficha = mongoose.model("fichas");

// CONFIGURAÇÕES
// Express
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '../../' + 'public'));

// Handlebars
app.engine('handlebars', engine({ 
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, "views", "layouts")
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

// Mongoose
mongoose.Promise = global.Promise;
const dbUrl = process.env.DB_KEY;
const connectDatabase = () =>{
    console.log("Esperando conectar com atlas...");
    mongoose.connect("mongodb+srv://ryanadmin:mano1534@rpgdosmanos0.01e1wnu.mongodb.net/").then(() =>{
        console.log("Conectado com o atlas ");
    }).catch((error) =>{
        console.log("Erro ao conectar com o atlas: " + error);
    });
};
connectDatabase();


// Sessões
app.use(session({
    secret: "sitedosmanos",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Midwares
app.use((req, res , next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});


// ROTAS
app.get('/', (req, res) =>{
    res.render("index", {css: [{css: "main"}]});
});

app.get('/gamedragon', (req, res) =>{
    res.render("games/gamedragon", {css: [{css: "gamedragon"}], js: [{js: "gamedragon"}]});
});

app.use('/admin', admin);
app.use('/usuario', usuario);
app.use('/herois2', herois2);




// OUTROS
app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});