let css = document.querySelector(".CSS");
let js = document.querySelector(".JS");
let output = document.querySelector(".body");
let resizer = document.querySelectorAll(".resizer");
let navbar = document.querySelector(".navbar");
for (let i = 0; i<resizer.length; i++) {
    resizer[i].style.height = window.innerHeight/2.3+"px";
}
// js.style.height = window.innerHeight/2.3+"px";
// js.style.height = window.innerHeight/2.3+"px";

output.style.height = (window.innerHeight - resizer[1].offsetHeight - navbar.offsetHeight)+"px";
console.log(resizer[1].offsetHeight+"px");