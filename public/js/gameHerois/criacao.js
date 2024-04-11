import { Personagem,Arma, Save } from "./classes.js";


const nick = document.querySelector("#nickname")
const diminuirAtributo = document.querySelectorAll(".diminuirAtributo");
const aumentarAtributo = document.querySelectorAll(".aumentarAtributo");
const valorAtributo = document.querySelectorAll(".valorAtributo");
const points = document.querySelector("#pontos-de-atributos");
const modificadores = document.querySelectorAll(".modAtributo");

//função para diminuir o valor do atributo
const diminuirFor = document.querySelector("#diminuirFor");
const diminuirDex = document.querySelector("#diminuirDex");
const diminuirCon = document.querySelector("#diminuirCon");
const diminuirInt = document.querySelector("#diminuirInt");
const diminuirSab = document.querySelector("#diminuirSab");
const diminuirCar = document.querySelector("#diminuirCar");
function diminuir_Atributo(index){
    if(parseInt(valorAtributo[index].innerText) >8 && parseInt(points.innerText) >= 0){

        valorAtributo[index].innerText = parseInt(valorAtributo[index].innerText) - 1 ;
        modificadores[index].innerText = Math.floor((parseInt(valorAtributo[index].innerText) - 10)/2);
        if(Math.floor((parseInt(valorAtributo[index].innerText) - 10)/2) > 0){
            modificadores[index].innerText = "+" + modificadores[index].innerText;
        }
        if(parseInt(valorAtributo[index].innerText) >= 13){
            points.innerText = parseInt(points.innerText) + 2;
        }else{
            points.innerText = parseInt(points.innerText) + 1;
        }

    }
}

diminuirFor.onclick = () =>{
    diminuir_Atributo(0);
}
diminuirDex.onclick = () =>{
    diminuir_Atributo(1);
}
diminuirCon.onclick = () =>{
    diminuir_Atributo(2);
}
diminuirInt.onclick = () =>{
    diminuir_Atributo(3);
}
diminuirSab.onclick = () =>{
    diminuir_Atributo(4);
}
diminuirCar.onclick = () =>{
    diminuir_Atributo(5);
}

//função para aumentar o valor do atributo
    const aumentarFor = document.querySelector("#aumentarFor");
    const aumentarDex = document.querySelector("#aumentarDex");
    const aumentarCon = document.querySelector("#aumentarCon");
    const aumentarInt = document.querySelector("#aumentarInt");
    const aumentarSab = document.querySelector("#aumentarSab");
    const aumentarCar = document.querySelector("#aumentarCar");
    function aumentar_Atributo(index){
        if(parseInt(valorAtributo[index].innerText) < 15 && ((parseInt(points.innerText) > 0 && valorAtributo[index].innerText < 13 ) || (valorAtributo[index].innerText >= 13 &&parseInt(points.innerText) > 1 ))){
            valorAtributo[index].innerText = parseInt(valorAtributo[index].innerText) + 1 ;
            modificadores[index].innerText = Math.floor((parseInt(valorAtributo[index].innerText) - 10)/2);
            if(Math.floor((parseInt(valorAtributo[index].innerText) - 10)/2) > 0){
                modificadores[index].innerText = "+" + modificadores[index].innerText;
            }
            if(parseInt(valorAtributo[index].innerText) > 13){
                points.innerText = parseInt(points.innerText) - 2;
            }else{
                points.innerText = parseInt(points.innerText) - 1;
            }
        }
    }
    
    aumentarFor.onclick = () =>{
        aumentar_Atributo(0);
    }
    aumentarDex.onclick = () =>{
        aumentar_Atributo(1);
    }
    aumentarCon.onclick = () =>{
        aumentar_Atributo(2);
    }
    aumentarInt.onclick = () =>{
        aumentar_Atributo(3);
    }
    aumentarSab.onclick = () =>{
        aumentar_Atributo(4);
    }
    aumentarCar.onclick = () =>{
        aumentar_Atributo(5);
    }



const atributoPrincipal = document.querySelector("#atributoPrincipal");
const atributoSecundario = document.querySelector("#atributoSecundario");
const atributoGenero = document.querySelector("#atributoGenero");
const criar_prota = document.querySelector("#criar-prota");
const display_criacao = document.querySelector("#criacao-de-personagem");
const display_jogo = document.querySelector("#jogo");
const inv_nome = document.querySelector("#inv-nome");
const barraHpNome = document.querySelector("#barraHP p");


