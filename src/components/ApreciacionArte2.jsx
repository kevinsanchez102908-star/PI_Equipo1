import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

import imgKevin  from "../assets/Kevin.png";
import imgJulio  from "../assets/Julio.png";
import imgKenia  from "../assets/Kenia.png";
import imgZuriel from "../assets/Zuriel.png";
import imgCabrera from "../assets/Cabrera.png";
import imgMoises from "../assets/Moises.png";

/* ════════════════════════════════════════
   ESTILOS GLOBALES
════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

#stream-section {
  font-family: 'DM Sans', sans-serif;
  background: #050505;
  color: #fff;
  cursor: default;
}

/* Ocultar scrollbar */
.stream-track::-webkit-scrollbar { display: none; }
.stream-track { -ms-overflow-style: none; scrollbar-width: none; }

/* Scanlines sutiles */
#stream-section::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0,0,0,0.06) 3px,
    rgba(0,0,0,0.06) 4px
  );
}

/* Grain */
#stream-section::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── CARD ── */
.s-card {
  position: relative;
  overflow: hidden;
  background: #0e0e0e;
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
  box-shadow: 0 8px 40px rgba(0,0,0,0.55);
  cursor: pointer;
  flex-shrink: 0;
}

.s-card:hover {
  border-color: rgba(229,9,20,0.45);
  box-shadow: 0 0 0 1px rgba(229,9,20,0.2), 0 24px 70px rgba(0,0,0,0.75);
}

.s-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.1s cubic-bezier(.16,1,.3,1), filter 0.8s ease;
  filter: brightness(.82) saturate(0.9);
}

.s-card:hover img {
  transform: scale(1.07);
  filter: brightness(1) saturate(1.05);
}

/* Número decorativo grande */
.s-num {
  position: absolute;
  right: 10px;
  bottom: -18px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 7rem;
  line-height: 1;
  color: rgba(229,9,20,0.07);
  pointer-events: none;
  letter-spacing: -0.02em;
}

/* Gradient overlay */
.s-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.96) 0%,
    rgba(0,0,0,0.5) 28%,
    transparent 60%
  );
}

/* Top badge */
.s-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 3px;
  background: #e50914;
  color: #fff;
  z-index: 4;
}

/* Hover play icon */
.s-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
}
.s-card:hover .s-play { opacity: 1; }

