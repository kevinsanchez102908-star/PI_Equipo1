import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Etimologias = () => {
  // Color degradado púrpura-rosa igual que en Física
  const gradientTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500";

  return (
    <section id="etimologias" className="py-20 px-5 lg:px-20 relative overflow-hidden bg-black text-white">
      
      {/* Luz diagonal de fondo */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "0%",
          left: "-40%",
          width: "160vh",
          height: "25vh",
          background: "linear-gradient(115deg, rgba(255,255,255,0.6), transparent 75%)",
          filter: "blur(65px)",
          transform: "rotate(-30deg)",
        }}
      ></div>

      {/* Título principal */}
      <div className="text-center mb-16 relative z-10">
        <h2 className={`text-5xl md:text-6xl font-extrabold mb-4 ${gradientTitleClass}`}>
          Etimologías
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto">
          Comprende mejor los neologismos y términos técnicos relacionados con nuestro proyecto del puente levadizo.
        </p>
      </div>

      {/* Card de información */}
      <div className="flex justify-center relative z-10">
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-black max-w-2xl p-6">
          
          {/* Glow decorativo */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

          <CardHeader className="relative z-10">
            <CardTitle className={`text-2xl font-bold ${gradientTitleClass}`}>Información General</CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            <p className="text-gray-700">
              Las etimologías sirven para que ustedes puedan comprender mejor los neologismos relacionados con las tecnologías aplicadas en su proyecto del puente levadizo, porque conocer el origen y significado de las palabras permite entender por qué se usan ciertos términos técnicos y cómo se forman nuevos conceptos. 
              Cuando aparecen palabras nuevas en áreas como hidráulica, mecánica o energías sustentables, la etimología ayuda a identificar su sentido incluso si es la primera vez que se escuchan; por ejemplo, términos como hidráulico, sustentable o mecanismo se entienden mejor al conocer sus raíces. 
              Esto facilita interpretar manuales, explicaciones científicas y vocabulario técnico del proyecto, además de permitir crear o usar neologismos de manera correcta y coherente según las necesidades tecnológicas del puente levadizo.
            </p>

            <Separator className="border-gray-300" />

            {/* Botón de descarga con degradado púrpura-rosa */}
            <a
              href="https://drive.google.com/file/d/12OS5aQatDI_mqWE0yAPH7wa3F4msXddH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full inline-block text-center px-6 py-3 font-bold rounded-full
                         bg-gradient-to-r from-purple-500 to-pink-500
                         text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
            >
              Descargar Documento <i className='bx bx-download text-xl ml-2'></i>
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Etimologias;
