const falas = document.querySelector("#falas");
const sprites = document.querySelector("#sprites");
const imagem_sprite_Denji = document.querySelector("#sprites img");
const irDenji = document.querySelector("#irPara_Denji");

const texto_fala = document.querySelector("#textoFala");
const escolhas = document.querySelector("#escolhas");
const escolha_1 = document.querySelector("#escolha-1");
const escolha_2 = document.querySelector("#escolha-2");
const escolha_3 = document.querySelector("#escolha-3");

const barraHP = document.querySelector("#barraHP div");
const barraInimigo = document.querySelector("#barraINIMIGO");
const barraInimigoHP = document.querySelector("#barraINIMIGO div");
const barraREP = document.querySelector("#barraREP");
const barraREPvalue = document.querySelector("#barraREP div");
import {denji} from "../objects.js";
import {jogador} from "../criacao.js";
import { mudarButoes,mudarEscolhas,mudarFala,leave } from "../jogo.js";

//funções auxiliares
function mudarSprite(valor){
    if(valor >= 0){
    imagem_sprite_Denji.src = `/imgs/gameHerois/denji/sprites/denji_sprite_${valor}.png`;
    }else{
        imagem_sprite_Denji.src = "";
    }
}
function dado(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max)) + 1;
}
function reputacao(value){
    denji.reputation = value;
    barraREPvalue.style.width = `${denji.reputation}%`
}

// conversando com denji
let verificandoReputacao;
export function falando_Denji(){
    //aparecendo as falas :D
    falas.style.display = "flex";
    sprites.style.display = "flex";
    barraHP.style.height = ` ${(jogador().vida)/ (jogador().lvl * (10 + jogador().modCon))*100}%`;
    barraREPvalue.style.width = `${denji.reputation}%`;
    //setando reputação para muie
    if(jogador().genero == "F")reputacao(25);
    //primeira interação
    mudarFala("RAN DAM DAM DAM DAM");
    mudarEscolhas("Quem é você??? (Car)","*fugir* (For)",`${denji.nome}??? (Car)`);
    mudarButoes(quemEhVc,fugir,sabiaQuemEra)

    verificandoReputacao = setInterval(()=>{
        if(denji.reputation <= 0){
            zerarReputacao();
        }
    },1000);
}

function quemEhVc(){
    if(jogador().roll("Car") < denji.DT("Sab") && jogador().genero != "F"){
        reputacao(-15);
        mudarSprite(7);
        mudarFala("Quem sou eu??? Me diga quem é você ou vou te cortar ao meio!");
        mudarEscolhas(`Foi mal... Sou ${jogador().nome}`,"Eu que vou te cortar! Seu merda! *luta",`Pera... Você é o ${denji.nome}? (Car)`);
        mudarButoes(saudacao,luta,sabiaQuemEra)
    }else{
        reputacao(10);
        mudarSprite(3);
        if(jogador().genero == "F"){ mudarFala(`Deixa eu tirar a Armadura aki... Eu sou ${denji.nome}, e qual o nome dessa gatinha ? *leve sorriso sedutor`) }
        else{mudarFala(`Meu nome é ${denji.nome}, mais conhecido como CHAINSAWMAN, e o seu?`);}
        mudarEscolhas(`Eu sou ${jogador().nome}`,`${denji.nome}...Acho que já ouvi falar...(Car)`,"Então é esse o nome que vai ta na minha aliança?");
        mudarButoes(saudacao,sabiaQuemEra,dandoEmCima);
    }
}

function fugir(){
    if(jogador().roll("For") < denji.DT("For")){
        reputacao(-25);
        if(jogador().genero != "F"){
            if(denji.reputation < 15){
                luta();
            }else{
                mudarSprite(4);
                mudarFala(`Ta pensando que vai aonde? Foge não! *${denji.nome} te segurou*`);
                mudarEscolhas("Me solta! *tentar se soltar* (For)","Tava so apostando corrida com você :D(Car)","*Lutar");
                mudarButoes(fugir,apostandoCorrida,luta)
            }            
        }else{
            mudarSprite(2);
            mudarFala(`Porque as gostosas sempre fogem de mim??? *${denji.nome} te segurou*`)
            mudarEscolhas("Me solta! *tentar se soltar* (For)","Tava so apostando corrida com você :D (Car)","*Lutar");
            mudarButoes(fugir,apostandoCorrida,luta)
        }
    }else{
        clearInterval(verificandoReputacao)
        reputacao(-100);
        mudarSprite(-1);
        mudarFala("Você escapou!");
        mudarEscolhas("Sair","Sair","Sair");
        mudarButoes(sair,sair,sair) 
    }
}

