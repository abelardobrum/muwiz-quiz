import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultScreen from '../../components/ResultScreen/ResultScreen.jsx'
import { zones, getResult } from '../../data/quizFormulaCampea.js'
import { shuffle } from '../../utils/shuffle.js'
import simbolo from '../../assets/simbolo-game.png'
import jogadorImg from '../../assets/jogador.png'
import acertoImg from '../../assets/acerto.png'
import erroImg from '../../assets/erro.png'
import './QuizFormulaCampea.css'

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

function getPassPath(p0, p1, gap = 7) {
  const dx = p1.x - p0.x
  const dy = p1.y - p0.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = dx / len
  const ny = dy / len
  const sx = p0.x + nx * gap
  const sy = p0.y + ny * gap
  const ex = p1.x - nx * gap
  const ey = p1.y - ny * gap
  const mx = (sx + ex) / 2
  const curveDir = p0.y < p1.y ? -10 : 10
  const cy = (sy + ey) / 2 + curveDir
  return `M ${sx} ${sy} Q ${mx} ${cy} ${ex} ${ey}`
}

const PLAYER_POSITIONS = [
  { x: 14, y: 32 }, // Matéria-Prima — esquerda, alto
  { x: 37, y: 66 }, // Manipulação   — centro-esquerda, baixo
  { x: 60, y: 28 }, // Qualidade     — centro-direita, alto
  { x: 80, y: 62 }, // Gol           — direita, baixo
]

const CONFETTI_COLORS = ['#6bb34a', '#e8a020', '#7c3fb8', '#fff', '#cc3333']

