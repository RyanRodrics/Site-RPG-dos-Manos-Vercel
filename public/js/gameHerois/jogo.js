const jogo = document.querySelector("#jogo");
const mapa = document.querySelector("#inicio-mapa");
const falas = document.querySelector("#falas");
const sprites = document.querySelector("#sprites");
const escolhas = document.querySelector("#escolhas");
const imagem_sprite_Denji = document.querySelector("#sprites img");
const loja = document.querySelector("#loja");
const texto_fala = document.querySelector("#textoFala");
const escolha_1 = document.querySelector("#escolha-1");
const escolha_2 = document.querySelector("#escolha-2");
const escolha_3 = document.querySelector("#escolha-3");
import { navSelect } from "../header.js";
navSelect("herois2");

import {jogador} from "./criacao.js";
export {mudarButoes,mudarEscolhas,mudarFala, leave};
//funções do joguinho kkk
let lutaOn = false
function mudarButoes(f1,f2,f3){
    escolha_1.onclick = f1;
    escolha_2.onclick = f2;
    escolha_3.onclick = f3;
}
function mudarEscolhas(t1,t2 ,t3 , l = false){
    if(l){
        escolha_1.innerText = `Atacar com ${jogador().inv[0].type}`
        escolha_2.innerText = "*fugir(For)"
        escolha_3.innerText = "*esquivar(Dex)"
        lutaOn = l;
    }else{
        escolha_1.innerText = t1;
        escolha_2.innerText = t2;
        escolha_3.innerText = t3;
        lutaOn = l;
    }
   
}
function mudarFala(fala){
    const falaSplit = fala.split('');
    texto_fala.innerText = "";
    
    falaSplit.forEach((element,i) => {
          setTimeout( () => {
            texto_fala.innerHTML += element;
            escolhas.style.display = "none";
        }, 50 *i);
    });
    setTimeout(() =>{escolhas.style.display = "flex";}, 50 * falaSplit.length);
}
function leave(){
    falas.style.display = "none";
    sprites.style.display = "none";
    loja.style.display ="none";
    mapa.style.display = "flex";
    jogo.style.backgroundImage = "url(/imgs/gameHerois/mapaHerois2020.png)";
    salvar_mapaAnterior("Mapa");
}
//abrindo inventario
import { criarFicha } from "./ficha.js";
let mapaAnterior,falaAberto,salvarFala,salvarEscolhas;
const abrir_inventario = document.querySelector("#abrir-inventario"); 
const inventario = document.querySelector("#inventario");
function salvar_mapaAnterior(mapinha){
    switch(mapinha){
        case "Loja":
            mapaAnterior = "/imgs/gameHerois/loja/lojaCatalogo.png";
            break;
        case "Mapa":
            mapaAnterior = "/imgs/gameHerois/mapaHerois2020.png";
            break;
        case "Denji":
            mapaAnterior = "/imgs/gameHerois/denji/apartamentoDenji.png";
            break;


        default:
            mapaAnterior = "/imgs/gameHerois/mapaHerois2020.png";
            break;
    }
}
function abrindo_inventario (){
    if(inventario.style.display == "flex"){
        inventario.style.display = "none";
        if(mapaAnterior == "/imgs/gameHerois/mapaHerois2020.png") {
            mapa.style.display = "flex";
        }
        if(mapaAnterior == "/imgs/gameHerois/loja/lojaCatalogo.png"){
            loja.style.display = "flex";
        }
        if(falaAberto){
            falas.style.display = "flex";
            sprites.style.display = "flex";
            falaAberto = false;
        }
        jogo.style.backgroundImage = `url(${mapaAnterior})`;
        mudarFala(salvarFala);
        mudarEscolhas(...salvarEscolhas,lutaOn);
    }else{
        inventario.style.display = "flex";
        mapa.style.display = "none";
        if(mapaAnterior == undefined) salvar_mapaAnterior("Mapa");
        if(falas.style.display == "flex" || sprites.style.display == "flex"){
            falas.style.display = "none";
            sprites.style.display = "none";
            falaAberto = true;
        }
        if(loja.style.display == "flex"){
            loja.style.display = "none";
        }
        jogo.style.backgroundImage = "url(/imgs/gameHerois/fichaHerois.png)";
        criarFicha();
        salvarFala = texto_fala.innerText;
        salvarEscolhas = [escolha_1.innerText,escolha_2.innerText,escolha_3.innerText];

        
    }
}  
abrir_inventario.onclick = abrindo_inventario;
//Loja
import { criarLoja } from "./loja.js";
const irLoja = document.querySelector("#irPara_Loja");
function indoParaLoja(){
    mapa.style.display = "none";
    jogo.style.backgroundImage = "url(/imgs/gameHerois/loja/lojaCatalogo.png)";
    loja.style.display ="flex";
    salvar_mapaAnterior("Loja");
    criarLoja();
}
irLoja.onclick = indoParaLoja;
//Denji
import { falando_Denji } from "./personagens/irDenji.js";
const irDenji = document.querySelector("#irPara_Denji");
function indoParaDenji(){
    mapa.style.display = "none";
    jogo.style.backgroundImage = "url(/imgs/gameHerois/denji/apartamentoDenji.png)";
    salvar_mapaAnterior("Denji");
    falando_Denji();
}
irDenji.onclick = indoParaDenji;



