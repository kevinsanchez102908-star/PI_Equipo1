import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════
   IMAGEN — Nevado de Toluca (Wikipedia Commons,
   licencia libre, sin derechos)
═══════════════════════════════════════════════ */
const NEVADO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nevado_de_Toluca_from_the_west.jpg/1920px-Nevado_de_Toluca_from_the_west.jpg";

/* ═══════════════════════════════════════════════
   ESTILOS
═══════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');

  #nevado-sep { overflow: hidden; }

  /* Partícula de nieve */
  @keyframes snowfall {
    0%   { transform: translateY(-10px) translateX(0px) rotate(0deg); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(100vh) translateX(40px) rotate(360deg); opacity: 0; }
  }

  .snow-particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.7);
    animation: snowfall linear infinite;
    pointer-events: none;
  }

  /* Línea de escaneo */
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  /* Texto reveal */
  @keyframes revealUp {
    from { clip-path: inset(0 0 100% 0); transform: translateY(20px); }
    to   { clip-path: inset(0 0 0% 0);   transform: translateY(0); }
  }

  .nevado-title-reveal {
    animation: revealUp 1.4s cubic-bezier(.16,1,.3,1) forwards;
    animation-play-state: paused;
  }
  .nevado-title-reveal.play {
    animation-play-state: running;
  }

  /* Shimmer en texto */
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .nevado-shimmer {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.6) 0%,
      rgba(255,255,255,1) 30%,
      rgba(212,180,120,1) 50%,
      rgba(255,255,255,1) 70%,
      rgba(255,255,255,0.6) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* Pulse del borde */
  @keyframes borderPulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.7; }
  }
  .nevado-border-pulse {
    animation: borderPulse 3s ease-in-out infinite;
  }
