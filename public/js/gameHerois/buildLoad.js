import { savesRecebidos } from "./load.js";
import {navSelect} from "../header.js";

const jogador = JSON.parse(document.getElementById("jogador").value);
const nome = document.querySelectorAll(".nome");
nome.forEach((element) =>{
    element.innerText = jogador.nickname;
});
navSelect("herois2/game");

savesRecebidos
const saveNome = document.querySelectorAll(".save-nome");
savesRecebidos.forEach((element,index) =>{
        saveNome[index].innerText = element!=null ? element.nick : "NOVO PERSONAGEM";
});