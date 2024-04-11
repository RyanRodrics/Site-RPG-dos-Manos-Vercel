import { savesRecebidosExport } from "./load.js";
import {navSelect} from "../header.js";
navSelect("herois2/game");
if(document.getElementById("jogador") != null){
    const jogador = JSON.parse(document.getElementById("jogador").value);
    const nome = document.querySelectorAll(".nome");
    nome.forEach((element) =>{
        element.innerText = jogador.nickname;
    });
    
    const saveNome = document.querySelectorAll(".save-nome");
    savesRecebidosExport().forEach((element,index) =>{
        saveNome[index].innerText = element!=null ? element.nick : "NOVO PERSONAGEM";
    });
}else{

}