function sabiaQuemEra(){
    if(jogador().roll("Car") < denji.DT("Sab") && jogador().genero != 'F'){
        reputacao(-20);
        mudarSprite(4)
        mudarFala("E COMO CARALHOS VOCÊ SABIA MEU NOME??? MORRA SEU ESQUISITO!")
        mudarEscolhas("*lutar", "CALMA CARA! EU SEI DO DESENHO LA", "RELAXA! VOCÊ NÃO É UM HERÓI DO AMANHÃ????");
        mudarButoes(luta,anime,herois)
    }else{
        if(jogador().genero == 'F'){
            reputacao(10)
            mudarSprite(5);
            mudarFala(". . . . . . . . . . . . . . . . . \n Acho que me apaixonei UwU que gatinha ein");
            mudarEscolhas("Eu tambêm <3 \n *se aproximar para beijo","Sem querer magoar, mas... não","Ta maluco? Eu sou homem!(Car)");
            mudarButoes(beijo,deuFora,virouHomem)
        }else{
            reputacao(10)
            mudarSprite(6)
            mudarFala("Uau você me conhece :) Mas . . . . . . . como?");
            mudarEscolhas("Não posso esquecer o sorriso mais lindo do mundo UwU", "Do desenho lá", "Você não é um Herói do Amanhã?");
            mudarButoes(dandoEmCima,anime,herois)
        }
    }
}

function saudacao(){

    if(jogador().genero == 'F'){
        mudarSprite(6);
        mudarFala(`${jogador().nome}. . . . . Acho que vai ficar bonito na certidão de casamento da gente`);
        mudarEscolhas("Esquisito","*Fugir","Melhor ainda na certidão de nascimento do nosso filho");
        mudarButoes(deuFora,fugir,dandoEmCima)
    }else{
        mudarSprite(2)
        mudarFala(`${jogador().nome} . . . . . . . . . . E O QUE VOCÊ QUER COMIGO?`)
        mudarEscolhas("Eu sou da Agência do tempo, vim ajudar contra o ART","Deixa de besteira, estamos no mesmo barco","SUA VIDA HAHAHAHHAHA *lutar")
        mudarButoes(herois,herois,luta)
    }
}

function dandoEmCima(){
    if(jogador().genero == "F"){
        reputacao(50);
        mudarSprite(5);
        mudarFala("Pochita... Acho que é ela... Você é a garota certa!");
        mudarEscolhas("*Se aproximar para beijo","Não aceita um elogio que já fica gado, que nojento",`${denji.nome},casa comigo?`);
        escolha_1.onclick = beijo;
        escolha_2.onclick = deuFora;
        escolha_3.onclick = casamento;
    }else{
        if(jogador().genero =="M"){
            reputacao(-50);
            mudarSprite(2);
            mudarFala("TA MALUCO FILHA DA PUTA!!! EU SOU HOMEM CARALHO! *barulhos de motosserra");
            mudarEscolhas("ENTÃO VAI PRA CASA DO CARALHO *lutar", "CORRE QUE ELE TA MALUCO *fugir","Eu sou mulher! >.< (car)");
            escolha_1.onclick = luta;
            escolha_2.onclick = fugir;
            escolha_3.onclick = virouMulher;
        }
        if(jogador().genero == "N"){
            mudarSprite(1);
            mudarFala("Isso era para ser um elogio?");
            mudarEscolhas("NÃO ACEITA UM ELOGIO? *lutar", "Desculpaaaaaa... (correr com vergonha)","Eu sou mulher! >.< (car)");
            escolha_1.onclick = luta;
            escolha_2.onclick = fugir;
            escolha_3.onclick = virouMulher;
        }
    }
}

