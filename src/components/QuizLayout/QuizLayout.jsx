import { useNavigate } from 'react-router-dom'
import './QuizLayout.css'

export default function QuizLayout({ title, theme = 'default', children }) {
  const navigate = useNavigate()

  return (
    <div className={`quiz-layout quiz-layout--${theme}`}>
      <header className="quiz-header">
        <button className="quiz-back" onClick={() => navigate('/')} aria-label="Voltar ao menu">
          ◀ Voltar
        </button>
        <h1 className="quiz-title">{title}</h1>
        <div className="quiz-header-spacer" />
      </header>
      <main className="quiz-content">
        {children}
      </main>
    </div>
  )
}
