export const questions = [
  {
    id: 1,
    question: 'O que demonstra qualidade em um suplemento?',
    type: 'aprova',
    options: [
      { id: 1, text: 'Produto testado antes de ser vendido', correct: true },
      { id: 2, text: 'Ingrediente sem origem identificada', correct: false },
      { id: 3, text: 'Lote com rastreabilidade completa', correct: true },
      { id: 4, text: 'Matéria-prima sem documentação', correct: false },
    ],
  },
  {
    id: 2,
    question: 'O que faz parte de um controle de qualidade confiável?',
    type: 'aprova',
    options: [
      { id: 1, text: 'Testes de estabilidade realizados', correct: true },
      { id: 2, text: 'Análises laboratoriais do produto', correct: true },
      { id: 3, text: 'Prazo de validade definido sem estudos', correct: false },
      { id: 4, text: ' Produção sem registro dos processos', correct: false },
    ],
  },
  {
    id: 3,
    question: 'O que aumenta a segurança para o consumidor?',
    type: 'aprova',
    options: [
      { id: 1, text: 'Rótulo seguindo as normas da ANVISA', correct: true },
      { id: 2, text: 'Fabricação com Boas Práticas de Produção', correct: true },
      { id: 3, text: 'Promessas de resultados garantidos', correct: false },
      { id: 4, text: 'Informações incompletas no rótulo', correct: false },
    ],
  },
]

export function getResult(totalCorrect) {
  if (totalCorrect <= 2) return { label: 'Seu produto corre risco', tier: 'danger' }
  if (totalCorrect <= 4) return { label: 'Você está no caminho certo', tier: 'warning' }
  return { label: 'Padrão Muwiz', tier: 'champion' }
}
