import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ── IMPORTS DE IMÁGENES ── */
import imgFactoresSociales        from "../assets/FactoresSociales.png";
import imgFactoresCulturales      from "../assets/FactoresCulturales.png";
import imgPublicidadEmocional     from "../assets/PublicidadEmocional.png";
import imgRedesSociales           from "../assets/RedesSociales.png";
import imgComportamientoConsumidor from "../assets/ComportamientodelConsumidor.png";
import imgPsicologiaColor         from "../assets/PsicologiaDelColor.png";

/* ════════════════════════════════════════════════
   ESTILOS GLOBALES
════════════════════════════════════════════════ */

const STYLES = `

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700;900&display=swap');

#psicologia-streaming {
  background: #050505;
  color: white;
  overflow: hidden;
  position: relative;
  font-family: 'DM Sans', sans-serif;
}

/* ── CARDS REESTRUCTURADAS ── */

.psy-grid-row1 {
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  gap: 1.8rem;
  margin-bottom: 1.8rem;
}

.psy-grid-row2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
}

@media (max-width: 1100px) {
  .psy-grid-row1 {
    grid-template-columns: 1fr;
  }
  .psy-grid-row2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .psy-grid-row2 {
    grid-template-columns: 1fr;
  }
}

/* BASE CARD */
.psy-card-base {
  position: relative;
  border-radius: 26px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.07);
  cursor: pointer;
  transition: transform .55s cubic-bezier(.22,1,.36,1),
              border-color .4s ease,
              box-shadow .4s ease;
}

.psy-card-base:hover {
  transform: translateY(-10px);
  border-color: rgba(229,9,20,.32);
  box-shadow:
    0 36px 110px rgba(0,0,0,.75),
    0 0 55px rgba(229,9,20,.1);
}

/* HERO CARD */
.psy-card-hero {
  min-height: 490px;
}

/* MEDIUM CARD */
.psy-card-medium {
  min-height: 230px;
  flex: 1;
}

/* SMALL CARD */
.psy-card-small {
  min-height: 380px;
}

/* CARD IMAGE */
.psy-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform .7s cubic-bezier(.22,1,.36,1);
}

.psy-card-base:hover .psy-card-img {
  transform: scale(1.06);
}

/* OVERLAY */
.psy-overlay-full {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(0,0,0,.97) 0%, rgba(0,0,0,.6) 38%, transparent 68%),
    linear-gradient(to right, rgba(0,0,0,.12), rgba(0,0,0,.65));
}

.psy-overlay-medium {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.97) 0%, rgba(0,0,0,.5) 45%, transparent 72%);
}

/* INNER GLOW */
.psy-inner-glow {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(229,9,20,.2), transparent 70%);
  filter: blur(52px);
  pointer-events: none;
}

/* BADGE */
.psy-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 5;
  display: inline-block;
  padding: 5px 13px;
  border-radius: 999px;
  background: rgba(229,9,20,.14);
  border: 1px solid rgba(229,9,20,.26);
  color: #ffb3b7;
  font-size: 9px;
  letter-spacing: .18em;
  text-transform: uppercase;
  font-weight: 700;
}

/* NÚMERO DECORATIVO */
.psy-deco-num {
  position: absolute;
  right: 16px;
  bottom: -10px;
  font-family: 'Bebas Neue', sans-serif;
  color: rgba(229,9,20,.07);
  line-height: 1;
  z-index: 2;
  pointer-events: none;
}

/* CONTENIDO POSICIONADO */
.psy-content-abs {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 2rem;
  z-index: 5;
}

.psy-content-abs-sm {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 1.5rem;
  z-index: 5;
}

/* LÍNEA ROJA */
.psy-red-line {
  width: 46px;
  height: 2px;
  background: #e50914;
  margin: 10px 0 12px;
}

/* PANEL ANÁLISIS */
.psy-analysis-panel {
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 14px;
  padding: .85rem 1rem;
  margin-top: .85rem;
}

.psy-analysis-label {
  font-size: 9px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(255,255,255,.32);
  margin-bottom: .4rem;
}

.psy-analysis-text {
  font-size: .86rem;
  color: rgba(255,255,255,.62);
  line-height: 1.75;
}

/* DATO LÍNEA LATERAL */
.psy-dato-line {
  border-left: 2px solid #e50914;
  padding-left: .85rem;
  margin-top: .75rem;
}

.psy-dato-text {
  font-size: .82rem;
  color: rgba(255,255,255,.42);
  line-height: 1.7;
}

/* TAGS */
.psy-tags-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: .85rem;
}

.psy-tag {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(229,9,20,.2);
  background: rgba(229,9,20,.06);
  color: rgba(255,180,180,.65);
  font-size: 9px;
  letter-spacing: .1em;
}

/* ── MODAL ── */

.ps-modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.88);
  backdrop-filter: blur(20px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* ── MISC ── */

.star {
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: twinkle linear infinite;
}

@keyframes twinkle {
  0%,100% { opacity: .2; }
  50%      { opacity: .8; }
}

.hero-glow {
  animation: breathe 8s ease-in-out infinite;
}

@keyframes breathe {
  0%,100% { transform: scale(1);    opacity: .18; }
  50%     { transform: scale(1.08); opacity: .3; }
}

.ps-line {
  width: 60px;
  height: 2px;
  background: #e50914;
}

.ps-chip {
  border: 1px solid rgba(229,9,20,.25);
  background: rgba(229,9,20,.08);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 10px;
  letter-spacing: .1em;
  color: #ffb7b7;
}

.ps-panel {
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px;
  backdrop-filter: blur(12px);
}

/* MODAL IMAGE */
.ps-modal-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

`;

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */

