export const questions = [
  {
    id: 1,
    text: 'Um suplemento mudou de cor com o tempo. Isso é:',
    options: [
      'Normal e esperado',
      'Problema de qualidade',
      'Só aparência',
      'Sinal de que o produto ficou mais forte',
    ],
    correct: 'Problema de qualidade',
  },
  {
    id: 2,
    text: 'Um produto pode ser vendido sem seguir regras da ANVISA?',
    options: [
      'Sim',
      'Depende da quantidade produzida',
      'Não',
      'Sim, se o fabricante tiver certificado próprio',
    ],
    correct: 'Não',
  },
  {
    id: 3,
    text: 'Como saber se um produto continua bom ao longo do tempo?',
    options: [
      'Pelo cheiro',
      'Fazendo testes de qualidade',
      'Pela embalagem',
      'Verificando se o preço não mudou',
    ],
    correct: 'Fazendo testes de qualidade',
  },
  {
    id: 4,
    text: 'Um bom laboratório garante:',
    options: [
      'Só produção',
      'Qualidade e segurança',
      'Apenas preço baixo',
      'Que o produto nunca precisa de validade',
    ],
    correct: 'Qualidade e segurança',
  },
]

export function getResult(score) {
  if (score <= 2) return { label: 'Seu produto corre risco', tier: 'danger' }
  if (score === 3) return { label: 'Você está no caminho certo', tier: 'warning' }
  return { label: 'Padrão Muwiz', tier: 'champion' }
}