/* ── MODAL BACKDROP ── */
.s-modal-bg {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(22px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Estrellas del fondo */
@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
}

.star-dot {
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: twinkle linear infinite;
}

/* Glow del fondo hero */
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.18; }
  50% { transform: scale(1.08); opacity: 0.28; }
}
.hero-glow {
  animation: breathe 7s ease-in-out infinite;
}
`;

/* ════════════════════════════════════════
   DATA — 6 Lugares y Monumentos de Toluca
════════════════════════════════════════ */
const LUGARES = [
  {
    id: 1,
    n: "01",
    badge: "Monumento",
    imagen: imgKevin,
    titulo: "Monumento Ecuestre a Emiliano Zapata",
    subtitulo: "Paseo Tollocan",
    año: "Bronce · 40 ton",
    duracion: "10 metros de altura",
    descripcion:
      "Colosal escultura de bronce de más de 40 toneladas y 10 metros de altura, obra de Ángela Gurría, la primera mujer en la Academia de Artes de México. Punto histórico de reunión para marchas y mítines campesinos del estado.",
    ubicacion: "Paseo Tollocan, Toluca",
    genero: "Monumento · Historia",
    datos: [
      "La escultura de bronce pesa más de 40 toneladas.",
      "Mide aproximadamente 10 metros de alto.",
      "Obra de Ángela Gurría, primera mujer en la Academia de Artes de México.",
      "Sitio clave donde inician marchas y mítines campesinos del estado.",
      "Fue desplazado para no quedar oculto por puentes vehiculares.",
    ],
  },
  {
    id: 2,
    n: "02",
    badge: "Récord Mundial",
    imagen: imgJulio,
    titulo: "El Cosmovitral Jardín Botánico",
    subtitulo: "Art Nouveau",
    año: "1980",
    duracion: "Visita · 60 min",
    descripcion:
      "El vitral no religioso más grande del planeta, armado con 500,000 piezas de vidrio traídas de Europa. Antes mercado principal de la ciudad, hoy alberga más de 400 especies de plantas de África, Asia y Sudamérica.",
    ubicacion: "Centro Histórico, Toluca",
    genero: "Arte · Botánica",
    datos: [
      "Es el vitral no religioso más grande de todo el planeta.",
      "Armado con unas 500,000 piezas de vidrio traídas de Europa.",
      "Antes de ser obra de arte, el edificio fue el mercado principal de la ciudad.",
      "El Hombre Sol está alineado para iluminarse por completo en el equinoccio.",
      "Alberga más de 400 especies de plantas de África, Asia y Sudamérica.",
    ],
  },
  {
    id: 3,
    n: "03",
    badge: "Volcán",
    imagen: imgKenia,
    titulo: "El Nevado de Toluca",
    subtitulo: "Xinantécatl",
    año: "4,680 msnm",
    duracion: "Senderismo · Todo el día",
    descripcion:
      "La cuarta montaña más alta de México. Alberga dos lagunas de agua dulce a más de 4,200 metros con ofrendas prehispánicas de copal en su fondo. Su nombre náhuatl significa «Hombre Desnudo» por la forma de sus picos.",
    ubicacion: "Municipio de Zinacantepec, Estado de México",
    genero: "Naturaleza · Prehispánico",
    datos: [
      "Cuarta montaña más alta de México, con 4,680 metros.",
      "Tiene dos lagunas de agua dulce a más de 4,200 metros sobre el nivel del mar.",
      "Se han hallado restos de ofrendas prehispánicas de copal en el fondo de las lagunas.",
      "Xinantécatl significa «Hombre Desnudo» por la forma de sus picos desde el valle.",
      "Sus dos cumbres principales son el Pico del Fraile y el Pico del Águila.",
    ],
  },
  {
    id: 4,
    n: "04",
    badge: "Gastronomía",
    imagen: imgZuriel,
    titulo: "La Cubanita",
    subtitulo: "Los Portales",
    año: "Fundada · años 50",
    duracion: "Abierto todos los días",
    descripcion:
      "Una de las torterías tradicionales más antiguas del centro, con más de 70 años de historia. Pionera en popularizar la torta cubana en Toluca y punto de reunión clásico para generaciones de estudiantes de la UAEMex.",
    ubicacion: "Los Portales, Centro Histórico, Toluca",
    genero: "Gastronomía · Tradición",
    datos: [
      "Es de las torterías más antiguas del centro, abierta hace más de 70 años.",
      "Pionera en Toluca en especializarse y hacer famosa la torta cubana.",
      "Desde los años 60, punto de reunión clásico para alumnos de la UAEMex.",
      "Resistió la demolición del antiguo mercado detrás de Los Portales.",
      "Mantiene fama de porciones muy grandes a precios muy accesibles.",
    ],
  },
  {
    id: 5,
    n: "05",
    badge: "Monumento",
    imagen: imgCabrera,
    titulo: "Monumento a Isidro Fabela",
    subtitulo: "Salida Norte",
    año: "Siglo XX",
    duracion: "Visita libre",
    descripcion:
      "Ubicado en la salida norte que conecta Toluca con Atlacomulco, rinde homenaje al gobernador que modernizó la industria y educación del estado. Gran diplomático que defendió a México ante el mundo y da nombre a una de las avenidas más transitadas de la capital.",
    ubicacion: "Av. Isidro Fabela, Toluca",
    genero: "Monumento · Diplomacia",
    datos: [
      "Ubicado exactamente en la salida norte que conecta Toluca con Atlacomulco.",
      "Honra al gobernador que modernizó la industria y educación del estado.",
      "Celebra a Fabela como gran diplomático que defendió a México ante el mundo.",
      "Corona una de las avenidas comerciales más largas y transitadas de la capital.",
      "Funciona como principal punto de referencia para transportistas que entran a la ciudad.",
    ],
  },
  {
    id: 6,
    n: "06",
    badge: "Plaza",
    imagen: imgMoises,
    titulo: "Plaza Jardín Reforma",
    subtitulo: "Centro Histórico",
    año: "Siglo XIX",
    duracion: "Abierto todo el día",
    descripcion:
      "Nombrada en honor al movimiento de Reforma de Benito Juárez, esta plaza arbolada se ubica sobre la Av. Ignacio Zaragoza. Su terreno fue originalmente parte de las huertas del Convento de San Francisco y alberga bustos de hombres ilustres de la historia nacional.",
    ubicacion: "Av. Ignacio Zaragoza, Toluca",
    genero: "Historia · Patrimonio",
    datos: [
      "Nombrada en honor al movimiento de Reforma del siglo XIX de Benito Juárez.",
      "Sobre la Av. Ignacio Zaragoza, a unas calles de Los Portales y del Teatro Morelos.",
      "Alberga diversos bustos y monumentos de hombres ilustres de la historia nacional.",
      "El terreno formaba parte de las huertas del antiguo Convento de San Francisco.",
      "Funciona como oasis urbano arbolado para el descanso de peatones del Centro Histórico.",
    ],
  },
];

/* ════════════════════════════════════════
   FONDO — estrellas + glows estáticos
════════════════════════════════════════ */
function BackgroundFX() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2,
    dur: `${3 + Math.random() * 6}s`,
    delay: `${Math.random() * 6}s`,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 20%, rgba(40,0,0,0.7) 0%, #050505 55%)",
      }} />
      <div className="hero-glow" style={{
        position: "absolute", top: "-10%", left: "-5%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(229,9,20,0.18), transparent 65%)",
        filter: "blur(30px)",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-5%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(229,9,20,0.07), transparent 65%)",
        filter: "blur(40px)",
      }} />
      {stars.map((s) => (
        <div
          key={s.id}
          className="star-dot"
          style={{
            left: s.left, top: s.top,
            width: s.size, height: s.size,
            animationDuration: s.dur,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   GALLERY CARD
════════════════════════════════════════ */
function StreamCard({ lugar, onClick, index }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-100, 100], [7, -7]);
  const ry = useTransform(mx, [-100, 100], [-7, 7]);
  const springX = useSpring(rx, { stiffness: 130, damping: 20 });
  const springY = useSpring(ry, { stiffness: 130, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      style={{ flexShrink: 0, width: 270, perspective: 1100 }}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={() => onClick(lugar)}
      >
        <div className="s-card" style={{ height: 420, borderRadius: 12 }}>

          <img
            src={lugar.imagen}
            alt={lugar.titulo}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = "#1a0a0a";
            }}
          />

          <div className="s-overlay" />

          {/* Badge */}
          <div className="s-badge">{lugar.badge}</div>

          {/* Número decorativo */}
          <div className="s-num">{lugar.n}</div>

          {/* Play hover */}
          <div className="s-play">
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(229,9,20,0.9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 30px rgba(229,9,20,0.5)",
              backdropFilter: "blur(4px)",
            }}>
              <span style={{ fontSize: 18, marginLeft: 3 }}>▶</span>
            </div>
          </div>

          {/* Info */}
          <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, zIndex: 5 }}>
            <p style={{
              fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)", marginBottom: 6,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {lugar.subtitulo} · {lugar.año}
            </p>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.7rem", lineHeight: 1.05,
              color: "#fff", marginBottom: 8,
              letterSpacing: "0.03em",
            }}>
              {lugar.titulo}
            </h3>
            <div style={{ width: 36, height: 2, background: "#e50914", marginBottom: 8 }} />
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
              {lugar.genero}
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   MODAL
════════════════════════════════════════ */
function StreamModal({ lugar, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <motion.div
      className="s-modal-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 1050,
          background: "#0a0a0a",
          border: "1px solid rgba(229,9,20,0.18)",
          borderRadius: 16,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          boxShadow: "0 0 0 1px rgba(229,9,20,0.1), 0 40px 120px rgba(0,0,0,0.9)",
        }}
      >
        {/* Línea superior roja */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, #e50914, rgba(229,9,20,0.2), transparent)",
          zIndex: 10,
        }} />

        {/* Glow interno */}
        <div style={{
          position: "absolute", top: -100, left: -100,
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229,9,20,0.1), transparent 70%)",
          filter: "blur(30px)", pointerEvents: "none",
        }} />

        {/* ── IMAGEN ── */}
        <div style={{ position: "relative", minHeight: 580 }}>
          <img
            src={lugar.imagen}
            alt={lugar.titulo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = "#1a0808";
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.1), rgba(10,10,10,0.6) 90%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)",
          }} />
          {/* Número decorativo */}
          <div style={{
            position: "absolute", bottom: 20, right: 24,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "7rem", lineHeight: 1,
            color: "rgba(229,9,20,0.08)",
            letterSpacing: "-0.02em",
          }}>
            {lugar.n}
          </div>
          {/* Badge */}
          <div style={{
            position: "absolute", top: 20, left: 20,
            fontSize: 9, fontWeight: 800, letterSpacing: "0.25em",
            textTransform: "uppercase", padding: "4px 10px",
            background: "#e50914", color: "#fff", borderRadius: 3,
          }}>
            {lugar.badge}
          </div>
        </div>

        {/* ── INFO ── */}
        <div style={{
          padding: "3rem 2.5rem",
          display: "flex", flexDirection: "column", justifyContent: "flex-start",
          position: "relative", zIndex: 2,
          overflowY: "auto", maxHeight: "90vh",
        }}>
          {/* Cerrar */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 20, right: 20,
              width: 38, height: 38, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#fff", cursor: "pointer", fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* Meta */}
          <div style={{ display: "flex", gap: 12, marginBottom: "1.2rem", flexWrap: "wrap" }}>
            {[lugar.año, lugar.duracion].map((m, i) => (
              <span key={i} style={{
                fontSize: 11, color: i === 0 ? "#e50914" : "rgba(255,255,255,0.4)",
                fontWeight: 600, letterSpacing: "0.08em",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {m}
              </span>
            ))}
          </div>

          {/* Subtítulo */}
          <p style={{
            fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgba(229,9,20,0.7)", marginBottom: "0.6rem",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          }}>
            {lugar.subtitulo}
          </p>

          {/* Título */}
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            lineHeight: 1, color: "#fff",
            marginBottom: "1.2rem", letterSpacing: "0.03em",
          }}>
            {lugar.titulo}
          </h2>

          {/* Línea */}
          <div style={{ width: 50, height: 2, background: "#e50914", marginBottom: "1.2rem" }} />

          {/* Descripción */}
          <p style={{
            fontSize: "0.9rem", lineHeight: 1.85,
            color: "rgba(255,255,255,0.6)",
            marginBottom: "1.5rem",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {lugar.descripcion}
          </p>

          {/* 5 DATOS CLAVE */}
          <p style={{
            fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: "0.8rem",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            5 datos clave
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
            {lugar.datos.map((dato, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "0.7rem 1rem",
              }}>
                <span style={{
                  color: "#e50914", fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.2rem", lineHeight: 1, minWidth: 24, marginTop: 1,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{
                  fontSize: "0.82rem", color: "rgba(255,255,255,0.62)",
                  lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif",
                }}>
                  {dato}
                </p>
              </div>
            ))}
          </div>

          {/* Géneros */}
          <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {lugar.genero.split("·").map((g, i) => (
              <span key={i} style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", padding: "4px 12px",
                border: "1px solid rgba(229,9,20,0.3)",
                color: "rgba(229,9,20,0.8)", borderRadius: 4,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {g.trim()}
              </span>
            ))}
          </div>

          {/* Ubicación */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.2rem",
          }}>
            <p style={{
              fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Ubicación
            </p>
            <p style={{ color: "#fff", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif" }}>
              📍 {lugar.ubicacion}
            </p>
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: 12, marginTop: "1.5rem" }}>
            <button style={{
              flex: 1, padding: "12px 0",
              background: "#e50914", border: "none",
              color: "#fff", fontWeight: 800, fontSize: 14,
              letterSpacing: "0.08em", cursor: "pointer",
              borderRadius: 6, fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              ▶ Explorar
            </button>
            <button style={{
              flex: 1, padding: "12px 0",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", fontWeight: 700, fontSize: 14,
              letterSpacing: "0.06em", cursor: "pointer",
              borderRadius: 6, fontFamily: "'DM Sans', sans-serif",
            }}>
              + Mi lista
            </button>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   MAIN
════════════════════════════════════════ */
export default function TolucaPatrimonio() {
  const trackRef = useRef(null);
  const [modal, setModal] = useState(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (document.getElementById("stream-styles")) return;
    const s = document.createElement("style");
    s.id = "stream-styles";
    s.textContent = STYLES;
    document.head.appendChild(s);
  }, []);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const handleDrag = (e) => {
    const el = trackRef.current;
    if (!el) return;
    const startX = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;
    setDragging(true);
    el.style.cursor = "grabbing";

    const move = (ev) => {
      const x = ev.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    };
    const up = () => {
      setDragging(false);
      el.style.cursor = "grab";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <>
      <AnimatePresence>
        {modal && (
          <StreamModal lugar={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>

      <section
        id="stream-section"
        style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
      >
        {/* ── FONDO ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <BackgroundFX />
        </div>

        {/* ── CONTENIDO ── */}
        <div style={{ position: "relative", zIndex: 10 }}>

          {/* ── HERO HEADER ── */}
          <div style={{ padding: "7rem 3rem 3rem" }}>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase",
                color: "#e50914", marginBottom: "1rem", fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Toluca de Lerdo · Estado de México
            </motion.p>

            <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
              {["LUGARES", "Y MONUMENTOS"].map((word, wi) => (
                <motion.span
                  key={wi}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + wi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "inline-block",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(4rem,10vw,7.5rem)",
                    lineHeight: 0.92,
                    letterSpacing: "0.04em",
                    color: wi === 0 ? "#fff" : "#e50914",
                    marginRight: "0.3em",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{
                maxWidth: 540, fontSize: "1rem", lineHeight: 1.8,
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Una colección visual de monumentos, espacios históricos,
              tradiciones gastronómicas y patrimonio natural de la capital
              del Estado de México.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                display: "flex", gap: 20, marginTop: "1.5rem",
                alignItems: "center", flexWrap: "wrap",
              }}
            >
              {["2026", `${LUGARES.length} lugares`, "Patrimonio"].map((m, i) => (
                <span key={i} style={{
                  fontSize: 12, color: i === 0 ? "#e50914" : "rgba(255,255,255,0.35)",
                  fontWeight: 600, letterSpacing: "0.08em",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {m}
                </span>
              ))}
              <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.15)" }} />
              <span style={{
                fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif",
              }}>
                Arrastra para explorar
              </span>
            </motion.div>
          </div>

          {/* ── CONTROLS BAR ── */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "0 3rem 1.5rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 3, height: 18, background: "#e50914", borderRadius: 2 }} />
              <p style={{
                fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif",
              }}>
                Colección principal · {LUGARES.length} ubicaciones
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {[[-1, "←", canLeft], [1, "→", canRight]].map(([dir, icon, enabled]) => (
                <motion.button
                  key={dir}
                  onClick={() => scroll(dir)}
                  disabled={!enabled}
                  whileHover={enabled ? { scale: 1.1, borderColor: "rgba(229,9,20,0.5)" } : {}}
                  whileTap={enabled ? { scale: 0.92 } : {}}
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: `1px solid ${enabled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}`,
                    background: enabled ? "rgba(255,255,255,0.04)" : "transparent",
                    color: enabled ? "#fff" : "rgba(255,255,255,0.15)",
                    cursor: enabled ? "pointer" : "default",
                    fontSize: 16,
                    transition: "all 0.3s",
                  }}
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── CARRUSEL ── */}
          <div
            ref={trackRef}
            className="stream-track"
            onMouseDown={handleDrag}
            style={{
              display: "flex",
              gap: "1.5rem",
              overflowX: "auto",
              overflowY: "hidden",
              padding: "0.5rem 3rem 5rem",
              cursor: dragging ? "grabbing" : "grab",
            }}
          >
            {LUGARES.map((lugar, index) => (
              <StreamCard
                key={lugar.id}
                lugar={lugar}
                index={index}
                onClick={setModal}
              />
            ))}
          </div>

          {/* ── FOOTER ── */}
          <div style={{
            padding: "2rem 3rem 4rem",
            borderTop: "1px solid rgba(229,9,20,0.1)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 2, height: 20, background: "#e50914", borderRadius: 2 }} />
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.3rem", letterSpacing: "0.12em", color: "#fff",
              }}>
                Lugares y Monumentos de Toluca
              </span>
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "0.25em",
                textTransform: "uppercase", padding: "3px 8px", borderRadius: 3,
                background: "#e50914", color: "#fff",
              }}>
                2026
              </span>
            </div>
            <p style={{
              fontSize: 10, color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.2em", textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Preparatoria No. 1 · UAEMéx · Toluca, México
            </p>
          </div>

        </div>
      </section>
    </>
  );
}