import { savesRecebidos } from "./load.js";
import {navSelect} from "../header.js"
navSelect("herois2");

savesRecebidos
const saveNome = document.querySelectorAll(".save-nome");
    savesRecebidos.forEach((element,index) =>{
        saveNome[index].innerText = element!=undefined? element.nome : "NOVO PERSONAGEM";
});