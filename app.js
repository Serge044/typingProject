const arrWithTextStrings = [
  "45678",
  "HELLO",
  "12345",
  "1234567",
  "First",
  "Last",
];

let input1 = document.getElementById("quoteInput");

// ----------virtual keyboard-------------

let keys = document.querySelectorAll(".keys");
let spaceKey = document.querySelector(".space_key");
let shift_left = document.querySelector(".shift_left");
let shift_rigth = document.querySelector(".shift_right");
let caps_lock_key = document.querySelector(".caps_lock_key");

for (let i = 0; i < keys.length; i++) {
  keys[i].setAttribute("keyname", keys[i].innerText);
  keys[i].setAttribute("lowerCaseName", keys[i].innerText.toLowerCase());
}

window.addEventListener("keydown", function (e) {
  for (let i = 0; i < keys.length; i++) {
    if (
      e.key == keys[i].getAttribute("keyname") ||
      e.key == keys[i].getAttribute("lowerCaseName")
    ) {
      keys[i].classList.add("active");
    }
    if (e.code == "Space") {
      spaceKey.classList.add("active");
    }
    if (e.code == "ShiftLeft") {
      shift_rigth.classList.remove("active");
    }
    if (e.code == "ShiftRight") {
      shift_left.classList.remove("active");
    }

    // fix CapsLock

    if (e.code == "CapsLock") {
      caps_lock_key.classList.toggle("active");
    }
  }
});

window.addEventListener("keyup", function (e) {
  for (let i = 0; i < keys.length; i++) {
    if (
      e.key == keys[i].getAttribute("keyname") ||
      e.key == keys[i].getAttribute("lowerCaseName")
    ) {
      keys[i].classList.remove("active");
      keys[i].classList.add("remove");
    }
    if (e.code == "Space") {
      spaceKey.classList.remove("active");
      spaceKey.classList.add("remove");
    }
    if (e.code == "ShiftLeft") {
      shift_rigth.classList.remove("active");
      shift_rigth.classList.remove("remove");
    }
    if (e.code == "ShiftRight") {
      shift_left.classList.remove("active");
      shift_left.classList.remove("remove");
    }
    setTimeout(() => {
      keys[i].classList.remove("remove");
    }, 200);
  }
});

// -----------------------------------------------

const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const counterElement = document.getElementById("counter");
let counter = -1;

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    let keys = document.querySelectorAll(".keys");
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");

      // keys[10].classList.add("active");
      // keys[i].classList.add("remove");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
      // keys[10].classList.remove("active");
    }
  });

  if (correct) renderNextQuote();
});

let phraseCounter = -1;

async function renderNextQuote() {
  phraseCounter += 1;
  if (arrWithTextStrings.length + 1 === phraseCounter + 1) {
    console.log("Final.");
    counterElement.innerText = `Congrats! You reach end of this typing project!`;

    timerElement.remove();

    // timer.innerText = "";
  }
  const quote = arrWithTextStrings[phraseCounter];
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  console.log("Current quote: " + quote);

  // think about do I need Arr or not -------------------------
  let newArr = [];
  let a = keys[20];
  console.log("Capital: ", a.getAttribute("keyname"));
  console.log("Lower: ", a.getAttribute("lowercasename"));

  // document.querySelector("[myAttribute='aValue']");
  // here --------------------------------------------------------- 139

  // // hint for future: last symbol -1

  // // first letter of quote
  if (input1.value == "") {
    for (let i = 0; i < keys.length; i++) {
      // console.log(keys[i].innerHTML);
      // or not inner HTML but smth else
      if (keys[i].innerHTML == quote[0]) {
        keys[i].classList.add("addedGreen2");
        newArr.push(keys[i].innerHTML);
        // console.log(newArr);
        // console.log(keys[i], "THIS!");
      }
    }
  }

  window.addEventListener("keyup", function () {
    if (input1.value == quote[0]) {
      for (let i = 0; i < keys.length; i++) {
        // console.log(keys[i].innerHTML);
        if (keys[i].innerHTML == quote[1]) {
          keys[i].classList.add("addedGreen2");
        }
      }
    }

    if (input1.value == quote[0] + quote[1]) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].innerHTML == quote[2]) {
          keys[i].classList.add("addedGreen2");
        }
      }
    }

    if (input1.value == quote[0] + quote[1] + quote[2]) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].innerHTML == quote[3]) {
          keys[i].classList.add("addedGreen2");
        }
      }
    }

    if (input1.value == quote[0] + quote[1] + quote[2] + quote[3]) {
      for (let i = 0; i < keys.length; i++) {
        // console.log(keys[i].innerHTML);
        if (keys[i].innerHTML == quote[4]) {
          keys[i].classList.add("addedGreen2");
          // console.log(keys[i], "THIS!");
        }
      }
    }
  });

  startTimer();
  nextLevel();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = `Time: ${getTimerTime()}`;
  }, 1000);
}

function stopTimer() {}

function nextLevel() {
  counter += 1;
  counterElement.innerText = `Level: ${counter}`;
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNextQuote();
