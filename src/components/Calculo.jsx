import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ════════════════════════════════════════
   TUNNEL CANVAS (hero)
════════════════════════════════════════ */
function useTunnel(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H, cx, cy, maxR;

    const PALETTE = [
      [229, 9, 20],
      [255, 255, 255],
      [255, 80, 80],
      [255, 180, 180],
      [200, 0, 0],
      [255, 120, 40],
    ];

    const N = 420;
    const lines = Array.from({ length: N }, (_, i) => ({
      angle: (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.15,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.011,
      tailLen: 0.08 + Math.random() * 0.18,
      lw: 0.5 + Math.random() * 2,
      rgb: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: 0.5 + Math.random() * 0.5,
    }));

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cx = W / 2; cy = H / 2;
      maxR = Math.sqrt(cx * cx + cy * cy) * 1.08;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fillRect(0, 0, W, H);

      for (const l of lines) {
        l.progress += l.speed;
        if (l.progress >= 1) {
          l.progress = 0;
          l.angle = Math.random() * Math.PI * 2;
          l.speed = 0.003 + Math.random() * 0.011;
          l.tailLen = 0.08 + Math.random() * 0.18;
          l.lw = 0.5 + Math.random() * 2;
          l.rgb = PALETTE[Math.floor(Math.random() * PALETTE.length)];
          l.alpha = 0.5 + Math.random() * 0.5;
        }
        const p0 = Math.pow(l.progress, 1.7);
        const p1 = Math.pow(Math.min(l.progress + l.tailLen, 1), 1.7);
        const x0 = cx + Math.cos(l.angle) * p0 * maxR;
        const y0 = cy + Math.sin(l.angle) * p0 * maxR;
        const x1 = cx + Math.cos(l.angle) * p1 * maxR;
        const y1 = cy + Math.sin(l.angle) * p1 * maxR;
        const fade = Math.sin(l.progress * Math.PI);
        const a = l.alpha * fade;
        const [r, g, b] = l.rgb;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${a.toFixed(2)})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineWidth = l.lw * (0.6 + p0 * 3.5);
        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      const vig = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.6);
      vig.addColorStop(0, "rgba(0,0,0,0.55)");
      vig.addColorStop(0.45, "rgba(0,0,0,0.05)");
      vig.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
}