function apostandoCorrida(){
    if((jogador().roll("Car") > denji.DT("Sab") && denji.reputation >= 25) || (jogador().genero == "F")){
        reputacao(15);
        mudarSprite(3);
        mudarFala("Não existe um mundo que você me vença numa corrida xD");
        mudarEscolhas("Você vai comer poeira(iniciar corrida)","Sou conhecida como Seninha pela minha velocidade(iniciar corrida)","Ado ado quem ficar para trás é viado!(iniciar corrida)");
        escolha_1.onclick = corrida;
        escolha_2.onclick = corrida;
        escolha_3.onclick = corrida;
    }else{
        reputacao(-15);
        mudarSprite(2);
        mudarFala("ACHA QUE ME ENGANA SEU MERDA?");
        mudarEscolhas("CALMA EU SOU DA AGÊNCIA DO TEMPO!(Car)","Eu sou seu pai(Car)","Bom... Eu tentei resolver na conversa *lutar");
        escolha_1.onclick = herois;
        escolha_2.onclick = pai;
        escolha_3.onclick = luta;
    }
}

function pai(){
    if(jogador().roll("Car") > denji.DT("Sab")){
        mudarSprite(5);
        mudarFala("P-Pai?");
        mudarEscolhas("To te sacaneando rsrsrs, sou da agência do tempo","KKKKKKKKKKKKKKKKKKKKKKK cara otario, mas não. . . Vim acabar com o ART","Agora sinta meu poder *posição de luta e lutar");
        mudarButoes(herois,herois,luta)
    }else{
        mudarSprite(2);
        mudarFala("VAI TOMAR NO CU SEU MERDA");
        mudarEscolhas("lutar","lutar","lutar");
        mudarButoes(luta,luta,luta)
    }
}

function anime(){
    reputacao(-10);
    mudarSprite(1);
    mudarFala("Desenho?. . . . . . . . . Eu sou bem real para falar a verdade");
    mudarEscolhas("Desculpa, confundi xD. Você é um héroi do amanhã né","Esquece, vim pedir ajuda para acabar com ART", "É... agora que falou, é bem real mesmo xD, vim ajudar os Heróis do Amanhã");
    mudarButoes(herois,herois,herois);
}

function beijo(){
    if(jogador().genero == "F" || generoBait == "F" ){
        reputacao(50);
        mudarSprite(-1);
        let quantidadeBeijo = 1;
            function falasBeijo(){
                reputacao(2);
                switch(quantidadeBeijo){
                    case 1:
                        mudarFala(`*${denji.nome} se aproxima dos seus lábios e com um toque suave vocês se beijam`);
                        break;
                    case 2:
                        mudarFala(`*${denji.nome} te pega pela cintura e o beijo se extende`);
                        break;
                    case 3:
                        mudarFala(`*A mão dele desliza pelo seu corpo te dando leve arrepios de prazer`);
                        break;
                    case 4:
                        mudarFala(`*O mundo parece parar, seus olhares após o beijo são de amor e desejo`);
                        break;
                    case 5:
                        mudarFala(`*Seu corpo para de responder ao cerebro, querendo apenas mais o calor do ${denji.nome}`);
                        break;
                    case 6:
                        mudarFala(`*O romance entre vocês dois parece ter uma conexão além da carnal, o beijo é maravilhoso`);
                        break;
                    case 7:
                        mudarFala(`*Sua saliva começa a se esgotar de tanto beijar, mas seus sentimentos ficaram mais fortes`);
                        break;
                    default:
                        reputacao(-2);
                        mudarFala(`(MESTRE) pfv para de beijar ta ficando esquisito ;-;`);
                        break;
                }
                quantidadeBeijo++;
            }
        falasBeijo();
        mudarEscolhas(`${denji.nome}. . . . aceita casar comigo?`, "*beijar novamente", "Desculpa... Mas eu preciso focar no meu objetivo. . . DERROTAR O ART! (Car)");
        mudarButoes(casamento,falasBeijo,herois)
    }else{
        luta();
    }
}

