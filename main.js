const answerOne = document.querySelector('.answerButtonOne')
const answerTwo = document.querySelector('.answerButtonTwo')
const answerThree = document.querySelector('.answerButtonThree')
const answerFour = document.querySelector('.answerButtonFour')
const question = document.querySelector('.questionText')

// take in 1 correct answer and 3 incorrect
// jumble them and assign them to buttons

const answerMixer = (correctAnswer, incorrectOne, incorrectTwo, incorrectThree) => {
    let answers = [correctAnswer, incorrectOne, incorrectTwo, incorrectThree]
    const mixed = []
    do {
        for (let i = 0; i < answers.length; i++) {
            const number = Math.floor(Math.random() * 4)
            if (!mixed.includes(answers[number])){
                mixed.push(answers[number])
                console.log("pushed", answers[number])
            }
        }
} while (mixed.length < 4)


answerOne.textContent = correctAnswer    
answerOne.nodeValue = correctAnswer    
answerTwo.textContent = incorrectOne    
answerTwo.nodeValue = incorrectOne    
answerThree.textContent = incorrectTwo   
answerThree.nodeValue = incorrectTwo   
answerFour.textContent = incorrectThree    
answerFour.nodeValue = incorrectThree    

}

answerMixer(1,2,3,4)

const questions = async () => {
   const res = await fetch('https://the-trivia-api.com/api/questions?limit=1&categories=science,history', {
  headers: {
    'Content-Type': 'application/json'
  },
})

const data  = await res.json()
return data

}

// const res = await questions()
// console.log(res)

// question.textContent = questions().data.correctAnswer
// answerMixer(data[0].correctAnswer, data[0].incorrectAnswers[0], data[0].incorrectAnswers[1], data[0].incorrectAnswers[2])
