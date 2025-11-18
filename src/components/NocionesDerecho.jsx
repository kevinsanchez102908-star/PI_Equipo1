import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const NocionesDerecho = () => {

  return (
    <section id="nociones-derecho" className="py-20 px-5 lg:px-20 bg-black text-white relative overflow-hidden">

      {/* Luz diagonal de fondo blanca */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "0%",
          right: "-40%",
          width: "160vh",
          height: "25vh",
          background: "linear-gradient(115deg, rgba(255,255,255,0.8), rgba(255,255,255,0.3), transparent 75%)",
          filter: "blur(65px)",
          transform: "rotate(-30deg)",
        }}
      ></div>

      {/* Título con degradado púrpura → rosa */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent
                       bg-gradient-to-r from-purple-500 to-pink-500">
          Nociones de Derecho
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto">
          Reglamento y Legislación para el Río Lerma
        </p>
      </div>

      {/* Contenedor de dos columnas */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8">

        {/* Card izquierda: Video */}
        <Card className="lg:w-2/3 relative overflow-hidden rounded-2xl shadow-2xl bg-white border border-gray-200 transition-transform transform hover:scale-[1.03]">
          {/* Glow decorativo */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-400 to-transparent opacity-20 rounded-full blur-3xl pointer-events-none"></div>

          <CardHeader className="relative z-10 p-6">
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Video Explicativo del Reglamento
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 p-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/8XBJz6nIZjg"
                title="Video de Nociones de Derecho"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Columna derecha: Card de información */}
        <div className="lg:w-1/3 flex flex-col gap-6">

          {/* Card de información */}
          <Card className="relative overflow-hidden rounded-2xl shadow-2xl bg-white border border-gray-200 transition-transform transform hover:scale-[1.03]">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-purple-400 via-pink-400 to-transparent opacity-20 rounded-full blur-3xl pointer-events-none"></div>

            <CardHeader className="relative z-10 p-6">
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Concepto y Fundamentación
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 p-6 text-gray-700">
              <p className="text-justify">
                En la materia de derecho se realizó un reglamento para ayudar a resolver la contaminación del Río Lerma, un problema causado por descargas industriales, aguas residuales y basura que dañan el ambiente y la salud de las personas. Para hacerlo, revisamos las normas vigentes como la Ley General del Equilibrio Ecológico, la Ley de Aguas Nacionales y la NOM-001-SEMARNAT-2021, que regulan lo que se puede y no se puede descargar en los cuerpos de agua. Con base en estas leyes, nuestro reglamento propone prohibir tirar residuos, exigir plantas de tratamiento, realizar monitoreos constantes, aplicar sanciones a quienes contaminen y fomentar la participación ciudadana.
              </p>
            </CardContent>
          </Card>

          {/* Botón separado debajo de la card */}
          <a
            href="https://qrto.org/vI7Rfa"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-block text-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Descargar Reglamento
          </a>
        </div>

      </div>
    </section>
  );
};

export default NocionesDerecho;
