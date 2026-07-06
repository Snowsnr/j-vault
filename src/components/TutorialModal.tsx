import { X, Moon, Eye, BookOpen, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isGoth: boolean;
}

export default function TutorialModal({ isOpen, onClose, isGoth }: Props) {
  if (!isOpen) return null;

  const bgColor = isGoth ? 'var(--goth-bg-card)' : 'var(--floral-bg-card)';
  const textColor = isGoth ? 'var(--goth-text)' : 'var(--floral-text)';
  const titleColor = isGoth ? '#a2d2ff' : 'var(--main-blue)';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div className="animate-slide-up" style={{
        background: bgColor, color: textColor, borderRadius: '20px', padding: '2.5rem 2rem',
        maxWidth: '500px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
        position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        border: isGoth ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent',
          border: 'none', color: textColor, cursor: 'pointer', padding: '0.5rem'
        }}>
          <X size={28} />
        </button>

        <h2 style={{ color: titleColor, fontFamily: 'var(--font-goth)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          Guía de Uso
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--main-blue)', padding: '0.6rem', borderRadius: '50%', color: 'white', flexShrink: 0 }}>
              <BookOpen size={24} />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.3rem', fontSize: '1.1rem' }}>Lector Incorporado</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>Al leer un manga, <strong>toca el lado derecho</strong> de la pantalla para avanzar y el <strong>lado izquierdo</strong> para retroceder. Toca el centro para mostrar u ocultar los controles.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--main-blue)', padding: '0.6rem', borderRadius: '50%', color: 'white', flexShrink: 0 }}>
              <Moon size={24} />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.3rem', fontSize: '1.1rem' }}>Filtros</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>Dentro del lector, pulsa el botón de la luna para alternar entre el modo normal, filtro sepia para descanso visual y modo nocturno invertido.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--main-blue)', padding: '0.6rem', borderRadius: '50%', color: 'white', flexShrink: 0 }}>
              <Eye size={24} />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.3rem', fontSize: '1.1rem' }}>Regla de Lectura</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>Si te pierdes en los diálogos, activa el botón del ojo en el lector para mostrar una regla resaltadora que puedes arrastrar con el dedo.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--main-blue)', padding: '0.6rem', borderRadius: '50%', color: 'white', flexShrink: 0 }}>
              <Save size={24} />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.3rem', fontSize: '1.1rem' }}>Guardado Automático</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.5' }}>La aplicación recuerda exactamente en qué página te quedaste y te mostrará tu progreso en las galerías.</p>
            </div>
          </div>

        </div>

        <button onClick={onClose} style={{
          width: '100%', padding: '1rem', marginTop: '2.5rem', background: 'var(--main-blue)',
          color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem',
          fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(2, 62, 138, 0.4)'
        }}>
          ¡Entendido!
        </button>

      </div>
    </div>
  );
}
