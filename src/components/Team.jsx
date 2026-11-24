import { s } from '../css.js';

export default function Team() {
  return (
    <>
      <section id="equipo" style={s(`padding: 140px 0 140px`)}>
      <div className="wrap" style={s(`display: flex; flex-direction: column; gap: 56px`)}>
      <div style={s(`display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap`)}>
      <div style={s(`display: flex; flex-direction: column; gap: 24px; max-width: 760px`)}>
      <div className="mono kick reveal" style={s(`color: #178F6B`)}>El equipo</div>
      <h2 className="disp h-l reveal" style={s(`font-size: 64px; font-weight: 600`)}>Somos gestores <span className="thin">de innovación.</span></h2>
      </div>
      <p className="reveal" style={s(`margin: 0; max-width: 380px; color: #3D4847; line-height: 1.65`)}>Negocio, tecnología y transformación digital, entre Argentina y Europa.</p>
      </div>
      <div className="g3" style={s(`gap: 28px`)}>
      <article className="team reveal" style={s(`display: flex; flex-direction: column; gap: 22px`)}>
      <div style={s(`aspect-ratio: 4 / 5; overflow: hidden; border-radius: 0 120px 0 0; background: #DFE6E4`)}><img loading="lazy" decoding="async" src="/assets/img/ignacio-noli.jpg" alt="Ignacio Noli" style={s(`width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block`)} /></div>
      <div style={s(`display: flex; flex-direction: column; gap: 8px`)}><h3 className="disp" style={s(`font-size: 30px; font-weight: 600`)}>Ignacio Noli</h3><span className="mono" style={s(`font-size: 11px; color: #178F6B`)}>Co-Founder · Business Director</span><p style={s(`margin: 6px 0 0; color: #3D4847; line-height: 1.6; font-size: 15px`)}>+10 años en gestión empresarial, con visión de largo plazo sobre el rol de los datos en el desarrollo de negocios.</p></div>
      </article>
      <article className="team reveal" style={s(`display: flex; flex-direction: column; gap: 22px; margin-top: 64px`)}>
      <div style={s(`aspect-ratio: 4 / 5; overflow: hidden; border-radius: 0 120px 0 0; background: #DFE6E4`)}><img loading="lazy" decoding="async" src="/assets/img/fernando-unzue.jpg" alt="Fernando Unzué" style={s(`width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block`)} /></div>
      <div style={s(`display: flex; flex-direction: column; gap: 8px`)}><h3 className="disp" style={s(`font-size: 30px; font-weight: 600`)}>Fernando Unzué</h3><span className="mono" style={s(`font-size: 11px; color: #178F6B`)}>Co-Founder · Technology Director</span><p style={s(`margin: 6px 0 0; color: #3D4847; line-height: 1.6; font-size: 15px`)}>+15 años de experiencia internacional en TIC, en banca y retail, implementando programas de loyalty.</p></div>
      </article>
      <article className="team reveal" style={s(`display: flex; flex-direction: column; gap: 22px; margin-top: 128px`)}>
      <div style={s(`aspect-ratio: 4 / 5; overflow: hidden; border-radius: 0 120px 0 0; background: #DFE6E4`)}><img loading="lazy" decoding="async" src="/assets/img/mariano-faiella.jpg" alt="Mariano Faiella" style={s(`width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block`)} /></div>
      <div style={s(`display: flex; flex-direction: column; gap: 8px`)}><h3 className="disp" style={s(`font-size: 30px; font-weight: 600`)}>Mariano Faiella</h3><span className="mono" style={s(`font-size: 11px; color: #178F6B`)}>Co-Founder · Digital Transformation</span><p style={s(`margin: 6px 0 0; color: #3D4847; line-height: 1.6; font-size: 15px`)}>+18 años en energías renovables, transformación digital y gestión de activos basada en datos.</p></div>
      </article>
      </div>
      </div>
      </section>
    </>
  );
}
