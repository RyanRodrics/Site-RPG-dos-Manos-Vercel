const saves = document.querySelectorAll(".saves");


import { teste } from "./objects.js";

export const savesRecebidos = [teste,undefined,undefined,undefined];

function carregarJogo(index){
    if(savesRecebidos[index] != undefined){
        localStorage.setItem('saveEscolhido', index);
    }else{
        localStorage.setItem('saveEscolhido',-1);
    }
}


saves.forEach((element,index) =>{
    element.onclick = ()=>{
        carregarJogo(index);
    }
});