function deuFora(){
    reputacao(-5)
    mudarSprite(1);
    mudarFala(". . . . . . . . . . . . . .");
    mudarEscolhas("Sou da agência, e vim acabar o ART","Precisamos acabar com o ART", "Eu não queria que fosse assim nosso encontro. . . Mas eu preciso acabar com o ART");
    mudarButoes(herois,herois,herois);
}
//enganar o genero para o DENJI
let generoBait;
function virouHomem(){
    if(jogador().roll("Car") >= denji.DT("Sab")){
        reputacao(-25);
        mudarSprite(1);
        mudarFala("Ah. . . . Bom o que você veio fazer aki?");
        mudarEscolhas("Eu vim ajudar contra o ART","Fui enviado para ajudar os Heróis do Amanhã","Algo me diz que você precisa de uma ajuda \n*Observar o corpo dele(Sab)");
        mudarButoes(herois,herois,ajuda);
        generoBait = "M";
    }else{  
        reputacao(-10);
        mudarSprite(1);
        mudarFala("Bom. . . . . . . . . . Seus peitos parecem bem de mulheres");
        mudarEscolhas("Para de olhar para eles seu esquisito!","MORRA SEU TARADO *lutar","*fazer uma cara de raiva");
        mudarButoes(deuFora,luta,deuFora)
    }
}
function virouMulher(){
    if(jogador().roll("Car") >= denji.DT("Sab")){
        generoBait = "F";
        reputacao(25)
        mudarSprite(5);
        mudarFala(`*${denji.nome} está boquiaberto com sua revelação`);
        mudarEscolhas("Bom... mas esse não é caso de agora. Precisamos parar o ART","*Se aproximar de beija-lo","O que é isso? (Sab)");
        mudarButoes(herois,beijo,ajuda);
    }else{
        reputacao(-20);
        mudarSprite(2);
        mudarFala("TA QUERENDO ME ENGANAR *barulhos de motosserra");
        mudarEscolhas("lutar","lutar","lutar");
        mudarButoes(luta,luta,luta)
    }
}
let casados =false;
function casamento(){
    if(jogador().roll("Car") >= denji.DT("Car") || (jogador().genero == "F" || generoBait == "F")){
        reputacao(20);
        mudarSprite(6)
        casados = true;
        mudarFala(`Eu, ${denji.nome}, aceito me casar com você`);
        mudarEscolhas("Agora que somos casados, precisamos acabar com o ART","Te enganei HAHAHAHAHA", `*Abraçar o ${denji.nome}(Sab)`);
        mudarButoes(herois,deuFora,ajuda);
    }else{
        reputacao(-20);
        mudarSprite(2);
        mudarFala("TA QUERENDO ME ENGANAR *barulhos de motosserra");
        mudarEscolhas("lutar","lutar","lutar");
        mudarButoes(luta,luta,luta)
    }
}
//lore principal
function herois(){
    mudarSprite(6)
    reputacao(15)
    jogador().genero == 'F' || generoBait == 'F' ? mudarFala("Pera... você é da Agência? Um rostinho bonito esconde a sua verdadeira força "): mudarFala("Então quer dizer que enviaram mais para aqui");
    mudarEscolhas("Pera... O que é isso? (Sab)","Vou ajudar no que precisar(Car)","Pode deixar comigo que vou acabar com ART(Car)");
    mudarButoes(ajuda,precisarAjuda,precisarAjuda);
}
function precisarAjuda(){
    if(jogador().roll("Car") >= denji.DT("Car")){
        reputacao(10)
        mudarSprite(1)
        mudarFala("Bom então vou te contar... Na última batalha acabei me ferindo muito, preciso da sua ajuda para estancar meu sagramento")
        mudarEscolhas("*ajudar(Sab)","Deixa eu ver isso ai(Sab)","Bom posso tentar algo...(Sab)");
        mudarButoes(ajuda,ajuda,ajuda);
    }else{
        mudarSprite(-1)
        mudarFala(`*${denji.nome} cai no chão, sua camisa começa a surgir uma mancha de sangue`);
        mudarEscolhas("*tirar a camisa dele", "*chorar","*ajudar ele");
        mudarButoes(ajuda,meuDeus,ajuda);
    }
}
function ajuda(){
    reputacao(10);
    mudarSprite(-1)
    mudarFala(`*${denji.nome} mostra um buraco de bala em seu peito, se não for tirado rapidamente pode leva-lo a morte`);
    if(jogador().roll("Sab") >= 10){
        mudarEscolhas("Preciso que fique parado, vai doer um pouco *tirar bala","Confia em mim... *tirar bala","Eu acho que consigo...*tirar bala")
        mudarButoes(tirarBala,tirarBala,tirarBala)
    }else{
        mudarEscolhas("Meu Deus, o que é isso?","As vezes, amar é deixar ir","Posso até tentar algo mas acredito que vou ferrar você");
        mudarButoes(meuDeus,meuDeus,tirarBala);
    }
}

