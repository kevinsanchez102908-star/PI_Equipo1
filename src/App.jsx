import { useEffect, lazy, Suspense } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import AOS from "aos";
import "aos/dist/aos.css";

// SOLO EXISTE CALCULO
const DesarrolloEmprendedor = lazy(() => import("./components/Calculo"));

export default function App() {

  useEffect(() => {

    AOS.init({
      duration: 1500,
      once: true,
    });

  }, []);

  return (

    <main className="relative overflow-x-hidden bg-black">

      <Header />

      <div className="relative z-20">
        <Hero />
      </div>

      {/* Gradient */}

      <img
        className="absolute top-0 right-0 opacity-30 z-10"
        src="/gradient.png"
        alt="Gradient-img"
      />

      <div className="h-0 w-[40rem] absolute top-[20%] right-[-15%] shadow-[0_0_500px_25px_#e99b63] -rotate-[30deg] z-10"></div>

      {/* CONTENIDO */}

      <Suspense
        fallback={
          <div className="text-center py-20 text-white">
            Cargando sección...
          </div>
        }
      >

        <DesarrolloEmprendedor />

      </Suspense>

      {/* FOOTER */}

      <section
        id="footer"
        className="bg-black text-white py-24 text-center relative overflow-hidden"
      >

        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            ¡Gracias por visitar nuestra página!
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 mb-8">

            Esperamos que hayas disfrutado explorando
            nuestro proyecto integrador.

          </p>

        </div>

      </section>

    </main>

  );

}