const TEMAS = [
  {
    id: 1,
    numero: "01",
    badge: "Psicología",
    titulo: "Factores Sociales",
    subtitulo: "Influencia colectiva",
    descripcion:
      "La conducta del consumidor se modifica mediante grupos sociales, tendencias digitales y presión del entorno.",
    analisis:
      "Los grupos de referencia y la necesidad de pertenencia generan patrones de consumo repetitivos y emocionales.",
    impacto:
      "Las redes sociales han convertido el consumo en una forma de validación social.",
    dato: "Más del 70% de las compras digitales son influenciadas por recomendaciones sociales.",
    tags: ["Consumidor", "Influencia", "Sociedad", "Marketing", "Conducta"],
    image: imgFactoresSociales,
    bgGradient: "linear-gradient(135deg, #1a0a0a 0%, #0d0d1a 55%, #0a1a0a 100%)",
    glowPos: { top: "-15%", left: "-5%", width: 380, height: 380 },
    patternId: "p1",
    pattern: (id) => (
      <defs>
        <pattern id={id} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="white" />
        </pattern>
      </defs>
    ),
    deco: (
      <svg style={{ position:"absolute", top:"22%", left:"50%", transform:"translateX(-50%)",
        width:90, height:90, opacity:.07 }} viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="30" fill="none" stroke="white" strokeWidth="1.5"/>
        <circle cx="45" cy="45" r="18" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="45" cy="45" r="6"  fill="none" stroke="white" strokeWidth="1"/>
        <line x1="45" y1="15" x2="45" y2="75" stroke="white" strokeWidth=".6"/>
        <line x1="15" y1="45" x2="75" y2="45" stroke="white" strokeWidth=".6"/>
      </svg>
    ),
  },
  {
    id: 2,
    numero: "02",
    badge: "Análisis",
    titulo: "Factores Culturales",
    subtitulo: "Identidad y hábitos",
    descripcion:
      "La cultura define gustos, valores y formas de interpretar los productos dentro de una sociedad.",
    analisis:
      "Las marcas adaptan mensajes culturales para conectar emocionalmente con diferentes públicos.",
    impacto:
      "Los hábitos culturales influyen directamente en la percepción de valor de un producto.",
    dato: "Las campañas localizadas culturalmente tienen mayor efectividad emocional.",
    tags: ["Cultura", "Valores", "Hábitos", "Identidad", "Marketing"],
    image: imgFactoresCulturales,
    bgGradient: "linear-gradient(145deg, #0f0f1a 0%, #150a14 100%)",
    glowPos: { top: "-20%", right: "-10%", width: 260, height: 260 },
    patternId: "p2",
    pattern: (id) => (
      <defs>
        <pattern id={id} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M0 0 L32 32 M32 0 L0 32" stroke="white" strokeWidth=".5"/>
        </pattern>
      </defs>
    ),
    deco: (
      <svg style={{ position:"absolute", top:"18%", right:"10%",
        width:60, height:60, opacity:.07 }} viewBox="0 0 60 60">
        <polygon points="30,5 55,50 5,50" fill="none" stroke="white" strokeWidth="1.5"/>
        <polygon points="30,18 45,45 15,45" fill="none" stroke="white" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    id: 3,
    numero: "03",
    badge: "Emociones",
    titulo: "Publicidad Emocional",
    subtitulo: "Conexión psicológica",
    descripcion:
      "La publicidad utiliza emociones para generar recuerdos y vínculos con las marcas.",
    analisis:
      "Los estímulos visuales y emocionales fortalecen la memoria del consumidor.",
    impacto:
      "La emoción incrementa la intención de compra y la fidelidad.",
    dato: "Las campañas emocionales generan mayor interacción digital.",
    tags: ["Publicidad", "Emoción", "Marca", "Psicología", "Marketing"],
    image: imgPublicidadEmocional,
    bgGradient: "linear-gradient(160deg, #1a0d0d 0%, #0a0a15 100%)",
    glowPos: { bottom: "-10%", left: "-5%", width: 240, height: 240 },
    patternId: "p3",
    pattern: (id) => (
      <defs>
        <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="9" y="9" width="2" height="2" fill="white" opacity=".4"/>
        </pattern>
      </defs>
    ),
    deco: (
      <svg style={{ position:"absolute", top:"18%", left:"50%", transform:"translateX(-50%)",
        width:56, height:56, opacity:.07 }} viewBox="0 0 56 56">
        <path d="M28 10 C12 10, 6 22, 6 28 C6 40, 18 46, 28 50 C38 46, 50 40, 50 28 C50 22, 44 10, 28 10Z"
          fill="none" stroke="white" strokeWidth="1.5"/>
        <path d="M28 18 C18 18, 14 24, 14 28 C14 36, 22 40, 28 43 C34 40, 42 36, 42 28 C42 24, 38 18, 28 18Z"
          fill="none" stroke="white" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    id: 4,
    numero: "04",
    badge: "Digital",
    titulo: "Redes Sociales",
    subtitulo: "Impacto moderno",
    descripcion:
      "Las plataformas digitales modifican decisiones mediante tendencias y contenido visual.",
    analisis:
      "La viralidad y los algoritmos crean nuevos patrones de consumo.",
    impacto:
      "Las recomendaciones digitales generan confianza inmediata.",
    dato: "El contenido corto tiene gran impacto psicológico en la atención.",
    tags: ["TikTok", "Instagram", "Tendencias", "Consumo", "Digital"],
    image: imgRedesSociales,
    bgGradient: "linear-gradient(150deg, #0d1420 0%, #090d16 100%)",
    glowPos: { top: "-15%", right: "-10%", width: 220, height: 220 },
    patternId: "p4",
    pattern: (id) => (
      <defs>
        <pattern id={id} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="0"  cy="0"  r="1.5" fill="white"/>
          <circle cx="50" cy="0"  r="1.5" fill="white"/>
          <circle cx="0"  cy="50" r="1.5" fill="white"/>
          <circle cx="50" cy="50" r="1.5" fill="white"/>
          <circle cx="25" cy="25" r="1"   fill="white"/>
        </pattern>
      </defs>
    ),
    deco: (
      <svg style={{ position:"absolute", top:16, right:16, width:88, height:88, opacity:.22 }}
        viewBox="0 0 88 88">
        <circle cx="44" cy="44" r="8"  fill="none" stroke="#e50914"         strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="5"  fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <circle cx="70" cy="14" r="5"  fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <circle cx="74" cy="70" r="5"  fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <circle cx="14" cy="66" r="5"  fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <line x1="44" y1="44" x2="18" y2="18" stroke="rgba(229,9,20,.35)" strokeWidth="1"/>
        <line x1="44" y1="44" x2="70" y2="14" stroke="rgba(229,9,20,.35)" strokeWidth="1"/>
        <line x1="44" y1="44" x2="74" y2="70" stroke="rgba(229,9,20,.35)" strokeWidth="1"/>
        <line x1="44" y1="44" x2="14" y2="66" stroke="rgba(229,9,20,.35)" strokeWidth="1"/>
        <line x1="18" y1="18" x2="70" y2="14" stroke="rgba(255,255,255,.1)" strokeWidth=".5"/>
        <line x1="74" y1="70" x2="14" y2="66" stroke="rgba(255,255,255,.1)" strokeWidth=".5"/>
      </svg>
    ),
  },
  {
    id: 5,
    numero: "05",
    badge: "Conducta",
    titulo: "Comportamiento del Consumidor",
    subtitulo: "Proceso de decisión",
    descripcion:
      "Las emociones, necesidades y estímulos determinan las decisiones de compra.",
    analisis:
      "El consumidor evalúa emociones, beneficios y reconocimiento social.",
    impacto:
      "La experiencia emocional influye más que el producto en muchos casos.",
    dato: "El diseño visual influye en la percepción de calidad.",
    tags: ["Decisión", "Conducta", "Cliente", "Marca", "Experiencia"],
    image: imgComportamientoConsumidor,
    bgGradient: "linear-gradient(140deg, #150d0a 0%, #0d0d14 100%)",
    glowPos: { top: "-10%", left: "10%", width: 210, height: 210 },
    patternId: "p5",
    pattern: (id) => (
      <defs>
        <pattern id={id} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M0 15 L15 0 L30 15 L15 30 Z" fill="none" stroke="white" strokeWidth=".4"/>
        </pattern>
      </defs>
    ),
    deco: (
      <svg style={{ position:"absolute", top:14, right:14, width:78, height:78, opacity:.2 }}
        viewBox="0 0 78 78">
        <path d="M10 14 L68 14 L50 36 L50 60 L28 60 L28 36 Z"
          fill="none" stroke="#e50914" strokeWidth="1.5"/>
        <line x1="10" y1="14" x2="68" y2="14" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
        <line x1="20" y1="24" x2="58" y2="24" stroke="rgba(255,255,255,.18)" strokeWidth="1"/>
        <line x1="28" y1="36" x2="50" y2="36" stroke="rgba(255,255,255,.18)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    id: 6,
    numero: "06",
    badge: "Experiencia",
    titulo: "Psicología del Color",
    subtitulo: "Percepción visual",
    descripcion:
      "Los colores provocan emociones y asociaciones psicológicas en el consumidor.",
    analisis:
      "El rojo transmite intensidad y urgencia; el azul confianza y estabilidad.",
    impacto:
      "Las marcas usan colores estratégicos para posicionarse.",
    dato: "El color aumenta el reconocimiento de marca.",
    tags: ["Color", "Diseño", "Marca", "Visual", "Percepción"],
    image: imgPsicologiaColor,
    bgGradient: "linear-gradient(155deg, #0a0f12 0%, #130a14 100%)",
    glowPos: { bottom: "-5%", right: "-5%", width: 210, height: 210 },
    patternId: "p6",
    pattern: (id) => (
      <defs>
        <pattern id={id} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="24" y2="24" stroke="white" strokeWidth=".35"/>
        </pattern>
      </defs>
    ),
    deco: (
      <svg style={{ position:"absolute", top:14, right:14, width:78, height:78, opacity:.22 }}
        viewBox="0 0 78 78">
        <circle cx="39" cy="39" r="26" fill="none" stroke="rgba(229,9,20,.6)" strokeWidth="1.5"/>
        <circle cx="39" cy="39" r="16" fill="none" stroke="rgba(255,255,255,.2)"  strokeWidth="1"/>
        <circle cx="39" cy="39" r="6"  fill="rgba(229,9,20,.4)"/>
        <line x1="39" y1="13" x2="39" y2="65" stroke="rgba(255,255,255,.1)" strokeWidth=".5"/>
        <line x1="13" y1="39" x2="65" y2="39" stroke="rgba(255,255,255,.1)" strokeWidth=".5"/>
        <line x1="20" y1="20" x2="58" y2="58" stroke="rgba(229,9,20,.2)" strokeWidth=".5"/>
        <line x1="58" y1="20" x2="20" y2="58" stroke="rgba(229,9,20,.2)" strokeWidth=".5"/>
      </svg>
    ),
  },
];

/* ════════════════════════════════════════════════
   BACKGROUND FX
════════════════════════════════════════════════ */

function BackgroundFX() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: `${3 + Math.random() * 6}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(229,9,20,0.2), transparent 40%), #050505",
        }}
      />
      <div
        className="hero-glow"
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          top: "-10%",
          left: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229,9,20,0.18), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          bottom: "-15%",
          right: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
          filter: "blur(130px)",
        }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </>
  );
}

/* ════════════════════════════════════════════════
   CARD HERO (tema 1 — grande)
════════════════════════════════════════════════ */

function HeroCard({ item, onOpen }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-120, 120], [6, -6]);
  const rotateY = useTransform(mx, [-120, 120], [-6, 6]);
  const springX = useSpring(rotateX, { stiffness: 100, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 22 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .8 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
      >
        <div
          className="psy-card-base psy-card-hero"
          onClick={() => onOpen(item)}
        >
          {/* BG fallback color */}
          <div style={{ position:"absolute", inset:0, background: item.bgGradient }} />

          {/* IMAGEN */}
          <img
            src={item.image}
            alt={item.titulo}
            className="psy-card-img"
          />

          {/* PATTERN sobre la imagen */}
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04, zIndex:1 }}>
            {item.pattern(item.patternId)}
            <rect width="100%" height="100%" fill={`url(#${item.patternId})`} />
          </svg>

          {/* GLOW */}
          <div
            className="psy-inner-glow"
            style={{
              width: item.glowPos.width,
              height: item.glowPos.height,
              ...item.glowPos,
              zIndex: 2,
            }}
          />

          <div className="psy-overlay-full" style={{ zIndex: 3 }} />

          {/* BADGE */}
          <div className="psy-badge">{item.badge}</div>

          {/* NÚMERO DECO */}
          <div className="psy-deco-num" style={{ fontSize:"10rem" }}>{item.numero}</div>

          {/* CONTENT */}
          <div className="psy-content-abs">
            <p style={{
              fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase",
              color: "rgba(255,255,255,.38)", marginBottom: 8,
            }}>
              {item.subtitulo}
            </p>

            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "3rem", lineHeight: 1, color: "white",
            }}>
              {item.titulo}
            </h3>

            <div className="psy-red-line" />

            <p style={{
              fontSize: ".92rem", color: "rgba(255,255,255,.62)",
              lineHeight: 1.8, maxWidth: "94%",
            }}>
              {item.descripcion}
            </p>

            {/* Panel análisis expandido */}
            <div className="psy-analysis-panel">
              <div className="psy-analysis-label">Análisis</div>
              <div className="psy-analysis-text">{item.analisis}</div>
            </div>

            <div className="psy-dato-line" style={{ marginTop: ".9rem" }}>
              <p className="psy-dato-text">{item.dato}</p>
            </div>

            <div className="psy-tags-row">
              {item.tags.map((tag, i) => (
                <span key={i} className="psy-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   CARD MEDIUM (temas 2 y 3 — apiladas)
════════════════════════════════════════════════ */

function MediumCard({ item, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .75, delay: index * .1 }}
      style={{ flex: 1 }}
    >
      <div
        className="psy-card-base psy-card-medium"
        onClick={() => onOpen(item)}
      >
        {/* BG fallback */}
        <div style={{ position:"absolute", inset:0, background: item.bgGradient }} />

        {/* IMAGEN */}
        <img
          src={item.image}
          alt={item.titulo}
          className="psy-card-img"
        />

        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04, zIndex:1 }}>
          {item.pattern(item.patternId)}
          <rect width="100%" height="100%" fill={`url(#${item.patternId})`} />
        </svg>

        <div
          className="psy-inner-glow"
          style={{
            width: item.glowPos.width * .7,
            height: item.glowPos.height * .7,
            ...item.glowPos,
            zIndex: 2,
          }}
        />

        <div className="psy-overlay-medium" style={{ zIndex: 3 }} />

        <div className="psy-badge">{item.badge}</div>
        <div className="psy-deco-num" style={{ fontSize:"7rem" }}>{item.numero}</div>

        <div className="psy-content-abs-sm">
          <p style={{
            fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
            color: "rgba(255,255,255,.35)", marginBottom: 6,
          }}>
            {item.subtitulo}
          </p>

          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.95rem", lineHeight: 1, color: "white", marginBottom: 10,
          }}>
            {item.titulo}
          </h3>

          <p style={{
            fontSize: ".86rem", color: "rgba(255,255,255,.56)", lineHeight: 1.75,
          }}>
            {item.descripcion}
          </p>

          <div className="psy-tags-row" style={{ marginTop: ".75rem" }}>
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="psy-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   CARD SMALL (temas 4-6 — fila baja)
════════════════════════════════════════════════ */

function SmallCard({ item, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .75, delay: index * .1 }}
    >
      <div
        className="psy-card-base psy-card-small"
        onClick={() => onOpen(item)}
      >
        {/* BG fallback */}
        <div style={{ position:"absolute", inset:0, background: item.bgGradient }} />

        {/* IMAGEN */}
        <img
          src={item.image}
          alt={item.titulo}
          className="psy-card-img"
        />

        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04, zIndex:1 }}>
          {item.pattern(item.patternId)}
          <rect width="100%" height="100%" fill={`url(#${item.patternId})`} />
        </svg>

        <div
          className="psy-inner-glow"
          style={{
            width: item.glowPos.width * .75,
            height: item.glowPos.height * .75,
            ...item.glowPos,
            zIndex: 2,
          }}
        />

        <div className="psy-overlay-full" style={{ zIndex: 3 }} />

        <div className="psy-badge">{item.badge}</div>
        <div className="psy-deco-num" style={{ fontSize:"7rem" }}>{item.numero}</div>

        <div className="psy-content-abs-sm">
          <p style={{
            fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
            color: "rgba(255,255,255,.35)", marginBottom: 6,
          }}>
            {item.subtitulo}
          </p>

          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.9rem", lineHeight: 1, color: "white", marginBottom: 10,
          }}>
            {item.titulo}
          </h3>

          <p style={{
            fontSize: ".86rem", color: "rgba(255,255,255,.55)", lineHeight: 1.75,
          }}>
            {item.descripcion}
          </p>

          <div className="psy-analysis-panel" style={{ marginTop: ".8rem" }}>
            <div className="psy-analysis-label">Insight</div>
            <div className="psy-analysis-text" style={{ fontSize: ".82rem" }}>
              {item.analisis}
            </div>
          </div>

          <div className="psy-tags-row">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="psy-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   MODAL
