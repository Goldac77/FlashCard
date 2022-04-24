const url = `https://opentdb.com/api.php?amount=1&type=multiple`;
let question = document.querySelector("#question");
let result = document.querySelector("#result");
let option1 = document.querySelector("#ans_option1");
let option2 = document.querySelector("#ans_option2");
let option3 = document.querySelector("#ans_option3");
let option4 = document.querySelector("#ans_option4");
let optionList = [option1, option2, option3, option4];

//request API data when page loads
window.onload = requestApiData();

//function to resuqest API data
async function requestApiData() {
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    console.log(data);  
    useApiData(data)
}

//function(s) to manipulate API data
function useApiData(data) {
    let correctAnswer = data.results[0].correct_answer;
    let asnwersList = data.results[0].incorrect_answers;
    let index = Math.floor(Math.random() * asnwersList.length)
    //randomly place the correct answer in answersList
    asnwersList.splice(index, 0, correctAnswer);
    console.log(asnwersList)

    //displaying the data
    question.innerHTML = data.results[0].question;
    option1.innerHTML = asnwersList[0];
    option2.innerHTML = asnwersList[1];
    option3.innerHTML = asnwersList[2];
    option4.innerHTML = asnwersList[3];

    //check if the correct answer is selected
    function checkAnswer(data) {
        optionList.forEach(option => {
            option.addEventListener("click", function(){
                if(option.innerHTML == correctAnswer){
                   result.innerHTML = "That's Correct" 
                } else {
                    result.innerHTML = "That's Wrong"
                }
            })
        });
    }
    checkAnswer();
}


