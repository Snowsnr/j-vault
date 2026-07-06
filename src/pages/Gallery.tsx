import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, Search } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  file: string;
  cover?: string;
}

interface GalleryProps {
  title: string;
  items: GalleryItem[];
  folder: string;
  bgImage: string;
  titleImage?: string;
  theme: 'goth' | 'floral';
}

const BASE_URL = 'https://github.com/Snowsnr/j-vault/releases/download/v1.0/';

export default function Gallery({ title, items, folder, bgImage, titleImage, theme }: GalleryProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const isGoth = theme === 'goth';
  const bgColor = isGoth ? 'var(--goth-bg)' : 'var(--floral-bg)';
  const textColor = isGoth ? 'var(--goth-text)' : 'var(--floral-text)';
  
  const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <div className="page-container animate-fade-in" style={{background: bgColor, paddingBottom: '100px'}}>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: 'none' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'transparent', border: 'none', color: textColor, 
          position: 'absolute', left: 0, padding: '0.5rem', cursor: 'pointer', zIndex: 10
        }}>
          <ArrowLeft size={32} />
        </button>
        <h1 style={{color: textColor, fontFamily: isGoth ? 'var(--font-goth)' : 'var(--font-floral)', fontSize: '1.8rem', textAlign: 'center', margin: '0 40px'}}>
          {title}
        </h1>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem', position: 'relative', height: '200px'}}>
        {bgImage && <img src={bgImage} alt={`${title} background`} style={{position: 'absolute', maxHeight: '200px', objectFit: 'contain', opacity: 0.3, filter: isGoth ? 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' : 'none'}} />}
        {titleImage && (
          <img src={titleImage} alt={`${title} logo`} style={{position: 'relative', zIndex: 2, maxHeight: '120px', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'}} />
        )}
        {!bgImage && !titleImage && (
          <h2 style={{fontFamily: 'var(--font-goth)', color: textColor, opacity: 0.5, fontSize: '4rem'}}>{title}</h2>
        )}
      </div>

      {/* Buscador */}
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
        <div style={{
          position: 'relative', width: '100%', maxWidth: '400px', 
          background: isGoth ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          borderRadius: '20px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center',
          border: `1px solid ${isGoth ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`
        }}>
          <Search size={20} color={textColor} style={{opacity: 0.7, marginRight: '0.5rem'}} />
          <input 
            type="text" 
            placeholder="Buscar por tomo o título..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent', border: 'none', color: textColor, width: '100%',
              outline: 'none', fontSize: '1rem', fontFamily: 'var(--font-floral)'
            }}
          />
        </div>
      </div>

      <div className="gallery-grid">
        {filteredItems.map(item => {
          const savedPage = localStorage.getItem(`bookmark-/${folder}/${item.file}`);
          const totalPagesStr = localStorage.getItem(`totalpages-/${folder}/${item.file}`);
          const totalPages = totalPagesStr ? parseInt(totalPagesStr, 10) : 200;
          
          return (
            <div key={item.id} className="card" style={{background: isGoth ? 'var(--goth-bg-card)' : 'white', borderColor: isGoth ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'}}>
              <div style={{height: '250px', overflow: 'hidden', background: 'var(--goth-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {item.cover ? (
                  <img src={item.cover} alt={`Portada de ${item.title}`} style={{width: '100%', height: '100%', objectFit: 'contain', padding: '0.5rem'}} loading="lazy" />
                ) : (
                  <div style={{
                    width: '100%', height: '100%', 
                    background: `linear-gradient(45deg, var(--main-blue), ${isGoth ? '#1b263b' : '#a2d2ff'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem', textAlign: 'center', color: 'white',
                    fontFamily: 'var(--font-goth)', fontSize: '1.2rem'
                  }}>
                    {item.title}
                  </div>
                )}
              </div>
              
              <div className="card-content">
                <h3 className="card-title" style={{color: textColor, fontSize: '1rem', height: '45px', overflow: 'hidden'}}>{item.title}</h3>
                <div className="card-actions" style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                  <button onClick={() => navigate(`/read?file=${encodeURIComponent(`${BASE_URL}${item.file}`)}&title=${encodeURIComponent(item.title)}&theme=${theme}`)} className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                    <BookOpen size={18} /> 
                    {savedPage && parseInt(savedPage, 10) > 1 ? `Continuar (Pág. ${savedPage})` : 'Leer en línea'}
                  </button>
                  
                  {savedPage && parseInt(savedPage, 10) > 1 && (
                    <div style={{ width: '100%', height: '6px', background: isGoth ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${Math.min(100, (parseInt(savedPage, 10) / totalPages) * 100)}%`, 
                        height: '100%', 
                        background: 'var(--main-blue)'
                      }} />
                    </div>
                  )}

                  <a href={`/${folder}/${item.file}`} download className="btn-primary" style={{width: '100%', justifyContent: 'center', background: 'transparent', border: '1px solid var(--main-blue)', color: isGoth ? 'white' : 'var(--main-blue)'}}>
                    <Download size={18} /> Descargar
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