`;

/* ═══════════════════════════════════════════════
   PARTÍCULAS DE NIEVE
═══════════════════════════════════════════════ */
function SnowParticles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="snow-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: 0,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════ */
const NevadoSeparador = () => {
  const sectionRef   = useRef(null);
  const titleRef     = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Inject styles */
  useEffect(() => {
    if (document.getElementById("nevado-styles")) return;
    const tag = document.createElement("style");
    tag.id = "nevado-styles";
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  /* Intersection observer para el título */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Parallax scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY      = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY     = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const scale     = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  const smoothY   = useSpring(imgY,  { stiffness: 80, damping: 30 });
  const smoothTY  = useSpring(textY, { stiffness: 60, damping: 25 });

  return (
    <div ref={sectionRef} id="nevado-sep" style={{ position: "relative" }}>

      {/* ── SECCIÓN ── */}
      <motion.section
        style={{ opacity }}
        className="relative"
        aria-label="Nevado de Toluca — separador"
      >
        {/* Altura de la sección */}
        <div style={{ height: "90vh", minHeight: 520, position: "relative", overflow: "hidden" }}>

          {/* ── IMAGEN PARALLAX ── */}
          <motion.div
            style={{ y: smoothY, scale, position: "absolute", inset: "-15% 0", zIndex: 0 }}
          >
            <img
              src={NEVADO_URL}
              alt="Nevado de Toluca, Xinantécatl"
              style={{
                width: "100%",
                height: "130%",
                objectFit: "cover",
                objectPosition: "center 40%",
                display: "block",
                filter: "brightness(0.55) saturate(0.8) contrast(1.1)",
              }}
            />
          </motion.div>

          {/* ── GRADIENTES CAPAS ── */}
          {/* Superior — fundido desde sección anterior */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "30%", zIndex: 1,
            background: "linear-gradient(to bottom, #050508 0%, transparent 100%)",
          }} />

          {/* Inferior — fundido hacia sección siguiente */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "35%", zIndex: 1,
            background: "linear-gradient(to top, #07050302, #07050302 10%, transparent 100%)",
            backgroundColor: "#07050302",
          }} />

          {/* Overlay tono frío/azulado */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(135deg, rgba(5,10,20,0.45) 0%, rgba(10,5,15,0.3) 50%, rgba(5,10,20,0.5) 100%)",
          }} />

          {/* Vignette */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
          }} />

          {/* ── NIEVE ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            <SnowParticles />
          </div>

          {/* ── LÍNEA DE ESCANEO sutil ── */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
              animation: "scanline 8s linear infinite",
            }} />
          </div>

          {/* ── CONTENIDO CENTRAL ── */}
          <motion.div
            style={{ y: smoothTY }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6"
          >

            {/* Ornamento superior */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={visible ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "2rem" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: "1rem",
                maxWidth: 440, margin: "0 auto",
              }}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,180,120,0.5))" }} />
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.58rem", letterSpacing: "0.4em",
                  color: "rgba(212,180,120,0.65)", textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  ✦ Xinantécatl ✦
                </span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(212,180,120,0.5), transparent)" }} />
              </div>
            </motion.div>

            {/* Título principal */}
            <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={visible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="nevado-shimmer"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(3rem, 9vw, 8rem)",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Nevado
              </motion.h2>
            </div>

            <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
              <motion.h3
                initial={{ y: 60, opacity: 0 }}
                animate={visible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.4rem, 4vw, 3.5rem)",
                  fontWeight: 400,
                  letterSpacing: "0.35em",
                  color: "rgba(212,180,120,0.7)",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                de Toluca
              </motion.h3>
            </div>

            {/* Divider ornamental */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={visible ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{ marginBottom: "1.75rem" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                maxWidth: 320, margin: "0 auto",
              }}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2))" }} />
                <span style={{ color: "rgba(212,180,120,0.5)", fontSize: "0.8rem" }}>◆</span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)" }} />
              </div>
            </motion.div>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(255,255,255,0.45)",
                maxWidth: 480,
                lineHeight: 1.8,
                letterSpacing: "0.05em",
                marginBottom: "2.5rem",
              }}
            >
              Cuarta montaña más alta de México · 4,680 msnm
              <br />
              Símbolo eterno del Valle de Toluca
            </motion.p>

            {/* Datos estadísticos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.62 }}
              style={{
                display: "flex", gap: "2.5rem", flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                { val: "4,680",  unit: "msnm",   label: "Altitud" },
                { val: "22",     unit: "km",      label: "De Toluca" },
                { val: "1936",   unit: "",        label: "Parque Nacional" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.1 }}
                  style={{
                    textAlign: "center",
                    padding: "0.75rem 1.25rem",
                    background: "rgba(0,0,0,0.35)",
                    border: "1px solid rgba(212,180,120,0.18)",
                    backdropFilter: "blur(12px)",
                  }}
                  className="nevado-border-pulse"
                >
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "1.4rem", fontWeight: 700,
                    color: "#d4a855", lineHeight: 1,
                    marginBottom: "0.1rem",
                  }}>
                    {s.val}
                    <span style={{ fontSize: "0.7rem", opacity: 0.6, marginLeft: "0.2rem" }}>{s.unit}</span>
                  </p>
                  <p style={{
                    fontSize: "0.6rem", letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                    fontFamily: "'Cinzel', serif",
                  }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* ── BORDES DECORATIVOS ── */}
          {/* Esquinas art deco */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.05 }}
              style={{
                position: "absolute", ...pos,
                width: 32, height: 32, zIndex: 10,
                borderTop:    i < 2  ? "1px solid rgba(212,180,120,0.35)" : "none",
                borderBottom: i >= 2 ? "1px solid rgba(212,180,120,0.35)" : "none",
                borderLeft:   i % 2 === 0 ? "1px solid rgba(212,180,120,0.35)" : "none",
                borderRight:  i % 2 === 1 ? "1px solid rgba(212,180,120,0.35)" : "none",
              }}
            />
          ))}

          {/* Crédito foto */}
          <div style={{
            position: "absolute", bottom: 12, right: 16, zIndex: 10,
            fontSize: "0.55rem", color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.08em", fontFamily: "sans-serif",
          }}>
            © Wikimedia Commons
          </div>

        </div>
      </motion.section>
    </div>
  );
};

export default NevadoSeparador;
