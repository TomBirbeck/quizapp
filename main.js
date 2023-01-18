const scoreBoard = document.querySelector('.score')
const question = document.querySelector('.questionText')
const options = document.querySelector('.options') 
const next = document.querySelector('.nextQuestion')
const quizCategory = document.querySelector('.categories')

let score = 0
let total = 0
let cat = ''

const questions = async (cat) => {
    const res = await fetch(`https://the-trivia-api.com/api/questions?limit=1&categories=${cat}`, {
   headers: {
     'Content-Type': 'application/json'
   },
 })
 const data  = await res.json()
 question.textContent = data[0].question
 answerMixer(data[0].correctAnswer, data[0].incorrectAnswers[0], data[0].incorrectAnswers[1], data[0].incorrectAnswers[2]);
 total++
 return data
}

// takes in the answers, mixes them and creates buttons for all choices 
const answerMixer = (correctAnswer, incorrectOne, incorrectTwo, incorrectThree) => {
    let answers = [correctAnswer, incorrectOne, incorrectTwo, incorrectThree];
    const mixed = [];

    // checks selected answer against correct one and disables all buttons when an answer is chosen
    const checkAnswer = (e) => {
        const buttons = document.querySelectorAll('.button')
        console.log(buttons)
        if (e.target.textContent === correctAnswer){
            e.target.classList.add("correct");
            score++
            for(let i = 0; i < buttons.length; i++){
                buttons[i].setAttribute('disabled', '')
            }
            return true
        } else if (e.target.textContent !== correctAnswer) {
            e.target.classList.add("incorrect");
            for(let i = 0; i < buttons.length; i++){
                buttons[i].setAttribute('disabled', '')
            }
            return false
        }
    }
    do {
        for (let i = 0; i < answers.length; i++) {
            const number = Math.floor(Math.random() * 4);
            if (!mixed.includes(answers[number])){
                mixed.push(answers[number]);
            }
        }
} while (mixed.length < 4);

mixed.map(answer => {
    let button = document.createElement("button");
    button.value = button.name = button.textContent = answer;
    button.classList.add('button')
    button.addEventListener("click", checkAnswer);
            options.appendChild(button);

})
}

//sets category and starts quiz
const handleCategory = (e) => {
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
    score = 0
    cat = e.target.value
    questions(cat)
}

console.log(cat)

quizCategory.addEventListener('change', handleCategory)

//removes all buttons, updates score and recalls questions for new quiz question
const nextQuestion = () => {
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
    questions(cat)
    scoreBoard.textContent = 'Score:' + score
}

next.addEventListener('click', nextQuestion)