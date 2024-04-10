const saves = document.querySelectorAll(".saves");
const fichas = JSON.parse(document.getElementById("fichas").value);

export const savesRecebidos = [fichas.ficha1,fichas.ficha2,fichas.ficha3,fichas.ficha4];

function carregarJogo(index){
    if(savesRecebidos[index] != null){
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