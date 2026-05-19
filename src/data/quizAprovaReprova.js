export const items = [
  { id: 1, text: 'Rótulo incompleto', correct: false },
  { id: 2, text: 'Produto testado antes de vender', correct: true },
  { id: 3, text: 'Ingrediente sem origem clara', correct: false },
  { id: 4, text: 'Segue regras da ANVISA', correct: true },
  { id: 5, text: 'Promete resultado exagerado', correct: false },
]

export function getResult(correctCount) {
  if (correctCount === 0) return { label: 'Iniciante', tier: 'danger' }
  if (correctCount === 1) return { label: 'Consciente', tier: 'warning' }
  return { label: 'Padrão Muwiz', tier: 'champion' }
}
