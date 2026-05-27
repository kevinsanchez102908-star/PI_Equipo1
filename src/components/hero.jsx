import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/* ════════════════════════════════════════════════════════════
   PARTÍCULAS flotantes
════════════════════════════════════════════════════════════ */
function Particles() {
  const particles = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1.5 + Math.random() * 3,
    dur: `${8 + Math.random() * 18}s`,
    delay: `${Math.random() * 12}s`,
    r: Math.random() > 0.6 ? 229 : 255,
    g: Math.random() > 0.6 ? 9 : Math.floor(Math.random() * 100),
    b: Math.random() > 0.6 ? 20 : Math.floor(Math.random() * 80),
  }));
  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: `rgba(${p.r},${p.g},${p.b},0.7)`,
            filter: "blur(1px)",
            animation: `hero-float ${p.dur} ease-in-out ${p.delay} infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   TYPING ANIMATION (sin librería extra)
════════════════════════════════════════════════════════════ */
const PHRASES = [
  "Innovación tecnológica.",
  "Creatividad académica.",
  "Proyecto futurista.",
  "Equipo 1 · Grupo 617.",
];

function TypeWriter() {
  const [ph, setPh] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => { setDeleting(true); setPause(false); }, 1800);
      return () => clearTimeout(t);
    }
    const full = PHRASES[ph];
    const speed = deleting ? 32 : 55;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) setPause(true);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setPh((ph + 1) % PHRASES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, pause, ph]);

  return (
    <span>
      {text}
      <span style={{
        display: "inline-block", width: 2, height: "1em",
        background: "#e50914", marginLeft: 2, verticalAlign: "middle",
        animation: "hero-blink 1s step-end infinite",
      }} />
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   COUNTER animado
════════════════════════════════════════════════════════════ */
function Counter({ target, suffix = "", delay = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        let start = null;
        const dur = 1600;
        const step = (ts) => {
          if (!start) start = ts + delay * 1000;
          const elapsed = ts - start;
          if (elapsed < 0) { requestAnimationFrame(step); return; }
          const prog = Math.min(elapsed / dur, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          setVal(Math.floor(eased * target));
          if (prog < 1) requestAnimationFrame(step);
          else setVal(target);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, delay]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ════════════════════════════════════════════════════════════
   CURSOR PERSONALIZADO
════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 200, damping: 24 });
  const sy = useSpring(my, { stiffness: 200, damping: 24 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    const over = (e) => { if (e.target.closest("a,button,[data-cursor]")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: 6, height: 6, borderRadius: "50%",
          background: "#e50914", pointerEvents: "none",
          x: mx, y: my,
          translateX: "-50%", translateY: "-50%",
        }}
      />
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9998,
          width: hovered ? 44 : 28, height: hovered ? 44 : 28,
          borderRadius: "50%",
          border: `1.5px solid rgba(229,9,20,${hovered ? 0.8 : 0.45})`,
          pointerEvents: "none",
          x: sx, y: sy,
          translateX: "-50%", translateY: "-50%",
          transition: "width 0.25s, height 0.25s, border-color 0.25s",
        }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   ESCUDO con efectos
════════════════════════════════════════════════════════════ */
function Shield() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, x: 60 }}
      animate={mounted ? { opacity: 1, scale: 1, x: 0 } : {}}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {[200, 260, 320].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size, height: size,
            borderRadius: "50%",
            border: `1px solid rgba(229,9,20,${0.12 - i * 0.03})`,
            animation: `hero-spin-${i % 2 === 0 ? "cw" : "ccw"} ${22 + i * 8}s linear infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(229,9,20,0.22) 0%, transparent 65%)",
        filter: "blur(30px)",
        animation: "hero-glow-breathe 4s ease-in-out infinite",
      }} />

      <motion.img
        src="/images/Escudo.png"
        alt="Escudo"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "clamp(180px, 22vw, 340px)",
          objectFit: "contain",
          filter: "drop-shadow(0 0 40px rgba(229,9,20,0.5)) drop-shadow(0 0 90px rgba(229,9,20,0.2))",
          position: "relative", zIndex: 2,
        }}
      />
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN HERO
════════════════════════════════════════════════════════════ */
export default function Hero() {
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setShowIntro(false), 2800);
    const t2 = setTimeout(() => setReady(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000; cursor: none; }

        @keyframes hero-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0.5; }
          33%  { transform: translateY(-28px) translateX(12px); opacity: 1; }
          66%  { transform: translateY(-14px) translateX(-8px); opacity: 0.7; }
          100% { transform: translateY(0) translateX(0); opacity: 0.5; }
        }

        @keyframes hero-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes hero-spin-cw  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes hero-spin-ccw { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }

        @keyframes hero-glow-breathe {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%       { transform: scale(1.15); opacity: 1; }
        }

        @keyframes hero-scanline {
          0%   { top: -8px; }
          100% { top: 100%; }
        }

        @keyframes hero-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(229,9,20,0); }
          50%       { box-shadow: 0 0 0 8px rgba(229,9,20,0); }
        }

        @keyframes hero-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes hero-load {
          0%   { width: 0%; }
          60%  { width: 72%; }
          85%  { width: 88%; }
          100% { width: 100%; }
        }

        .hero-shimmer-text {
          background: linear-gradient(
            90deg,
            #e50914 0%,
            #fff 30%,
            #ff4d4d 50%,
            #fff 70%,
            #e50914 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hero-shimmer 4s linear infinite;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          border-radius: 6px;
          background: #e50914;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: none;
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
        }
        .hero-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .hero-btn-primary:hover {
          transform: scale(1.06);
          box-shadow: 0 0 35px rgba(229,9,20,0.55);
        }
        .hero-btn-primary:hover::after { opacity: 1; }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 34px;
          border-radius: 6px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(6px);
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(229,9,20,0.5);
          transform: scale(1.04);
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #e50914; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
      `}</style>

      <CustomCursor />

      {/* ── PANTALLA DE INTRO ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "fixed", inset: 0, zIndex: 9990,
              background: "#000",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 32,
            }}
          >
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              letterSpacing: "0.15em",
            }}
              className="hero-shimmer-text"
            >
              PROYECTO INTEGRADOR
            </div>

            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: "0.4em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
            }}>
              Grupo 617 · Equipo 1 · 6° Semestre
            </div>

            <div style={{
              width: "clamp(220px,30vw,380px)", height: 2,
              background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: 2, background: "#e50914",
                animation: "hero-load 2.5s cubic-bezier(0.4,0,0.2,1) forwards",
              }} />
            </div>

            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, letterSpacing: "0.35em",
              textTransform: "uppercase", color: "rgba(229,9,20,0.6)",
            }}>
              Iniciando transmisión
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════
          HERO PRINCIPAL
      ════════════════════════════════════════ */}
      <main style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "none",
      }}>

        {/* ── PARTÍCULAS ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
          <Particles />
        </div>

        {/* ── LUZ DIAGONAL TIPO CINEMASCOPE ── */}
        <div style={{
          position: "absolute", zIndex: 2, pointerEvents: "none",
          top: "35%", right: "-25%",
          width: "200vh", height: "8vh",
          background: "linear-gradient(112deg, rgba(229,9,20,0.18), rgba(255,100,100,0.08), transparent 70%)",
          filter: "blur(60px)",
          transform: "rotate(-28deg)",
        }} />

        {/* ── VIGNETTE ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)",
        }} />

        {/* ── SCANLINE ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
          background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.055) 3px, rgba(0,0,0,0.055) 4px)",
        }} />

        {/* ── SCANLINE MÓVIL ── */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2, zIndex: 5,
          background: "linear-gradient(90deg, transparent, rgba(229,9,20,0.15), transparent)",
          animation: "hero-scanline 8s linear infinite",
          pointerEvents: "none",
        }} />

        {/* ── GRAIN ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none", opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* ════════════════════════════════════════
            NAVBAR
        ════════════════════════════════════════ */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0,
            zIndex: 40,
            padding: "18px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 3, height: 26, background: "#e50914", borderRadius: 2 }} />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.4rem", letterSpacing: "0.15em", color: "#fff",
            }}>
              PROYECTO INTEGRADOR
            </span>
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing: "0.3em",
              textTransform: "uppercase", padding: "3px 9px", borderRadius: 3,
              background: "#e50914", color: "#fff",
            }}>
              6° SEM
            </span>
          </div>

          <div style={{
            display: "flex", gap: 30,
            fontSize: 11, color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.3em", textTransform: "uppercase",
          }}>
            {["Inicio", "Equipo", "Proyectos"].map(s => (
              <a
                key={s} href="#"
                style={{ color: "inherit", textDecoration: "none", cursor: "none" }}
                onMouseOver={e => e.target.style.color = "#fff"}
                onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.35)"}
              >
                {s}
              </a>
            ))}
          </div>

          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid rgba(229,9,20,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "none",
          }}>
            <div style={{ width: 14, height: 1.5, background: "#fff", marginBottom: 3, borderRadius: 2 }} />
          </div>
        </motion.nav>

        {/* ════════════════════════════════════════
            CONTENIDO PRINCIPAL
        ════════════════════════════════════════ */}
        <div style={{
          position: "relative", zIndex: 20,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "clamp(40px,5vw,80px)",
          alignItems: "center",
          padding: "120px clamp(24px,6vw,80px) 80px",
        }}>

          {/* ── COLUMNA IZQUIERDA ── */}
          <div style={{ maxWidth: 700 }}>

            {/* Badge intro */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ marginBottom: 28 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "7px 18px 7px 7px",
                borderRadius: 40,
                background: "rgba(229,9,20,0.1)",
                border: "1px solid rgba(229,9,20,0.3)",
                animation: "hero-badge-pulse 3s ease-in-out infinite",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "#e50914",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12,
                }}>
                  ◆
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 800,
                  letterSpacing: "0.35em", textTransform: "uppercase",
                  color: "rgba(229,9,20,0.9)",
                }}>
                  Preparatoria No. 1 · UAEMéx
                </span>
              </div>
            </motion.div>

            {/* Título principal */}
            <div style={{ overflow: "hidden", marginBottom: 6 }}>
              <motion.div
                initial={{ y: "105%", opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "0.04em",
                }}
                className="hero-shimmer-text"
              >
                PROYECTO
              </motion.div>
            </div>

            <div style={{ overflow: "hidden", marginBottom: 6 }}>
              <motion.div
                initial={{ y: "105%", opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "0.04em",
                  color: "#fff",
                }}
              >
                INTEGRADOR
              </motion.div>
            </div>

            <div style={{ overflow: "hidden", marginBottom: 28 }}>
              <motion.div
                initial={{ y: "105%", opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.47 }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                  lineHeight: 1,
                  letterSpacing: "0.08em",
                  color: "rgba(229,9,20,0.7)",
                }}
              >
                6° Semestre · Equipo 1
              </motion.div>
            </div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.65 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                fontWeight: 700,
                color: "#e50914",
                marginBottom: 22,
                minHeight: 36,
                letterSpacing: "0.03em",
              }}
            >
              <TypeWriter />
            </motion.div>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.75 }}
              style={{
                fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.5)",
                maxWidth: 540,
                fontWeight: 300,
                marginBottom: 40,
              }}
            >
              Bienvenido al Proyecto Integrador del Grupo 617.
              En esta plataforma podrás explorar la información del equipo,
              proyectos académicos y experiencias visuales desarrolladas mediante
              creatividad, innovación y tecnología.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
            >
              <a href="#" className="hero-btn-primary" data-cursor>
                <span style={{ fontSize: 16 }}>▶</span>
                Explorar proyecto
              </a>
              <a href="#" className="hero-btn-secondary" data-cursor>
                ↓ Ver más
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              style={{
                display: "flex", gap: 36, marginTop: 52,
                paddingTop: 36,
                borderTop: "1px solid rgba(229,9,20,0.12)",
                flexWrap: "wrap",
              }}
            >
              {[
                { val: 6, suf: "°", label: "Semestre" },
                { val: 617, suf: "", label: "Grupo" },
                { val: 6, suf: "", label: "Integrantes" },
                { val: 6, suf: "+", label: "Proyectos" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1, color: "#e50914",
                    letterSpacing: "0.04em",
                  }}>
                    <Counter target={s.val} suffix={s.suf} delay={i * 0.12} />
                  </div>
                  <div style={{
                    fontSize: 10, letterSpacing: "0.3em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                    marginTop: 4,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── ESCUDO ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}
          >
            <Shield />
          </motion.div>

        </div>

        {/* ════════════════════════════════════════
            BOTTOM META BAR
        ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            zIndex: 25,
            padding: "18px clamp(24px,6vw,80px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            borderTop: "1px solid rgba(229,9,20,0.1)",
            background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
            flexWrap: "wrap", gap: 12,
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
          }}>
            {["2025", "Toluca, Mex", "HD"].map((m, i) => (
              <span key={i} style={{
                fontSize: 10, letterSpacing: "0.25em",
                color: i === 0 ? "#e50914" : "rgba(255,255,255,0.3)",
                fontWeight: 600, textTransform: "uppercase",
              }}>
                {m}
              </span>
            ))}
            <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)" }} />
            <span style={{
              fontSize: 9, letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
            }}>
              Preparatoria No. 1 · UAEMéx
            </span>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 9, letterSpacing: "0.4em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
          }}>
            <div style={{
              width: 1, height: 28,
              background: "linear-gradient(to bottom, transparent, rgba(229,9,20,0.7))",
              animation: "hero-scanline 2s ease-in-out infinite",
            }} />
            Scroll
          </div>
        </motion.div>

        {/* ── BORDES DECORATIVOS LATERALES ── */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(229,9,20,0.3) 40%, rgba(229,9,20,0.3) 60%, transparent)",
          zIndex: 20, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(229,9,20,0.15) 40%, rgba(229,9,20,0.15) 60%, transparent)",
          zIndex: 20, pointerEvents: "none",
        }} />

        {/* ── CORNER MARKS ── */}
        {[
          { top: 14, left: 14 },
          { top: 14, right: 14 },
          { bottom: 14, left: 14 },
          { bottom: 14, right: 14 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.4 + i * 0.07 }}
            style={{
              position: "absolute", ...pos,
              width: 16, height: 16, zIndex: 30, pointerEvents: "none",
              borderTop: i < 2 ? "1.5px solid rgba(229,9,20,0.5)" : "none",
              borderBottom: i >= 2 ? "1.5px solid rgba(229,9,20,0.5)" : "none",
              borderLeft: i % 2 === 0 ? "1.5px solid rgba(229,9,20,0.5)" : "none",
              borderRight: i % 2 === 1 ? "1.5px solid rgba(229,9,20,0.5)" : "none",
            }}
          />
        ))}

      </main>
    </>
  );
}