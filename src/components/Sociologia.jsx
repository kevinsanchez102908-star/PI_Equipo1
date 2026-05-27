import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── IMPORTS DE IMÁGENES ── */
import imgResiduos    from "../assets/ResiduosyAmbiente.png";
import imgSalud       from "../assets/SaludAlimentaria.png";
import imgEducacion   from "../assets/EducacionDigital.png";
import imgEquidad     from "../assets/EquidadyAcceso.png";
import imgConsumo     from "../assets/ConsumoConsciente.png";
import imgLogo        from "../assets/Logo.png";
import imgCaja        from "../assets/Caja.png";

/* ══════════════════════════════════════════════════════
   DATOS
══════════════════════════════════════════════════════ */
const DISTRITOS = [
  {
    id: 1,
    nombre: "Residuos y Ambiente",
    categoria: "Consumo Consciente",
    descripcion:
      "La basura generada por envases desechables refleja una crisis de conciencia ambiental. En Yamamoi's trabajamos por reducir el impacto plástico y promover una cultura escolar de reciclaje y consumo responsable.",
    porcentaje: 82,
    color: "#E24B4A",
    metrics: [78, 82, 88],
    icono: "🗑️",
    impacto: "78% de basura escolar proviene de snacks industriales",
    image: imgResiduos,
    infografia: {
      image: imgResiduos,
      problema: {
        titulo: "Crisis de residuos plásticos",
        descripcion: "Los envases de snacks industriales generan grandes volúmenes de basura plástica en la preparatoria. La falta de contenedores diferenciados y de cultura de reciclaje agrava el problema.",
        pct: 78,
        icon: "🗑️",
      },
      solucion: {
        titulo: "Empaque reducido y responsable",
        descripcion: "Minimizar el uso de bolsas y recipientes desechables. Promover envases reutilizables entre los clientes frecuentes del plantel.",
        pasos: ["Usar envases biodegradables", "Reducir plástico de un solo uso", "Incentivar contenedores propios", "Puntos de reciclaje en la escuela"],
        icon: "♻️",
      },
      estadisticas: [
        { label: "Basura escolar por snacks", value: "78%" },
        { label: "Reducción posible", value: "40%" },
        { label: "Estudiantes conscientes", value: "82%" },
      ],
      cita: "Un negocio escolar puede liderar el cambio ambiental con decisiones simples en su operación diaria.",
      ciclo: ["Compra consciente", "Menos residuos", "Entorno limpio", "Cultura escolar", "Impacto colectivo"],
    },
  },
  {
    id: 2,
    nombre: "Salud Alimentaria",
    categoria: "Nutrición Estudiantil",
    descripcion:
      "Los ultraprocesados dominan el mercado escolar. Nuestro proyecto apuesta por ingredientes frescos, preparados al momento y sin conservadores artificiales para mejorar la salud de la comunidad.",
    porcentaje: 76,
    color: "#BA7517",
    metrics: [70, 76, 80],
    icono: "🥗",
    impacto: "Opciones más naturales mejoran concentración y energía",
    image: imgSalud,
    infografia: {
      image: imgSalud,
      problema: {
        titulo: "Alimentación deficiente",
        descripcion: "Los estudiantes consumen principalmente productos altos en sodio, grasas trans y azúcares. Esto impacta directamente en su rendimiento académico, salud y estado de ánimo.",
        pct: 65,
        icon: "🍔",
      },
      solucion: {
        titulo: "Opciones más frescas y naturales",
        descripcion: "Incorporar progresivamente ingredientes frescos y menos procesados en los snacks: frutas, verduras encurtidas y preparaciones al momento.",
        pasos: ["Ingredientes frescos diarios", "Sin conservadores artificiales", "Preparación al momento", "Porciones balanceadas"],
        icon: "🥗",
      },
      estadisticas: [
        { label: "Mejora en concentración", value: "70%" },
        { label: "Preferencia natural", value: "76%" },
        { label: "Reducción ultraprocesados", value: "80%" },
      ],
      cita: "La salud del estudiante es directamente proporcional a la calidad de lo que consume en su entorno escolar.",
      ciclo: ["Ingrediente fresco", "Preparación sana", "Mejor nutrición", "Más energía", "Mejor rendimiento"],
    },
  },
  {
    id: 3,
    nombre: "Educación Digital",
    categoria: "Redes Sociales",
    descripcion:
      "Las plataformas digitales son nuestro espacio para visibilizar la propuesta sostenible. Compartimos mensajes sobre consumo consciente, impacto ambiental y responsabilidad social con la comunidad estudiantil.",
    porcentaje: 91,
    color: "#7F77DD",
    metrics: [88, 91, 85],
    icono: "💬",
    impacto: "91% de estudiantes accede a redes donde promovemos cambio",
    image: imgEducacion,
    infografia: {
      image: imgEducacion,
      problema: {
        titulo: "Cultura de consumo sin reflexión",
        descripcion: "Se compra y consume sin pensar en el origen del producto, su impacto ambiental ni sus consecuencias sociales. La presión del grupo moldea las decisiones sin conciencia crítica.",
        pct: 70,
        icon: "🛒",
      },
      solucion: {
        titulo: "Difusión digital consciente",
        descripcion: "Aprovechar el contacto diario con los estudiantes para compartir mensajes sobre impacto ambiental y consumo responsable a través de redes sociales.",
        pasos: ["Contenido educativo en redes", "Historias de impacto real", "Comunidad digital escolar", "Mensajes de consumo consciente"],
        icon: "📱",
      },
      estadisticas: [
        { label: "Alcance en redes", value: "91%" },
        { label: "Impacto social digital", value: "88%" },
        { label: "Estudiantes informados", value: "85%" },
      ],
      cita: "Las redes sociales son el puente entre el negocio escolar y la transformación cultural de toda la comunidad.",
      ciclo: ["Publicación digital", "Estudiante lo ve", "Reflexión crítica", "Cambio de hábito", "Difusión viral"],
    },
  },
  {
    id: 4,
    nombre: "Equidad y Acceso",
    categoria: "Inclusión Escolar",
    descripcion:
      "Los precios justos y accesibles garantizan que todos los estudiantes puedan acceder a opciones nutritivas sin discriminación económica. Un snack consciente es derecho de toda la comunidad.",
    porcentaje: 68,
    color: "#1D9E75",
    metrics: [65, 68, 72],
    icono: "🤝",
    impacto: "Precios equitativos llegan a 68% de estudiantes sin recursos",
    image: imgEquidad,
    infografia: {
      image: imgEquidad,
      problema: {
        titulo: "Desigualdad de acceso alimentario",
        descripcion: "Muchos estudiantes no acceden a opciones nutritivas dentro de la escuela por costo o disponibilidad. El mercado escolar suele priorizar volumen sobre valor nutricional.",
        pct: 55,
        icon: "💰",
      },
      solucion: {
        titulo: "Precios accesibles con valor real",
        descripcion: "Mantener precios al alcance del estudiante promedio sin sacrificar calidad. Acceso a alimentación digna para todos, sin excepción económica.",
        pasos: ["Precios justos y fijos", "Combos económicos", "Sin discriminación de acceso", "Opciones para todos los bolsillos"],
        icon: "🤝",
      },
      estadisticas: [
        { label: "Estudiantes que acceden", value: "68%" },
        { label: "Satisfacción de precio", value: "65%" },
        { label: "Meta de inclusión", value: "72%" },
      ],
      cita: "La equidad alimentaria en el entorno escolar comienza con decisiones de precio que no excluyen a nadie.",
      ciclo: ["Precio justo", "Acceso universal", "Nutrición digna", "Comunidad unida", "Equidad real"],
    },
  },
];

