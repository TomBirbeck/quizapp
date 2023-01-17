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

const data = await res.json()
question.textContent = data[0].question
console.log(data)
}

questions()

