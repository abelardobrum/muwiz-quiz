export const zones = [
  {
    id: 1,
    fieldLabel: 'Matéria-Prima',
    zone: 'Saia jogando',
    icon: '🏟️',
    question: 'Qual ingrediente entra em campo?',
    options: [
      'Ingrediente testado e aprovado',
      'O mais barato disponível',
      'O que chegou primeiro no estoque',
      'Qualquer um que atenda ao pedido',
    ],
    optionIcons: ['✅', '💰', '📦', '🤔'],
    correct: 'Ingrediente testado e aprovado',
  },
  {
    id: 2,
    fieldLabel: 'Manipulação',
    zone: 'Trabalhe a jogada',
    icon: '🏃',
    question: 'Como o ingrediente é preparado?',
    options: [
      'Pesado em balança calibrada',
      'Pesado no olho',
      'Estimado pela experiência do operador',
      'Medido por volume, não por peso',
    ],
    optionIcons: ['⚖️', '👁️', '🤷', '📏'],
    correct: 'Pesado em balança calibrada',
  },
  {
    id: 3,
    fieldLabel: 'Qualidade',
    zone: 'Assistência de qualidade',
    icon: '⚽',
    question: 'O que fazer antes de liberar o lote?',
    options: [
      'Realizar testes de qualidade',
      'Liberar logo para não atrasar a entrega',
      'Esperar o cliente reclamar',
      'Aprovar visualmente a embalagem',
    ],
    optionIcons: ['🔬', '🚀', '😒', '👀'],
    correct: 'Realizar testes de qualidade',
  },
  {
    id: 4,
    fieldLabel: 'Gol',
    zone: 'Finalize no capricho!',
    icon: '🥅',
    question: 'Quando o produto pode sair para o mercado?',
    options: [
      'Após aprovação do controle de qualidade',
      'Assim que a produção terminar',
      'Quando o estoque estiver cheio',
      'Depois de 24h de descanso',
    ],
    optionIcons: ['✅', '⏩', '📦', '⏰'],
    correct: 'Após aprovação do controle de qualidade',
  },
]

export function getResult(errors) {
  if (errors === 0) return { label: 'Golaço! Seu produto está pronto para o mercado!', icon: '🏆', tier: 'champion' }
  if (errors === 1) return { label: 'Na trave! Revise o processo.', icon: '🟨', tier: 'warning' }
  return { label: 'Cartão vermelho! O produto foi reprovado.', icon: '🟥', tier: 'danger' }
}
