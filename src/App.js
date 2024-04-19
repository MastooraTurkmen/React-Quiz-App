import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
  const { waiting, loading, questions, index, correct, nextQuestions, checkAnswer } = useGlobalContext()

  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  console.log(questions[0]);
  const { question, incorrect_answers, correct_answer } = questions[index]
  // const answers = Object.values({ ...incorrect_answers, correct_answer });
  const answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers :{correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button onClick={() => checkAnswer(correct_answer === answer)} className="answer-btn" key={index} dangerouslySetInnerHTML={{ __html: answer }} />
              )
            })}
          </div>
        </article>
        <button onClick={nextQuestions} className="next-question">next question</button>
      </section>
    </main>
  )
}

export default App