export default function QuizFormulaCampea() {
  const navigate = useNavigate()
  const [currentZone, setCurrentZone] = useState(0)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('question')
  const [zoneState, setZoneState] = useState({})   // { [idx]: 'correct'|'yellow'|'red' }
  const [errors, setErrors] = useState(0)
  const [cardOverlay, setCardOverlay] = useState(null) // { type: 'yellow'|'red' } | null
  const [energy, setEnergy] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [passHistory, setPassHistory] = useState([])  // acumulado — linhas persistem
  const [goalAnimation, setGoalAnimation] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const [shuffledZones, setShuffledZones] = useState(() =>
    zones.map(z => {
      const order = shuffle([...Array(z.options.length).keys()])
      return { ...z, options: order.map(i => z.options[i]), optionIcons: order.map(i => z.optionIcons[i]) }
    })
  )

  useEffect(() => {
    if (phase !== 'question') return
    if (timeLeft <= 0) {
      const t = setTimeout(() => { setTimedOut(true); setPhase('result') }, 0)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft])

  const processAnswer = useCallback((option) => {
    const correct = option === shuffledZones[currentZone].correct

    if (correct) {
      setEnergy(e => Math.min(100, e + 25))
      setZoneState(prev => ({ ...prev, [currentZone]: 'correct' }))
      setScore(s => s + 1)

      if (currentZone < shuffledZones.length - 1) {
        setPassHistory(prev => [...prev, { from: currentZone, to: currentZone + 1 }])
      } else {
        setGoalAnimation(true)
        setTimeout(() => setGoalAnimation(false), 2000)
      }

      setPhase('feedback')
      setTimeout(() => {
        if (currentZone + 1 >= shuffledZones.length) setPhase('result')
        else { setCurrentZone(z => z + 1); setPhase('question') }
      }, 1400)

    } else {
      setEnergy(e => Math.max(0, e - 15))
      const newErrors = errors + 1
      setErrors(newErrors)
      const cardType = newErrors === 1 ? 'yellow' : 'red'
      setZoneState(prev => ({ ...prev, [currentZone]: cardType }))
      setCardOverlay({ type: cardType })
      setPhase('feedback')

      setTimeout(() => {
        setCardOverlay(null)
        if (cardType === 'red') {
          setPhase('result')
        } else {
          if (currentZone < shuffledZones.length - 1) {
            setPassHistory(prev => [...prev, { from: currentZone, to: currentZone + 1 }])
          }
          if (currentZone + 1 >= shuffledZones.length) setPhase('result')
          else { setCurrentZone(z => z + 1); setPhase('question') }
        }
      }, 3000)
    }
  }, [currentZone, errors, shuffledZones])

  const handleCardClick = useCallback((option) => {
    if (phase !== 'question') return
    processAnswer(option)
  }, [phase, processAnswer])

  const handlePlayAgain = () => {
    setCurrentZone(0); setScore(0); setPhase('question')
    setZoneState({}); setTimeLeft(60)
    setErrors(0); setEnergy(0)
    setCardOverlay(null)
    setPassHistory([]); setGoalAnimation(false); setTimedOut(false)
    setShuffledZones(zones.map(z => {
      const order = shuffle([...Array(z.options.length).keys()])
      return { ...z, options: order.map(i => z.options[i]), optionIcons: order.map(i => z.optionIcons[i]) }
    }))
  }

  const zone = shuffledZones[currentZone]
  const result = phase === 'result'
    ? (timedOut
        ? { label: 'Tempo esgotado! Produto não finalizado.', icon: '⏱', tier: 'danger' }
        : getResult(errors))
    : null

  return (
    <div className="fc-screen">
      {/* Header */}
      <div className="fc-header">
        <h1 className="fc-title">
          <img src={simbolo} alt="" className="fc-title-symbol" aria-hidden="true" />
          Fórmula Campeã
        </h1>
      </div>

      {/* Campo */}
      <div
        className={[
          'fc-field',
          goalAnimation ? 'fc-field--goal' : '',
        ].filter(Boolean).join(' ')}
      >
        <svg className="fc-field-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grande área */}
          <rect x="69" y="20" width="31" height="60" className="fc-fl" />
          {/* Pequena área */}
          <rect x="90" y="37" width="10" height="26" className="fc-fl" />
          {/* Ponto de pênalti */}
          <circle cx="79" cy="50" r="1.5" className="fc-fl-dot" />
          {/* D-arc */}
          <path d="M 69 35.8 A 17.4 17.4 0 0 0 69 64.2" className="fc-fl" />
          {/* Arco do círculo central */}
          <path d="M 0 32.6 A 17.4 17.4 0 0 1 0 67.4" className="fc-fl" />
        </svg>

        {/* Jogadores */}
        <div className="fc-players-layer">
          {shuffledZones.map((z, i) => {
            const pos = PLAYER_POSITIONS[i]
            const state = zoneState[i]
            const isCurrent = i === currentZone && phase !== 'result'
            return (
              <div
                key={z.id}
                className={[
                  'fc-player',
                  state === 'yellow' ? 'fc-player--yellow' : '',
                  state === 'red' ? 'fc-player--red' : '',
                  state === 'correct' ? 'fc-player--correct' : '',
                  isCurrent ? 'fc-player--current' : '',
                ].filter(Boolean).join(' ')}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <img
                  src={state === 'correct' ? acertoImg : (state === 'yellow' || state === 'red') ? erroImg : jogadorImg}
                  className="fc-player-img"
                  alt=""
                />
              </div>
            )
          })}
        </div>

        {/* Goleira */}
        <div className="fc-goal" />

        {/* Linhas de passe persistentes */}
        {passHistory.length > 0 && (
          <svg className="fc-pass-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {passHistory.map((pass, idx) => (
              <path
                key={idx}
                d={getPassPath(
                  PLAYER_POSITIONS[pass.from],
                  PLAYER_POSITIONS[pass.to]
                )}
                className={
                  idx === passHistory.length - 1
                    ? 'fc-pass-path'
                    : 'fc-pass-path--static'
                }
              />
            ))}
          </svg>
        )}

        {/* Confete no gol */}
        {goalAnimation && (
          <div className="fc-confetti-container" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="fc-confetti-piece"
                style={{
                  '--delay': `${(i * 0.018).toFixed(2)}s`,
                  '--x': `${Math.floor((i / 24) * 100)}%`,
                  '--color': CONFETTI_COLORS[i % 5],
                }}
              />
            ))}
          </div>
        )}

        {/* Overlay de cartão */}
        {cardOverlay && (
          <div className={`fc-card-overlay fc-card-overlay--${cardOverlay.type}`}>
            <span className="fc-card-overlay-icon">
              {cardOverlay.type === 'yellow' ? '🟨' : '🟥'}
            </span>
            <span className="fc-card-overlay-title">
              {cardOverlay.type === 'yellow' ? 'CARTÃO AMARELO!' : 'CARTÃO VERMELHO!'}
            </span>
            <span className="fc-card-overlay-sub">
              {cardOverlay.type === 'yellow' ? 'Revise o processo!' : 'Produto reprovado!'}
            </span>
          </div>
        )}

        {/* Progress dots */}
        <div className="fc-progress">
          {shuffledZones.map((_, i) => (
            <span
              key={i}
              className={[
                'fc-progress-dot',
                zoneState[i] ? 'fc-progress-dot--done' : '',
                i === currentZone && phase !== 'result' && !zoneState[i]
                  ? 'fc-progress-dot--active'
                  : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>
      </div>

      {/* Barra de energia — abaixo do campo */}
      <div className="fc-energy-bar">
        <div className="fc-energy-header">
          <span className="fc-energy-label">QUALIDADE DO PRODUTO</span>
          <span className="fc-energy-pct">{energy}%</span>
        </div>
        <div className="fc-energy-track">
          {[25, 50, 75, 100].map(mark => (
            <div key={mark} className="fc-energy-mark" style={{ left: `${mark}%` }} />
          ))}
          <div className="fc-energy-fill" style={{ width: `${energy}%` }} />
        </div>
      </div>

      {/* Pergunta + cards */}
      {phase !== 'result' ? (
        <div className="fc-bottom">
          <div className="fc-zone-label">
            PASSE {currentZone + 1} — {zone.zone.toUpperCase()}
          </div>
          <p className="fc-question-text">{zone.question}</p>

          <div className={`fc-cards ${phase === 'feedback' ? 'fc-cards--locked' : ''}`}>
            {zone.options.map((option, i) => (
              <div
                key={option}
                className="fc-card"
                onClick={() => handleCardClick(option)}
              >
                <span className="fc-card-icon">{zone.optionIcons[i]}</span>
                <span className="fc-card-text">{option}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="fc-result-area">
          <ResultScreen
            label={result.label}
            icon={result.icon}
            tier={result.tier}
            onPlayAgain={handlePlayAgain}
          />
        </div>
        
      )}

      {/* Footer */}
      <div className="fc-footer">
        <button className="fc-back" onClick={() => navigate('/')}>◀ Voltar</button>
        <span>⚽ Passe {Math.min(currentZone + 1, shuffledZones.length)}/{shuffledZones.length}</span>
        <span>✓ Acertos {score}</span>
        <span className={`fc-footer-time ${timeLeft <= 10 ? 'fc-footer-time--urgent' : ''}`}>
          ⏱ {formatTime(timeLeft)}
        </span>
      </div>

    </div>
  )
}
