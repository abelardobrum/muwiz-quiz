import { useState } from 'react'
import QuizLayout from '../../components/QuizLayout/QuizLayout.jsx'
import ResultScreen from '../../components/ResultScreen/ResultScreen.jsx'
import { questions, getResult } from '../../data/quizAprovaReprova.js'
import { shuffle } from '../../utils/shuffle.js'
import './QuizAprovaReprova.css'

function initQuestions() {
  return questions.map(q => ({ ...q, options: shuffle([...q.options]) }))
}

export default function QuizAprovaReprova() {
  const [shuffledQuestions, setShuffledQuestions] = useState(initQuestions)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [rejected, setRejected] = useState(null)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const question = shuffledQuestions[currentQ]
  const total = shuffledQuestions.length

  const handleToggle = (id) => {
    if (submitted) return
    if (selected.has(id)) {
      setSelected(prev => { const s = new Set(prev); s.delete(id); return s })
    } else {
      if (selected.size >= 2) {
        setRejected(id)
        setTimeout(() => setRejected(null), 400)
        return
      }
      setSelected(prev => new Set(prev).add(id))
    }
  }

  const handleConfirm = () => {
    if (selected.size !== 2) return
    const correct = question.options.filter(o => selected.has(o.id) && o.correct).length
    setTotalCorrect(prev => prev + correct)
    setSubmitted(true)
    setTimeout(() => {
      if (currentQ + 1 >= total) {
        setShowResult(true)
      } else {
        setCurrentQ(q => q + 1)
        setSelected(new Set())
        setSubmitted(false)
      }
    }, 1800)
  }

  const handlePlayAgain = () => {
    setShuffledQuestions(initQuestions())
    setCurrentQ(0)
    setSelected(new Set())
    setSubmitted(false)
    setRejected(null)
    setTotalCorrect(0)
    setShowResult(false)
  }

  if (showResult) {
    const result = getResult(totalCorrect)
    return (
      <QuizLayout title="Aprova ou Reprova" theme="aprova">
        <ResultScreen
          label={result.label}
          tier={result.tier}
          score={totalCorrect}
          total={total * 2}
          onPlayAgain={handlePlayAgain}
        />
      </QuizLayout>
    )
  }

  return (
    <QuizLayout title="Aprova ou Reprova" theme="aprova">
      <div className="ar-container">
        <div className="ar-instructions">
          <div className="ar-progress">Pergunta {currentQ + 1} de {total}</div>
          <p className="ar-question">{question.question}</p>
          <p className="ar-hint">Selecione as 2 respostas corretas</p>
          <div className="ar-counter">{selected.size} / 2 selecionadas</div>
        </div>

        <div className="ar-items">
          {question.options.map((item, i) => {
            const isSelected = selected.has(item.id)
            const isRejected = rejected === item.id
            let revealState = ''
            if (submitted) revealState = item.correct ? 'correct' : 'wrong'
            return (
              <button
                key={item.id}
                className={`ar-item
                  ${isSelected ? 'ar-item--selected' : ''}
                  ${isRejected ? 'ar-item--rejected' : ''}
                  ${revealState ? `ar-item--${revealState}` : ''}
                `}
                style={{ animationDelay: submitted ? `${i * 0.12}s` : '0s' }}
                onClick={() => handleToggle(item.id)}
              >
                <span className="ar-item-check">{isSelected ? '✓' : '○'}</span>
                <span className="ar-item-text">{item.text}</span>
                {submitted && (
                  <span className="ar-item-reveal">{item.correct ? '✅' : '❌'}</span>
                )}
              </button>
            )
          })}
        </div>

        <div className="ar-confirm-bar">
          <button
            className={`ar-confirm-btn ${selected.size === 2 ? 'ar-confirm-btn--active' : ''}`}
            onClick={handleConfirm}
            disabled={selected.size !== 2 || submitted}
          >
            {submitted ? 'Verificando...' : 'Confirmar Resposta'}
          </button>
        </div>
      </div>
    </QuizLayout>
  )
}
