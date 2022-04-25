const url = `https://opentdb.com/api.php?amount=1&type=multiple`;
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


//request API data when page loads
window.onload = requestApiData();

//keep the next button disabled until first selection
nextBtn.disabled = true;

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
    category.innerHTML = data.results[0].category;
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
                   result.innerHTML = "That's Correct";
                   skipBtn.disabled = true;
                   result.style.color = "#1C9E48";
                } else {
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
skipBtn.addEventListener("click", reloadPage);
nextBtn.addEventListener("click", reloadPage);
