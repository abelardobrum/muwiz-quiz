import { useNavigate, useSearchParams } from 'react-router-dom'
import qrcode from '../../assets/qrcode.jpg'
import './InstagramGate.css'

export default function InstagramGate() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = searchParams.get('next') || '/'

  return (
    <div className="ig-screen">
      <div className="ig-scanline" aria-hidden="true" />

      <button className="ig-back" onClick={() => navigate('/')} aria-label="Voltar ao menu">
        ◀ Menu
      </button>

      <div className="ig-content">
        <h1 className="ig-title">Siga nossa marca no instagram para jogar!</h1>

        <div className="ig-qr-wrapper">
          <img src={qrcode} alt="QR Code Instagram @muwiz.laboratorio" className="ig-qr" />
        </div>

        <p className="ig-handle">@muwiz.laboratorio</p>

        <button className="ig-play-btn" onClick={() => navigate(next)}>
          Pronto para jogar
          <span className="ig-play-icon">▶</span>
        </button>
      </div>
    </div>
  )
}
