import { useNavigate } from 'react-router-dom'
import './ResultScreen.css'

export default function ResultScreen({ label, icon, tier, score, total, energy, onPlayAgain }) {
  const navigate = useNavigate()

  return (
    <div className={`result-screen result-screen--${tier}`}>
      {icon && <div className="result-icon">{icon}</div>}
      <div className="result-label">{label}</div>
      {score !== undefined && total !== undefined && (
        <div className="result-score">{score} / {total} acertos</div>
      )}
      {energy !== undefined && (
        <div className="result-energy">
          <div className="result-energy-track">
            {[25, 50, 75, 100].map(mark => (
              <div key={mark} className="result-energy-mark" style={{ left: `${mark}%` }} />
            ))}
            <div className="result-energy-fill" style={{ width: `${energy}%` }} />
          </div>
          <span className="result-energy-pct">{energy}%</span>
          <span className="result-energy-label">Qualidade do Produto</span>
        </div>
      )}
      <div className="result-actions">
        <button className="result-btn result-btn--play" onClick={onPlayAgain}>
          Jogar Novamente
        </button>
        <button className="result-btn result-btn--menu" onClick={() => navigate('/')}>
          Menu Principal
        </button>
      </div>
    </div>
  )
}