function meuDeus(){
    reputacao(-10)
    mudarSprite(1);
    mudarSprite("Nunca viu uma bala não? So me ajuda a tirar aqui!")
    mudarEscolhas("Ta bom...*tirar bala","Só não se mexe *tirar bala","Não sou especialista nisso mas acredito que vai dar certo *tirar bala");
    mudarButoes(tirarBala,tirarBala,tirarBala)
}

//mecanica de salvar o Denji
function tirarBala(){   
    mudarSprite(8);
    barraInimigo.style.display = "grid";
    denji.vida = denji.vida/2;
    barraInimigoHP.style.width = `${(denji.vida)/ (denji.lvl * (10 + denji.modCon))*100}%`;
    barraInimigoNome.innerText = denji.nome;
    imagem_sprite_Denji.className = "coracao";
    mudarFala(`*Aperte o botão para tirar a bala do peito do ${denji.nome}`);
    mudarEscolhas("PUXAR","PUXAR","PUXAR");
    mudarButoes(puxar,puxar,puxar);
    let sangramentoDenji = setInterval(()=>{
        if(denji.vida >= (denji.lvl * (10 + denji.modCon)) || denji.vida <= 0)clearInterval(sangramentoDenji);
        denji.vida -= dado(12);
        barraInimigoHP.style.width = `${(denji.vida)/ (denji.lvl * (10 + denji.modCon))*100}%`;
        
    },500);
    function puxar(){
        if(jogador().roll("Sab") >= 15){
            denji.vida += dado(20) + jogador().modSab;
            barraInimigoHP.style.width = `${(denji.vida)/ (denji.lvl * (10 + denji.modCon))*100}%`;
        }
        if(denji.vida >= (denji.lvl * (10 + denji.modCon))){
            imagem_sprite_Denji.className = "";
            mudarSprite(2);
            if(casados){
                mudarFala(`Muito obrigado meu chuchuzinho *${denji.nome} beija sua testa* mas o dever me chama *pose de superherói* adeus. . . . minha amada`);
            }else{
                mudarFala(`Agora me sinto bem melhor :D, valeu ai! Mas preciso resolver umas coisas ainda *${denji.nome} se retira `);
            }
            mudarEscolhas("Sair","Sair","Sair");
            mudarButoes(sair,sair,sair);
        }
        if(denji.vida <= 0){
            reputacao(-100);
            mudarSprite(-1);
            imagem_sprite_Denji.className = "";
            mudarFala(`A-avisa. . . . ao . . . Pochita . . . . que eu o amo . . . . .*${denji.nome} morreu`);
            mudarEscolhas("Sair","Sair","Sair");
            mudarButoes(sair,sair,sair);
        }
    }
}
//mecanica de corrida
let run = false;
let jogadorCorre = 0,denjiCorre = 0;
let denjiCorrendo ;
function correr(quem){
    if(quem == jogador().nome){
        jogadorCorre += jogador().modDex + dado(20);
        barraHP.style.height = `${jogadorCorre}%`;
    }
    if(quem == denji.nome){
        denjiCorre += dado(10);
        barraInimigoHP.style.width = `${denjiCorre}%`;
    }
}   
function atrapalhar(quem){
    if(quem == jogador().nome){
        jogadorCorre -= dado(20)
        barraHP.style.height = `${jogadorCorre}%`;
    }
    if(quem == denji.nome){
        denjiCorre -= dado(20)
        barraInimigoHP.style.width = `${denjiCorre}%`;
    }
}
function disputaCorre(){
    if(jogadorCorre >=100){
        jogadorCorre = 100;
        clearInterval(denjiCorrendo);
        mudarFala("ARF ARF ARF ARF COMOOOOO???? COMO VOCÊ VENCEU? . . . . . . . . . . . . Quer saber! FODASE! Adeus *Denji se retira");
        mudarEscolhas("sair","sair","sair");
        escolha_1.onclick = sair;
        escolha_2.onclick = sair;
        escolha_3.onclick = sair;
    }else{
        switch(dado(6)){
            case 1:
                mudarEscolhas("CORRER","CAIR","ATRAPALHAR");
                escolha_1.onclick = () => {
                    correr(jogador().nome);
                    disputaCorre();
                };
                escolha_2.onclick = () => {
                    atrapalhar(jogador().nome)
                    disputaCorre();
                };
                escolha_3.onclick = () => {
                    atrapalhar(denji.nome)
                    disputaCorre();
                };
                break;
            case 2:
                mudarEscolhas("CAIR","CORRER","ATRAPALHAR");
                escolha_1.onclick = () => {
                    atrapalhar(jogador().nome)
                    disputaCorre();
                };
                escolha_2.onclick = () => {
                    correr(jogador().nome)
                    disputaCorre();
                };
                escolha_3.onclick = () => {
                    atrapalhar(denji.nome)
                    disputaCorre();
                };
                break;
            case 3:
                mudarEscolhas("ATRAPALHAR","CAIR","CORRER");
                escolha_1.onclick = () => {
                    atrapalhar(denji.nome)
                    disputaCorre();
                };
                escolha_2.onclick = () => {
                    atrapalhar(jogador().nome)
                    disputaCorre();
                };
                escolha_3.onclick = () => {
                    correr(jogador().nome)
                    disputaCorre();
                };
                break;
            case 4:
                mudarEscolhas("ATRAPALHAR","CORRER","CAIR");
                escolha_1.onclick = () => {
                    atrapalhar(denji.nome)
                    disputaCorre();
                };
                escolha_2.onclick = () => {
                    correr(jogador().nome)
                    disputaCorre();
                };
                escolha_3.onclick = () => {
                    atrapalhar(jogador().nome)
                    disputaCorre();
                };
                break;
            case 5:
                mudarEscolhas("CAIR","ATRAPALHAR","CORRER");
                escolha_1.onclick = () => {
                    atrapalhar(jogador().nome)
                    disputaCorre();
                };
                escolha_2.onclick = () => {
                    atrapalhar(denji.nome)
                    disputaCorre();
                };
                escolha_3.onclick = () => {
                    correr(jogador().nome)
                    disputaCorre();
                };
                break;
            case 6:
                mudarEscolhas("CORRER","ATRAPALHAR","CAIR");
                escolha_1.onclick = () => {
                    correr(jogador().nome)
                    disputaCorre();
                };
                escolha_2.onclick = () => {
                    
                    atrapalhar(denji.nome)
                    disputaCorre();
                };
                escolha_3.onclick = () => {
                    atrapalhar(jogador().nome)
                    disputaCorre();
                };
                break;
            default:
                mudarEscolhas("CORRER","ATRAPALHAR","CAIR");
                escolha_1.onclick = () => {
                    atrapalhar(denji.nome)
                    disputaCorre();
                };
                escolha_2.onclick = () => {
                    correr(jogador().nome)
                    disputaCorre();
                };
                escolha_3.onclick = () => {
                    atrapalhar(jogador().nome)
                    disputaCorre();
                };
                break;

        }
    }
}
function corrida(){
    mudarSprite(-1);
    barraInimigo.style.display = "grid";
    barraInimigoHP.style.width = `${denjiCorre}%`;
    barraInimigoNome.innerText = denji.nome;
    barraHP.style.height = ` ${jogadorCorre}%`;
    if(!run)mudarFala("CORRE");
    run = true;
    const timer = 500;

    denjiCorrendo = setInterval(() => {
        correr(denji.nome);
        if(denjiCorre >= 100){
            
            denjiCorre = 100;
            mudarFala("ACHEI FACIL SEU LIXO HAHAHAHAHAHHAHAHAHAHAHAHA");
            mudarEscolhas("sair","sair","sair");
            escolha_1.onclick = sair;
            escolha_2.onclick = sair;
            escolha_3.onclick = sair;   
            clearInterval(denjiCorrendo);       
        }
    },timer);
    
    disputaCorre();
    

       
}


