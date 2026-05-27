import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   PODCASTS
═══════════════════════════════════════════════ */

const PODCASTS = [
  {
    id: 1,
    title: "Liderazgo Moderno",
    subtitle: "Podcast Original",
    year: "2026",
    duration: "45 min",
    image: "/podcasts/podcast1.jpg",
    video: "https://www.youtube.com/embed/Fr6wByDOgm4",
    videoUrl: "https://youtu.be/Fr6wByDOgm4?si=BOZHNrqnHh_sU4p6",
    description:
      "Conversación enfocada en liderazgo, trabajo colaborativo y habilidades para la toma de decisiones.",
    accent: "#e50914",
    gradient:
      "radial-gradient(circle at top left, rgba(229,9,20,0.35), transparent 40%)",
  },
  {
    id: 2,
    title: "Trabajo en Equipo",
    subtitle: "Inspiración & Desarrollo",
    year: "2026",
    duration: "38 min",
    image: "/podcasts/podcast2.jpg",
    video: "https://www.youtube.com/embed/abweNyn0Iek",
    videoUrl: "https://youtu.be/abweNyn0Iek",
    description:
      "Reflexión sobre comunicación, cooperación y liderazgo en ambientes académicos y profesionales.",
    accent: "#7c3aed",
    gradient:
      "radial-gradient(circle at top left, rgba(124,58,237,0.35), transparent 40%)",
  },
];

/* ═══════════════════════════════════════════════
   DOCUMENTOS
═══════════════════════════════════════════════ */

const DOCUMENTS = [
  {
    id: 1,
    title: "Cuadernillo de trabajo",
    pages: "Canva",
    file: "https://canva.link/ijop3qk4p8urxt3",
    color: "#e50914",
  },
  {
    id: 2,
    title: "Investigación",
    pages: "Canva",
    file: "https://canva.link/si51zwml1ncrz6i",
    color: "#2563eb",
  },
  {
    id: 3,
    title: "Cuadernillo de trabajo II",
    pages: "Canva",
    file: "https://canva.link/k2dipy0mnisn786",
    color: "#c7a15d",
  },
  {
    id: 4,
    title: "Investigación II",
    pages: "Canva",
    file: "https://canva.link/kjd4taqit10s9kx",
    color: "#7c3aed",
  },
];

/* ═══════════════════════════════════════════════
   VIDEO MODAL
═══════════════════════════════════════════════ */

