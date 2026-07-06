import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, HelpCircle } from 'lucide-react';
import TutorialModal from '../components/TutorialModal';

export default function Home({ theme, toggleTheme }: { theme: 'goth' | 'floral', toggleTheme: () => void }) {
  const navigate = useNavigate();
  const isGoth = theme === 'goth';
  const bgColor = isGoth ? 'var(--goth-bg)' : 'var(--floral-bg)';
  const textColor = isGoth ? 'var(--goth-text)' : 'var(--floral-text)';
  const secondaryColor = isGoth ? '#a2d2ff' : 'var(--main-blue)';

  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenTutorial');
    if (hasSeen !== 'true') {
      setShowTutorial(true);
      localStorage.setItem('hasSeenTutorial', 'true');
    }
  }, []);

  return (
    <div className="home-container animate-fade-in" style={{ background: bgColor }}>
      
      {/* Help Button */}
      <button onClick={() => setShowTutorial(true)} className="top-corner-btn left-btn" style={{ color: textColor }}>
        <HelpCircle />
      </button>

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className="top-corner-btn right-btn" style={{ color: textColor }}>
        {isGoth ? <Sun /> : <Moon />}
      </button>

      {/* Top Header */}
      <div className="home-header">
        <h1 style={{ color: textColor }}>Felices 20</h1>
        <p style={{ color: secondaryColor }}>Para Jess de parte de Diego &lt;3</p>
      </div>

      <div className="home-grid">
        {/* Carta (Floral) */}
        <div className="home-card card-floral" onClick={() => navigate('/letter')}>
          <img src="/img/lirios2.png" alt="Flores" className="card-bg-img" />
          <div className="card-overlay"></div>
          <div className="card-content-home">
            <h2 style={{ fontFamily: 'var(--font-goth)', color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>Carta</h2>
            <p>Para Jess</p>
          </div>
        </div>

        {/* Nana (Floral/Anime) */}
        <div className="home-card card-floral" onClick={() => navigate('/nana')}>
          <img src="/img/nana.png" alt="Nana BG" className="card-bg-img" />
          <div className="card-overlay"></div>
          <div className="card-content-home">
            <img src="/img/Nana_anime_logo.png" alt="Nana Logo" className="card-logo" />
            <p>Nana</p>
          </div>
        </div>

        {/* SNK (Goth) */}
        <div className="home-card card-goth" onClick={() => navigate('/snk')}>
          <img src="/img/snklevi.png" alt="SNK BG" className="card-bg-img" />
          <div className="card-overlay"></div>
          <div className="card-content-home">
            <img src="/img/snktitle.png" alt="SNK Logo" className="card-logo" style={{ transform: 'scale(1.4)', marginBottom: '1.2rem' }} />
            <p>Shingeki no Kyojin</p>
          </div>
        </div>

        {/* Naruto (Floral) */}
        <div className="home-card card-floral" onClick={() => navigate('/naruto')}>
          <img src="/img/narutofondo.png" alt="Naruto BG" className="card-bg-img" />
          <div className="card-overlay"></div>
          <div className="card-content-home">
            <img src="/img/narutotitle.svg" alt="Naruto Logo" className="card-logo" style={{ transform: 'scale(1.2)', marginBottom: '1rem' }} />
            <p>Naruto</p>
          </div>
        </div>

        {/* THG (Goth) */}
        <div className="home-card card-goth" onClick={() => navigate('/thg')}>
          <img src="/img/thg.png" alt="THG BG" className="card-bg-img" />
          <div className="card-overlay"></div>
          <div className="card-content-home">
            <img src="/img/thgtitle.png" alt="THG Logo" className="card-logo" style={{ transform: 'scale(1.2)', marginBottom: '1rem' }} />
            <p>Los Juegos del Hambre</p>
          </div>
        </div>
      </div>

      <TutorialModal 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        isGoth={isGoth} 
      />
    </div>
  );
}