════════════════════════════════════════════════ */

function ModalTema({ item, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <motion.div
      className="ps-modal-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: .96 }}
        transition={{ duration: .5 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 28,
          overflow: "hidden",
          background: "#0b0b0b",
          border: "1px solid rgba(229,9,20,.15)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          boxShadow: "0 50px 120px rgba(0,0,0,.9), 0 0 80px rgba(229,9,20,.08)",
        }}
      >
        {/* Borde superior rojo */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, #e50914, rgba(229,9,20,.2), transparent)",
          }}
        />

        {/* LADO IMAGEN */}
        <div style={{ position: "relative", minHeight: 720 }}>
          {/* Imagen real del tema en el modal */}
          <img
            src={item.image}
            alt={item.titulo}
            className="ps-modal-img"
          />
          {/* BG tint encima de la imagen */}
          <div style={{
            position: "absolute", inset: 0,
            background: item.bgGradient,
            opacity: 0.45,
          }} />
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04, zIndex:1 }}>
            {item.pattern(item.patternId + "_modal")}
            <rect width="100%" height="100%" fill={`url(#${item.patternId + "_modal"})`} />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,.75), transparent 45%)",
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,.1), rgba(0,0,0,.55))",
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 20, right: 20,
              fontSize: "8rem",
              fontFamily: "'Bebas Neue', sans-serif",
              color: "rgba(229,9,20,.1)",
              zIndex: 3,
            }}
          >
            {item.numero}
          </div>
        </div>

        {/* LADO CONTENIDO */}
        <div style={{ padding: "3rem", overflowY: "auto", maxHeight: "90vh" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 20, right: 20,
              width: 42, height: 42, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.05)",
              color: "white", cursor: "pointer",
            }}
          >
            ✕
          </button>

          <p style={{
            color: "#e50914", letterSpacing: ".25em",
            textTransform: "uppercase", fontSize: 11, marginBottom: 12,
          }}>
            Psicología y consumo
          </p>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "4rem", lineHeight: .95, marginBottom: 18,
          }}>
            {item.titulo}
          </h2>

          <div className="ps-line" />

          <p style={{
            marginTop: "1.5rem", lineHeight: 1.9,
            color: "rgba(255,255,255,.72)",
          }}>
            {item.descripcion}
          </p>

          <div style={{ display: "grid", gap: "1.2rem", marginTop: "2rem" }}>
            <div className="ps-panel" style={{ padding: "1.5rem" }}>
              <p style={{ color:"#e50914", marginBottom:12, letterSpacing:".2em", fontSize:11 }}>
                ANÁLISIS
              </p>
              <p style={{ color:"rgba(255,255,255,.7)", lineHeight:1.9 }}>
                {item.analisis}
              </p>
            </div>

            <div className="ps-panel" style={{ padding: "1.5rem" }}>
              <p style={{ color:"#ffb5b5", marginBottom:12, letterSpacing:".2em", fontSize:11 }}>
                IMPACTO EN EL CONSUMIDOR
              </p>
              <p style={{ color:"rgba(255,255,255,.7)", lineHeight:1.9 }}>
                {item.impacto}
              </p>
            </div>

            <div style={{ borderLeft:"3px solid #e50914", paddingLeft:"1rem", marginTop:".5rem" }}>
              <p style={{ color:"rgba(255,255,255,.55)", lineHeight:1.9 }}>
                {item.dato}
              </p>
            </div>
          </div>

          <div style={{ marginTop:"2rem", display:"flex", gap:10, flexWrap:"wrap" }}>
            {item.tags.map((tag, i) => (
              <div key={i} className="ps-chip">{tag}</div>
            ))}
          </div>

          <div style={{ marginTop:"2.5rem", display:"flex", gap:14 }}>
            <button style={{
              flex:1, border:"none", padding:"14px 0", borderRadius:12,
              background:"#e50914", color:"white", fontWeight:800,
              cursor:"pointer", fontSize:15,
            }}>
              ▶ Explorar análisis
            </button>
            <button style={{
              flex:1, border:"1px solid rgba(255,255,255,.08)", padding:"14px 0",
              borderRadius:12, background:"rgba(255,255,255,.05)", color:"white",
              fontWeight:700, cursor:"pointer", fontSize:15,
            }}>
              + Guardar tema
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   VIDEO SECTION
════════════════════════════════════════════════ */

function VideoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .9 }}
      whileHover={{ scale: 1.01 }}
      style={{
        position: "relative",
        borderRadius: 30,
        overflow: "hidden",
        height: 560,
        border: "1px solid rgba(229,9,20,.12)",
        background: "linear-gradient(135deg, rgba(18,18,18,1), rgba(8,8,8,1))",
        boxShadow: "0 40px 120px rgba(0,0,0,.8), 0 0 80px rgba(229,9,20,.08)",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at center, rgba(229,9,20,.15), transparent 70%)",
        filter: "blur(90px)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,.9), rgba(0,0,0,.2))",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column", zIndex: 5,
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          background: "#e50914",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 80px rgba(229,9,20,.5)",
        }}>
          <span style={{ fontSize: 40, marginLeft: 8 }}>▶</span>
        </div>

        <h3 style={{ marginTop: "2rem", fontSize: "2.4rem", fontWeight: 900 }}>
          Experiencia Audiovisual
        </h3>

        <p style={{
          marginTop: "1rem", maxWidth: 700, textAlign: "center",
          color: "rgba(255,255,255,.55)", lineHeight: 1.9, padding: "0 2rem",
        }}>
          Espacio reservado para el video interactivo sobre factores
          sociales y culturales que influyen en la conducta individual y
          grupal para el consumo de productos.
        </p>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════
   TIMELINE
