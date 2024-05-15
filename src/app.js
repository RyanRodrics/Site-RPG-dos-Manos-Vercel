// CARREGANDO MÓDULOS
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import auth from '../config/auth.js';
auth(passport);
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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Midwares
app.use((req, res , next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});


// ROTAS
app.get('/', (req, res) =>{
    let user;
    if (req.user) {
        user = {
            nickname: req.user.nickname
        };
    }
    else {user = req.user;}
    res.render("index", {css: [{css: "index"}], js: [{js: "index"}], user: user});
});

app.get('/gamedragon', (req, res) =>{
    res.render("games/gamedragon", {css: [{css: "gamedragon"}], js: [{js: "gamedragon"}]});
});

app.get('/registrar', (req, res) =>{
    res.render("registrar", {css: [{css: "registrar"}], js: [{js: "registrar"}]});
});

app.get('/slayerfall', (req, res) =>{
    res.render("slayerfall", {css: [{css: "slayerfall"}], js: [{js: "slayerfall"}]});
});

app.use('/admin', admin);
app.use('/usuario', usuario);
app.use('/herois2', herois2);




// OUTROS
app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});





const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

/**
  * Crie uma avaliação para analisar o risco de uma ação da interface.
  *
  * projectID: O ID do seu projeto do Google Cloud.
  * recaptchaSiteKey: A chave reCAPTCHA associada ao site/app
  * token: O token gerado obtido do cliente.
  * recaptchaAction: Nome da ação correspondente ao token.
  */
async function createAssessment({
  // O que fazer: substitua o token e as variáveis de ação reCAPTCHA antes de executar a amostra.
  projectID = "site-do-rpg-dos--1715799153230",
  recaptchaKey = "6LeootspAAAAAFc12Fhyd8-0vrTxSjWdEBGeDUIX",
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  // Crie o cliente reCAPTCHA.
  // TODO: armazena em cache o código de geração do cliente (recomendado) ou a chamada client.close() antes de sair do método.
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Crie a solicitação de avaliação.
  const request = ({
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  });

  const [ response ] = await client.createAssessment(request);

  // Verifique se o token é válido.
  if (!response.tokenProperties.valid) {
    console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
    return null;
  }

  // Verifique se a ação esperada foi executada.
  // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
  if (response.tokenProperties.action === recaptchaAction) {
    // Consulte a pontuação de risco e os motivos.
    // Para mais informações sobre como interpretar a avaliação, acesse:
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response.riskAnalysis.reasons.forEach((reason) => {
      console.log(reason);
    });

    return response.riskAnalysis.score;
  } else {
    console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
    return null;
  }
}