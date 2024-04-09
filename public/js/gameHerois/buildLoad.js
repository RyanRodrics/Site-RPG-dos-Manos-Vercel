import { savesRecebidos } from "./load.js";

savesRecebidos
const saveNome = document.querySelectorAll(".save-nome");
    savesRecebidos.forEach((element,index) =>{
        saveNome[index].innerText = element!=undefined? element.nome : "NOVO PERSONAGEM";
});