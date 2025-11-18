import { useEffect, lazy, Suspense } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import AOS from "aos";
import "aos/dist/aos.css";

// Carga dinámica de secciones
const NocionesDerecho = lazy(() => import("./components/NocionesDerecho"));
const English = lazy(() => import("./components/English"));
const CulturaAmbiental = lazy(() => import("./components/CulturaAmbiental"));
const Fisica = lazy(() => import("./components/Fisica"));
const Calculo = lazy(() => import("./components/Calculo"));
const ApreciacionArtes = lazy(() => import("./components/ApreciacionArtes"));
const Etimologias = lazy(() => import("./components/Etimologias"));

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <Header />

      <div className="relative z-20">
        <Hero />
      </div>

      {/* Gradient y glow */}
      <img className="absolute top-0 right-0 opacity-30 z-10" src="/gradient.png" alt="Gradient-img" />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-15%] shadow-[0_0_500px_25px_#e99b63] -rotate-[30deg] z-10"></div>

      {/* Secciones principales con Suspense */}
      <Suspense fallback={<div className="text-center py-20 text-white">Cargando sección...</div>}>
        <CulturaAmbiental />
        <NocionesDerecho />
        <English />
        <Fisica />
        <Calculo />
        <ApreciacionArtes />
        <Etimologias />
      </Suspense>

      {/* Footer */}
      <section id="footer" className="bg-black text-white py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">¡Gracias por visitar nuestra página!</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Esperamos que hayas disfrutado explorando nuestro proyecto integrador.  
            Aquí finaliza la presentación de nuestro equipo y nuestras investigaciones.
          </p>
          <div className="mt-4">
            <a
              href="#"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform duration-300"
            >
              Volver al inicio
            </a>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 w-[200%] h-24 -translate-x-1/2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-20 blur-3xl pointer-events-none"></div>
      </section>
    </main>
  );
}
