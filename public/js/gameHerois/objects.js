import { Personagem,Arma,Armadura,Save,Npc } from "./classes.js";
// Armas
const motosserra = new Arma("Motosserra","2d10",1000,"For");
const arco = new Arma("Arco","1d8",50,"Dex");
const fuzil = new Arma("Fuzil","2d10",1500,"Dex");
const espada = new Arma("Espada","1d6",25,"For");
const rapieira = new Arma("Rapieira","1d6",25,"Dex");
const pistola = new Arma("Pistola","1d10",250,"Dex");
const lancaGranada = new Arma("Lança Granada","6d6",3000,"Dex");
const martelo = new Arma("Martelo de Guerra","6d6",2000,"For");
const chicote = new Arma("Chicote","2d6",500,"Car");

const mao = new Arma("Mão","1d4",0,"For");
const guns = [motosserra,arco,fuzil,espada,rapieira,pistola,lancaGranada,martelo,chicote];
export {motosserra,arco,fuzil,espada,rapieira,pistola,lancaGranada,martelo,chicote,mao,guns};

//Armaduras

const roupa = new Armadura("Roupa",10,0,'N');
const casaco = new Armadura("Casaco",11,150,'L');
const couro = new Armadura("Couro Batido",12,250,'L');
const algodao = new Armadura("Roupa De Algodão",13,400,'L');
const ferro = new Armadura("Armadura De Ferro",14,500,'M');
const colete = new Armadura("Colete",15,800,'M');
const grafeno = new Armadura("Armadura De Grafeno",16,1750,'M');
const dima = new Armadura("Armadura De Diamante",16,1500,'P');
const metalGear = new Armadura("Metalgear",18,2000,'P');
const adamantium = new Armadura("Adamantium",20,2500,'P');


const armors = [casaco,couro,algodao,ferro,colete,grafeno,dima,metalGear,adamantium];
export {roupa,casaco,couro,algodao,ferro,colete,grafeno,dima,metalGear,adamantium,armors};

// NPCS

const denji = new Npc("Denji Miyazaki",12,[22,14,16,8,8,10],"M",[motosserra],[roupa]);
const simon = new Npc("Simon Newgate", 12,[14,20,16,8,14,9],"M",[arco],[roupa]);
const john_holly = new Npc("John Holly",10,[16,14,10,11,12,14],"M",[fuzil],[roupa]);


export {denji,simon,john_holly};

//Personagem TESTE
const teste = new Save("Teste",7,[10,16,16,10,10,10],"N",[mao,arco,motosserra,fuzil],[roupa]);
teste.dinheiro = 100000;

export {teste};
