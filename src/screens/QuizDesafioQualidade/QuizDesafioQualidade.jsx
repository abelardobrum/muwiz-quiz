import { useState, useCallback } from 'react'
import QuizLayout from '../../components/QuizLayout/QuizLayout.jsx'
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx'
import ResultScreen from '../../components/ResultScreen/ResultScreen.jsx'
import { questions, getResult } from '../../data/quizDesafioQualidade.js'
import { shuffle } from '../../utils/shuffle.js'
import './QuizDesafioQualidade.css'

export default function QuizDesafioQualidade() {
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('question')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [key, setKey] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState(
    () => questions.map(q => ({ ...q, options: shuffle(q.options) }))
  )

  const handleAnswer = useCallback((option) => {
    if (phase !== 'question') return
    const correct = option === shuffledQuestions[currentQ].correct
    setSelectedAnswer(option)
    setPhase('feedback')
    if (correct) setScore(s => s + 1)

    setTimeout(() => {
      if (currentQ + 1 >= shuffledQuestions.length) {
        setPhase('result')
      } else {
        setCurrentQ(q => q + 1)
        setSelectedAnswer(null)
        setPhase('question')
        setKey(k => k + 1)
      }
    }, 1400)
  }, [phase, currentQ, shuffledQuestions])

  const handlePlayAgain = () => {
    setCurrentQ(0)
    setScore(0)
    setPhase('question')
    setSelectedAnswer(null)
    setKey(k => k + 1)
    setShuffledQuestions(questions.map(q => ({ ...q, options: shuffle(q.options) })))
  }

  if (phase === 'result') {
    const result = getResult(score)
    return (
      <QuizLayout title="Desafio da Qualidade" theme="quality">
        <ResultScreen
          label={result.label}
          tier={result.tier}
          score={score}
          total={shuffledQuestions.length}
          onPlayAgain={handlePlayAgain}
        />
      </QuizLayout>
    )
  }

  const q = shuffledQuestions[currentQ]

  return (
    <QuizLayout title="Desafio da Qualidade" theme="quality">
      <div className="dq-container">
        <ProgressBar total={shuffledQuestions.length} current={currentQ} />

        <div className="dq-question" key={key}>
          <span className="dq-question-number">Pergunta {currentQ + 1}</span>
          <p className="dq-question-text">{q.text}</p>
        </div>

        <div className={`dq-options ${phase === 'feedback' ? 'dq-options--locked' : ''}`} key={`opts-${key}`}>
          {q.options.map((option) => {
            let state = ''
            if (phase === 'feedback') {
              if (option === q.correct) state = 'correct'
              else if (option === selectedAnswer) state = 'wrong'
            }
            return (
              <button
                key={option}
                className={`dq-option ${state ? `dq-option--${state}` : ''}`}
                onClick={() => handleAnswer(option)}
                disabled={phase === 'feedback'}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>
    </QuizLayout>
  )
}
