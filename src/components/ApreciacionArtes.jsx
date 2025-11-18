import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const apreciacionCards = [
  {
    title: "Mictlantecuhtli",
    description: "Dios mexica del inframundo, Señor del Mictlán.",
    content: `Mictlantecuhtli es una deidad fundamental en la mitología mexica (azteca),
representado de forma esquelética y gobernando el Mictlán, el inframundo.
Custodia los huesos de las generaciones pasadas, esenciales para la creación de la humanidad.
Se le representa como un ser esquelético, simbolizando su dominio sobre el fin de la vida y la regeneración.
Su figura conecta el ciclo de la muerte con la posibilidad de una nueva existencia.`,
    image: "/images/Mictlantecuhtli.png"
  },
  {
    title: "Saturno devorando a su hijo",
    description: "Obra de Francisco de Goya.",
    content: `Representa a Saturno devorando a su hijo, transmitiendo la brutalidad y tiranía
de ciertas figuras de poder. Evoca emociones de temor ante la violencia y control.
Goya utiliza una paleta limitada, con ocres, negros y rojos intensos, y pinceladas dramáticas para
enfatizar el horror y el frenesí del momento.`,
    image: "/images/SaturnoDevorandoASuHijo.png"
  },
  {
    title: "El descubrimiento del pulque",
    description: "Obra de José María Obregón (1832-1902).",
    content: `Representa el descubrimiento del pulque, bebida tradicional mexicana, mostrando
cómo Xóchitl ofrece el fermento a su padre, el rey Tecpancaltzin. La obra destaca la importancia cultural
de esta bebida y cómo unía a las personas, reflejando tradiciones y costumbres prehispánicas.
Permite apreciar la relevancia de la bebida en rituales y la vida social de la época.`,
    image: "/images/ElDescubrimientoDelPulque.png"
  },
  {
    title: "La Fusión de dos Culturas",
    description: "Obra de Jorge González Camarena.",
    content: `Muestra la sangre de dos culturas, la náhuatl y la española, resultando en la nueva
identidad mexicana. Refleja la guerra de conquista y la creación simbólica de la patria.
La obra combina colores vivos y elementos simbólicos para narrar la formación de la identidad nacional
y cómo se mezclaron las tradiciones y legados culturales de ambas civilizaciones.`,
    image: "/images/LaFusionDeDosCulturas.png"
  }
];

const ApreciacionArtes = () => {
  return (
    <section id="apreciacion-artes" className="relative py-20 px-5 lg:px-20 bg-black text-white overflow-hidden">

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

      {/* Título y descripción */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Apreciación de las Artes
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
          Analizamos la influencia de la mitología, la pintura y la expresión artística a lo largo de la historia,
          reflejando cultura, simbolismo y emoción.
        </p>
      </div>

      {/* Grid de cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid gap-12 md:grid-cols-2">

        {apreciacionCards.map((card, index) => {
          const isEven = index % 2 === 0;

          return (
            <Card
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-black flex flex-col lg:flex-row h-[36rem]`}
            >
              {/* Imagen */}
              <div className={`flex-1 h-full lg:h-auto ${isEven ? "" : "lg:order-2"}`}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl shadow-xl"
                />
              </div>

              {/* Información */}
              <CardContent className="flex-1 p-8 flex flex-col justify-center text-justify">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-600">{card.description}</CardDescription>
                </CardHeader>
                <p className="mt-4 text-gray-700">{card.content}</p>
              </CardContent>
            </Card>
          );
        })}

        {/* Conclusión centrada en la sección */}
        <div className="mt-20 relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-gray-300 text-lg sm:text-xl text-justify">
            Las obras analizadas, desde la mitología prehispánica de Mictlantecuhtli y el
            muralismo de "La Fusión de dos Culturas" hasta el arte académico como "El
            descubrimiento del pulque" y la oscuridad expresionista de "Saturno
            devorando a su hijo", demuestran que el arte es inherentemente un proceso de
            pensamiento transformador. Cada pieza no solo registra una idea, un mito o un
            evento histórico, sino que lo reinterpreta y lo modifica para resonar con su
            tiempo. Goya transformó un mito clásico en una crítica al poder tiránico;
            González Camarena convirtió un evento de conquista en el nacimiento simbólico de
            una nueva identidad. Así, el arte se convierte en un medio maleable donde cada
            generación, al enfrentarse a estas imágenes, las filtra a través de su propia
            experiencia y contexto cultural, otorgándoles nuevos significados y asegurando
            que las grandes obras permanezcan siempre vivas y en constante
            transformación interpretativa.
          </p>
        </div>

        {/* Botón de descarga PDF */}
        <div className="mt-8 text-center">
          <a
            href="https://drive.google.com/file/d/1jft-0oKE_hSp07zxOupnZ2vJgmQI2C-r/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full bg-purple-500 text-white font-semibold hover:bg-pink-500 transition-colors"
          >
            Descargar PDF
          </a>
        </div>

      </div>
    </section>
  );
};

export default ApreciacionArtes;