const METRIC_NAMES = ["Impacto Social", "Sostenibilidad", "Aceptación"];

/* ══════════════════════════════════════════════════════
   MODAL DE INFOGRAFÍA (por distrito)
══════════════════════════════════════════════════════ */
function InfografiaModal({ distrito, onClose }) {
  const d = distrito;
  if (!d) return null;
  const info = d.infografia;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(10px)",
          display: "flex", alignItems: "flex-start",
          justifyContent: "center",
          padding: "24px 16px",
          overflowY: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 860,
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${d.color}40`,
            background: "linear-gradient(160deg, #0a0006 0%, #04000c 40%, #060003 100%)",
            position: "relative",
            marginBottom: 24,
          }}
        >
          {/* Glow header */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 260,
            background: `radial-gradient(ellipse at 50% -20%, ${d.color}30, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* Header con imagen de fondo */}
          <div style={{
            position: "relative",
            padding: "32px 40px 24px",
            borderBottom: `1px solid ${d.color}20`,
            overflow: "hidden",
          }}>
            {/* Imagen de fondo del header */}
            <div style={{
              position: "absolute", inset: 0,
              overflow: "hidden",
            }}>
              <img
                src={info.image}
                alt={d.nombre}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                  opacity: 0.12,
                  filter: "saturate(0.4)",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(90deg, rgba(10,0,6,0.97) 40%, rgba(10,0,6,0.75) 100%)`,
              }} />
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "4px 14px",
                  borderRadius: 30,
                  background: `${d.color}20`,
                  border: `1px solid ${d.color}40`,
                  marginBottom: 14,
                }}>
                  <span style={{ fontSize: 16 }}>{d.icono}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: "0.3em",
                    textTransform: "uppercase", color: d.color,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{d.categoria}</span>
                </div>
                <h2 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: 1, color: "#fff",
                  letterSpacing: "0.04em", margin: 0,
                }}>{d.nombre}</h2>
                <p style={{
                  fontSize: 13, color: "rgba(255,255,255,0.4)",
                  marginTop: 8, fontFamily: "'DM Sans', sans-serif",
                }}>Infografía sociocultural · Distrito 0{d.id}</p>
              </div>

              {/* Imagen circular del tema */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid ${d.color}50`,
                    boxShadow: `0 0 20px ${d.color}30`,
                    marginBottom: 6,
                  }}>
                    <img
                      src={info.image}
                      alt={d.nombre}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2.2rem", lineHeight: 1, color: d.color,
                  }}>{d.porcentaje}%</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Impacto</div>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >✕</button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "32px 40px 40px", display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Banner imagen grande */}
            <div style={{
              borderRadius: 14, overflow: "hidden",
              height: 180, position: "relative",
              border: `1px solid ${d.color}20`,
            }}>
              <img
                src={info.image}
                alt={d.nombre}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 60%, rgba(0,0,0,0.3) 100%)`,
              }} />
              <div style={{
                position: "absolute", bottom: 16, left: 20,
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem", color: "#fff",
                  textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                }}>{d.nombre}</div>
                <div style={{
                  fontSize: 11, color: d.color,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}>{d.categoria}</div>
              </div>
              <div style={{
                position: "absolute", top: 16, right: 16,
                background: `${d.color}`,
                padding: "6px 14px", borderRadius: 20,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.4rem", color: "#fff",
              }}>{d.porcentaje}%</div>
            </div>

            {/* Problema + Solución lado a lado */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Problema */}
              <div style={{
                borderRadius: 14, padding: "24px",
                background: "rgba(229,9,20,0.04)",
                border: "1px solid rgba(229,9,20,0.15)",
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{info.problema.icon}</div>
                <div style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "rgba(229,9,20,0.6)",
                  marginBottom: 8, fontFamily: "'DM Sans', sans-serif",
                }}>Problema detectado</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.4rem", color: "#fff", marginBottom: 10,
                }}>{info.problema.titulo}</div>
                <p style={{
                  fontSize: 13, color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 14,
                }}>{info.problema.descripcion}</p>
                <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${info.problema.pct}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ height: "100%", background: "#e50914", borderRadius: 3 }}
                  />
                </div>
                <p style={{ fontSize: 11, color: "#e50914", marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
                  Severidad: {info.problema.pct}%
                </p>
              </div>

              {/* Solución */}
              <div style={{
                borderRadius: 14, padding: "24px",
                background: `${d.color}08`,
                border: `1px solid ${d.color}25`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{info.solucion.icon}</div>
                <div style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.3em",
                  textTransform: "uppercase", color: d.color,
                  marginBottom: 8, fontFamily: "'DM Sans', sans-serif",
                }}>Propuesta de acción</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.4rem", color: "#fff", marginBottom: 10,
                }}>{info.solucion.titulo}</div>
                <p style={{
                  fontSize: 13, color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif",
                  marginBottom: 14,
                }}>{info.solucion.descripcion}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {info.solucion.pasos.map((paso, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        fontSize: 12, color: "rgba(255,255,255,0.6)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <div style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: d.color, flexShrink: 0,
                      }} />
                      {paso}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Métricas */}
            <div>
              <div style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "0.4em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
                marginBottom: 14, fontFamily: "'DM Sans', sans-serif",
              }}>Indicadores clave</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {info.estadisticas.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{
                      borderRadius: 12, padding: "18px 16px",
                      background: `${d.color}08`,
                      border: `1px solid ${d.color}20`,
                      textAlign: "center",
                    }}
                  >
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "2.4rem", lineHeight: 1, color: d.color,
                      marginBottom: 6,
                    }}>{stat.value}</div>
                    <div style={{
                      fontSize: 11, color: "rgba(255,255,255,0.4)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Ciclo de cambio */}
            <div>
              <div style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "0.4em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
                marginBottom: 14, fontFamily: "'DM Sans', sans-serif",
              }}>Ciclo de impacto</div>
              <div style={{
                display: "flex", gap: 0,
                background: "rgba(255,255,255,0.02)",
                borderRadius: 12, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                {info.ciclo.map((paso, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    style={{
                      flex: 1, padding: "16px 10px",
                      textAlign: "center",
                      borderRight: i < info.ciclo.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      background: i === 0 ? `${d.color}15` : "transparent",
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: i === 0 ? d.color : `${d.color}20`,
                      border: `1px solid ${d.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 8px",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 13, color: "#fff",
                    }}>{i + 1}</div>
                    <div style={{
                      fontSize: 10, color: "rgba(255,255,255,0.55)",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1.4,
                    }}>{paso}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cita */}
            <div style={{
              borderRadius: 12, padding: "20px 24px",
              background: `${d.color}08`,
              border: `1px solid ${d.color}20`,
              borderLeft: `3px solid ${d.color}`,
            }}>
              <p style={{
                fontSize: 14, color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7, fontStyle: "italic",
                fontFamily: "'DM Sans', sans-serif", margin: 0,
              }}>"{info.cita}"</p>
            </div>

            {/* Impacto bottom */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 20px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ fontSize: 20 }}>💡</div>
              <p style={{
                fontSize: 13, color: d.color,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, margin: 0,
              }}>{d.impacto}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════
   CIUDAD 3D — canvas
