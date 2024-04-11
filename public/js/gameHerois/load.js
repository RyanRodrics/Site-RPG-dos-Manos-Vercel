const saves = document.querySelectorAll(".saves");
let savesRecebidos;
if(document.getElementById("fichas") != null){
    const fichas = JSON.parse(document.getElementById("fichas").value);
    savesRecebidos = [fichas.ficha1,fichas.ficha2,fichas.ficha3,fichas.ficha4];
}else{
    savesRecebidos = [null,null,null,null]
}
export function savesRecebidosExport(){
    return savesRecebidos;
}
function carregarJogo(index){
    if(savesRecebidos[index] != null){
        localStorage.setItem('saveEscolhido', JSON.stringify(savesRecebidos[index]));
    }else{
        localStorage.setItem('saveEscolhido',-1);
    }
}

saves.forEach((element,index) =>{
    element.onclick = ()=>{
        carregarJogo(index);
    }
});