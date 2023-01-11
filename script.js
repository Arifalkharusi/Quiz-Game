// DOM secletor
const mainSec = document.querySelector(".main-sec");
const submit = document.querySelector(".submit");
const title = document.querySelector(".title");
const playAgain = document.querySelector(".restart");
// stores number of question
let numQuestion = 0;
// stores data we get from API
let dataMain;
// keeps count of the correct answers
let correctAnswer = 0;
// hold the answers
let answerChoice = [];
// stores the selected asnwer
let selectedAnswer;
// returns boolean to see if the selelced answer is correct
let corrected;
// updates UI
const updateUI = function () {
  answerChoice = [];
  // pushes each answer to the array
  dataMain[numQuestion].incorrectAnswers.forEach((x) => {
    answerChoice.push(x);
  });
  answerChoice.push(dataMain[numQuestion].correctAnswer);
  // mixes the answers randomly
  answerChoice.sort(() => Math.random() - 0.5);
  // category title
  title.textContent = `${dataMain[0].category}`;
  // html snipet of the question and asnwers
  html = `<div class="question">${dataMain[numQuestion].question}</div>
        <div>
            <div class='answermain'>${answerChoice[0]}</div>
            <div class='answermain'>${answerChoice[1]}</div>
            <div class='answermain'>${answerChoice[2]}</div>
            <div class='answermain'>${answerChoice[3]}</div>
        </div>`;
  // pushes the snipet to the DOM
  mainSec.insertAdjacentHTML("afterbegin", html);
  // reveals the submit button
  submit.classList.add("disable");
};
// on load
window.addEventListener("load", function () {
  // fetch data
  fetch(
    "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=10&region=GB&difficulty=easy"
  )
    .then((res) => res.json())
    .then((data) => {
      // send data recieved from an API to the main data array
      dataMain = data;
      mainMain();
    });
});
// calls other functions
const mainMain = function () {
  // removes the submit button
  submit.style.display = "none";
  updateUI();
  selectFunc();
  // counts the correct answers
  if (corrected) {
    correctAnswer++;
  }
};
// click event
const selectFunc = function () {
  const answerMain = document.querySelectorAll(".answermain");
  answerMain.forEach((x) => {
    x.addEventListener("click", function () {
      // removes the slelected style on each answer
      answerMain.forEach((x) => {
        submit.style.display = "";
        x.classList.remove("selected");
      });
      this.classList.add("selected");
      // stores the selected answer
      selectedAnswer = x.textContent;
      // compares the seleced answer with correct answer
      corrected = selectedAnswer === dataMain[numQuestion].correctAnswer;
    });
  });
};
// sumbit click event
submit.addEventListener("click", function () {
  // clears the prevous question and answers
  mainSec.innerHTML = "";
  if (numQuestion < 9) {
    numQuestion++;
    mainMain();
  } else {
    this.style.display = "none";
    if (corrected) {
      correctAnswer++;
    }
    // displays the score
    title.textContent = `You Scored ${correctAnswer}/10`;
    // reveals the playAgain button
    playAgain.style.display = "block";
  }
});
// playAgain click event
playAgain.addEventListener("click", function () {
  // reloads
  window.location.reload();
});
