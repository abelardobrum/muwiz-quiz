export const questions = [
  {
    id: 1,
    question: 'O que REPROVA um produto alimentício?',
    type: 'reprova',
    options: [
      { id: 1, text: 'Produto testado antes de vender', correct: false },
      { id: 2, text: 'Rótulo incompleto', correct: true },
      { id: 3, text: 'Ingrediente sem origem clara', correct: true },
      { id: 4, text: 'Segue regras da ANVISA', correct: false },
      { id: 5, text: 'Promete resultado exagerado', correct: false },
    ],
  },
  {
    id: 2,
    question: 'O que APROVA um suplemento alimentar?',
    type: 'aprova',
    options: [
      { id: 1, text: 'Registro na ANVISA', correct: true },
      { id: 2, text: 'Vendido apenas por influenciadores', correct: false },
      { id: 3, text: 'Lista de ingredientes completa', correct: true },
      { id: 4, text: 'Promete emagrecer 10kg em 1 semana', correct: false },
      { id: 5, text: 'Embalagem sem data de validade', correct: false },
    ],
  },
  {
    id: 3,
    question: 'O que REPROVA um cosmético?',
    type: 'reprova',
    options: [
      { id: 1, text: 'Testado dermatologicamente', correct: false },
      { id: 2, text: 'Sem lista de componentes', correct: true },
      { id: 3, text: 'Prazo de validade visível', correct: false },
      { id: 4, text: 'Alega curar doenças de pele', correct: true },
      { id: 5, text: 'Fabricante identificado no rótulo', correct: false },
    ],
  },
  {
    id: 4,
    question: 'O que APROVA um medicamento?',
    type: 'aprova',
    options: [
      { id: 1, text: 'Vendido sem receita quando exige', correct: false },
      { id: 2, text: 'Bula com informações claras', correct: true },
      { id: 3, text: 'Registro ativo na ANVISA', correct: true },
      { id: 4, text: 'Anunciado como "milagroso"', correct: false },
      { id: 5, text: 'Embalagem violada na farmácia', correct: false },
    ],
  },
]

export function getResult(totalCorrect) {
  if (totalCorrect <= 3) return { label: 'Iniciante', tier: 'danger' }
  if (totalCorrect <= 6) return { label: 'Consciente', tier: 'warning' }
  return { label: 'Padrão Muwiz', tier: 'champion' }
}
