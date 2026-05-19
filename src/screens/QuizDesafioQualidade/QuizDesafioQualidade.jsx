import { useState, useCallback } from 'react'
import QuizLayout from '../../components/QuizLayout/QuizLayout.jsx'
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx'
import ResultScreen from '../../components/ResultScreen/ResultScreen.jsx'
import { questions, getResult } from '../../data/quizDesafioQualidade.js'
import './QuizDesafioQualidade.css'

export default function QuizDesafioQualidade() {
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('question') // 'question' | 'feedback' | 'result'
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [wasCorrect, setWasCorrect] = useState(null)
  const [key, setKey] = useState(0)

  const handleAnswer = useCallback((option) => {
    if (phase !== 'question') return
    const correct = option === questions[currentQ].correct
    setSelectedAnswer(option)
    setWasCorrect(correct)
    setPhase('feedback')
    if (correct) setScore(s => s + 1)

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setPhase('result')
      } else {
        setCurrentQ(q => q + 1)
        setSelectedAnswer(null)
        setWasCorrect(null)
        setPhase('question')
        setKey(k => k + 1)
      }
    }, 1400)
  }, [phase, currentQ])

  const handlePlayAgain = () => {
    setCurrentQ(0)
    setScore(0)
    setPhase('question')
    setSelectedAnswer(null)
    setWasCorrect(null)
    setKey(k => k + 1)
  }

  if (phase === 'result') {
    const result = getResult(score)
    return (
      <QuizLayout title="Desafio da Qualidade" theme="quality">
        <ResultScreen
          label={result.label}
          tier={result.tier}
          score={score}
          total={questions.length}
          onPlayAgain={handlePlayAgain}
        />
      </QuizLayout>
    )
  }

  const q = questions[currentQ]

  return (
    <QuizLayout title="Desafio da Qualidade" theme="quality">
      <div className="dq-container">
        <ProgressBar total={questions.length} current={currentQ} />

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