import * as objetos from "./objects.js";
const protagonista = [];
//função para criar o personagem jogavel
function build_prota(){
    if(atributoPrincipal.value != "selecionePricipal" && atributoSecundario.value != "selecioneSecundario"  && nick.value != "" && atributoGenero.value != "selecioneGenero"){
        if(atributoPrincipal.value != atributoSecundario.value){
                if(parseInt(points.innerText) == 0){
                let atributos = [];
                for(let i=0;i<6;i++){
                    atributos.push(parseInt(valorAtributo[i].innerText));
                }
                atributos[atributoPrincipal.value] =atributos[atributoPrincipal.value] +2;
                atributos[atributoSecundario.value] =atributos[atributoSecundario.value] +1;
                protagonista.push(new Save(nick.value,1,atributos,atributoGenero.value,[objetos.mao],[objetos.roupa]));
                
                const nickSplit = nick.value.split(" ");
                let espaco = "";
                barraHpNome.innerText = "";
                nickSplit[0].split("").forEach(element => {
                    espaco += element + '<br>';
                });
                barraHpNome.innerHTML = espaco;
                if(nickSplit[0].split("").length > 15){
                    barraHpNome.style.fontSize = "12px";
                } 
                if(nick.value.split("").length > 15){ 
                    inv_nome.style.fontSize = "16px"
                    inv_nome.style.top = "16%";

                };
                display_criacao.style.display = "none";
                display_jogo.style.display = "flex";
                

            }else{
                alert("Use todos os pontos de atributos!")
            }
        }else{
            alert("Atributo PRINCIPAL não pode ser igual ao SECUNDARIO!");
        }
    }else{
        alert("Preencha todos os campos!");
    }
}   
criar_prota.onclick = build_prota;

//carregar save

function formatarNome(nome){
    let novoNome = "";
    let nomeSplit = nome.split("");
    nomeSplit.forEach((letra,index)=>{
        if(/[A-Z]/.test(letra) && index != 0){
            novoNome += " ";

        }
        novoNome += letra;
    })
    return novoNome;
}
function procurarObjetoNome(array,nomes){
    let itensAchados = [];
    array.forEach((objeto)=>{
        nomes.forEach((nome)=>{
            if(objeto.type == formatarNome(nome) || objeto.name == formatarNome(nome)){
                itensAchados.push(objeto)
            }
        })
    })
    console.log(itensAchados)
    return itensAchados;
}

let fichaRecebida = JSON.parse(localStorage.getItem('saveEscolhido')).player;
let fichaDetalhes = {
    userID : JSON.parse(localStorage.getItem('saveEscolhido')).usuarioId,
    index: JSON.parse(localStorage.getItem('saveEscolhido')).index
}
//document.querySelector("salvar").value = fichaRecebida;
if(JSON.parse(localStorage.getItem('saveEscolhido'))!= -1){
    console.log(fichaDetalhes)
    console.log(fichaRecebida)
    objetos.guns.unshift(objetos.mao);
    objetos.armors.unshift(objetos.roupa);
    protagonista.push(new Save(fichaRecebida.nick,fichaRecebida.level,[fichaRecebida.attributes.for,fichaRecebida.attributes.des,fichaRecebida.attributes.con,fichaRecebida.attributes.int,fichaRecebida.attributes.sab,fichaRecebida.attributes.car],fichaRecebida.gender,procurarObjetoNome(objetos.guns,fichaRecebida.inventory.armas),procurarObjetoNome(objetos.armors,fichaRecebida.inventory.armaduras),fichaRecebida._id, fichaDetalhes.userID, fichaDetalhes.index));
    fichaRecebida.progress.forEach((npc)=>{
        jogador().progress = npc;
    })
    jogador().dinheiro = fichaRecebida.money;
    console.log(jogador());
    display_criacao.style.display = "none";
    display_jogo.style.display = "flex";
}

//if(carregado)teste();
//exporta o jogador (Teste ou Personagem Criado)
export function jogador(){
    
    return protagonista[protagonista.length - 1];
}