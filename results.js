const scoreData = document.querySelector("#score_data");
const homeBtn = document.querySelector("#home");
let finalScore = sessionStorage.getItem("Scores");
scoreData.innerHTML = `${finalScore}/20`;

//take the quiz again
homeBtn.addEventListener("click", function(){
    sessionStorage.clear();
    window.open("index.html", "_self");
})