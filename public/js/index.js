import { navSelect } from "./header.js";
navSelect("");

const campanhas = document.querySelectorAll("#campanhas li");

campanhas.forEach((element,index) =>{
    element.onmouseover = () => {
        
        campanhas.forEach((resto) =>{
            resto.style.width = `${ (100-(100/campanhas.length)*2)/(campanhas.length-1)}%`;
        })
        campanhas[index].style.width = `${(100/campanhas.length)*2}%`;
        campanhas[index].style.filter = "brightness(1) blur(0)";
    }
    element.onmouseout = () =>{
        campanhas.forEach((todos) =>{
            todos.style.width = `${100/campanhas.length}%`;
        })
        campanhas[index].style.filter = "brightness(0.5) blur(1px)";
    }
})