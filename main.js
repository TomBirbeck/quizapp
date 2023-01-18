const answerOne = document.querySelector('.answerButtonOne')
const answerTwo = document.querySelector('.answerButtonTwo')
const answerThree = document.querySelector('.answerButtonThree')
const answerFour = document.querySelector('.answerButtonFour')
const question = document.querySelector('.questionText')

const questions = async () => {
    const res = await fetch('https://the-trivia-api.com/api/questions?limit=1&categories=science,history', {
   headers: {
     'Content-Type': 'application/json'
   },
 })
 const data  = await res.json()
 question.textContent = data[0].question
 answerMixer(data[0].correctAnswer, data[0].incorrectAnswers[0], data[0].incorrectAnswers[1], data[0].incorrectAnswers[2]);
 return data
 }


// take in 1 correct answer and 3 incorrect
// jumble them and assign them to buttons

const answerMixer = (correctAnswer, incorrectOne, incorrectTwo, incorrectThree) => {
    let answers = [correctAnswer, incorrectOne, incorrectTwo, incorrectThree];
    const mixed = [];
    do {
        for (let i = 0; i < answers.length; i++) {
            const number = Math.floor(Math.random() * 4);
            if (!mixed.includes(answers[number])){
                mixed.push(answers[number]);
            }
        }
} while (mixed.length < 4);


answerOne.textContent = mixed[0];
answerTwo.textContent = mixed[1];       
answerThree.textContent = mixed[2];      
answerFour.textContent = mixed[3];     

const checkAnswer = (e) => {
    if (e.target.textContent === correctAnswer){
        console.log(true)
        return true
    } else {
        console.log(false)
        return false
    }
}

answerOne.addEventListener('click', checkAnswer)
answerTwo.addEventListener('click', checkAnswer)
answerThree.addEventListener('click', checkAnswer)
answerFour.addEventListener('click', checkAnswer)
};





questions()