══════════════════════════════════════════════════════ */
function City3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    const rng = (seed) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    };

    const r = rng(42);
    const buildings = Array.from({ length: 22 }, (_, i) => {
      const col = i % 11;
      const row = Math.floor(i / 11);
      return {
        col, row,
        h: 40 + r() * 120,
        w: 28 + r() * 18,
        d: 20 + r() * 14,
        lights: Array.from({ length: Math.floor(r() * 12 + 4) }, () => ({
          fx: r(), fy: r(),
          on: r() > 0.35,
          flicker: r() > 0.82,
          phase: r() * Math.PI * 2,
        })),
      };
    });

    const draw = () => {
      time += 0.016;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const sorted = [...buildings].sort((a, b) => (a.col + a.row) - (b.col + b.row));
      const ISO_X = 36, ISO_Y = 18;
      const originX = w * 0.5, originY = h * 0.68;

      for (const b of sorted) {
        const sx = (b.col - b.row) * ISO_X + originX - b.w / 2;
        const sy = (b.col + b.row) * ISO_Y + originY - b.h;
        const bx = sx, by = sy, bw = b.w, bh = b.h, bd = b.d;

        ctx.beginPath();
        ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw + bd * 0.5, by - bd * 0.4);
        ctx.lineTo(bx + bd * 0.5, by - bd * 0.4); ctx.closePath();
        ctx.fillStyle = "rgba(40,10,15,0.95)";
        ctx.fill(); ctx.strokeStyle = "rgba(229,9,20,0.12)"; ctx.lineWidth = 0.5; ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by); ctx.closePath();
        const lgLeft = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
        lgLeft.addColorStop(0, "rgba(20,4,8,0.98)"); lgLeft.addColorStop(1, "rgba(8,2,4,0.98)");
        ctx.fillStyle = lgLeft; ctx.fill();
        ctx.strokeStyle = "rgba(229,9,20,0.08)"; ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw + bd * 0.5, by + bh - bd * 0.4);
        ctx.lineTo(bx + bw + bd * 0.5, by - bd * 0.4); ctx.closePath();
        const lgRight = ctx.createLinearGradient(bx + bw, by, bx + bw + bd, by);
        lgRight.addColorStop(0, "rgba(18,4,7,0.98)"); lgRight.addColorStop(1, "rgba(10,2,4,0.98)");
        ctx.fillStyle = lgRight; ctx.fill();
        ctx.strokeStyle = "rgba(229,9,20,0.06)"; ctx.stroke();

        for (const lt of b.lights) {
          const wx = bx + lt.fx * (bw - 8) + 4;
          const wy = by + lt.fy * (bh - 10) + 5;
          const flickering = lt.flicker && Math.sin(time * 3 + lt.phase) > 0.7;
          if (lt.on && !flickering) {
            ctx.beginPath(); ctx.rect(wx, wy, 5, 4);
            const wtype = Math.floor(lt.phase * 3) % 3;
            ctx.fillStyle = wtype === 0 ? "rgba(229,9,20,0.75)" : wtype === 1 ? "rgba(255,180,100,0.6)" : "rgba(200,200,255,0.45)";
            ctx.shadowColor = wtype === 0 ? "rgba(229,9,20,0.8)" : "rgba(255,200,100,0.6)";
            ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
          }
        }
      }

      for (let i = 0; i < 18; i++) {
        const pr = rng(i * 77 + 13);
        const px = (pr() * w + Math.sin(time * 0.4 + i) * 12) % w;
        const py = h * 0.1 + pr() * h * 0.5 + Math.cos(time * 0.3 + i * 1.3) * 20;
        const alpha = 0.15 + 0.25 * Math.abs(Math.sin(time * 0.5 + i));
        ctx.beginPath(); ctx.arc(px, py, 1 + pr() * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,9,20,${alpha})`; ctx.fill();
      }

      const gr = ctx.createLinearGradient(0, originY + 10, 0, h);
      gr.addColorStop(0, "rgba(229,9,20,0.06)"); gr.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gr; ctx.fillRect(0, originY + 10, w, h - originY);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ══════════════════════════════════════════════════════
   PLANETA 3D CSS
══════════════════════════════════════════════════════ */
function Planet3D() {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center",
      justifyContent: "center", position: "relative",
    }}>
      <style>{`
        @keyframes planet-float { 0%,100%{transform:translateY(0px);}50%{transform:translateY(-18px);} }
        @keyframes orbit1 { from{transform:rotateX(72deg) rotateZ(0deg);}to{transform:rotateX(72deg) rotateZ(360deg);} }
        @keyframes orbit2 { from{transform:rotateX(62deg) rotateZ(120deg);}to{transform:rotateX(62deg) rotateZ(480deg);} }
        @keyframes pulse-glow { 0%,100%{opacity:0.5;transform:scale(1);}50%{opacity:1;transform:scale(1.08);} }
      `}</style>

      <div style={{ animation: "planet-float 7s ease-in-out infinite", position: "relative" }}>
        <div style={{
          position: "absolute", inset: -40, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 65%)",
          animation: "pulse-glow 4s ease-in-out infinite", pointerEvents: "none",
        }} />
        <div style={{ perspective: 600, width: 180, height: 180 }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 260, height: 260, marginTop: -130, marginLeft: -130,
            borderRadius: "50%", border: "2px solid rgba(229,9,20,0.25)",
            animation: "orbit1 12s linear infinite", boxShadow: "0 0 10px rgba(229,9,20,0.1)",
          }}>
            <div style={{
              position: "absolute", top: -4, left: "50%",
              width: 8, height: 8, borderRadius: "50%",
              background: "#e50914", boxShadow: "0 0 12px rgba(229,9,20,0.8)",
              transform: "translateX(-50%)",
            }} />
          </div>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 220, height: 220, marginTop: -110, marginLeft: -110,
            borderRadius: "50%", border: "1px solid rgba(229,9,20,0.12)",
            animation: "orbit2 18s linear infinite",
          }}>
            <div style={{
              position: "absolute", bottom: -3, left: "30%",
              width: 5, height: 5, borderRadius: "50%",
              background: "rgba(255,200,100,0.8)", boxShadow: "0 0 8px rgba(255,200,100,0.6)",
            }} />
          </div>
          <div style={{
            width: 180, height: 180, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(80,10,15,1) 0%, rgba(20,4,8,1) 50%, rgba(5,0,2,1) 100%)",
            boxShadow: "inset -30px -20px 40px rgba(0,0,0,0.9),inset 10px 8px 30px rgba(229,9,20,0.18),0 0 40px rgba(229,9,20,0.3),0 0 80px rgba(229,9,20,0.1)",
            position: "relative", overflow: "hidden",
          }}>
            {[0.2, 0.38, 0.55, 0.7].map((y, i) => (
              <div key={i} style={{
                position: "absolute", left: 0, right: 0, top: `${y * 100}%`,
                height: i % 2 === 0 ? 2 : 1,
                background: `rgba(229,9,20,${0.06 + i * 0.02})`, borderRadius: 2,
              }} />
            ))}
            <div style={{
              position: "absolute", top: "12%", left: "18%",
              width: "35%", height: "30%", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,100,80,0.18) 0%, transparent 70%)",
            }} />
            {[{x:"55%",y:"40%",s:3},{x:"70%",y:"58%",s:2},{x:"42%",y:"62%",s:2.5},{x:"62%",y:"30%",s:2},{x:"35%",y:"48%",s:1.5}].map((dot, i) => (
              <div key={i} style={{
                position: "absolute", left: dot.x, top: dot.y,
                width: dot.s, height: dot.s, borderRadius: "50%",
                background: "#e50914", boxShadow: "0 0 6px rgba(229,9,20,0.8)",
                transform: "translate(-50%,-50%)",
              }} />
            ))}
          </div>
        </div>
        <div style={{
          textAlign: "center", marginTop: 18,
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem",
          letterSpacing: "0.4em", color: "rgba(229,9,20,0.5)",
        }}>YAMAMOI'S · 2025</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LOGO + CAJA del producto (panel derecho hero)
══════════════════════════════════════════════════════ */
function BrandShowcase() {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 28, position: "relative",
    }}>
      {/* Glow de fondo */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, rgba(229,9,20,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* PLANETA */}
      <div style={{ width: "100%", height: 260, position: "relative" }}>
        <Planet3D />
      </div>

      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          position: "relative",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 16,
        }}
      >
        {/* Logo image */}
        <div style={{
          width: 140, height: 140,
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(229,9,20,0.25)",
          boxShadow: "0 0 30px rgba(229,9,20,0.2), 0 8px 32px rgba(0,0,0,0.6)",
          background: "rgba(255,255,255,0.03)",
        }}>
          <img
            src={imgLogo}
            alt="Yamamoi's Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
          />
        </div>

        {/* CAJA del producto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ scale: 1.04, rotate: 1 }}
          style={{
            position: "relative",
            width: 160,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(229,9,20,0.2)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.7), 0 0 24px rgba(229,9,20,0.12)",
            cursor: "pointer",
          }}
        >
          <img
            src={imgCaja}
            alt="Caja Yamamoi's"
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
          {/* Shine effect */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(229,9,20,0.05) 100%)",
            pointerEvents: "none",
          }} />
          {/* Label */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            padding: "20px 12px 10px",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1rem", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.7)",
            }}>PRODUCTO</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ESTRELLAS
══════════════════════════════════════════════════════ */
function NightStars() {
  const stars = Array.from({ length: 160 }, (_, i) => {
    const r = (s) => { let x = s; x = (x * 16807) % 2147483647; return (x - 1) / 2147483646; };
    const s1 = r(i*137+1), s2 = r(i*137+2), s3 = r(i*137+3), s4 = r(i*137+4);
    return { id: i, size: s1 < 0.6 ? 1 : s1 < 0.85 ? 1.5 : 2, left: s2*100, top: s3*70, dur: 2.5+s4*5, delay: s1*6 };
  });
  return (
    <>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute", width: s.size, height: s.size,
          borderRadius: "50%", background: "#fff",
          left: `${s.left}%`, top: `${s.top}%`,
          animationName: "soc-twinkle", animationDuration: `${s.dur}s`,
          animationDelay: `${s.delay}s`, animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
        }} />
      ))}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   SKYLINE SVG
══════════════════════════════════════════════════════ */
function SkylineSVG() {
  return (
    <svg style={{ position:"absolute",bottom:0,left:0,width:"100%",height:500,pointerEvents:"none" }}
      viewBox="0 0 1400 500" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bldGrad1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#180406"/><stop offset="100%" stopColor="#060102"/>
        </linearGradient>
        <linearGradient id="bldGrad2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#120305"/><stop offset="100%" stopColor="#040101"/>
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[[0,320,50,180],[55,280,38,220],[98,340,45,160],[148,260,55,240],[208,300,42,200],[255,275,60,225],[320,320,40,180],[365,255,70,245],[440,290,48,210],[493,265,58,235],[556,305,44,195],[605,250,65,250],[675,285,52,215],[732,270,48,230],[785,310,55,190],[845,260,62,240],[912,295,45,205],[962,275,55,225],[1022,320,50,180],[1077,258,68,242],[1150,295,45,205],[1200,265,58,235],[1263,310,48,190],[1316,275,55,225],[1376,305,24,195]].map(([x,y,w,h],i) => (
        <rect key={`far-${i}`} x={x} y={y} width={w} height={h} fill="url(#bldGrad2)" opacity="0.7"/>
      ))}
      {[[0,290,55,210],[60,248,48,252],[113,310,52,190],[170,225,65,275],[240,270,55,230],[300,205,70,295],[375,255,58,245],[438,230,78,270],[521,268,48,232],[574,195,68,305],[647,252,54,248],[706,220,72,280],[783,268,50,232],[838,205,64,295],[907,255,54,245],[966,218,80,282],[1051,275,48,225],[1104,238,60,262],[1169,215,75,285],[1249,258,54,242],[1308,205,65,295],[1378,248,22,252]].map(([x,y,w,h],i) => (
        <rect key={`mid-${i}`} x={x} y={y} width={w} height={h} fill="url(#bldGrad1)"/>
      ))}
      {[[15,302,8,6],[15,316,8,6],[15,330,8,6],[32,302,8,6],[32,316,8,6],[70,260,8,6],[70,274,8,6],[70,288,8,6],[86,260,8,6],[86,274,8,6],[180,238,8,6],[180,252,8,6],[180,266,8,6],[196,238,8,6],[196,252,8,6],[310,218,8,6],[310,232,8,6],[310,246,8,6],[326,218,8,6],[326,232,8,6],[450,242,8,6],[450,256,8,6],[450,270,8,6],[466,242,8,6],[466,256,8,6],[590,208,8,6],[590,222,8,6],[590,236,8,6],[606,208,8,6],[606,222,8,6],[720,232,8,6],[720,246,8,6],[720,260,8,6],[736,232,8,6],[736,246,8,6],[855,218,8,6],[855,232,8,6],[855,246,8,6],[871,218,8,6],[871,232,8,6],[980,230,8,6],[980,244,8,6],[980,258,8,6],[996,230,8,6],[996,244,8,6],[1110,250,8,6],[1110,264,8,6],[1126,250,8,6],[1260,270,8,6],[1260,284,8,6],[1276,270,8,6]].map(([x,y,w,h],i) => (
        <rect key={`win-red-${i}`} x={x} y={y} width={w} height={h} fill="rgba(229,9,20,0.65)" filter="url(#glow)"/>
      ))}
      {[[25,310,8,6],[88,268,8,6],[200,244,8,6],[340,224,8,6],[475,248,8,6],[615,214,8,6],[750,238,8,6],[885,226,8,6],[1005,238,8,6],[1140,256,8,6],[1285,262,8,6]].map(([x,y,w,h],i) => (
        <rect key={`win-warm-${i}`} x={x} y={y} width={w} height={h} fill="rgba(255,200,120,0.45)"/>
      ))}
      {[[174,224],[304,204],[568,194],[850,204],[1263,214]].map(([x,y],i) => (
        <g key={`ant-${i}`}>
          <line x1={x+2} y1={y} x2={x+2} y2={y-28} stroke="rgba(229,9,20,0.4)" strokeWidth="1.5"/>
          <circle cx={x+2} cy={y-30} r="3" fill="#e50914" opacity="0.7" filter="url(#glow)"/>
        </g>
      ))}
      <ellipse cx="700" cy="500" rx="700" ry="40" fill="rgba(229,9,20,0.04)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   CARD DE DISTRITO — con imagen
══════════════════════════════════════════════════════ */
function DistrictCard({ d, active, onClick }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const t = setTimeout(() => { el.style.width = active ? `${d.porcentaje}%` : "0%"; }, 60);
    return () => clearTimeout(t);
  }, [active, d.porcentaje]);

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: `${d.color}40` }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      style={{
        position: "relative",
        border: active ? `1px solid ${d.color}40` : "1px solid rgba(229,9,20,0.08)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        background: "rgba(0,0,0,0.4)",
        transition: "border-color 0.35s, background 0.35s",
        minHeight: 200,
      }}
    >
      {/* Imagen de fondo */}
      <div style={{
        position: "absolute", inset: 0,
        overflow: "hidden",
      }}>
        <img
          src={d.image}
          alt={d.nombre}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            opacity: active ? 0.25 : 0.15,
            transition: "opacity 0.4s",
            transform: "scale(1.05)",
          }}
        />
        {/* Gradiente sobre la imagen */}
        <div style={{
          position: "absolute", inset: 0,
          background: active
            ? `linear-gradient(135deg, ${d.color}18 0%, rgba(0,0,0,0.75) 100%)`
            : "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)",
          transition: "background 0.4s",
        }} />
      </div>

      {/* Top line activa */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: d.color,
        transform: active ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left", transition: "transform 0.4s ease",
      }} />

      {/* Num watermark */}
      <div style={{
        position: "absolute", right: 14, bottom: -10,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "5rem", lineHeight: 1,
        color: "rgba(229,9,20,0.08)",
        pointerEvents: "none", letterSpacing: "-0.02em",
      }}>0{d.id}</div>

      {/* Contenido */}
      <div style={{ position: "relative", padding: "26px 26px 22px" }}>
        <div style={{
          fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)", marginBottom: 10,
          fontFamily: "'DM Sans', sans-serif",
        }}>DISTRITO 0{d.id}</div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
          {/* Thumbnail circular */}
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            overflow: "hidden", flexShrink: 0,
            border: `1.5px solid ${d.color}50`,
            boxShadow: active ? `0 0 14px ${d.color}40` : "none",
            transition: "box-shadow 0.4s",
          }}>
            <img src={d.image} alt={d.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem", lineHeight: 1, color: "#fff",
              letterSpacing: "0.04em",
            }}>{d.nombre}</div>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.35)",
              marginTop: 4, fontFamily: "'DM Sans', sans-serif",
            }}>{d.categoria}</div>
          </div>
        </div>

        <div style={{
          height: 2, background: "rgba(229,9,20,0.1)",
          borderRadius: 2, overflow: "hidden", marginBottom: 6,
        }}>
          <div ref={barRef} style={{
            height: "100%", borderRadius: 2,
            background: d.color, width: 0, transition: "width 0.75s ease",
          }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
            {d.porcentaje}% impacto
          </div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: d.color,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.15em", textTransform: "uppercase",
          }}>Ver infografía →</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PANEL DETALLE — con imagen lateral
══════════════════════════════════════════════════════ */
function DetailPanel({ d }) {
  const barRefs = useRef([]);

  useEffect(() => {
    barRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.width = "0%";
      const t = setTimeout(() => { el.style.width = `${d.metrics[i]}%`; }, 120 + i * 90);
      return () => clearTimeout(t);
    });
  }, [d]);

  return (
    <motion.div
      key={d.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        border: "1px solid rgba(229,9,20,0.12)",
        borderRadius: 16, overflow: "hidden",
        background: "rgba(229,9,20,0.03)",
        marginTop: 12,
      }}
    >
      {/* Banner imagen del distrito */}
      <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
        <img
          src={d.image}
          alt={d.nombre}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, rgba(0,0,0,0.85) 30%, transparent 70%, rgba(0,0,0,0.5) 100%)`,
        }} />
        <div style={{
          position: "absolute", bottom: 16, left: 24,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: "2rem" }}>{d.icono}</span>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.8rem", lineHeight: 1, color: "#fff",
              letterSpacing: "0.04em",
            }}>{d.nombre}</div>
            <div style={{ fontSize: 11, color: d.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              {d.categoria}
            </div>
          </div>
        </div>
        <div style={{
          position: "absolute", top: 16, right: 24,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "3.5rem", lineHeight: 1, color: d.color,
          textShadow: `0 0 20px ${d.color}60`,
        }}>{d.porcentaje}%</div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "28px 40px 36px" }}>
        <div style={{ height: 1, background: `linear-gradient(90deg,${d.color}40,transparent)`, marginBottom: 22 }} />

        <p style={{
          fontSize: "0.95rem", lineHeight: 1.8,
          color: "rgba(255,255,255,0.55)",
          marginBottom: 22, maxWidth: 580,
          fontFamily: "'DM Sans', sans-serif",
        }}>{d.descripcion}</p>

        <div style={{
          background: `${d.color}15`,
          border: `1px solid ${d.color}30`,
          borderRadius: 10, padding: 12, marginBottom: 22,
        }}>
          <p style={{ fontSize: 13, color: d.color, margin: 0, fontWeight: 600 }}>
            💡 {d.impacto}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {METRIC_NAMES.map((name, i) => (
            <div key={name} style={{
              border: "1px solid rgba(229,9,20,0.08)",
              borderRadius: 10, padding: 16,
              background: "rgba(229,9,20,0.02)",
            }}>
              <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Métrica</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
              <div style={{ height: 2, background: "rgba(229,9,20,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div ref={(el) => (barRefs.current[i] = el)} style={{
                  height: "100%", borderRadius: 2, background: d.color,
                  width: 0, transition: `width 0.85s ease ${0.1 + i * 0.1}s`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════════════════ */
export default function SociologiaCompleta() {
  const [selected, setSelected] = useState(DISTRITOS[0]);
  const [modalDistrito, setModalDistrito] = useState(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const fn = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleCardClick = (d) => {
    setSelected(d);
    setModalDistrito(d);
  };

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      overflow: "hidden", background: "#030305",
      color: "#fff", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes soc-twinkle { 0%,100%{opacity:0.15;}50%{opacity:0.85;} }
        @keyframes moon-breathe {
          0%,100%{box-shadow:0 0 20px rgba(229,9,20,0.4),0 0 60px rgba(229,9,20,0.15);}
          50%{box-shadow:0 0 30px rgba(229,9,20,0.6),0 0 90px rgba(229,9,20,0.25);}
        }
      `}</style>

      {/* Sky gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg,#04000a 0%,#08001a 20%,#10001f 45%,#150010 65%,#0a0005 80%,#030305 100%)",
      }} />

      {/* Stars */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <NightStars />
      </div>

      {/* Moon */}
      <div style={{
        position: "absolute", top: 36, right: 100,
        width: 48, height: 48, borderRadius: "50%",
        background: "radial-gradient(circle at 38% 38%, #ffe8e8, #cc2020)",
        boxShadow: "0 0 20px rgba(229,9,20,0.4),0 0 60px rgba(229,9,20,0.15)",
        animation: "moon-breathe 6s ease-in-out infinite", zIndex: 2,
      }} />

      {/* Skyline */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, pointerEvents: "none" }}>
        <SkylineSVG />
      </div>

      {/* Street */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 95,
        background: "linear-gradient(180deg,#0c0306 0%,#060103 100%)",
        borderTop: "1px solid rgba(229,9,20,0.12)", zIndex: 4,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 20 }}>

        {/* Navbar */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "14px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: navSolid ? "rgba(3,0,5,0.92)" : "linear-gradient(to bottom,rgba(3,0,5,0.75),transparent)",
          backdropFilter: navSolid ? "blur(14px)" : "none",
          borderBottom: navSolid ? "1px solid rgba(229,9,20,0.1)" : "none",
          transition: "all 0.4s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Logo en navbar */}
            <div style={{
              width: 32, height: 32, borderRadius: 8, overflow: "hidden",
              border: "1px solid rgba(229,9,20,0.3)",
            }}>
              <img src={imgLogo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ width: 2, height: 22, background: "#e50914", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.12em", color: "#fff" }}>
              Sociología
            </span>
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing: "0.25em",
              textTransform: "uppercase", padding: "3px 8px",
              borderRadius: 3, background: "#e50914", color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
            }}>Yamamoi's</span>
          </div>
        </nav>

        {/* Hero */}
        <div style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "100px 60px 280px",
          gap: 40,
        }}>
          {/* Left: texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{
              fontSize: 10, letterSpacing: "0.5em",
              textTransform: "uppercase", color: "rgba(229,9,20,0.7)",
              marginBottom: 24, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            }}>Sociología · Impacto Sociocultural</p>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.5rem,7vw,6.5rem)",
                lineHeight: 0.95, color: "#fff",
                letterSpacing: "0.03em", marginBottom: 28,
              }}
            >La ciudad y sus gentes</motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                maxWidth: 460, fontSize: "1.02rem",
                lineHeight: 1.8, color: "rgba(255,255,255,0.45)",
                fontWeight: 300, marginBottom: 32,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Un análisis crítico y reflexivo sobre cómo Yamamoi's Snacks
              impacta la comunidad estudiantil, promoviendo consumo consciente
              y equilibrio entre el ser humano y el ambiente.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                fontSize: 11, color: "rgba(229,9,20,0.5)",
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >↓ Toca una card para ver la infografía</motion.p>
          </motion.div>

          {/* Right: Planet 3D + Logo + Caja */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ height: 560, position: "relative" }}
          >
            <BrandShowcase />
          </motion.div>
        </div>

        {/* Distritos section */}
        <div style={{ padding: "0 60px 160px" }}>
          <p style={{
            fontSize: 10, letterSpacing: "0.5em",
            textTransform: "uppercase", color: "rgba(229,9,20,0.55)",
            marginBottom: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          }}>Análisis Urbano</p>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
            <div style={{ width: 3, height: 38, background: "#e50914", borderRadius: 2, flexShrink: 0 }} />
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.2rem,5vw,3.5rem)",
              lineHeight: 1, color: "rgba(255,255,255,0.88)",
              letterSpacing: "0.04em", margin: 0,
            }}>Distritos de impacto</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {DISTRITOS.map((d) => (
              <DistrictCard
                key={d.id} d={d}
                active={selected.id === d.id}
                onClick={() => handleCardClick(d)}
              />
            ))}
          </div>

          <DetailPanel d={selected} />
        </div>
      </div>

      {/* Modal infografía */}
      {modalDistrito && (
        <InfografiaModal
          distrito={modalDistrito}
          onClose={() => setModalDistrito(null)}
        />
      )}
    </section>
  );
}