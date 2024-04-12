const saves = document.querySelectorAll(".saves");

console.log(saves)
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


console.log(savesRecebidos)
function carregarJogo(index){
    const saveEscolhido = {
        player: savesRecebidos[index],
        usuarioId: JSON.parse(document.getElementById("jogador").value).id,
        index: index
    }
    if(savesRecebidos[index] != null){
        localStorage.setItem('saveEscolhido', JSON.stringify(saveEscolhido));
    }else{
        saveEscolhido.player = -1
        localStorage.setItem('saveEscolhido', JSON.stringify(saveEscolhido));
    }
}

console.log(JSON.parse(document.getElementById("jogador").value))

saves.forEach((element,index) =>{
    element.onclick = ()=>{
        carregarJogo(index);
    }
});