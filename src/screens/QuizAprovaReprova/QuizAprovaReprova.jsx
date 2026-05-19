import { useState } from 'react'
import QuizLayout from '../../components/QuizLayout/QuizLayout.jsx'
import ResultScreen from '../../components/ResultScreen/ResultScreen.jsx'
import { items, getResult } from '../../data/quizAprovaReprova.js'
import './QuizAprovaReprova.css'

export default function QuizAprovaReprova() {
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [rejected, setRejected] = useState(null)
  const [showResult, setShowResult] = useState(false)

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
    setSubmitted(true)
    setTimeout(() => setShowResult(true), 1800)
  }

  const handlePlayAgain = () => {
    setSelected(new Set())
    setSubmitted(false)
    setRejected(null)
    setShowResult(false)
  }

  if (showResult) {
    const correctCount = [...selected].filter(id => items.find(i => i.id === id)?.correct).length
    const result = getResult(correctCount)
    return (
      <QuizLayout title="Aprova ou Reprova" theme="aprova">
        <ResultScreen
          label={result.label}
          tier={result.tier}
          score={correctCount}
          total={2}
          onPlayAgain={handlePlayAgain}
        />
      </QuizLayout>
    )
  }

  return (
    <QuizLayout title="Aprova ou Reprova" theme="aprova">
      <div className="ar-container">
        <div className="ar-instructions">
          <p className="ar-title">Selecione as respostas corretas</p>
          <p className="ar-hint">Apenas 2 opções são corretas</p>
          <div className="ar-counter">{selected.size} / 2 selecionadas</div>
        </div>

        <div className="ar-items">
          {items.map((item, i) => {
            const isSelected = selected.has(item.id)
            const isRejected = rejected === item.id
            let revealState = ''
            if (submitted) {
              revealState = item.correct ? 'correct' : 'wrong'
            }
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
