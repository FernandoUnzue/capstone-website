import { useEffect, useRef } from 'react';
import { s } from '../css.js';
import { useT } from '../i18n.js';

const TEXT = {
  es: { aria: 'Video: ', close: 'Cerrar video', missing: 'Video a completar', fallback: '¿No se reproduce? Abrir en YouTube ↗' },
  en: { aria: 'Video: ', close: 'Close video', missing: 'Video coming soon', fallback: 'Not playing? Open on YouTube ↗' },
};

export default function Lightbox({ video, onClose }) {
  const t = useT(TEXT);
  const closeRef = useRef(null);
  const id = (video.url.match(/v=([\w-]+)/) || [])[1];

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    return () => prev && prev.focus && prev.focus();
  }, []);

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={t.aria + video.title} onClick={onClose}>
      <div className="lb-box" onClick={(e) => e.stopPropagation()}>
        <div style={s('display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-bottom: 14px; color: #FFFFFF')}>
          <span style={s('display: flex; flex-direction: column; gap: 4px')}><span className="mono" style={s('font-size: 10px; color: #33CC99')}>{video.client}</span><span className="disp" style={s('font-size: 22px; font-weight: 600')}>{video.title}</span></span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t.close} style={s('width: 48px; height: 48px; flex: none; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.06); color: #FFFFFF; font-size: 22px; cursor: pointer')}>×</button>
        </div>
        <div style={s('position: relative; aspect-ratio: 16 / 9; border-radius: 20px; overflow: hidden; background: #000000')}>
          {id ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`} title={video.title} style={s('position: absolute; inset: 0; width: 100%; height: 100%; border: 0')} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen></iframe>
          ) : (
            <div className="ph" style={s('border-radius: 20px')}><span>{t.missing}</span></div>
          )}
        </div>
        {id && <a href={video.url} target="_blank" rel="noopener" style={s('display: inline-block; margin-top: 12px; color: #C9D2D0; font: 500 13px Rubik, sans-serif; text-decoration: underline')}>{t.fallback}</a>}
      </div>
    </div>
  );
}
