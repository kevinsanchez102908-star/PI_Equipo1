import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Fisica = () => {
  return (
    <section id="fisica" className="relative py-20 px-5 lg:px-20 bg-black text-white overflow-hidden">

      {/* LUZ DIAGONAL DE FONDO */}
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

      {/* TITULO Y DESCRIPCION */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Física</h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
          Proyecto integrador: Puente levadizo usando el Principio de Pascal.
        </p>
      </div>

      {/* GRID LADO A LADO */}
      <div className="relative z-10 max-w-6xl mx-auto grid gap-8 md:grid-cols-1 lg:grid-cols-2">

        {/* CARD 1: INFORMACIÓN */}
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-black">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader className="relative z-10 p-8">
            <CardTitle className="text-2xl font-bold">Principio Física y Aplicaciones</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              Información educativa del proyecto.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 p-8 space-y-6">
            <Separator className="border-gray-300" />
            <div>
              <h3 className="text-xl font-semibold">Principio Física Utilizado</h3>
              <p className="mt-2 text-gray-700">
                Se basa en el <strong>Principio de Pascal</strong>, que establece que la presión aplicada a un fluido incomprensible se transmite de manera uniforme en todas direcciones. Al presionar una jeringa conectada a otra por una manguera llena de líquido, se eleva el puente, y al invertir el proceso se genera succión, permitiendo que vuelva a su posición original.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Aplicaciones a la Vida Cotidiana</h3>
              <p className="mt-2 text-gray-700">
                Permite el paso alternado de vehículos y embarcaciones en zonas con canales o puertos, reduciendo el consumo de energía, el desgaste mecánico y el uso de motores complejos. Es silencioso, sostenible, económico y requiere menos mantenimiento.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Dirigido a</h3>
              <p className="mt-2 text-gray-700">
                Estudiantes de nivel medio superior y superior, escuelas y comunidades interesadas en proyectos de energías renovables. Ideal para laboratorios y ferias científicas, y útil en localidades cercanas a cuerpos de agua para soluciones accesibles y ecológicas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: VIDEO */}
        <Card className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-black">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader className="relative z-10 p-8">
            <CardTitle className="text-2xl font-bold">Video Demostrativo</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              Observa el funcionamiento del puente levadizo.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 p-8 space-y-6">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/j_KoSnEKUGg"
                title="Video del Proyecto Puente Levadizo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* IMAGEN MAQUETA */}
            <div className="mt-6">
              <img
                src="/images/Maqueta.png"
                alt="Maqueta del Puente Levadizo"
                className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
};

export default Fisica;
