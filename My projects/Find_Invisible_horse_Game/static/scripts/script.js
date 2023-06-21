// Store the path of svg files of horses:
const horses = []
for (let i = 1; i <= 4; i++) {
  horses[i - 1] = `../static/images/horse${i}.svg`;
}

// Store the neighing noise of the horses:
const noises = [];
for (let i = 1; i <= 2; i++) {
  noises[i - 1] = `../Noises/neigh${i}.wav`;
}
const getTries = document.querySelector(".tries");
let tries;
// Store the length noise of the horse (closest to farest steps):
// length0 being the closeset and length3 being the farest
const lengthNoises = ["../Noises/length0.mp3", "../Noises/length1.wav", "../Noises/length2.wav", "../Noises/length3.wav", "../Noises/length4.wav"];

let ground;
let saddleC;
let horse;
let noise;
let foundHorse = false;
// Horse Details will be stored in these:
let horseX, horseY;
let height, width;

// Window:
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

if (document.body.contains(document.querySelector(".ground"))) {
  ground = document.querySelector(".ground");
  addEventListener("load", SelectHorse);
  saddleC = document.createElement("img");
  ground.appendChild(saddleC);
  ground.addEventListener("mousemove", saddleCursorQ);
  ground.addEventListener("mousedown", noisePerLength);
  if (document.body.contains(document.querySelector(".medium .ground"))) {
    getTries.innerHTML = 7;
  }
  else if (document.body.contains(document.querySelector(".hard .ground"))) {
    getTries.innerHTML = 5;
  }
  else if (document.body.contains(document.querySelector(".horseMaster .ground"))) {
    getTries.innerHTML = 3;
  }
}
else {
  ground = document.querySelector(".lobby");
  addEventListener("click", Neigh);
}

// Select random horse:
function SelectHorse() {
  // Create an image:
  horse = document.createElement("img");
  horse.id = "horse";
  horse.className= "img-responsive"
  // Chooses a random horse:
  let selHorse = horses[Math.round(Math.random() * (horses.length - 1))];
  // Give the random source:
  horse.src = selHorse;
  // Append horse to the ground:
  document.body.appendChild(horse);
  placeHorse();
  // Change the cursor to add saddle:
  horse.addEventListener('mousemove', saddleCursorA);
}

function Neigh() {
  var neigh1 = new Audio("./Noises/neigh1.wav");
  neigh1.play();
  var neigh2 = new Audio("./Noises/neigh2.wav");
  setTimeout(() => neigh2.play(), 2000);
}

const mouseX = (event) => event.clientX;
const mouseY = (event) => event.clientY;

function saddleCursorQ(e) {
  const mouse = {
    x: mouseX(e),
    y: mouseY(e)
  }
  saddleC.style.width = "35px";
  saddleC.style.height = "35px";
  saddleC.src = "../static/images/SaddleQuestion.png";
  saddleC.style.position = "absolute";
  saddleC.style.zIndex = "0";
  saddleC.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
}

function saddleCursorA(e) {
  const mouse = {
    x: mouseX(e),
    y: mouseY(e)
  }
  saddleC.style.width = "35px";
  saddleC.style.height = "35px";
  saddleC.src = "../static/images/SaddleAdd.png";
  saddleC.style.position = "absolute";
  saddleC.style.zIndex = "3";
  if (document.body.contains(document.querySelector(".horseMaster .ground"))) {
    saddleC.style.zIndex = "2";
    saddleC.src = "../static/images/SaddleQuestion.png";
  }
  saddleC.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
}

function placeHorse() {
  // Horse:
  height = horse.offsetHeight;
  width = horse.offsetWidth;
  // Max X, Y position coordinates the horse can be placed.
  let max_X = wWidth - width;
  let max_Y = wHeight - height;

  // placing horse randomly on the screen perfectly:
  horseX = Math.round(Math.random() * max_X);
  horseY = Math.round(Math.random() * max_Y);

  horse.style.left = horseX + "px";
  horse.style.top = horseY + "px";
  console.log(`Window width:${wWidth}; height:${wHeight}`);
  console.log(`Horse is place at x:${horseX}; and y:${horseY};`);

  // Adding modal activating attributes and onclick neighing event:
  horse.setAttribute("data-bs-toggle", "modal");
  horse.setAttribute("data-bs-target", "#horseFound");

  horse.onclick = horseFound;
}