════════════════════════════════════════════════ */

function Timeline() {
  const items = [
    {
      year: "1950",
      title: "Psicología del consumidor",
      text: "Las empresas comenzaron a estudiar emociones y hábitos de compra.",
    },
    {
      year: "1980",
      title: "Publicidad emocional",
      text: "La televisión impulsó mensajes enfocados en emociones y aspiraciones.",
    },
    {
      year: "2005",
      title: "Era digital",
      text: "Internet modificó la interacción entre marcas y consumidores.",
    },
    {
      year: "2026",
      title: "Consumo algorítmico",
      text: "Las plataformas digitales personalizan contenido y decisiones de compra.",
    },
  ];

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, delay: index * .1 }}
          className="ps-panel"
          style={{
            padding: "1.6rem",
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            gap: "1.5rem",
          }}
        >
          <div>
            <p style={{ color: "#e50914", fontSize: "2rem", fontWeight: 900 }}>
              {item.year}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "1.3rem", marginBottom: ".6rem" }}>
              {item.title}
            </h4>
            <p style={{ color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>
              {item.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════ */

export default function Psicologia() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (document.getElementById("psicologia-streaming-styles")) return;
    const style = document.createElement("style");
    style.id = "psicologia-streaming-styles";
    style.textContent = STYLES;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      <AnimatePresence>
        {modal && (
          <ModalTema item={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>

      <section
        id="psicologia-streaming"
        style={{ minHeight: "100vh", position: "relative" }}
      >
        {/* FONDO */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <BackgroundFX />
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>

          {/* ── HERO ── */}
          <div style={{ padding: "7rem 3rem 4rem" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7 }}
              style={{
                fontSize: 10, letterSpacing: ".4em",
                textTransform: "uppercase", color: "#e50914",
                marginBottom: "1rem", fontWeight: 700,
              }}
            >
              Psicología
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              {["FACTORES", "SOCIALES", "Y CULTURALES"].map((word, index) => (
                <motion.h1
                  key={index}
                  initial={{ y: "120%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: .8, delay: index * .08 }}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(4rem, 10vw, 8rem)",
                    lineHeight: .92,
                    letterSpacing: ".04em",
                    color: index === 1 ? "#e50914" : "white",
                  }}
                >
                  {word}
                </motion.h1>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .8, delay: .5 }}
              style={{
                maxWidth: 760, marginTop: "1.5rem",
                color: "rgba(255,255,255,.58)",
                lineHeight: 1.9, fontSize: "1rem",
              }}
            >
              Exploración interactiva sobre los factores sociales y
              culturales que influyen en la conducta individual y grupal
              para el consumo de productos, analizando emociones,
              publicidad, identidad cultural y comportamiento del
              consumidor en la actualidad.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: .9 }}
              style={{ display:"flex", gap:20, flexWrap:"wrap", marginTop:"2rem" }}
            >
              {["Conducta","Cultura","Consumo","Emociones","Marketing"].map((c) => (
                <div key={c} className="ps-chip">{c}</div>
              ))}
            </motion.div>
          </div>

          {/* ── VIDEO ── */}
          <div style={{ padding: "0 3rem" }}>
            <VideoSection />
          </div>

          {/* ════════════════════════════════════════
              CARDS — ZONA REESTRUCTURADA
          ════════════════════════════════════════ */}
          <div style={{ padding: "5rem 3rem" }}>

            {/* Header sección */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", marginBottom: "2.8rem",
              flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <p style={{
                  color: "#e50914", letterSpacing: ".3em",
                  textTransform: "uppercase", fontSize: 10, marginBottom: 10,
                }}>
                  Contenido principal
                </p>
                <h2 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "3.2rem", letterSpacing: ".03em",
                }}>
                  Explora los temas
                </h2>
              </div>
              <div style={{
                color: "rgba(255,255,255,.28)",
                letterSpacing: ".2em", textTransform: "uppercase", fontSize: 10,
              }}>
                6 temas interactivos
              </div>
            </div>

            {/* FILA 1: Hero (izquierda) + 2 apiladas (derecha) */}
            <div className="psy-grid-row1">

              {/* Hero — Factores Sociales */}
              <HeroCard item={TEMAS[0]} onOpen={setModal} />

              {/* Columna derecha apilada */}
              <div style={{ display:"flex", flexDirection:"column", gap:"1.8rem" }}>
                <MediumCard item={TEMAS[1]} index={1} onOpen={setModal} />
                <MediumCard item={TEMAS[2]} index={2} onOpen={setModal} />
              </div>

            </div>

            {/* FILA 2: 3 cards iguales */}
            <div className="psy-grid-row2">
              {TEMAS.slice(3).map((item, i) => (
                <SmallCard key={item.id} item={item} index={i} onOpen={setModal} />
              ))}
            </div>

          </div>

          {/* ── TIMELINE ── */}
          <div style={{ padding: "2rem 3rem 6rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <p style={{
                color: "#e50914", letterSpacing: ".3em",
                textTransform: "uppercase", fontSize: 10, marginBottom: 12,
              }}>
                Evolución
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "3.4rem", letterSpacing: ".04em",
              }}>
                Psicología y consumo
              </h2>
            </div>
            <Timeline />
          </div>

          {/* ── FOOTER ── */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,.06)",
            padding: "2rem 3rem 4rem",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 20,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:3, height:24, background:"#e50914" }} />
              <div>
                <p style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.6rem", letterSpacing: ".08em",
                }}>
                  Psicología
                </p>
                <p style={{ color:"rgba(255,255,255,.3)", fontSize:12 }}>
                  Proyecto Integrador 2026
                </p>
              </div>
            </div>
            <p style={{
              color: "rgba(255,255,255,.25)", fontSize: 11,
              letterSpacing: ".2em", textTransform: "uppercase",
            }}>
              Plataforma interactiva educativa · UAEMéx
            </p>
          </div>

        </div>
      </section>
    </>
  );
}