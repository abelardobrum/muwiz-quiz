import './ProgressBar.css'

export default function ProgressBar({ total, current }) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current + 1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`progress-dot ${i < current ? 'progress-dot--done' : ''} ${i === current ? 'progress-dot--active' : ''}`}
        />
      ))}
    </div>
  )
}
