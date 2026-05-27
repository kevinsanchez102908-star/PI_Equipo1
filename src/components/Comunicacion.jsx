import { motion } from "framer-motion";
import imgQR from "../assets/Keniaqr.png";

export default function Comunicacion() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      background: "#030305",
      color: "#fff",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: "80px 24px",
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes com-orb1 {
          0%,100% { transform: scale(1) translate(0,0); opacity: 0.8; }
          50%      { transform: scale(1.12) translate(20px,-15px); opacity: 1; }
        }
        @keyframes com-orb2 {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.08) translate(-18px,12px); opacity: 0.9; }
        }
        @keyframes com-float {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes com-pulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.06); }
        }
        @keyframes com-scan {
          0%   { top: 4%; opacity: 0.9; }
          50%  { top: 92%; opacity: 0.6; }
          100% { top: 4%; opacity: 0.9; }
        }
        @keyframes com-twinkle {
          0%,100% { opacity: 0.1; }
          50%      { opacity: 0.6; }
        }
      `}</style>

      {/* ── FONDO ── */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%, rgba(80,5,5,0.6) 0%, #030305 60%)" }} />

      {/* Orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "-8%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,9,20,0.2), transparent 65%)", filter: "blur(70px)", animation: "com-orb1 10s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-6%", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,0,0,0.18), transparent 65%)", filter: "blur(80px)", animation: "com-orb2 13s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,9,20,0.1), transparent 70%)", filter: "blur(70px)", animation: "com-orb1 17s ease-in-out infinite reverse", pointerEvents: "none" }} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(229,9,20,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(229,9,20,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

      {/* Estrellas */}
      {Array.from({ length: 60 }, (_, i) => {
        const l = ((i * 137.5) % 100);
        const t = ((i * 93.7) % 100);
        const s = 0.8 + (i % 3) * 0.5;
        return (
          <div key={i} style={{
            position: "absolute", left: `${l}%`, top: `${t}%`,
            width: s, height: s, borderRadius: "50%", background: "#fff",
            animation: `com-twinkle ${3 + (i % 5)}s linear infinite`,
            animationDelay: `${(i % 7) * 0.8}s`,
            pointerEvents: "none",
          }} />
        );
      })}

      {/* ── CONTENIDO ── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 48, maxWidth: 900, width: "100%" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center" }}
        >
          <p style={{
            fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase",
            color: "rgba(229,9,20,0.7)", fontWeight: 700, marginBottom: 16,
            fontFamily: "'DM Sans', sans-serif",
          }}>Contacto · Yamamoi's Snacks</p>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            lineHeight: 0.95, color: "#fff",
            letterSpacing: "0.04em", margin: 0,
          }}>Comunicación</h2>

          <div style={{ width: 60, height: 2, background: "#e50914", margin: "20px auto 0" }} />

          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.45)",
            lineHeight: 1.8, maxWidth: 480, margin: "18px auto 0",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Escanea el código QR para contactarnos directamente y conocer más sobre nuestros productos.
          </p>
        </motion.div>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative" }}
        >
          {/* Glow detrás */}
          <div style={{
            position: "absolute", inset: -50, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(229,9,20,0.3), transparent 65%)",
            filter: "blur(50px)", animation: "com-pulse 4s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          {/* Esquinas decorativas */}
          {[
            { top: -3, left: -3, borderTop: "3px solid #e50914", borderLeft: "3px solid #e50914" },
            { top: -3, right: -3, borderTop: "3px solid #e50914", borderRight: "3px solid #e50914" },
            { bottom: -3, left: -3, borderBottom: "3px solid #e50914", borderLeft: "3px solid #e50914" },
            { bottom: -3, right: -3, borderBottom: "3px solid #e50914", borderRight: "3px solid #e50914" },
          ].map((style, i) => (
            <div key={i} style={{
              position: "absolute", width: 22, height: 22,
              ...style, borderRadius: 2,
            }} />
          ))}

          {/* Marco */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "relative",
              width: 280, height: 280,
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(229,9,20,0.35)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(229,9,20,0.2)",
              background: "#fff",
            }}
          >
            <img
              src={imgQR}
              alt="QR Contacto Yamamoi's"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", padding: 12 }}
            />

            {/* Línea de escaneo animada */}
            <div style={{
              position: "absolute", left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, rgba(229,9,20,0.8), transparent)",
              animation: "com-scan 2.5s ease-in-out infinite",
              pointerEvents: "none",
            }} />
          </motion.div>
        </motion.div>

        {/* Info de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ textAlign: "center" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 28px",
            borderRadius: 999,
            background: "rgba(229,9,20,0.08)",
            border: "1px solid rgba(229,9,20,0.25)",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e50914", boxShadow: "0 0 8px rgba(229,9,20,0.8)" }} />
            <span style={{
              fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            }}>Apunta tu cámara al código</span>
          </div>

          <p style={{
            marginTop: 20, fontSize: 12,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.3em", textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Yamamoi's Snacks · UAEMéx Preparatoria No. 1 · 2025
          </p>
        </motion.div>

      </div>
    </section>
  );
}