import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Letter from './pages/Letter'
import Gallery from './pages/Gallery'
import PdfReader from './pages/PdfReader'
import { BookOpen } from 'lucide-react'
import { snkData, nanaData, thgData, narutoData } from './data'

function App() {
  const [globalTheme, setGlobalTheme] = useState<'goth' | 'floral'>(() => {
    return (localStorage.getItem('appTheme') as 'goth' | 'floral') || 'goth';
  });

  const toggleTheme = () => {
    const newTheme = globalTheme === 'goth' ? 'floral' : 'goth';
    setGlobalTheme(newTheme);
    localStorage.setItem('appTheme', newTheme);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const isReading = location.pathname === '/read';

  return (
    <>
      <Routes>
        <Route path="/" element={<Home theme={globalTheme} toggleTheme={toggleTheme} />} />
        <Route path="/letter" element={<Letter theme={globalTheme} />} />
        <Route path="/snk" element={<Gallery title="Shingeki no Kyojin" items={snkData} folder="Snk" bgImage="/img/snklogo.png" titleImage="/img/snktitle.png" theme={globalTheme} />} />
        <Route path="/nana" element={<Gallery title="Nana" items={nanaData} folder="Nana/Nana" bgImage="/img/Nana_anime_logo.png" theme={globalTheme} />} />
        <Route path="/naruto" element={<Gallery title="Naruto" items={narutoData} folder="naruto_pdf" bgImage="/img/narutologo.png" titleImage="/img/narutotitle.svg" theme={globalTheme} />} />
        <Route path="/thg" element={<Gallery title="The Hunger Games" items={thgData} folder="thg" bgImage="/img/logosthg.png" titleImage="/img/thgtitle.png" theme={globalTheme} />} />
        <Route path="/read" element={<PdfReader />} />
      </Routes>

      {/* Global Navigation Menu - Hide when reading PDF */}
      {!isReading && (
        <div className="nav-menu">
        <div className="nav-link" onClick={() => navigate('/')}>
          <img src="/img/jessicon.png" alt="Inicio" className="nav-icon" />
          <span>Inicio</span>
        </div>
        <div className="nav-link" onClick={() => navigate('/letter')}>
          <BookOpen className="nav-icon" />
          <span>Carta</span>
        </div>
        <div className="nav-link" onClick={() => navigate('/snk')}>
          <img src="/img/snkicon.png" alt="SNK" className="nav-icon" />
          <span>SNK</span>
        </div>
        <div className="nav-link" onClick={() => navigate('/nana')}>
          <img src="/img/nanaicon.png" alt="Nana" className="nav-icon" />
          <span>Nana</span>
        </div>
        <div className="nav-link" onClick={() => navigate('/naruto')}>
          <img src="/img/narutologo.png" alt="Naruto" className="nav-icon" />
          <span>Naruto</span>
        </div>
        <div className="nav-link" onClick={() => navigate('/thg')}>
          <img src="/img/thgicon.png" alt="THG" className="nav-icon" />
          <span>THG</span>
        </div>
      </div>
      )}
    </>
  )
}

export default App
