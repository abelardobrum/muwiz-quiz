import { useNavigate } from 'react-router-dom'
import simbolo from '../../assets/simbolo-game.png'
import logo from '../../assets/logo.png'
import './QuizLayout.css'

export default function QuizLayout({ title, theme = 'default', children }) {
  const navigate = useNavigate()

  return (
    <div className={`quiz-layout quiz-layout--${theme}`}>
      <header className="quiz-header">
        <h1 className="quiz-title">
          <img src={simbolo} alt="" className="quiz-title-symbol" aria-hidden="true" />
          {title}
        </h1>
      </header>
      <main className="quiz-content">
        {children}
      </main>
      <footer className="quiz-footer">
        <button className="quiz-back" onClick={() => navigate('/')} aria-label="Voltar ao menu">
          ◀ Voltar
        </button>
        {theme !== 'soccer' && (
          <img src={logo} alt="" className="quiz-footer-logo" aria-hidden="true" />
        )}
      </footer>
    </div>
  )
}
