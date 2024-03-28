import * as QuestionSets from "./questions.js";

/*const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("selectedBusiness");*/
const selectedCategory = sessionStorage.getItem('selectedBusiness');
console.log(selectedCategory);
console.log(selectedCategory);

let playerAnswers = [];

let Questions;

switch (selectedCategory) {
  case "Cars":
    Questions = QuestionSets.CarQuestions;
    console.log(selectedCategory);
    break;
  case "Hotel":
    Questions = QuestionSets.HotelQuestions;
    break;
  case "Eshop":
    Questions = QuestionSets.EshopQuestions;
    break;
  case "Hospital":
    Questions = QuestionSets.HospitalQuestions;
    break;
  default:
    console.error("Unknown category:", selectedCategory);
}

let questionIndex = 0;
let score = 0;

const header = document.querySelector(".questionHeader");
const question = document.querySelector(".question");
const options = document.querySelector(".answers");

const image = document.querySelector("img");
image.src = `./assets/illustrations/${selectedCategory}2.svg`;


const button = document.querySelector(".nextQuestion");

const greenColor = "#1BB655";
const redColor = "#FF3131";
const pinkColor = "#f13ea7";

function loadQues() {
  header.innerText = `Klausimas nr. ${questionIndex + 1}`;
  question.textContent = Questions[questionIndex].q;
  options.innerHTML = "";

  for (let i = 0; i < Questions[questionIndex].a.length; i++) {
    const answer = document.createElement("button");
    answer.classList.add("answer");
    answer.innerText = Questions[questionIndex].a[i].text;
    answer.addEventListener("click", evaluateAnswer);
    options.appendChild(answer);
  }
}

function evaluateAnswer(userSelection) {
  const selectedAnswer = userSelection.target;
  const question = Questions[questionIndex];
  const correctAnswer = question.a.find(answer => answer.isCorrect);
  let isCorrect = false;

  if (selectedAnswer.innerText === correctAnswer.text) {
      isCorrect = true;
      score++; // Increment the score if the answer is correct
  }

  // Store the question and answer details in the playerAnswers array using the questionIndex as an identifier
  playerAnswers.push({
      questionIndex: questionIndex, // Use the index as a unique identifier for each question
      questionText: question.q, // The text of the question
      selectedAnswer: selectedAnswer.innerText, // The text of the player's selected answer
      isCorrect: isCorrect // Whether the player's answer was correct
  });

  displayAnswers(selectedAnswer, isCorrect);
  revealNextButton();
}

function revealNextButton() {
  button.style.opacity = 100;
}

function hideNextButton() {
  button.style.opacity = 0;
}

function nextQuestion() {
  button.disabled = true;
  button.style.cursor = "default";
  hideNextButton();
  if (questionIndex < Questions.length - 1) {
    questionIndex++;
    loadQues();
  } else {
    header.remove();
    question.remove();
    options.remove();
    loadResults();
  }
}

window.nextQuestion = nextQuestion;

const modal = document.querySelector("dialog");
const closeButton = document.querySelector("[data-close-modal]");

closeButton.addEventListener("click", () => {
  modal.close();
  modal.removeAttribute("class");
});

function displayAnswers(selectedButton, isCorrect) {
  if (isCorrect) {
    selectedButton.style.backgroundColor = greenColor;
    modal.classList.add("correct");
  } else {
    selectedButton.style.backgroundColor = redColor;
    modal.classList.add("false");
  }
  loadExplanation(selectedButton, isCorrect);
  modal.showModal();

  const answerButtons = options.querySelectorAll(".answer");
  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  button.disabled = false;
  button.style.cursor = "pointer";
}

function loadResults() {
  // Retrieve demographic data from localStorage
  const demographicsData = JSON.parse(localStorage.getItem('demographicsData')) || {};

  // Now demographicsData.age, demographicsData.gender, etc., are available to use.
  
  const resultsData = {
      // Assuming demographicsData is flat and matches Google Sheet's columns
      ...demographicsData,
      // Other properties to be included with each answer
      answers: playerAnswers.map(answer => ({
          questionText: answer.questionText,
          selectedAnswer: answer.selectedAnswer,
          isCorrect: answer.isCorrect
      })),
      finalScore: score
  };
  

  // Submit the combined data to Google Sheets
  fetch('https://script.google.com/macros/s/AKfycbxl2kqG8lXmdRbnPwlCJbxTQYUzcIAlYO49-VOGWP-jd4oVSp2kdfEnHAhLxhKj4jCrAw/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultsData)
  })
  .then(() => console.log('Data successfully sent to Google Sheets', resultsData))
  .catch(error => console.error('Error sending data:', error));

    const htmlBlock = document.querySelector(".questionBlock");
    const resultHeader = document.createElement("h1");
    resultHeader.classList.add("mainText");
  
    const message = document.createElement("p");
    message.classList.add("message");
  
    const results = document.createElement("h1");
    results.classList.add("mainText");
    results.innerText = `${score} / ${Questions.length}`;
  
    if (score < Questions.length / 2) {
      resultHeader.innerText = "Gaila, bet nepavyko";
      resultHeader.style.color = redColor;
  
      message.innerText =
        "Tau dar trūksta žinių dirbtinio intelekto sferoje. Galbūt norėtum išbandyti savo žinias iš naujo?";
      results.style.color = redColor;
    } else {
      resultHeader.innerText = "Sveikiname!";
      resultHeader.style.color = greenColor;
      message.innerText =
        "Tu įrodei, jog turi geras žinias apie dirbtinio intelekto taikymą verslo procesuose. Jeigu nori, gali žaidimą sužaisti dar kartą";
      results.style.color = greenColor;
    }
  
    const exitButtons = document.createElement("div");
    exitButtons.classList.add("exitButtons");
  
    const restartLink = document.createElement("a");
    const restartButton = document.createElement("button");
    const homeLink = document.createElement("a");
    const homeButton = document.createElement("button");
  
    restartLink.href = "select.html";
    homeLink.href = "index.html";
  
    restartButton.classList.add("basicButton", "smallerButtons");
    homeButton.classList.add("basicButton", "smallerButtons");
  
    restartButton.style.backgroundColor = redColor;
    homeButton.style.backgroundColor = pinkColor;
  
    restartButton.innerText = "Žaisti dar kartą";
    homeButton.innerText = "Grįžti atgal";
  
    restartLink.appendChild(restartButton);
    exitButtons.appendChild(restartLink);
  
    homeLink.appendChild(homeButton);
    exitButtons.appendChild(homeLink);
  
    htmlBlock.appendChild(resultHeader);
    htmlBlock.appendChild(message);
    htmlBlock.appendChild(results);
    htmlBlock.appendChild(exitButtons);
  }
  

function loadExplanation(selectedAnswer, isCorrect) {
  const header = document.querySelector("dialog h1");
  const explanation = document.querySelector("dialog p");

  header.innerHTML = isCorrect ? "Teisingai!" : "Neteisingai";

  const selectedQuestion = Questions[questionIndex];
  const selectedAnswerData = selectedQuestion.a.find(
    (answer) => answer.text === selectedAnswer.innerText
  );

  explanation.innerHTML = selectedAnswerData
    ? selectedAnswerData.explanation || "No explanation available"
    : "No explanation available";
}

loadQues();
