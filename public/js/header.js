const navArray = document.querySelectorAll("#navbar ul li a");
const navDDArray = document.querySelectorAll('#navbar ul li[id^="dropdown"]');
const navOpen = document.querySelector('.navOpen');
const dropBtnArray = document.querySelectorAll('#navbar ul > li > a[class^="dropbtn"]')

// MARCAR PAGINA ATUAL NA NAVBAR
export function navSelect(url){
    navArray.forEach((nav) => {
        if(nav.href==navArray[0]+url){
            nav.style.backgroundColor="#820101"
            nav.style.fontWeight="500"
        }
    })
    navDDArray.forEach((DD) => {
        const aDDArray = document.querySelectorAll(`#navbar #${DD.id} div a`);
        const primeiroA = document.querySelector(`#navbar #${DD.id} > a`);
        aDDArray.forEach((anchor)=>{
            if(anchor.href==navArray[0]+url){
                primeiroA.style.backgroundColor="#820101"
            }
        })
    })
}

// NAVBAR NO MOBILE
function openNavbar(){
    const navbar = document.querySelector('#navbar');
    if (navbar.style.display === "block") {
      navbar.style.display = "none";
    } else {
        navbar.style.display = "block";
    }
}
navOpen.onclick = openNavbar;
navDDArray.forEach((DD)=>{
    const ddBtn = document.querySelector(`#navbar #${DD.id} > a`);
    const ddCChild = document.querySelectorAll(`#navbar #${DD.id} [class^="dropdown-content"]`);
    ddBtn.onclick = () => {
        if(ddCChild[0].style.display === "block"){
            ddCChild.forEach((childDD)=>{
                childDD.style.display = "none"
            })
            
        } else {
            ddCChild[0].style.display = "block"
        }
        
    }
})



// MOSTRAR SENHA
const mostrarSenha = document.querySelector("#mostrarSenha");
const mostrarSenhaImg = document.querySelector("#mostrarSenha img");
mostrarSenha.onclick = ()=>{
    if(inputSenha.type =="text"){
        inputSenha.type ="password";
        mostrarSenhaImg.src="/imgs/olhoNormal.png";
    }else{
        inputSenha.type ="text";
        mostrarSenhaImg.src="/imgs/olhoCortado.png";
    }
};





// TELA DE LOGIN SLA

//const { ler_json, escrever_json } = require('./app.js');
    // Seu código JavaScript aqui

    const inputUsuario = document.querySelector("#inputUsuario");
    const inputSenha = document.querySelector("#inputSenha");
    const butao_entrar = document.querySelector("#entrar");
    const mensagem = document.querySelector("#mensagem");
    const inputs = document.querySelector("#inputs");
    const logout = document.querySelector("#logout");
    const nome = document.querySelectorAll(".nome");
    const butao_sair =document.querySelector("#logout-button");
    const imagem_token = document.querySelectorAll(".tokens");
    const imagem_perfil = document.querySelector("#login img");
    
    const tokens_button = document.querySelectorAll("#imagem-perfil button");
    
    const token_0 = document.querySelector("#token_0");
    const token_1 = document.querySelector("#token_1");
    const token_2 = document.querySelector("#token_2");
    const token_3 = document.querySelector("#token_3");
    const json = document.querySelector("#login-json");
    
    
    const tokens = [token_0,token_1,token_2,token_3];
    
    let logado = false;
    let nick;
    
    
    const login_imagem = document.querySelector('#login');
    const login_tela = document.querySelector('#tela-login');
    const estamos_dentro = document.querySelector('#estamos-dentro');
    function abrir_login(){
        if(login_tela.style.display == "block"){
            login_tela.style.display = "none";
        }else{
            login_tela.style.display = "block";
        }
        inputUsuario.value = "";
        inputSenha.value = "";
    }
    
    login_imagem.onclick = abrir_login;
    
    
    function clica_entrar() {
    
        
    }
    
    butao_entrar.onclick = clica_entrar;
    
    
    function clica_sair(){
       
    }
    butao_sair.onclick = clica_sair;
    
    
    tokens.forEach(token =>{
       
    })
    
    const mudar_senha_butao = document.querySelector("#change-password");
    
    
    const mudar_senha_display = document.querySelector("#mudar_senha");

    function abrir_mudar_senha(){
        logout.style.display = "none";
        mudar_senha_display.style.display = "block";
    }
    mudar_senha_butao.onclick = abrir_mudar_senha;
    
    const mudarSenha = document.querySelector("#mudarSenha");
    const mudar_senha1 = document.querySelector("#mudarSenha1");
    const mudar_senha2 = document.querySelector("#mudarSenha2");
    function mudar_senha(){
       
    }
    mudarSenha.onclick = mudar_senha;
    const registro_display = document.querySelector("#register");
    
    
    const registro_display_butao = document.querySelector("#registro-display");
   
    
    const registrar_butao = document.querySelector("#registrar");
    const registrar_usuario = document.querySelector("#registerUsuario");
    const registrar_senha1 = document.querySelector("#registerSenha1");
    const registrar_senha2 = document.querySelector("#registerSenha2");

