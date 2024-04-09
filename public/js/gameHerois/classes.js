class Personagem{
    #nick;
    #level;
    #gender;
    #CA;
    #hp;
    #money;
    #inventario;

    #forca;
    #destreza;
    #constituicao;
    #inteligencia;
    #sabedoria;
    #carisma;

    
    constructor(anick,alevel,atributos,agenero,aarma,aarmadura){
        this.#nick = anick;
        this.#level = alevel;
        this.#forca = atributos[0];
        this.#destreza = atributos[1];
        this.#constituicao = atributos[2];
        this.#inteligencia = atributos[3];
        this.#sabedoria = atributos[4];
        this.#carisma = atributos[5];
        this.#gender = agenero;
        this.#money = 100;
        this.#inventario = {
            armas : aarma,
            armaduras: aarmadura
        };
        this.#hp = this.lvl*(10 + this.modCon);
        this.#CA = this.invArmaduras[0].protecao + this.modDex;
        
    }

   //SETS
    set nome(anick){
        this.#nick = anick;
    }
    set lvl(alvl){
        this.#level = alvl;
    }
    set for(afor){
        this.#forca = aforca; 
    }
    set dex(adex){
        this.#destreza = adex;
    }
    set con(acon){
        this.#constituicao = acon; 
    }
    set int(aint){
        this.#inteligencia = aint;
    }
    set sab(asab){
        this.#sabedoria = asab; 
    }
    set car(acar){
        this.#carisma = acar;
    }
    set vida(ahp){
        this.#hp = ahp;
    }
    set inv(ainv){
        this.#inventario.armas.push(ainv);
    }
    set invArmaduras(ainv){
        this.#inventario.armaduras.push(ainv);
    }
    set dinheiro(adinheiro){
        this.#money = adinheiro;
    }

    //GETS
    get modFor(){
        return Math.floor((this.#forca-10)/2);
    }
    get modDex(){
        return Math.floor((this.#destreza-10)/2);
    }
    get modCon(){
        return Math.floor((this.#constituicao-10)/2);
    }
    get modInt(){
        return Math.floor((this.#inteligencia-10)/2);
    }
    get modSab(){
        return Math.floor((this.#sabedoria-10)/2);
    }
    get modCar(){
        return Math.floor((this.#carisma-10)/2);
    }
    get genero(){
        return this.#gender;
    }
    get armor(){
        switch(this.invArmaduras[0].type){
            case 'N':
                return this.invArmaduras[0].protecao + this.modDex;
                break;
            case 'L':
                return this.invArmaduras[0].protecao + this.modDex;
                break;
            case 'M':
                if(this.modDex >=2 ) return this.invArmaduras[0].protecao + 2;
                return this.invArmaduras[0].protecao + this.modDex;
                break;
            case 'P':
                return this.invArmaduras[0].protecao;
                break;
            default:
                return this.invArmaduras[0].protecao + this.modDex;
                break;
        }      
    }
    get vida(){
        return this.#hp;
    }
    get inv(){
        return this.#inventario.armas;
    }
    get invArmaduras(){
        return this.#inventario.armaduras;
    }
    get dinheiro(){
        return this.#money;
    }
    get nome(){
        return this.#nick;
    }
    get lvl(){
        return this.#level;
    }

    //Metodos
    DT(atribute){
        switch(atribute){
            case "For":
                return 8 + this.modFor + Math.floor(this.lvl / 2 );
                break;
            case "Dex":
                return 8 + this.modDex + Math.floor(this.lvl / 2 );
                break;
            case "Con":
                return 8 + this.modCon + Math.floor(this.lvl / 2 );
                break;
            case "Int":
                return 8 + this.modInt + Math.floor(this.lvl / 2 );
                break;
            case "Sab":
                return 8 + this.modSab + Math.floor(this.lvl / 2 );
                break;       
            case "Car":
                return 8 + this.modCar + Math.floor(this.lvl / 2 );
                break;
        }
    }
    roll(atribute){
        let dado = Math.floor(Math.random() * (20)) + 1;
        console.log(dado);
        switch(atribute){
            case "For":
                return  dado + this.modFor + Math.floor(this.lvl / 2 );
                break;
            case "Dex":
                return dado + this.modDex + Math.floor(this.lvl / 2 );
                break;
            case "Con":
                return dado + this.modCon + Math.floor(this.lvl / 2 );
                break;
            case "Int":
                return dado + this.modInt + Math.floor(this.lvl / 2 );
                break;
            case "Sab":
                return dado + this.modSab + Math.floor(this.lvl / 2 );
                break;       
            case "Car":
                return dado+ this.modCar + Math.floor(this.lvl / 2 );
                break;
        }
    }
    getMod(modificador){
        switch(modificador){
            case"For":
                return this.modFor;
            case"Dex":
                return this.modDex;
            case"Con":
                return this.modCon;
            case"Int":
                return this.modInt;
            case"Sab":
                return this.modSab;
            case"Car":
                return this.modCar;
        }

    }
    
    bater(indexItem){
        return this.inv[indexItem].rollDamage() + this.getMod(this.inv[indexItem].attribute);
    }
    upar(level){
        this.lvl += level;
    }
    heal(value){
        this.vida += value;
        if(this.vida >=  this.lvl*(10 + this.modCon)) this.vida = this.lvl*(10 + this.modCon);
    }
}
class Arma{

    #nome;
    #dano;
    #valor;
    #atributo;

    constructor(anome,adano,avalor,aatributo){
        this.#nome = anome;
        this.#dano = adano;
        this.#valor = avalor;
        this.#atributo = aatributo;
    }
    get type(){
        return this.#nome;
    }
    set type(atipo){
        this.#nome = atipo;
    }

    get damage(){
        return this.#dano;
    }
    set damage(adano){
        this.#dano = adano;
    }

    get value(){
        return this.#valor;
    }
    set value(avalor){
        this.#valor = avalor;
    }

    get attribute(){
        return this.#atributo;
    }
    set attribute(aatributo){
        this.#atributo = aatributo;
    }

    rollDamage(){
        let daninho = this.damage.split("d");
        let roll = 0;
        for(let i = 0; i < daninho[0];i++){
            roll += dado(daninho[1]);
        }
        return roll;
    }
    toString(){
        return `${this.type} | ${this.damage} | ${this.value} | ${this.attribute}`;
    }
}
class Armadura{
    #nome;
    #protection;
    #valor;
    #tipo
    constructor(anome,aprotection,avalor,atipo){
        this.#nome = anome;
        this.#protection = aprotection;
        this.#valor = avalor;
        this.#tipo = atipo;
    }
    get name(){
        return this.#nome;
    }
    set name(anome){
        this.#nome = anome;
    }
    get protecao(){
        return this.#protection;
    }
    set protecao(aprotection){
        this.#protection = aprotection;
    }
    get value(){
        return this.#valor;
    }
    set value(avalue){
        this.#valor = avalue;
    }
    set type(atipo){
        this.#tipo = atipo
    }
    get type(){
        return this.#tipo;
    }

    toString(){
        return `${this.name} | ${this.protecao} | ${this.value} | ${this.type}`;
    }

}
class Npc extends Personagem{
    #reputacao
    constructor(anick,alevel,atributos,agenero,aarma,aarmadura){
        super(anick,alevel,atributos,agenero,aarma,aarmadura);
        this.#reputacao =  50;
    }
    get reputation(){
        return this.#reputacao;
    }
    set reputation(rep){
        this.#reputacao += rep;
        if(this.#reputacao >= 100)this.#reputacao = 100;
        if(this.#reputacao <= 0)this.#reputacao = 0;
    }   

}
class Save extends Personagem{
    #progresso
    constructor(anick,alevel,atributos,agenero,aarma,aarmadura){
        super(anick,alevel,atributos,agenero,aarma,aarmadura);
        this.#progresso = [];
    }
    get progress(){
        return this.#progresso;
    }
    set progress(npc){
        this.#progresso.push(npc);
    }
}

export {Personagem,Arma,Save,Npc,Armadura};

function dado(max) {
    return Math.floor(Math.random() * (max)) + 1;
}