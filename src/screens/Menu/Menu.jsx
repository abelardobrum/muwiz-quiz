import { useNavigate } from 'react-router-dom'
import logoGameficado from '../../assets/logo-gameficado.png'
import './Menu.css'

const quizzes = [
  {
    to: '/quiz-desafio-qualidade',
    title: 'Desafio da\nQualidade',
    icon: '🔬',
    color: 'cyan',
    description: '4 perguntas sobre qualidade de produtos',
  },
  {
    to: '/quiz-aprova-reprova',
    title: 'Aprova ou\nReprova',
    icon: '✅',
    color: 'pink',
    description: 'Selecione as práticas corretas',
  },
  {
    to: '/quiz-formula-campea',
    title: 'Fórmula\nCampeã',
    icon: '⚽',
    color: 'yellow',
    description: 'Monte o produto campeão zona a zona',
  },
]

export default function Menu() {
  const navigate = useNavigate()

  return (
    <div className="menu-screen">
      <div className="menu-scanline" aria-hidden="true" />

      <header className="menu-header">
        <div className="menu-logo">
          <img src={logoGameficado} alt="Muwiz Quiz" className="menu-logo-img" />
        </div>
        <p className="menu-subtitle">Escolha seu desafio</p>
      </header>

      <nav className="menu-cards">
        {quizzes.map((q, i) => (
          <button
            key={q.to}
            className={`menu-card menu-card--${q.color}`}
            style={{ animationDelay: `${i * 0.15}s` }}
            onClick={() => navigate(q.to)}
          >
            <span className="menu-card-icon">{q.icon}</span>
            <span className="menu-card-title">{q.title}</span>
            <span className="menu-card-desc">{q.description}</span>
            <span className="menu-card-play">
              <span className="menu-card-play-label">JOGAR</span>
              <span className="menu-card-play-icon">▶</span>
            </span>
          </button>
        ))}
      </nav>

      <footer className="menu-footer">
        <span>Toque para começar</span>
      </footer>
    </div>
  )
}
