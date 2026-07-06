import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Eye, Moon } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker for react-pdf using unpkg CDN to avoid Vite module resolution issues
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfReader() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fileUrl = searchParams.get('file');
  const title = searchParams.get('title') || 'Lectura';
  const theme = searchParams.get('theme') || 'goth';

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(() => {
    const saved = localStorage.getItem(`bookmark-${fileUrl}`);
    return saved ? parseInt(saved, 10) : 1;
  });
  const [scale, setScale] = useState(1.0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isRulerActive, setIsRulerActive] = useState(false);
  const [rulerY, setRulerY] = useState(300);
  const [readMode, setReadMode] = useState<'normal' | 'sepia' | 'dark'>('normal');
  const [pageInputStr, setPageInputStr] = useState("");
  const [showUI, setShowUI] = useState(true);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Update input string when page changes externally
  useEffect(() => {
    setPageInputStr(pageNumber.toString());
  }, [pageNumber]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (fileUrl && pageNumber) {
      localStorage.setItem(`bookmark-${fileUrl}`, pageNumber.toString());
    }
  }, [pageNumber, fileUrl]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPdfError(null);
    if (fileUrl) {
      localStorage.setItem(`totalpages-${fileUrl}`, numPages.toString());
    }
  }

  function onDocumentLoadError(error: Error) {
    console.error("PDF Load Error:", error);
    setPdfError(error.message);
  }

  const isGoth = theme === 'goth';
  const bgColor = isGoth ? 'var(--goth-bg)' : 'var(--floral-bg)';
  const textColor = isGoth ? 'var(--goth-text)' : 'var(--floral-text)';

  if (!fileUrl) {
    return <div style={{padding: '2rem', color: 'white', textAlign: 'center'}}>Archivo no encontrado.</div>;
  }

  // Auto scale based on mobile width
  const baseScale = windowWidth < 768 ? (windowWidth / 600) : 1.2;
  const currentScale = baseScale * scale;

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!numPages) return;
    
    // If ruler is active, don't change pages on click to allow dragging
    if (isRulerActive) return;

    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    
    // Si hace click en el 40% derecho avanza, si hace click en el 40% izquierdo retrocede
    // Si hace click en el 20% del centro, alterna la visibilidad de la interfaz
    if (clickX > screenWidth * 0.6) {
      setPageNumber(p => Math.min(numPages, p + 1));
    } else if (clickX < screenWidth * 0.4) {
      setPageNumber(p => Math.max(1, p - 1));
    } else {
      setShowUI(!showUI);
    }
  };

  const handleRulerMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isRulerActive) return;
    // Prevenir scroll mientras se mueve la regla
    // e.preventDefault(); (done via CSS touch-action: none on the overlay)
    
    let y = 0;
    if ('touches' in e) {
      y = e.touches[0].clientY;
    } else {
      y = (e as React.MouseEvent).clientY;
    }
    setRulerY(y);
  };

  return (
    <div style={{ background: bgColor, color: textColor, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)',
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
        transform: showUI ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          <button onClick={() => navigate(-1)} style={{
            background: 'transparent', border: 'none', color: textColor,
            padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center'
          }}>
            <ArrowLeft size={28} />
          </button>
        </div>
        <h3 style={{margin: 0, fontSize: windowWidth < 768 ? '1rem' : '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '40%', textAlign: 'center', flex: 1}}>
          {title}
        </h3>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button 
            onClick={() => setReadMode(m => m === 'normal' ? 'sepia' : (m === 'sepia' ? 'dark' : 'normal'))} 
            style={{background: readMode !== 'normal' ? 'var(--main-blue)' : 'transparent', border: 'none', color: readMode !== 'normal' ? 'white' : textColor, cursor: 'pointer', padding: '0.2rem', borderRadius: '4px'}}
            title="Modo Lectura"
          >
            <Moon size={24} />
          </button>
          <button 
            onClick={() => setIsRulerActive(!isRulerActive)} 
            style={{background: isRulerActive ? 'var(--main-blue)' : 'transparent', border: 'none', color: isRulerActive ? 'white' : textColor, cursor: 'pointer', padding: '0.2rem', borderRadius: '4px'}}
            title="Guía de Lectura"
          >
            <Eye size={24} />
          </button>
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))} style={{background: 'transparent', border: 'none', color: textColor, cursor: 'pointer'}}><ZoomOut size={24} /></button>
          <button onClick={() => setScale(s => Math.min(3, s + 0.2))} style={{background: 'transparent', border: 'none', color: textColor, cursor: 'pointer'}}><ZoomIn size={24} /></button>
        </div>
      </div>

      {/* PDF Container with Click Navigation and Reading Filters */}
      <div 
        onClick={handlePageClick}
        style={{ 
          flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto', 
          padding: '1rem', paddingBottom: '80px', cursor: 'pointer', userSelect: 'none',
          filter: readMode === 'sepia' ? 'sepia(0.6) contrast(0.9) brightness(0.9)' : 
                  readMode === 'dark' ? 'invert(1) hue-rotate(180deg) brightness(0.8)' : 'none',
          transition: 'filter 0.3s ease'
        }}
      >
        {pdfError ? (
          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <div style={{background: 'rgba(255, 165, 0, 0.2)', borderBottom: '1px solid orange', color: textColor, padding: '0.8rem', textAlign: 'center', fontSize: '0.9rem'}}>
              ⚠️ Este archivo tiene una estructura no estándar. Usando lector nativo (las funciones personalizadas estarán desactivadas).
            </div>
            <iframe src={fileUrl} style={{width: '100%', flex: 1, border: 'none', background: 'white'}} title="PDF Nativo" />
          </div>
        ) : (
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div style={{padding: '2rem', textAlign: 'center'}}>Cargando el archivo... (Esto puede tomar un momento para archivos grandes)</div>}
          >
            <Page 
              pageNumber={pageNumber} 
              scale={currentScale} 
              renderTextLayer={false} 
              renderAnnotationLayer={false}
              className="pdf-page-shadow"
            />
          </Document>
        )}
      </div>

      {/* Bottom Controls */}
      {numPages && !pdfError && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: `translateX(-50%) ${showUI ? 'translateY(0)' : 'translateY(150px)'}`,
          background: 'var(--main-blue)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '30px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 100, width: '85%', maxWidth: '400px',
          transition: 'transform 0.3s ease-in-out'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '1rem'}}>
            <button 
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(p => Math.max(1, p - 1))}
              style={{background: 'transparent', border: 'none', color: pageNumber <= 1 ? 'rgba(255,255,255,0.5)' : 'white', cursor: 'pointer', display: 'flex'}}
            >
              <ChevronLeft size={24} />
            </button>
            <div style={{fontFamily: 'var(--font-floral)', fontWeight: 'bold', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              Pág. 
              <input 
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={pageInputStr}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setPageInputStr(e.target.value)}
                onBlur={() => {
                  const val = parseInt(pageInputStr, 10);
                  if (!isNaN(val) && val >= 1 && val <= numPages) {
                    setPageNumber(val);
                  } else {
                    setPageInputStr(pageNumber.toString());
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseInt(pageInputStr, 10);
                    if (!isNaN(val) && val >= 1 && val <= numPages) {
                      setPageNumber(val);
                    } else {
                      setPageInputStr(pageNumber.toString());
                    }
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                style={{
                  width: '50px', textAlign: 'center', borderRadius: '4px', 
                  border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.2)', 
                  color: 'white', padding: '0.2rem', outline: 'none'
                }}
              /> 
              de {numPages}
            </div>
            <button 
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
              style={{background: 'transparent', border: 'none', color: pageNumber >= numPages ? 'rgba(255,255,255,0.5)' : 'white', cursor: 'pointer', display: 'flex'}}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <input 
            type="range" 
            min="1" 
            max={numPages} 
            value={pageNumber} 
            onChange={(e) => setPageNumber(parseInt(e.target.value, 10))}
            style={{width: '100%', cursor: 'pointer'}}
          />
        </div>
      )}

      {/* Reading Ruler Overlay */}
      {isRulerActive && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            zIndex: 90, touchAction: 'none', overflow: 'hidden'
          }}
          onMouseMove={handleRulerMove}
          onTouchMove={handleRulerMove}
        >
          {/* The clear window */}
          <div style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '60px', // Height of the reading window
            top: `${rulerY - 30}px`, // Centered on mouse/finger
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)', // Darken everything else heavily
            borderTop: '2px solid rgba(255,255,255,0.5)',
            borderBottom: '2px solid rgba(255,255,255,0.5)',
            pointerEvents: 'none', // Allow clicks to pass through to the overlay background if needed
            transition: 'top 0.05s linear' // Smooth out the movement slightly
          }}></div>
        </div>
      )}
    </div>
  );
}