function VideoModal({ podcast, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      style={{
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden"
        style={{ border: `1px solid ${podcast.accent}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: "#0a0a0a",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <p
              className="text-xs uppercase tracking-widest font-bold mb-0.5"
              style={{ color: podcast.accent }}
            >
              {podcast.subtitle}
            </p>

            <h3 className="text-xl font-black text-white">
              {podcast.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all text-lg"
          >
            ✕
          </button>
        </div>

        <div
          style={{
            background: "#000",
            aspectRatio: "16/9",
            position: "relative",
          }}
        >
          <iframe
            src={`${podcast.video}?autoplay=1&rel=0`}
            title={podcast.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: "#0a0a0a",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex gap-4 text-gray-500 text-sm">
            <span>{podcast.year}</span>
            <span>·</span>
            <span>{podcast.duration}</span>
          </div>

          <a
            href={podcast.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:text-white transition-colors flex items-center gap-2"
            style={{ color: podcast.accent }}
          >
            Ver en YouTube ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PODCAST CARD
═══════════════════════════════════════════════ */

function PodcastCard({ podcast, onPlay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl overflow-hidden w-full"
      style={{
        background: "rgba(10,10,10,0.85)",
        border: `1px solid ${podcast.accent}30`,
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        className="relative cursor-pointer group"
        style={{ aspectRatio: "16/9" }}
        onClick={onPlay}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${podcast.image})` }}
        />

        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />

        <div
          className="absolute inset-0"
          style={{ background: podcast.gradient }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            ▶
          </motion.div>
        </div>

        <div
          className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ background: podcast.accent }}
        >
          EP {podcast.id}
        </div>

        <div className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-gray-200">
          {podcast.duration}
        </div>
      </div>

      <div className="p-5">
        <p
          className="text-[10px] uppercase tracking-widest font-bold mb-1"
          style={{ color: podcast.accent }}
        >
          {podcast.subtitle}
        </p>

        <h3 className="text-lg font-black text-white mb-2 leading-tight">
          {podcast.title}
        </h3>

        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {podcast.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={onPlay}
            className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{ background: podcast.accent }}
          >
            ▶ Reproducir
          </button>

          <a
            href={podcast.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl font-bold text-xs border border-white/10 hover:bg-white/10 transition-all text-white flex items-center gap-1"
          >
            YT ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */

export default function Liderazgo() {
  const [active, setActive] = useState(0);
  const [modalPodcast, setModalPodcast] = useState(null);

  const nextSlide = () =>
    setActive((prev) => (prev + 1) % PODCASTS.length);

  const prevSlide = () =>
    setActive((prev) =>
      prev === 0 ? PODCASTS.length - 1 : prev - 1
    );

  useEffect(() => {
    if (modalPodcast) return;

    const interval = setInterval(nextSlide, 9000);

    return () => clearInterval(interval);
  }, [modalPodcast]);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-black z-0" />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/20 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[160px]" />
      </div>

      {/* HERO */}
      <div className="relative z-10 h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={PODCASTS[active].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{
                backgroundImage: `url(${PODCASTS[active].image})`,
              }}
            />

            <div className="absolute inset-0 bg-black/70" />

            <div
              className="absolute inset-0"
              style={{ background: PODCASTS[active].gradient }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

            <div className="relative z-20 h-full flex items-center px-6 md:px-20">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="uppercase tracking-[0.4em] text-sm font-bold mb-6"
                    style={{ color: PODCASTS[active].accent }}
                  >
                    Podcast Collection
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-5xl md:text-7xl font-black leading-none mb-6"
                  >
                    {PODCASTS[active].title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="flex gap-5 text-gray-300 text-sm mb-6"
                  >
                    <span>{PODCASTS[active].year}</span>
                    <span>{PODCASTS[active].duration}</span>
                    <span>HD</span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-lg text-gray-200 leading-relaxed mb-8"
                  >
                    {PODCASTS[active].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap gap-4"
                  >
                    <button
                      onClick={() => setModalPodcast(PODCASTS[active])}
                      className="px-9 py-4 rounded-full bg-white text-black text-base font-bold hover:scale-105 transition-all"
                    >
                      ▶ Reproducir
                    </button>

                    <a
                      href={PODCASTS[active].videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-9 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-base"
                    >
                      Ver en YouTube ↗
                    </a>
                  </motion.div>
                </div>

                <div className="hidden lg:block">
                  <AnimatePresence mode="wait">
                    <PodcastCard
                      key={PODCASTS[active].id}
                      podcast={PODCASTS[active]}
                      onPlay={() =>
                        setModalPodcast(PODCASTS[active])
                      }
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md hover:bg-black/70 transition-all text-2xl"
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/40 border border-white/10 backdrop-blur-md hover:bg-black/70 transition-all text-2xl"
        >
          →
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {PODCASTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`transition-all rounded-full ${
                active === index
                  ? "w-14 h-2 bg-white"
                  : "w-2 h-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DOCUMENTOS */}
      <div className="relative z-20 px-6 md:px-20 py-28">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="uppercase tracking-[0.35em] text-red-500 text-sm font-bold mb-4">
              Recursos
            </p>

            <h2 className="text-4xl md:text-5xl font-black">
              Archivos Adjuntos
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {DOCUMENTS.map((doc) => (
            <motion.a
              key={doc.id}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#101010] p-8 min-h-[250px] group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at top left, ${doc.color}50, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-8"
                  style={{
                    background: `${doc.color}20`,
                    color: doc.color,
                  }}
                >
                  PDF
                </div>

                <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-3">
                  Documento
                </p>

                <h3 className="text-3xl font-black mb-4 leading-tight">
                  {doc.title}
                </h3>

                <p className="text-gray-400">{doc.pages}</p>
              </div>

              <div className="absolute bottom-8 left-8 text-sm text-white/70 font-semibold">
                Abrir archivo →
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalPodcast && (
          <VideoModal
            podcast={modalPodcast}
            onClose={() => setModalPodcast(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}