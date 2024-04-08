const navArray = document.querySelectorAll("#navbar ul li a");

export function navSelect(url){
    navArray.forEach((nav) => {
        console.log(nav.href)
        if(nav.href==navArray[0]+url){
            nav.style.backgroundColor="#820101"
        }
    })
}
const loginArea = document.querySelector("#loginArea");
const loginButton = document.querySelector("#loginAbrir");


loginButton.onclick = () =>{
    if(loginArea.style.display == "flex"){
        loginArea.style.display = "none";
    }else{
        loginArea.style.display = "flex";
        
    }
    
}