function horseFound() {
  horse.style.opacity = "1";
  console.log("Horse found!");
  foundHorse = true;
  let noise = noises[Math.round(Math.random() * (noises.length))];
  var neigh = new Audio(noise);
  neigh.play();
}

function noisePerLength(e) {
  // For finding the super close position
  let seventhHeight = Math.round(wHeight / 7);
  let seventhWidth = Math.round(wWidth / 7);

  // For finding the closest position
  let fifthHeight = Math.round(wHeight / 5);
  let fifthWidth = Math.round(wWidth / 5);

  // For finding the closer position
  let fourthHeight = Math.round(wHeight / 4);
  let fourthWidth = Math.round(wWidth / 4);

  // For finding the close position:
  let thirdHeight = Math.round(wHeight / 3);
  let thirdWidth = Math.round(wWidth / 3);

  // For finding the far position:
  let halfHeight = Math.round(wHeight / 2);
  let halfWidth = Math.round(wWidth / 2);

  // For finding the farest position:
  let oneHalfHeight = Math.round(wHeight / 1.5);
  let oneHalfWidth = Math.round(wWidth / 1.5);
  
  if(!document.body.contains(document.querySelector(".easy .ground"))){
    if (!foundHorse) {
      getTries.innerHTML = getTries.innerHTML - 1;
      if (getTries.innerHTML == 0) {
        document.getElementById("horseNotFound").className += " show";
        let defeat = new Audio("../Noises/horse-eating-carrot.mp3")
        defeat.play();
      }
    }
  }
  //$ If the position of mouse pointer is at the farest side from the horse it can be right or left:
  var noise;
  if (mouseX(e) >= horseX + oneHalfWidth + width
    || mouseY(e) >= horseY + oneHalfHeight + height) {
    noise = lengthNoises[4];
    setInterval(play(noise), 1000)
  }
  else if (mouseX(e) <= horseX - oneHalfWidth
    || mouseY(e) <= horseY - oneHalfHeight) {
    setInterval(play(noise), 1000)
  }
  else {
    //$ Finding the far side
    if (mouseX(e) >= horseX + halfWidth + width
      || mouseY(e) >= horseY + halfHeight + height) {
      noise = lengthNoises[4];
      setInterval(play(noise), 1000)
    }
    else if (mouseX(e) <= horseX - halfWidth
      || mouseY(e) <= horseY - halfHeight) {
      setInterval(play(noise), 1000)
    }
    else {
      //$ Finding the close side
      if (mouseX(e) >= horseX + thirdWidth + width
        || mouseY(e) >= horseY + thirdHeight + height) {
        noise = lengthNoises[3];
        setInterval(play(noise), 1000)
      }
      else if (mouseX(e) <= horseX - thirdWidth
        || mouseY(e) <= horseY - thirdHeight) {
        setInterval(play(noise), 1000)
      }
      else {
        //$ Finding the closer side

        if (mouseX(e) >= horseX + fourthWidth + width
          || mouseY(e) >= horseY + fourthHeight + height) {
          noise = lengthNoises[2];
          setInterval(play(noise), 1000)
        }
        else if (mouseX(e) <= horseX - fourthWidth
          || mouseY(e) <= horseY - fourthHeight) {
          setInterval(play(noise), 1000)
        }
        else {
          //$ Finding the closest side

          if (mouseX(e) >= horseX + fifthWidth + width
            || mouseY(e) >= horseY + fifthHeight + height) {
            noise = lengthNoises[1];
            setInterval(play(noise), 1000)
          }
          else if (mouseX(e) <= horseX - fifthWidth
            || mouseY(e) <= horseY - fifthHeight) {
            setInterval(play(noise), 1000)
          }
          else {
            //$ Finding the super close side
            if (mouseX(e) >= horseX + seventhWidth
              || mouseY(e) >= horseY + seventhHeight) {
              noise = lengthNoises[0];
              setInterval(play(noise), 1000)
            }
            else if (mouseX(e) <= horseX - seventhWidth
              || mouseY(e) <= horseY - seventhHeight) {
              setInterval(play(noise), 1000)
            }
          }
        }
      }
    }
  }

}

function play(src) {
  var noise = new Audio(src)
  if (src != undefined) {
    noise.play();
    setTimeout(() => noise.pause(), 2000)
  }
  else {
    location.reload()
  }

}