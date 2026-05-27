import { useEffect, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "./components/Hero";
import Sociologia from "./components/Sociologia";
import ApreciacionArte2 from "./components/ApreciacionArte2";
import Liderazgo from "./components/Liderazgo";
import Psicologia from "./components/Psicologia";
import Ciudadania from "./components/Ciudadania";
import Comunicacion from "./components/Comunicacion";

// DESARROLLO EMPRENDEDOR (lazy)
const DesarrolloEmprendedor = lazy(() =>
  import("./components/Calculo")
);

export default function App() {

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-black text-white">

      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= EFECTOS FONDO ================= */}
      <img
        className="absolute top-0 right-0 opacity-30 z-10 pointer-events-none"
        src="/gradient.png"
        alt="gradient"
      />

      <div className="h-0 w-[40rem] absolute top-[20%] right-[-15%] shadow-[0_0_500px_25px_#e99b63] -rotate-[30deg] z-10 pointer-events-none" />

      {/* ================= CONTENIDO ================= */}
      <Suspense
        fallback={
          <div className="text-center py-20 text-white text-2xl">
            Cargando sección...
          </div>
        }
      >

        {/* ================= DESARROLLO EMPRENDEDOR ================= */}
        <section id="desarrollo-emprendedor">
          <DesarrolloEmprendedor />
        </section>

        {/* ================= LIDERAZGO ================= */}
        <section id="liderazgo">
          <Liderazgo />
        </section>

        {/* ================= SOCIOLOGÍA ================= */}
        <section id="sociologia">
          <Sociologia />
        </section>

        {/* ================= PSICOLOGÍA ================= */}
        <section id="psicologia">
          <Psicologia />
        </section>

        {/* ================= CIUDADANÍA ================= */}
        <section id="ciudadania">
          <Ciudadania />
        </section>

        {/* ================= APRECIACIÓN DEL ARTE II ================= */}
        <section id="apreciacion-arte-2">
          <ApreciacionArte2 />
        </section>

        {/* ================= COMUNICACIÓN ================= */}
        <section id="comunicacion">
          <Comunicacion />
        </section>

      </Suspense>

      {/* ================= FOOTER FINAL ================= */}
      <section
        className="
          relative
          min-h-[70vh]
          bg-black
          flex
          items-center
          justify-center
          overflow-hidden
          px-6
        "
      >

        {/* Fondo cinematográfico */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black" />

          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/20 blur-[160px]" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/20 blur-[160px]" />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        {/* Línea roja superior */}
        <div
          className="absolute top-0 left-0 w-full h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #e50914, transparent)",
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Título */}
          <p className="uppercase tracking-[0.45em] text-red-500 text-sm font-bold mb-6">
            Proyecto Integrador
          </p>

          <h2
            className="
              text-5xl
              sm:text-7xl
              md:text-8xl
              font-black
              uppercase
              tracking-[0.08em]
              leading-none
              mb-10
            "
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            Nos vemos pronto
          </h2>

          {/* Línea decorativa */}
          <div className="w-28 h-[3px] bg-red-600 mx-auto mb-12 rounded-full" />

          {/* Texto despedida */}
          <p
            className="
              max-w-4xl
              mx-auto
              text-gray-300
              text-xl
              sm:text-2xl
              leading-relaxed
              font-light
            "
          >
            Gracias por visitar nuestro sitio esperamos que hayas tenido una experiencia agradable.
            Tu tiempo y atención significan mucho para nosotros.
            <span className="text-white font-semibold">
              {" "}¡Vuelve pronto para descubrir más novedades y actualizaciones!
            </span>
          </p>

          {/* Botón */}
          <div className="mt-14">
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                px-10
                py-5
                rounded-full
                bg-red-600
                hover:bg-red-500
                text-white
                text-lg
                font-bold
                transition-all
                duration-300
                hover:scale-105
                shadow-[0_0_40px_rgba(229,9,20,0.45)]
              "
            >
              Volver al inicio ↑
            </button>
          </div>

          {/* Línea inferior */}
          <div className="mt-24 border-t border-white/10 pt-10">
            <p className="text-gray-600 tracking-[0.3em] uppercase text-sm">
              © 2026 Proyecto Integrador · Plataforma Educativa Interactiva
            </p>
          </div>

        </div>

      </section>

      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-14
          h-14
          rounded-full
          bg-red-600
          hover:bg-red-500
          text-white
          text-2xl
          shadow-[0_0_30px_rgba(229,9,20,0.5)]
          transition-all
          hover:scale-110
        "
      >
        ↑
      </button>

    </main>
  );
}