/* ════════════════════════════════════════
   FONDO GLOBAL — estrellas + orbs (más luminoso)
════════════════════════════════════════ */
function GlobalBackground() {
  const stars = useMemo(() => Array.from({ length: 160 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 0.8 + Math.random() * 1.8,
    dur: `${4 + Math.random() * 7}s`,
    delay: `${Math.random() * 8}s`,
    opacity: 0.15 + Math.random() * 0.45,
  })), []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>

      {/* Base — levantada para que no sea tan negra */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 10%, rgba(80,5,5,0.75) 0%, #0d0005 55%)",
      }} />

      {/* Orb rojo top-left — principal, más brillante */}
      <div style={{
        position: "absolute", top: "-8%", left: "-6%",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(229,9,20,0.35), transparent 68%)",
        filter: "blur(55px)",
        animation: "orb1 9s ease-in-out infinite",
      }} />

      {/* Orb rojo bottom-right, más brillante */}
      <div style={{
        position: "absolute", bottom: "-10%", right: "-8%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,0,0,0.28), transparent 65%)",
        filter: "blur(60px)",
        animation: "orb2 12s ease-in-out infinite",
      }} />

      {/* Orb centro-izquierda — más visible */}
      <div style={{
        position: "absolute", top: "35%", left: "5%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(229,9,20,0.18), transparent 70%)",
        filter: "blur(70px)",
        animation: "orb3 15s ease-in-out infinite",
      }} />

      {/* Orb centro-derecha — más visible */}
      <div style={{
        position: "absolute", top: "55%", right: "8%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,60,0,0.16), transparent 70%)",
        filter: "blur(65px)",
        animation: "orb1 18s ease-in-out infinite reverse",
      }} />

      {/* ── LUCES EXTRA para iluminar el fondo ── */}

      {/* Luz cálida top-center */}
      <div style={{
        position: "absolute", top: "-5%", left: "40%",
        width: 600, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(229,9,20,0.22), transparent 65%)",
        filter: "blur(80px)",
        animation: "orb3 11s ease-in-out infinite",
      }} />

      {/* Luz de acento magenta/naranja — mid-right */}
      <div style={{
        position: "absolute", top: "25%", right: "-4%",
        width: 450, height: 500, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,40,0,0.14), transparent 68%)",
        filter: "blur(75px)",
        animation: "orb2 14s ease-in-out infinite",
      }} />

      {/* Luz profunda centro — eleva el negro base */}
      <div style={{
        position: "absolute", top: "45%", left: "30%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(120,0,0,0.2), transparent 68%)",
        filter: "blur(100px)",
        animation: "orb3 20s ease-in-out infinite reverse",
      }} />

      {/* Luz tenue bottom-left */}
      <div style={{
        position: "absolute", bottom: "5%", left: "10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(229,9,20,0.14), transparent 70%)",
        filter: "blur(70px)",
        animation: "orb1 16s ease-in-out infinite",
      }} />

      {/* Luz sutil top-right */}
      <div style={{
        position: "absolute", top: "5%", right: "15%",
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,80,20,0.12), transparent 70%)",
        filter: "blur(60px)",
        animation: "orb2 10s ease-in-out infinite reverse",
      }} />

      {/* Grid de líneas sutil */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(229,9,20,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(229,9,20,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* Estrellas */}
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute",
          left: s.left, top: s.top,
          width: s.size, height: s.size,
          borderRadius: "50%",
          background: "white",
          opacity: s.opacity,
          animation: `starTwinkle ${s.dur} linear infinite`,
          animationDelay: s.delay,
        }} />
      ))}

      <style>{`
        @keyframes orb1 {
          0%,100% { transform: scale(1) translate(0,0); opacity:1; }
          50%      { transform: scale(1.1) translate(30px,-20px); opacity:0.75; }
        }
        @keyframes orb2 {
          0%,100% { transform: scale(1) translate(0,0); opacity:0.85; }
          50%      { transform: scale(1.08) translate(-25px,15px); opacity:0.6; }
        }
        @keyframes orb3 {
          0%,100% { transform: scale(1); opacity:0.7; }
          50%      { transform: scale(1.15); opacity:1; }
        }
        @keyframes starTwinkle {
          0%,100% { opacity:0.15; }
          50%      { opacity:0.7; }
        }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════════
   UTILIDADES
════════════════════════════════════════ */
function FadeIn({ children, delay = 0, y = 36, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function DropTitle({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const words = String(children).split(" ");
  return (
    <h2 ref={ref} className={className} style={{ overflow: "hidden" }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={visible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

const Eye = ({ children, color = "#e50914" }) => (
  <p className="uppercase tracking-[0.4em] text-sm font-bold mb-5" style={{ color }}>{children}</p>
);

const HR = () => (
  <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(229,9,20,0.3),transparent)" }} />
);

/* Divisor con glow entre secciones */
const SectionGlow = ({ side = "left" }) => (
  <div style={{
    position: "absolute",
    [side === "left" ? "left" : "right"]: "-5%",
    top: "50%", transform: "translateY(-50%)",
    width: 340, height: 340, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(229,9,20,0.1), transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  }} />
);

/* ════════════════════════════════════════
   MAIN
════════════════════════════════════════ */
export default function Calculo() {
  const canvasRef = useRef(null);
  useTunnel(canvasRef);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const fn = () => setNavSolid(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#e50914;border-radius:3px;}
        body{margin:0;font-family:'DM Sans',sans-serif;}
        .bebas{font-family:'Bebas Neue',sans-serif;}
      `}</style>

      {/* ── FONDO GLOBAL ── */}
      <GlobalBackground />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navSolid ? "rgba(0,0,0,0.92)" : "linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)",
        backdropFilter: navSolid ? "blur(14px)" : "none",
        borderBottom: navSolid ? "1px solid rgba(229,9,20,0.15)" : "none",
        transition: "all 0.4s",
      }}>
        <div className="flex items-center gap-3">
          <span className="bebas text-2xl tracking-widest text-white" style={{ letterSpacing: "0.12em" }}>
            YAMAMOI'S
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ background: "#e50914", color: "#fff" }}>
            Snacks
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
          {["Nosotros", "Productos", "Estrategia", "Finanzas"].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors duration-200">{s}</a>
          ))}
        </div>
        <a href="https://storage3.me-qr.com/pdf/e2ff9ff4-a188-4310-b9bf-716366c51f13.pdf"
          target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold px-5 py-2 rounded transition-all hover:scale-105"
          style={{ background: "#e50914" }}>
          ↓ Plan PDF
        </a>
      </nav>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center"
        style={{ minHeight: "100vh", zIndex: 10, overflow: "hidden", paddingTop: 100, paddingBottom: 60 }}>
        <canvas ref={canvasRef} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          zIndex: 0, pointerEvents: "none", opacity: 0.85,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 300,
          background: "linear-gradient(to top,#000 10%,transparent)",
          zIndex: 1, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 140,
          background: "linear-gradient(to bottom,#000 0%,transparent)",
          zIndex: 1, pointerEvents: "none",
        }} />
        <motion.div className="relative text-center px-6" style={{ zIndex: 2 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="uppercase tracking-[0.5em] text-xs font-bold mb-6" style={{ color: "#e50914" }}>
            Plan de negocios · Preparatoria No. 1 UAEMéx · 2025
          </motion.p>
          <motion.img src="/images/yamamoi-logo.png" alt="Yamamoi's Snacks"
            className="mx-auto w-[280px] sm:w-[500px] md:w-[640px]"
            initial={{ opacity: 0, scale: 0.7, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: "drop-shadow(0 0 60px rgba(229,9,20,0.6)) drop-shadow(0 0 130px rgba(229,9,20,0.25))" }}
          />
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }} className="text-gray-300 text-lg mt-6 tracking-widest">
            Snacks rápidos · Deliciosos · Hechos para estudiantes
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }} className="flex flex-wrap gap-4 justify-center mt-10">
            <a href="#nosotros"
              className="flex items-center gap-2 px-9 py-4 rounded-full font-bold text-black text-base hover:scale-105 active:scale-95 transition-all"
              style={{ background: "#fff" }}>
              ▶ Explorar proyecto
            </a>
            <a href="https://storage3.me-qr.com/pdf/e2ff9ff4-a188-4310-b9bf-716366c51f13.pdf"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-9 py-4 rounded-full font-bold text-base hover:scale-105 active:scale-95 transition-all"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              ↓ Descargar PDF
            </a>
          </motion.div>

          {/* ── INTEGRANTES ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            style={{ marginTop: 40 }}
          >
            <p style={{
              fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase",
              color: "rgba(229,9,20,0.45)", marginBottom: 14,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            }}>Equipo de trabajo</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: "8px 28px",
              justifyContent: "center",
            }}>
              {[
                "Cabrera Bernal Joshua",
                "García Romero Kenia",
                "Martínez Carmona Joshua Moisés",
                "Ramírez Quiroz Kevin Zuriel",
                "Rodríguez Mondragón Julio Yazid",
                "Sánchez Alberto Kevin Uriel",
              ].map((name, i) => (
                <span key={i} style={{
                  fontSize: 11,
                  color: i % 2 === 0 ? "rgba(255,255,255,0.55)" : "rgba(229,9,20,0.75)",
                  letterSpacing: "0.08em",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(229,9,20,0.4)", flexShrink: 0, display: "inline-block" }} />
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* ── Contenido con z-index sobre el fondo fijo ── */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ════════════════════════════════════════
            STATS ROW
        ════════════════════════════════════════ */}
        <section style={{
          borderTop: "1px solid rgba(229,9,20,0.18)",
          borderBottom: "1px solid rgba(229,9,20,0.12)",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
        }}>
          <div className="max-w-5xl mx-auto py-14 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { v: "$1,000", l: "Inversión inicial" },
              { v: "10–20",  l: "Productos / día" },
              { v: "$2,000", l: "Ingreso semanal" },
              { v: "70%",    l: "Venta directa" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bebas text-5xl sm:text-6xl" style={{ color: "#e50914" }}>{s.v}</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mt-2 font-medium">{s.l}</div>
              </FadeIn>
            ))}
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            INTRO
        ════════════════════════════════════════ */}
        <section id="nosotros" className="py-36 px-6 relative"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="right" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn><Eye>Desarrollo Emprendedor</Eye></FadeIn>
              <DropTitle className="bebas text-[clamp(3.5rem,8vw,6.5rem)] leading-none mb-8 text-white" delay={0.1}>
                Snacks que cuentan una historia
              </DropTitle>
              <div className="space-y-5 text-gray-400 leading-relaxed text-[15px]">
                <FadeIn delay={0.15}><p>Yamamoi's Snacks es un proyecto emprendedor desarrollado por estudiantes de 6° semestre de la Preparatoria No. 1 de la UAEMéx, enfocado en ofrecer snacks rápidos, económicos y preparados al momento para estudiantes dentro del entorno escolar.</p></FadeIn>
                <FadeIn delay={0.22}><p>El proyecto surge a partir de la necesidad observada entre estudiantes que diariamente buscan productos prácticos, accesibles, con buen sabor y fáciles de consumir durante los descansos escolares.</p></FadeIn>
                <FadeIn delay={0.3}><p>Yamamoi's Snacks combina rapidez, buena presentación, sabores intensos, atención amigable y un concepto visual moderno pensado para el público juvenil.</p></FadeIn>
              </div>
            </div>
            <FadeIn delay={0.2} y={60}>
              <div className="relative flex justify-center">
                <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(circle,rgba(229,9,20,0.2),transparent 70%)", filter: "blur(40px)" }} />
                <div className="relative rounded-3xl overflow-hidden" style={{
                  border: "1px solid rgba(229,9,20,0.25)", background: "rgba(12,0,0,0.8)",
                  width: 340, height: 400, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <motion.img src="/images/caja-snacks.png" alt="Caja Yamamoi"
                    style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 50px rgba(229,9,20,0.5))" }}
                    animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="absolute -bottom-5 -left-4 text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl"
                  style={{ background: "#e50914", boxShadow: "0 0 30px rgba(229,9,20,0.5)" }}>
                  ✦ Preparado al momento
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            VIDEO
        ════════════════════════════════════════ */}
        <section className="py-24 px-6 relative" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="left" />
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Texto izquierdo */}
              <div>
                <FadeIn><Eye>Producto en acción</Eye></FadeIn>
                <DropTitle className="bebas text-[clamp(2.8rem,6vw,5rem)] leading-none text-white mb-6">
                  Míranos en acción
                </DropTitle>
                <FadeIn delay={0.2}>
                  <p className="text-gray-400 leading-relaxed text-[15px] mb-8">
                    Así es como preparamos nuestros snacks cada día dentro del plantel.
                    Rapidez, sabor y presentación al estilo Yamamoi's, directo para
                    la comunidad estudiantil de la Preparatoria No. 1 UAEMéx.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {["Preparación en vivo frente al cliente", "Ingredientes frescos y personalizables", "Presentación moderna y atractiva"].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e50914", flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Video derecho — formato vertical Short */}
              <FadeIn delay={0.15} y={40}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ position: "relative" }}>
                    {/* Glow detrás del video */}
                    <div style={{
                      position: "absolute", inset: -30, borderRadius: 32,
                      background: "radial-gradient(circle, rgba(229,9,20,0.25), transparent 70%)",
                      filter: "blur(40px)", pointerEvents: "none",
                    }} />
                    {/* Marco del video */}
                    <div style={{
                      position: "relative",
                      width: 315, height: 560,
                      borderRadius: 24,
                      overflow: "hidden",
                      border: "1px solid rgba(229,9,20,0.3)",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(229,9,20,0.15)",
                      background: "#000",
                    }}>
                      <iframe
                        src="https://www.youtube.com/embed/hku84kbV0PU?autoplay=0&rel=0&modestbranding=1"
                        title="Yamamoi's Snacks"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          width: "100%", height: "100%",
                          border: "none", display: "block",
                        }}
                      />
                    </div>
                    {/* Badge */}
                    <div style={{
                      position: "absolute", bottom: -14, right: -14,
                      background: "#e50914",
                      borderRadius: 12,
                      padding: "8px 16px",
                      fontSize: 11, fontWeight: 800,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#fff",
                      boxShadow: "0 0 24px rgba(229,9,20,0.5)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      ▶ Ver video
                    </div>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            MISIÓN & VISIÓN
        ════════════════════════════════════════ */}
        <section className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="left" />
          <div style={{
            position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(229,9,20,0.07), transparent 70%)",
            filter: "blur(50px)", pointerEvents: "none",
          }} />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <FadeIn><Eye>Identidad del proyecto</Eye></FadeIn>
              <DropTitle className="bebas text-[clamp(3rem,7vw,5.5rem)] leading-none text-white">Misión y Visión</DropTitle>
            </div>
            <div className="grid md:grid-cols-12 gap-8">
              <FadeIn delay={0.1} className="md:col-span-7">
                <div className="h-full rounded-3xl p-12 relative overflow-hidden group"
                  style={{ background: "rgba(229,9,20,0.06)", border: "1px solid rgba(229,9,20,0.2)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "radial-gradient(circle at top left,rgba(229,9,20,0.12),transparent 60%)" }} />
                  <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-3xl" style={{ background: "#e50914" }} />
                  <p className="uppercase tracking-[0.35em] text-xs font-bold mb-3" style={{ color: "#e50914" }}>Misión</p>
                  <p className="bebas text-5xl text-white mb-8">Nuestra Misión</p>
                  <p className="text-gray-300 text-lg leading-relaxed">Ofrecer snacks accesibles, deliciosos y preparados al momento dentro del entorno escolar, brindando una experiencia rápida, moderna y juvenil, utilizando ingredientes de calidad y una atención amable que permita satisfacer las necesidades de los estudiantes.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="md:col-span-5">
                <div className="h-full rounded-3xl p-10 relative overflow-hidden group"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-3xl" style={{ background: "rgba(255,255,255,0.3)" }} />
                  <p className="uppercase tracking-[0.35em] text-xs font-bold mb-3 text-gray-500">Visión</p>
                  <p className="bebas text-4xl text-white mb-8">Nuestra Visión</p>
                  <p className="text-gray-400 leading-relaxed text-[15px]">Convertirse en el negocio de snacks escolares más reconocido y preferido dentro de la Preparatoria No. 1 de la UAEMéx, destacando por la innovación, calidad, buena presentación y crecimiento constante.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            PÚBLICO OBJETIVO
        ════════════════════════════════════════ */}
        <section className="py-32 px-6 relative" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="right" />
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-16 items-start">
              <div className="lg:col-span-1">
                <FadeIn><Eye>Mercado y Clientes</Eye></FadeIn>
                <DropTitle className="bebas text-[clamp(2.8rem,5vw,4.5rem)] leading-none text-white">Público objetivo</DropTitle>
                <FadeIn delay={0.2}><p className="text-gray-500 mt-6 leading-relaxed text-sm">El negocio está dirigido principalmente a la comunidad estudiantil de la Preparatoria No. 1 de la UAEMéx.</p></FadeIn>
              </div>
              <div className="lg:col-span-2 relative pl-8">
                <div className="absolute left-0 top-2 bottom-2 w-px"
                  style={{ background: "linear-gradient(to bottom,#e50914,rgba(229,9,20,0.1))" }} />
                {[
                  { title: "Estudiantes adolescentes", desc: "Jóvenes entre 15 y 20 años que buscan snacks rápidos, económicos y deliciosos durante sus horarios de descanso dentro de la escuela.", tag: "Segmento principal" },
                  { title: "Comunidad escolar", desc: "Docentes, personal escolar y estudiantes de otros semestres. La propuesta está diseñada para ser accesible y atractiva para toda la comunidad.", tag: "Segmento secundario" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.18} className="mb-10 last:mb-0">
                    <div className="relative flex gap-6">
                      <div className="absolute -left-[38px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px]"
                        style={{ borderColor: "#e50914", background: "#000", color: "#e50914" }}>
                        {i + 1}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded mb-3 inline-block"
                          style={{ background: "rgba(229,9,20,0.12)", color: "#e50914" }}>
                          {item.tag}
                        </span>
                        <h3 className="bebas text-3xl text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            PRODUCTOS
        ════════════════════════════════════════ */}
        <section id="productos" className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="left" />
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
              <div>
                <FadeIn><Eye>Catálogo</Eye></FadeIn>
                <DropTitle className="bebas text-[clamp(3.5rem,8vw,6rem)] leading-none text-white">Lo que ofrecemos</DropTitle>
              </div>
              <FadeIn delay={0.2}>
                <a href="https://storage3.me-qr.com/pdf/e2ff9ff4-a188-4310-b9bf-716366c51f13.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all"
                  style={{ background: "#e50914" }}>
                  ↓ Ver plan completo
                </a>
              </FadeIn>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FadeIn delay={0.1}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
                  className="relative rounded-3xl overflow-hidden group"
                  style={{ height: 520, background: "#111" }}>
                  <img src="/images/papas1.png" alt="Papas"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.92) 0%,transparent 55%)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(229,9,20,0.18),transparent 50%)" }} />
                  <div className="absolute bottom-0 left-0 p-10">
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block" style={{ background: "#e50914" }}>Popular</span>
                    <h3 className="bebas text-5xl text-white mb-3">Papas Preparadas</h3>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-sm">Preparadas con limón, salsa, chile, chamoy, queso líquido y toppings personalizables para estudiantes.</p>
                  </div>
                </motion.div>
              </FadeIn>
              <div className="flex flex-col gap-6">
                {[
                  { img: "/images/papas2.png", title: "Dulces Enchilados", desc: "Combinaciones dulces y picositas con chamoy y chile, sabores intensos.", badge: "Nuevo" },
                  { img: "/images/papas3.png", title: "Combos Escolares",  desc: "Snacks y bebidas a precios accesibles para estudiantes.", badge: "Oferta" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={0.18 + i * 0.14}>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
                      className="relative rounded-3xl overflow-hidden group flex-1"
                      style={{ height: 243, background: "#111" }}>
                      <img src={item.img} alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(0,0,0,0.85) 40%,transparent 100%)" }} />
                      <div className="absolute inset-0 flex items-center p-8">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded mb-3 inline-block" style={{ background: "rgba(229,9,20,0.8)" }}>{item.badge}</span>
                          <h3 className="bebas text-3xl text-white mb-2">{item.title}</h3>
                          <p className="text-gray-300 text-xs leading-relaxed max-w-[220px]">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            ESTRATEGIA
        ════════════════════════════════════════ */}
        <section id="estrategia" className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 700, height: 400, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(229,9,20,0.08), transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none",
          }} />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <FadeIn><Eye>Estrategia Comercial</Eye></FadeIn>
              <DropTitle className="bebas text-[clamp(3rem,7vw,5.5rem)] leading-none text-white">División de ventas</DropTitle>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { pct: "70%", desc: "Ventas realizadas directamente dentro del plantel escolar.", big: true },
                { pct: "20%", desc: "Ventas generadas mediante recomendaciones entre estudiantes.", big: false },
                { pct: "10%", desc: "Ventas impulsadas mediante redes sociales y promoción visual.", big: false },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}
                    className="relative rounded-3xl overflow-hidden text-center"
                    style={{
                      padding: item.big ? "60px 40px" : "44px 32px",
                      background: i === 0 ? "linear-gradient(135deg,rgba(229,9,20,0.18),rgba(229,9,20,0.04))" : "rgba(255,255,255,0.03)",
                      border: i === 0 ? "1px solid rgba(229,9,20,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    }}>
                    {i === 0 && <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg,transparent,#e50914,transparent)" }} />}
                    <div className="bebas mb-4" style={{
                      fontSize: item.big ? "clamp(5rem,10vw,8rem)" : "clamp(3.5rem,7vw,5.5rem)",
                      color: i === 0 ? "#e50914" : "rgba(255,255,255,0.7)", lineHeight: 1,
                    }}>{item.pct}</div>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            RELACIÓN CON CLIENTES
        ════════════════════════════════════════ */}
        <section className="py-32 px-6 relative" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="right" />
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16 flex-wrap gap-6">
              <div>
                <FadeIn><Eye>Atención y Servicio</Eye></FadeIn>
                <DropTitle className="bebas text-[clamp(2.8rem,5vw,4.5rem)] leading-none text-white">Relación con los clientes</DropTitle>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-px" style={{ border: "1px solid rgba(229,9,20,0.1)", borderRadius: 24, overflow: "hidden" }}>
              {[
                { n: "01", title: "Atención rápida", desc: "Servicio ágil y amable para mejorar la experiencia de compra durante los descansos." },
                { n: "02", title: "Presentación visual", desc: "Imagen atractiva y packaging moderno pensados para llamar la atención de estudiantes." },
                { n: "03", title: "Comunidad digital", desc: "Interacción mediante redes sociales y recomendaciones entre alumnos del plantel." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.14}>
                  <motion.div whileHover={{ background: "rgba(229,9,20,0.07)" }} transition={{ duration: 0.3 }}
                    className="p-10 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="bebas text-[6rem] leading-none mb-4 select-none" style={{ color: "rgba(229,9,20,0.12)" }}>{item.n}</div>
                    <h3 className="bebas text-3xl text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            ACTIVIDADES & RECURSOS
        ════════════════════════════════════════ */}
        <section className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="left" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <DropTitle className="bebas text-[clamp(3rem,7vw,5rem)] leading-none text-white">Actividades y Recursos</DropTitle>
            </div>
            <div className="grid lg:grid-cols-2 gap-10">
              {[
                {
                  title: "Actividades clave", accent: "#e50914",
                  items: ["Preparación de snacks y productos al momento.", "Compra y organización de insumos.", "Promoción mediante redes sociales y recomendaciones.", "Atención rápida durante horarios escolares.", "Diseño de promociones y combos para estudiantes."],
                },
                {
                  title: "Recursos clave", accent: "rgba(255,255,255,0.5)",
                  items: ["Insumos y productos alimenticios.", "Envases, recipientes y material de presentación.", "Equipo básico para preparación.", "Capital inicial para operación.", "Imagen visual y publicidad del negocio."],
                },
              ].map((block, bi) => (
                <FadeIn key={bi} delay={bi * 0.15}>
                  <div className="rounded-3xl p-10" style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${bi === 0 ? "rgba(229,9,20,0.2)" : "rgba(255,255,255,0.06)"}`,
                    borderLeft: `3px solid ${block.accent}`,
                  }}>
                    <h3 className="bebas text-4xl mb-8" style={{ color: block.accent }}>{block.title}</h3>
                    <ul>
                      {block.items.map((item, ii) => (
                        <li key={ii} className="flex gap-4 py-3.5 text-gray-400 text-sm leading-relaxed"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <span className="bebas text-lg flex-shrink-0 mt-0.5" style={{ color: block.accent }}>{String(ii + 1).padStart(2, "0")}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            MODELO CANVAS
        ════════════════════════════════════════ */}
        <section className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="right" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <FadeIn><Eye>Modelo Canvas</Eye></FadeIn>
              <DropTitle className="bebas text-[clamp(3rem,5vw,4.5rem)] leading-none text-white mb-6">Organización del negocio</DropTitle>
              <FadeIn delay={0.2}><p className="text-gray-500 text-sm leading-relaxed">Estructura clave del modelo de negocio Yamamoi's Snacks, basado en cuatro pilares fundamentales para la operación escolar.</p></FadeIn>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Clientes", desc: "Estudiantes, jóvenes y comunidad escolar interesados en snacks rápidos y accesibles.", n: "C1" },
                { title: "Propuesta de Valor", desc: "Snacks preparados al momento, accesibles, personalizables y con presentación atractiva.", n: "C2" },
                { title: "Fuentes de Ingreso", desc: "Venta de snacks, combos escolares y promociones especiales.", n: "C3" },
                { title: "Canales", desc: "Venta directa dentro de la escuela y promoción mediante redes sociales.", n: "C4" },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6, borderColor: "rgba(229,9,20,0.4)" }} transition={{ duration: 0.3 }}
                    className="rounded-2xl p-8 relative overflow-hidden group"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg,transparent,#e50914,transparent)" }} />
                    <span className="bebas text-4xl select-none absolute top-5 right-6" style={{ color: "rgba(229,9,20,0.1)" }}>{item.n}</span>
                    <h3 className="bebas text-2xl text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            FODA
        ════════════════════════════════════════ */}
        <section id="finanzas" className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          {[
            { top: "10%", left: "5%" }, { top: "10%", right: "5%" },
            { bottom: "10%", left: "5%" }, { bottom: "10%", right: "5%" },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", ...pos,
              width: 280, height: 280, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(229,9,20,0.07), transparent 70%)",
              filter: "blur(50px)", pointerEvents: "none",
            }} />
          ))}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <FadeIn><Eye>Análisis Estratégico</Eye></FadeIn>
              <DropTitle className="bebas text-[clamp(3.5rem,8vw,6rem)] leading-none text-white">Análisis FODA</DropTitle>
            </div>
            <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(229,9,20,0.08)", borderRadius: 24, overflow: "hidden" }}>
              {[
                { title: "Fortalezas",    label: "F", color: "#e50914",              desc: "Productos llamativos, buena ubicación, preparación rápida y conocimiento del público objetivo." },
                { title: "Oportunidades", label: "O", color: "rgba(255,255,255,0.6)", desc: "Alta demanda de snacks escolares y posibilidad de crecimiento mediante recomendaciones." },
                { title: "Debilidades",   label: "D", color: "rgba(255,255,255,0.35)",desc: "Capital limitado y dependencia de horarios escolares." },
                { title: "Amenazas",      label: "A", color: "rgba(229,9,20,0.5)",    desc: "Competencia dentro y fuera del plantel e incremento en precios de insumos." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ background: "rgba(229,9,20,0.07)" }} transition={{ duration: 0.3 }}
                    className="p-10 sm:p-14 relative" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <div className="bebas select-none absolute bottom-4 right-6 text-[5rem] leading-none" style={{ color: "rgba(255,255,255,0.03)" }}>{item.label}</div>
                    <div className="bebas text-[3.5rem] sm:text-[5rem] leading-none mb-4" style={{ color: item.color }}>{item.label}</div>
                    <h3 className="bebas text-2xl sm:text-3xl text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            COSTOS E INGRESOS
        ════════════════════════════════════════ */}
        <section className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="left" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <FadeIn><Eye>Finanzas</Eye></FadeIn>
              <DropTitle className="bebas text-[clamp(3.5rem,8vw,6rem)] leading-none text-white">Costos e ingresos</DropTitle>
            </div>
            <FadeIn>
              <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="grid grid-cols-2">
                  <div className="py-5 text-center bebas text-2xl tracking-widest"
                    style={{ background: "rgba(229,9,20,0.15)", borderRight: "1px solid rgba(229,9,20,0.15)", color: "#e50914" }}>
                    Costos
                  </div>
                  <div className="py-5 text-center bebas text-2xl tracking-widest text-white"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    Ingresos
                  </div>
                </div>
                {[
                  ["Compra de papas, dulces y productos alimenticios.", "Venta diaria de entre 10 y 20 productos."],
                  ["Compra de envases y materiales de presentación.", "Ingreso semanal aproximado de $1,000 a $2,000 MXN."],
                  ["Inversión en publicidad y diseño visual.", "Incremento de ventas mediante promociones."],
                  ["Gastos de preparación y organización.", "Posibilidad de crecimiento mediante redes sociales."],
                  ["Presupuesto estimado inicial de $1,000 a $1,500 MXN.", "Desarrollo de combos y productos especiales."],
                ].map((row, i) => (
                  <motion.div key={i} className="grid grid-cols-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                    whileHover={{ background: "rgba(229,9,20,0.04)" }} transition={{ duration: 0.2 }}>
                    <div className="py-5 px-8 text-sm text-gray-400 leading-relaxed" style={{ borderRight: "1px solid rgba(229,9,20,0.12)" }}>
                      <span className="bebas text-sm mr-3" style={{ color: "rgba(229,9,20,0.5)" }}>{String(i + 1).padStart(2, "0")}</span>
                      {row[0]}
                    </div>
                    <div className="py-5 px-8 text-sm text-gray-400 leading-relaxed">
                      <span className="bebas text-sm mr-3 text-gray-600">{String(i + 1).padStart(2, "0")}</span>
                      {row[1]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <HR />

        {/* ════════════════════════════════════════
            PLAN DE CRECIMIENTO
        ════════════════════════════════════════ */}
        <section className="py-36 px-6 relative" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <SectionGlow side="right" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <FadeIn><Eye>Expansión</Eye></FadeIn>
              <DropTitle className="bebas text-[clamp(3.5rem,8vw,6rem)] leading-none text-white">Plan de crecimiento</DropTitle>
            </div>
            <div className="relative">
              <div className="absolute top-8 left-0 right-0 h-px hidden md:block"
                style={{ background: "linear-gradient(90deg,transparent,rgba(229,9,20,0.6),transparent)" }} />
              <div className="grid md:grid-cols-3 gap-16">
                {[
                  { phase: "Fase 01", title: "Ampliar catálogo",    desc: "Incrementar la variedad de snacks y productos disponibles.", year: "Corto plazo" },
                  { phase: "Fase 02", title: "Expansión digital",   desc: "Expandir el alcance mediante redes sociales y publicidad escolar.", year: "Mediano plazo" },
                  { phase: "Fase 03", title: "Consolidar la marca", desc: "Posicionar Yamamoi's Snacks como referente dentro del entorno estudiantil.", year: "Largo plazo" },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.15}>
                    <div className="text-center">
                      <div className="flex justify-center mb-10">
                        <div className="w-5 h-5 rounded-full border-2 relative" style={{ borderColor: "#e50914", background: "#000" }}>
                          <div className="absolute inset-1 rounded-full" style={{ background: "#e50914" }} />
                        </div>
                      </div>
                      <span className="bebas text-sm tracking-widest mb-2 block" style={{ color: "#e50914" }}>{item.phase}</span>
                      <h3 className="bebas text-3xl text-white mb-4">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      <div className="mt-5 text-xs text-gray-600 uppercase tracking-widest">{item.year}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── SCROLL TOP ── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg hover:scale-110 active:scale-90 transition-all"
        style={{ background: "#e50914", boxShadow: "0 0 25px rgba(229,9,20,0.45)" }}>
        ↑
      </button>

    </div>
  );
}