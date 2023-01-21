const scoreBoard = document.querySelector('.score')
const high = document.querySelector('.highScore')
const question = document.querySelector('.questionText')
const options = document.querySelector('.options') 
const next = document.querySelector('.nextQuestion')
const quizCategory = document.querySelector('.categories')
const quizLength = document.querySelector('.quizLength')
const end = document.querySelector('.endQuiz')
const restart = document.querySelector('.restartQuiz')
const questionNumber = document.querySelector('.questionNo')

let score = 0
let total = 0
let questionAmount = 0
let cat = ''
let questionList;

const questions = async (length, cat) => {
    const res = await fetch(`https://the-trivia-api.com/api/questions?limit=${length}&categories=${cat}`, {
   headers: {
     'Content-Type': 'application/json'
   },
 })
 const data  = await res.json()
 return data
}

const questionCycle = () => {
    question.textContent = questionList[total].question
    answerMixer(questionList[total].correctAnswer, questionList[total].incorrectAnswers[0], questionList[total].incorrectAnswers[1], questionList[total].incorrectAnswers[2]);
    total++
    questionNumber.textContent = `Question: ${total}`
}


//checks for high score based on quiz lenght and category
const highscore = (cat) => {
    if (questionAmount === 10){
        if (localStorage.getItem(`HighTen${cat}`) !== null){
            high.textContent = 'High Score: ' + localStorage.getItem(`HighTen${cat}`)
        } else {
            high.textContent = 'High Score: 0'
        }
    } else if (questionAmount === 20){
        if (localStorage.getItem(`HighTwenty${cat}`) !== null){
        high.textContent = 'High Score: ' + localStorage.getItem(`HighTwenty${cat}`)
        } else {
            high.textContent = 'High Score: 0'
        }
            } else if (questionAmount === 30){
                if (localStorage.getItem(`HighThirty${cat}`) !== null){
        high.textContent = 'High Score: ' + localStorage.getItem(`HighThirty${cat}`)
                } else {
                    high.textContent = 'High Score: 0'
                }
            }
}

// takes in the answers, mixes them and creates buttons for all choices 
const answerMixer = (correctAnswer, incorrectOne, incorrectTwo, incorrectThree) => {
    let answers = [correctAnswer, incorrectOne, incorrectTwo, incorrectThree];
    const mixed = [];

    // checks selected answer against correct one and disables all buttons when an answer is chosen
    const checkAnswer = (e) => {
        const buttons = document.querySelectorAll('.button')
        if (e.target.textContent === correctAnswer){
            e.target.classList.add("correct");
            score++
            scoreBoard.textContent = 'Score: ' + score
            for(let i = 0; i < buttons.length; i++){
                buttons[i].setAttribute('disabled', '')
            }
            return true
        } else if (e.target.textContent !== correctAnswer) {
            e.target.classList.add("incorrect");
            for(let i = 0; i < buttons.length; i++){
                buttons[i].setAttribute('disabled', '')
                if (buttons[i].value === correctAnswer) {
                    buttons[i].classList.add("correct")
                }
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
const handleCategory = async (e) => {
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
    restart.classList.add('hidden')
    next.classList.remove('hidden')
    score = 0
    total = 0
    scoreBoard.textContent = 'Score: ' + score
    cat = e.target.value
    highscore(cat)
    questionList = await questions(questionAmount, cat)
    questionCycle()
    questionNumber.classList.remove('hidden')
}

quizCategory.addEventListener('change', handleCategory)
restart.addEventListener('click', handleCategory)

//sets quiz length
const handleQuizLength = (e) => {
    questionAmount = Number(e.target.value)
    return
}

quizLength.addEventListener('change', handleQuizLength)

//removes all buttons, updates score and recalls questions for new quiz question
const nextQuestion = () => {
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
    if (total < questionAmount){
        // questions(cat)
        questionCycle()
        // scoreBoard.textContent = 'Score: ' + score
    } else if (total === questionAmount) {
        question.textContent = 'Well done! You scored ' + score + ' out of ' + total
        next.classList.add('hidden')
        end.classList.remove('hidden')
        questionNumber.classList.add('hidden')
    }
}

next.addEventListener('click', nextQuestion)

const endQuiz = () => {
    if (questionAmount === 10){
        if (score > localStorage.getItem(`HighTen${cat}`)){
            localStorage.setItem(`HighTen${cat}`, score);
            restart.classList.remove('hidden')
            end.classList.add('hidden')
        }
        else if (questionAmount === 20){
            if (score > localStorage.getItem(`HighTwenty${cat}`)){
                localStorage.setItem(`HighTwenty${cat}`, score);
                next.classList.remove('hidden')
                end.classList.add('hidden')
        }
        else if (questionAmount === 30){
            if (score > localStorage.getItem(`HighThirty${cat}`)){
                localStorage.setItem(`HighThirty${cat}`, score);
                restart.classList.remove('hidden')
                end.classList.add('hidden')
        }
    }

    }
}
    restart.classList.remove('hidden')
    end.classList.add('hidden')
    questionNumber.classList.add('hidden')
    highscore(cat)
}

end.addEventListener('click', endQuiz)