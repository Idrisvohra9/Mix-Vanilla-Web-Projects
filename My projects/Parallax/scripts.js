const tentacles = document.querySelector(".tentacles");
const turtle = document.querySelector(".turtle");
const heading = document.querySelector(".heading");
const fishes = document.querySelector(".fishes");
const explore = document.querySelector(".button");

heading.style.left = ((window.innerWidth / 2) - (heading.offsetWidth / 2)) + "px";
explore.style.left = ((window.innerWidth / 2) - (explore.offsetWidth / 2)) + "px";

addEventListener("scroll", () => {
    let value = window.scrollY;

    tentacles.style.left = 0 - value + 'px';
    heading.style.top = 240 - value + 'px';
    turtle.style.top = 60 - value + 'px';
    turtle.style.right = 210 - value + 'px';
});
explore.addEventListener("click", smoothScroll)


function smoothScroll() {
    let i = 0;
    let scroll = setInterval(() => {
        i++;
        window.scrollTo(0, i)
    }, 1);
    console.log("out");
    if (i == window.innerHeight- 10) {
        clearInterval(scroll);
        console.log("Interval cleared");
        explore.removeEventListener("click",smoothScroll);
    }
}