//mecanica de luta
let lutando = false;
const barraInimigoNome = document.querySelector("#barraINIMIGO p");
function denjiBate(){
    let valorDado = dado(20);
    if(valorDado + denji.getMod(denji.inv[0].attribute) + Math.floor(denji.lvl/2) >= jogador().armor){
        if(valorDado == 20){
            jogador().vida -= denji.inv[0].rollDamage() + denji.inv[0].rollDamage() + denji.getMod(denji.inv[0].attribute)

        }else{
            jogador().vida -=  denji.inv[0].rollDamage() + denji.getMod(denji.inv[0].attribute)
            
        }
        if(jogador().vida <= 0){
            alert("VOCÊ MORREU");
            sair();
        }
    }
    barraHP.style.height = ` ${(jogador().vida)/ (jogador().lvl * (10 + jogador().modCon))*100}%`;
    barraInimigoHP.style.width = `${(denji.vida)/ (denji.lvl * (10 + denji.modCon))*100}%`;
}
function zerarReputacao(){
    clearInterval(verificandoReputacao);
    setTimeout(() => {mudarEscolhas("*Você zerou sua reputação, se prepare para lutar","*Você zerou sua reputação, se prepare para lutar","*Você zerou sua reputação, se prepare para lutar")},100);
    escolha_1.onclick = luta;
    escolha_2.onclick = luta;
    escolha_3.onclick = luta;
    console.log("DEU RUIM");
}   
function luta(){
    clearInterval(verificandoReputacao);
    if(lutando){
        mudarFala("RESOLVE COMO MACHO ESSA PORRA");
        denjiBate()
        
    }else{
        lutando = true;
        mudarFala("HAHAHAHAHA VAI SER UMA MARAVILHA TE CORTAR AO MEIO");
    }
    reputacao(-100);
        barraInimigo.style.display = "grid";
        barraInimigoHP.style.width = `${(denji.vida)/ (denji.lvl * (10 + denji.modCon))*100}%`;
        barraInimigoNome.innerText = denji.nome;
        mudarSprite(7);

        mudarEscolhas("","","",lutando);
        escolha_1.onclick = bater;
        escolha_2.onclick = fugir;
        escolha_3.onclick = esquivar;
}
function bater(){
    let valorDado = dado(20);
    console.log(valorDado);
    if(valorDado + jogador().getMod(jogador().inv[0].attribute) + Math.floor(jogador().lvl/2) >= denji.armor){
        if(valorDado == 20){
            denji.vida -= jogador().inv[0].rollDamage() + jogador().inv[0].rollDamage() + jogador().getMod(jogador().inv[0].attribute)
       
        }else{
            denji.vida -= 1* jogador().inv[0].rollDamage() + jogador().getMod(jogador().inv[0].attribute)
 
        }
        if(denji.vida >= denji.lvl*(10 + denji.modCon)*0.7){
            switch(dado(6)){
                case 1:
                    mudarFala("MORRA LIXO!")
                    break;
                case 2:
                    mudarFala("FRACO!")
                    break;
                case 3:
                    mudarFala("MORRA!")
                    break;
                case 4:
                    mudarFala("TA FRACO EIN?")
                    break;
                case 5:
                    mudarFala("TA FACIL EIN!")
                    break;
                case 6:
                    mudarFala("RAN DAM DAM DAM DAM")
                    break;
            }
        }
            if(denji.vida < denji.lvl*(10 + denji.modCon)*0.7 && denji.vida >= denji.lvl*(10 + denji.modCon)*0.4){
                switch(dado(6)){
                    case 1:
                        mudarFala("AGORA SIM!")
                        break;
                    case 2:
                        mudarFala("VEM PRA CIMA!")
                        break;
                    case 3:
                        mudarFala("NEWBA!")
                        break;
                    case 4:
                        mudarFala("TOMA ESSA!")
                        break;
                    case 5:
                        mudarFala("VOU TE AMASSAR!")
                        break;
                    case 6:
                        mudarFala("*barulhos de motosserra")
                        break;
                }
            }
        if(denji.vida < denji.lvl*(10 + denji.modCon)*0.4){
            switch(dado(6)){
                case 1:
                    mudarFala("NÃO VOU DESISTIR")
                    break;
                case 2:
                    mudarFala("MALDITO!")
                    break;
                case 3:
                    mudarFala("FILHO DA...")
                    break;
                case 4:
                    mudarFala("CARALHO")
                    break;
                case 5:
                    mudarFala("Arf Arf Arf")
                    break;
                case 6:
                    mudarFala("*ele ta cansado")
                    break;
            }
        }
            if(denji.vida <= 0){
            alert("DENJI MORREU");
            sair();
        }
    }else{
        mudarFala("*Você Errou");
    }
    denjiBate();
}
function esquivar(){
    if(jogador().roll("Dex") >= dado(20) + denji.getMod(denji.inv[0].attribute) + Math.floor(denji.lvl/2)  ){
        mudarFala("Maldito esquivou de mim!");
    }else{
        denjiBate();
    }
}


function sair(){
    clearInterval(verificandoReputacao)
    jogador().progress = {
        nome:`${denji.nome}`, 
        rep: denji.reputation
    };
    irDenji.style.display = "none";
    leave();
}