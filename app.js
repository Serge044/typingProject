const arrWithTextStrings = [
  "12345",
  "1234567",
  "First",
  // "22222",
  // "33333",
  // "44444",
  // "55555",
  // "66666",
  // "77777",
  // "88888",
  // "99999",
  "Last",
];

let input1 = document.getElementById("quoteInput");

let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
2;

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
  console.log(quote);

  // look here, the answer is somewhere below))

  // hint for future: last symbol -1

  // first letter of quote
  one.classList.add("addedGreen2");

  // last letter of quote
  five.classList.remove("addedGreen2");

  window.addEventListener("keyup", function () {
    // let quote2 = "12345";
    one.classList.remove("addedGreen2");
    // for (let i = 0; i < quote.length; i++) {
    if (input1.value == quote[0]) {
      two.classList.add("addedGreen2");
      three.classList.remove("addedGreen2");
    }
    if (input1.value == quote[0] + quote[1]) {
      two.classList.remove("addedGreen2");
      three.classList.add("addedGreen2");
      four.classList.remove("addedGreen2");
    }
    if (input1.value == quote[0] + quote[1] + quote[2]) {
      three.classList.remove("addedGreen2");
      four.classList.add("addedGreen2");
      five.classList.remove("addedGreen2");
    }
    if (input1.value == quote[0] + quote[1] + quote[2] + quote[3]) {
      four.classList.remove("addedGreen2");
      five.classList.add("addedGreen2");
    }
    if (input1.value == "") {
      one.classList.add("addedGreen2");
      two.classList.remove("addedGreen2");
      three.classList.remove("addedGreen2");
    }
    if (input1.value.length >= 1 && input1.value[0] != quote[0]) {
      one.classList.add("addedGreen2");
      two.classList.remove("addedGreen2");
      three.classList.remove("addedGreen2");
    }
    // here I need to remove classList from last letter of quote
    if (input1.value == quote) {
      one.classList.remove("addedGreen2");
      two.classList.remove("addedGreen2");
      three.classList.remove("addedGreen2");
      four.classList.remove("addedGreen2");
      five.classList.remove("addedGreen2");
    }
    // }
    console.log("At least it works");
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

let currentQuoteSpans = document.getElementById("quoteDisplay");
let currentQuote = currentQuoteSpans.innerText;

// console.log(currentQuote);
// if (input1.value.length == 0) {
//   one.classList.add("addedGreen");
// } else {
//   one.classList.remove("addedGreen");
// }
// input1.addEventListener("keyup", () => {
//   if (input1.value == 1) {
//     one.classList.remove("addedGreen");
//     two.classList.add("addedGreen");
//   }
//   if (input1.value == 12) {
//     two.classList.remove("addedGreen");
//     three.classList.add("addedGreen");
//   }
//   if (input1.value == 123) {
//     three.classList.remove("addedGreen");
//     four.classList.add("addedGreen");
//   }
//   if (input1.value == 1234) {
//     four.classList.remove("addedGreen");
//     five.classList.add("addedGreen");
//   } else {
//     five.classList.remove("addedGreen");
//   }
// });

// console.log(input1.value.length);
