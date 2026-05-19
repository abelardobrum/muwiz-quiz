import { Routes, Route } from 'react-router-dom'
import Menu from './screens/Menu/Menu.jsx'
import QuizDesafioQualidade from './screens/QuizDesafioQualidade/QuizDesafioQualidade.jsx'
import QuizAprovaReprova from './screens/QuizAprovaReprova/QuizAprovaReprova.jsx'
import QuizFormulaCampea from './screens/QuizFormulaCampea/QuizFormulaCampea.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/quiz-desafio-qualidade" element={<QuizDesafioQualidade />} />
      <Route path="/quiz-aprova-reprova" element={<QuizAprovaReprova />} />
      <Route path="/quiz-formula-campea" element={<QuizFormulaCampea />} />
    </Routes>
  )
}
