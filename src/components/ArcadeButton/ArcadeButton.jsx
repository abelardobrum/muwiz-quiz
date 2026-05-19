import './ArcadeButton.css'

export default function ArcadeButton({ children, variant = 'primary', onClick, disabled, selected, className = '' }) {
  return (
    <button
      className={`arcade-btn arcade-btn--${variant} ${selected ? 'arcade-btn--selected' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
