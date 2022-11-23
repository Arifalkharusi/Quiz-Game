const mainSec = document.querySelector(".main-sec");
const submit = document.querySelector(".submit");
const title = document.querySelector(".title");

let numQuestion = 0;
let dataMain;
let correctAnswer = 0;

let answerChoice = [];
let selectedAnswer;
let corrected;

const updateUI = function () {
  answerChoice = [];
  dataMain[numQuestion].incorrectAnswers.forEach((x) => {
    answerChoice.push(x);
  });
  answerChoice.push(dataMain[numQuestion].correctAnswer);
  answerChoice.sort(() => Math.random() - 0.5);

  title.textContent = `${dataMain[0].category}`;

  html = `<div class="question">${dataMain[numQuestion].question}</div>
        <div>
            <div class='answermain'>${answerChoice[0]}</div>
            <div class='answermain'>${answerChoice[1]}</div>
            <div class='answermain'>${answerChoice[2]}</div>
            <div class='answermain'>${answerChoice[3]}</div>
        </div>`;
  mainSec.insertAdjacentHTML("afterbegin", html);
  submit.classList.add("disable");
};

window.addEventListener("load", function () {
  fetch(
    "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=10&region=GB&difficulty=easy"
  )
    .then((res) => res.json())
    .then((data) => {
      dataMain = data;
      console.log(dataMain);
      mainMain();
    });
});

const mainMain = function () {
  submit.style.display = "none";
  updateUI();
  selectFunc();
  if (corrected) {
    correctAnswer++;
  }
};
const selectFunc = function () {
  const answerMain = document.querySelectorAll(".answermain");
  answerMain.forEach((x) => {
    x.addEventListener("click", function () {
      answerMain.forEach((x) => {
        submit.style.display = "";
        x.classList.remove("selected");
      });
      this.classList.add("selected");
      selectedAnswer = x.textContent;
      corrected = selectedAnswer === dataMain[numQuestion].correctAnswer;
      submit.classList.remove("disable");
    });
  });
};

submit.addEventListener("click", function () {
  mainSec.innerHTML = "";
  if (numQuestion < 9) {
    numQuestion++;
    mainMain();
  } else {
    this.style.display = "none";
    if (corrected) {
      correctAnswer++;
    }
    title.textContent = `You Score ${correctAnswer}/10`;
  }
});
