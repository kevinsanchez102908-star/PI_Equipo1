import React from "react";
import 'boxicons/css/boxicons.min.css';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Calculo = () => {

  // Clase de degradado centralizada: púrpura-rosa
  const gradientTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500";

  return (
    <section id="calculo" className="relative py-20 px-5 lg:px-20 bg-black text-white overflow-hidden">

      {/* Luz diagonal de fondo */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "0%",
          right: "-40%",
          width: "160vh",
          height: "20vh",
          background: "linear-gradient(115deg, rgba(255,255,255,0.65), rgba(255,255,255,0.15), transparent 75%)",
          filter: "blur(65px)",
          transform: "rotate(-30deg)",
          opacity: 1,
        }}
      ></div>

      {/* Título */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Cálculo Diferencial e Integral</h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
          Analizando la contaminación del Río Lerma usando funciones cúbicas, derivadas y máximos/mínimos.
        </p>
      </div>

      {/* Grid de cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid gap-8 md:grid-cols-1 lg:grid-cols-2">

        {/* CARD 1: PROBLEMA Y FUNCIÓN */}
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white border border-gray-200 text-black">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader className="relative z-10 p-8">
            <CardTitle className="text-2xl font-bold">Problema</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-8 space-y-4">
            <p className="text-gray-700">
              La contaminación del Río Lerma ha ido aumentando debido a descargas industriales y agrícolas.  
              Supongamos que el nivel de contaminación <strong>C(t)</strong> en cierta zona del río, medido en unidades de contaminación, puede modelarse con la función cúbica:
            </p>
            <p className="text-gray-700 font-semibold text-center">
              C(t) = t³ - 6t² - 15t
            </p>
            <p className="text-gray-700">
              Donde t representa el número de meses desde que se comenzó a medir la contaminación.
            </p>
          </CardContent>
        </Card>

        {/* CARD 2: ANÁLISIS DE DERIVADAS */}
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white border border-gray-200 text-black">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader className="relative z-10 p-8">
            <CardTitle className="text-2xl font-bold">Análisis de derivadas</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-8 space-y-4">
            <p className="text-gray-700">
              <strong>Derivada:</strong> C'(t) = 3t² - 12t - 15 = 3(t+1)(t-5)  
              <br />Nos indica cuándo la contaminación aumenta o disminuye.
            </p>
            <p className="text-gray-700">
              <strong>Puntos críticos:</strong> igualamos la derivada a cero:
              <br />3(t+1)(t-5)=0 ⇒ t=-1 y t=5  
              <br />El tiempo t=-1 no tiene sentido real; nos interesa t=5.
            </p>
            <p className="text-gray-700">
              <strong>Segunda derivada:</strong> C''(t)=6t-12  
              <br />C''(5)=18 &gt; 0 ⇒ mínimo local, después de 5 meses la contaminación empieza a aumentar de nuevo.
            </p>
            <p className="text-gray-700">
              <strong>Intervalos de crecimiento y decrecimiento:</strong>  
              <br />t &lt; -1: crece (irrelevante en tiempo real)  
              <br />-1 &lt; t &lt; 5: disminuye, medidas de limpieza efectivas  
              <br />t &gt; 5: aumenta, medidas no sostenibles
            </p>
            <p className="text-gray-700 font-semibold">
              <strong>Pregunta para el estudiante:</strong>  
              Identifica los meses en que la contaminación está disminuyendo y aumentando, y el punto mínimo de contaminación y su valor.
            </p>
          </CardContent>
        </Card>

        {/* CARD 3: GRÁFICA DE LA FUNCIÓN */}
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white border border-gray-200 text-black">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader className="relative z-10 p-8">
            <CardTitle className="text-2xl font-bold">Gráfica de la función</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-8">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-200">
              <img
                src="/images/Funcion.png"
                alt="Gráfica de la función cúbica"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* CARD 4: PROBLEMA COMPLETO CON BOTÓN */}
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white border border-gray-200 text-black">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader className="relative z-10 p-8">
            <CardTitle className="text-2xl font-bold">Problema Completo</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 p-8 space-y-4">
            <p className="text-gray-700">
              En este problema analizamos la función que modela la contaminación del Río Lerma: 
              <strong>C(t)=t³ - 6t² - 15t</strong>. Primero calculamos la derivada, 
              <strong>C'(t)=3t² -12t -15</strong>, porque la derivada nos dice cómo cambia la función: si es positiva la contaminación aumenta y si es negativa disminuye.
            </p>
            <p className="text-gray-700">
              Igualando la derivada a cero obtenemos los puntos críticos: t=-1 y t=5. En esos puntos la pendiente es cero y ahí puede haber máximos o mínimos.
            </p>
            <p className="text-gray-700">
              Para saber qué tipo de punto es cada uno usamos la segunda derivada, C''(t)=6t-12.  
              Evaluando en t=-1 nos da C''(-1)=-18, que es menor que cero, por eso en t=-1 habría un máximo local (irrelevante para nuestro contexto real).  
              Evaluando en t=5 nos da C''(5)=18 &gt; 0, entonces en t=5 hay un mínimo local.  
              Calculando la función en ese punto obtenemos la coordenada del mínimo: (5, C(5))=(5,-100).
            </p>
            <p className="text-gray-700">
              Con el signo de la derivada concluimos que la contaminación disminuye en el intervalo (-1,5) y aumenta en (5,∞).  
              De esta forma describimos completamente el comportamiento de la contaminación en el Río Lerma según la función dada.
            </p>
            <a
              href="https://drive.google.com/file/d/1Xv3JiDbS2aAreVpYTFoUcVQK4yaqWXjB/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-center px-6 py-3 font-bold rounded-full
                         bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500
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

export default Calculo;
