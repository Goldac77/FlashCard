const url = `https://opentdb.com/api.php?amount=1&type=multiple`;
const cardNum = document.querySelector("#card_no");
const shuffleBtn = document.querySelector("#shuffle");
const resetBtn = document.querySelector("#reset");
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const question = document.querySelector("#question");
const result = document.querySelector("#result");
const option1 = document.querySelector("#ans_option1");
const option2 = document.querySelector("#ans_option2");
const option3 = document.querySelector("#ans_option3");
const option4 = document.querySelector("#ans_option4");
const optionList = [option1, option2, option3, option4];
const skipBtn = document.querySelector("#skip_btn");
const nextBtn = document.querySelector("#next_btn");
const scoreBoard = document.querySelector("#score");
let scoreValue = 0;
let card = 1;

//request API data when page loads
window.onload = requestApiData();

//keep the next button disabled until first selection
nextBtn.disabled = true;

//function to resuqest API data
async function requestApiData() {
    let response = await fetch(url);
    let data = await response.json(); 
    useApiData(data)
}

//function(s) to manipulate API data
function useApiData(data) {
    let correctAnswer = data.results[0].correct_answer;
    let asnwersList = data.results[0].incorrect_answers;
    let index = Math.floor(Math.random() * asnwersList.length)
    //randomly place the correct answer in answersList
    asnwersList.splice(index, 0, correctAnswer);

    //displaying the data
    category.innerHTML = data.results[0].category;
    question.innerHTML = data.results[0].question;
    option1.innerHTML = asnwersList[0];
    option2.innerHTML = asnwersList[1];
    option3.innerHTML = asnwersList[2];
    option4.innerHTML = asnwersList[3];

    //saves, and restores the score value on page refresh
    if(sessionStorage.getItem("Scores")){
        scoreBoard.innerHTML = `Score: ${sessionStorage.getItem("Scores")}`
        scoreValue = sessionStorage.getItem("Scores")
    } else {
        sessionStorage.setItem("Scores", scoreValue)
        scoreBoard.innerHTML = `Score: ${sessionStorage.getItem("Scores", scoreValue)}`
    }

    //saves, and restores the card number on page refresh
    if(sessionStorage.getItem("Card No.")){
        card = sessionStorage.getItem("Card No.")
        cardNum.innerHTML = `${card}/20`;
    } else {
        sessionStorage.setItem("Card No.", card);
        cardNum.innerHTML = `${card}/20`;
    }


    //check if the correct answer is selected
    function checkAnswer(data) {
        optionList.forEach(option => {
            option.addEventListener("click", function(){
                if(option.innerHTML == correctAnswer){
                    option.style.backgroundColor = "#1C9E48";
                    result.innerHTML = "That's Correct";
                    skipBtn.disabled = true;
                    result.style.color = "#1C9E48";
                    //increase the score value
                    scoreValue++;
                    sessionStorage.setItem("Scores", scoreValue);
                    scoreBoard.innerHTML = `Score: ${sessionStorage.getItem("Scores")}`

                } else {
                    optionList.forEach(x => {
                        if (x.innerHTML == correctAnswer) {
                            x.style.backgroundColor = "#1C9E48"; // Correct answer is green
                        } else {
                            x.style.backgroundColor = "#DD1C5E"; // Incorrect answers are red
                        }
                    });
                    result.innerHTML = "That's Wrong"
                    skipBtn.disabled = true;
                    result.style.color = "#DD1C5E";
                }

                //disable all buttons after first selection
                optionList.forEach(x => {
                    x.disabled = true;
                })
                //enable next button after first selection
                nextBtn.disabled = false;
            })
        });
    }
    checkAnswer();
}

//reload the page
function reloadPage(){
    return location.reload()
}

//increase card number value, and refersh page on skip/next is clicked
skipBtn.addEventListener("click", function(){
    card++;
    reloadPage();
    sessionStorage.setItem("Card No.", card);
    showResuls();
});
nextBtn.addEventListener("click", function(){
    card++;
    reloadPage();
    sessionStorage.setItem("Card No.", card);
    showResuls();
});

//reset the card number after 20 questions
function showResuls(){
    if(card == 21){
        window.open("results.html", "_self");
    }
}

//shuffle button; reload the page to show a new question
shuffleBtn.addEventListener("click", function(){
    reloadPage();
})

//reset button; clear all data and reload page
resetBtn.addEventListener("click", function(){
    sessionStorage.clear();
    reloadPage();
})