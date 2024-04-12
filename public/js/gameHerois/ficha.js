const inv_nome = document.querySelector("#inv-nome");

const inv_atributos = document.querySelector("#inv-atributos");
const inv_for = document.querySelector("#inv-for");
const inv_dex = document.querySelector("#inv-dex");
const inv_con = document.querySelector("#inv-con");
const inv_int = document.querySelector("#inv-int");
const inv_sab = document.querySelector("#inv-sab");
const inv_car = document.querySelector("#inv-car");

const inv_CA = document.querySelector("#inv-CA");
const inv_HP = document.querySelector("#inv-HP");
const inv_LVL = document.querySelector("#inv-LVL");
const inv_GEN = document.querySelector("#inv-GEN");
const inv_money_value = document.querySelector("#inv-money-value");

const inv_itens = document.querySelector("#inv-itens");
const inv_itensOL = document.querySelectorAll("#inv-itens li");
const inv_arma = document.querySelectorAll(".inv-arma");
const inv_itens_subir = document.querySelectorAll(".inv-itens-subir");
const inv_itens_descer = document.querySelectorAll(".inv-itens-descer");

const inv_itens_armadura = document.querySelector("#inv-item-armadura")

const salvarButton =document.querySelector("#salvar-jogo button")
//funções auxiliares
function escrevendo(html,texto){
    html.innerText = texto;
}
function maisMenos(valor){
    if(valor > 0) return "+" + valor;
    return valor;
}
function montarInventario(){
    inv_arma.forEach((element,index) => {
        if(index != 0 ){
            element.innerText =  jogador().inv[index - 1] != undefined ? jogador().inv[index - 1].toString() : "" ;
            inv_itensOL[index].style.display = element.innerText == "" ? "none": "inline-flex";
        }
        if(index == 1) element.style.color = "red";
    });
}
function formatarNome2(nome){
    let novoNome = "";
    let nomeSplit = nome.split("");
    nomeSplit.forEach((letra)=>{
        if(letra != " "){
            novoNome += letra
        }
    })
    return novoNome;
}
function enviarNomesArray(array){
    let nomesRecebidos = []
    array.forEach((element)=>{
        if(element.type.length > 1){
            nomesRecebidos.push(formatarNome2(element.type));
        }else{
            nomesRecebidos.push(formatarNome2(element.name))
        }
    })
    return nomesRecebidos
}
//butões da ficha
function subir(index){
    if(index > 0){
        let temp = jogador().inv[index];
        jogador().inv[index] = jogador().inv[index -1];
        jogador().inv[index - 1] = temp;
    }
    montarInventario();
}

function descer(index){
    if(index < 4){
        let temp = jogador().inv[index];
        jogador().inv[index] = jogador().inv[index +1];
        jogador().inv[index + 1] = temp;
    }
    montarInventario();
}

//buildando o que será salvado
const saveEnviar = {
    player:{
        nick: jogador().nome,
        ca: jogador().armor,
        gender: jogador().gender,
        hp: jogador().vida,
        level: jogador().lvl,
        money: jogador().dinheiro,
        inventory: {
            armas: enviarNomesArray(jogador().inv),
            armaduras: enviarNomesArray(jogador().invArmaduras)
        },
        attributes: {
            for: jogador().for,
            des: jogador().dex,
            con: jogador().con,
            int: jogador().int,
            sab: jogador().sab,
            car: jogador().car
        },
        progress: jogador().progress,
        idFicha: jogador().saveid
    },
    usuarioId: jogador().userid,
    index:jogador().index
}
function enviandoSave(){
   
    localStorage.setItem('saveEscolhido', JSON.stringify(saveEnviar));
    document.querySelector('#salvar').value = JSON.stringify(saveEnviar);
}
//importando dados do jogador
import {jogador} from "./criacao.js";

export function criarFicha(){
    //caracteristicas
    escrevendo(inv_nome,jogador().nome);
    escrevendo(inv_CA,jogador().armor);
    escrevendo(inv_HP,jogador().vida);
    escrevendo(inv_LVL,jogador().lvl);
    escrevendo(inv_money_value,jogador().dinheiro)
    //atributos
    escrevendo(inv_for,maisMenos(jogador().modFor));
    escrevendo(inv_dex,maisMenos(jogador().modDex));
    escrevendo(inv_con,maisMenos(jogador().modCon));
    escrevendo(inv_int,maisMenos(jogador().modInt));
    escrevendo(inv_sab,maisMenos(jogador().modSab));
    escrevendo(inv_car,maisMenos(jogador().modCar));
    //muda a cor com o genero
    if(jogador().genero == "F") inv_GEN.style.color = "red";
    if(jogador().genero == "M") inv_GEN.style.color = "blue";
    escrevendo(inv_GEN,jogador().genero);
    //inventario
    montarInventario();
    inv_itens_subir.forEach((element,index) =>{
        element.onclick = () =>{
            subir(index);
        }
    })
    inv_itens_descer.forEach((element,index) =>{
        element.onclick = () =>{
            descer(index);
        }
    })
    inv_itens_armadura.innerText = jogador().invArmaduras[1].toString();
    enviandoSave();
}