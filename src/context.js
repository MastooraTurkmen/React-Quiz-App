import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
// const tempUrl = 'https://opentdb.com/api.php?amount=50&category=24&difficulty=easy'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sport',
    difficulty: 'easy'
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = async (url) => {
    setLoading(true);
    setWaiting(false)
    const response = await axios(url).catch(err => console.log(err))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true)
    }
  }

  const nextQuestions = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldCorrect) => oldCorrect + 1)
    }
    nextQuestions()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setWaiting(true)
    setCorrect(0)
  }

  // useEffect(() => {
  //   fetchData(tempUrl)
  // }, [])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
    console.log(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, category, difficulty } = quiz;
    // const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple'
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    fetchData(url)
  }

  return <AppContext.Provider value={{
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    isModalOpen,
    nextQuestions,
    checkAnswer,
    closeModal,
    handleChange,
    handleSubmit,
    quiz
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
