import React from "react";
import 'boxicons/css/boxicons.min.css';
import { Card, CardContent } from "@/components/ui/card";

const CulturaAmbiental = () => {

  const gradientTitleClass = "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500";
  
  const cardClass = `
    relative bg-white p-6 rounded-2xl border border-gray-200
    shadow-2xl transition-transform transform hover:scale-[1.03] overflow-hidden
  `;
  
  const videoUrls = {
    documentalAutoplay: "https://www.youtube.com/embed/NgotdCkHJRo?autoplay=1&mute=1",
    documentalManual: "https://www.youtube.com/embed/TAUYdZob1DM",
    documento: "https://qrto.org/vI7Rfa"
  };

  const campaignCards = [
    {
      icon: 'bx bx-search',
      title: 'Módulo 1 — Investigación Referencial',
      description: (
        <div className="text-gray-700 text-sm leading-relaxed">
          <p className="mb-2"><strong>Contenidos Aplicados:</strong> Conceptos de Cultura ambiental, Ciencias ambientales, Factores bióticos/abióticos, y Ética ambiental.</p>
          <p className="mb-2"><strong>Actividad Realizada:</strong> Se seleccionó la problemática del Río Lerma y se elaboró una argumentación escrita con 5 fotografías para evidenciar el problema.</p>
          <p><strong>Producto Integrador:</strong> Documento con Introducción, Planteamiento del problema, Justificación, Objetivos, Hipótesis y Argumentación teórico-metodológica.</p>
        </div>
      ),
    },
    {
      icon: 'bx bx-edit',
      title: 'Módulo 2 — Organización y Planeación',
      description: (
        <div className="text-gray-700 text-sm leading-relaxed">
          <p className="mb-2"><strong>Contenidos Aplicados:</strong> Impacto ambiental, Causas del deterioro y Problemas locales como la contaminación del agua, relacionados directamente con el Río Lerma.</p>
          <p className="mb-2"><strong>Actividad Realizada:</strong> Consulta de fuentes científicas recientes para elaborar fichas de resumen, fichas de trabajo y citas en formato APA.</p>
          <p><strong>Producto Integrador:</strong> Se elaboró el marco teórico del proyecto y se integró al blog como segunda parte.</p>
        </div>
      ),
    },
    {
      icon: 'bx bx-video',
      title: 'Módulo 3 — Recolección de Datos y Análisis (Autoplay)',
      description: (
        <div className="text-gray-700 text-sm leading-relaxed">
          <p className="mb-2"><strong>Contenidos Aplicados:</strong> Desarrollo sustentable, Ecodesarrollo, Ecotecnias, Manejo de residuos y Energías sustentables.</p>
          <p className="mb-2"><strong>Actividad Realizada:</strong> Se aplicaron instrumentos de investigación (encuestas) a la población para analizar el impacto, se procesaron los resultados y se generaron gráficas e interpretaciones.</p>
          <p><strong>Producto Integrador:</strong> Integración de los resultados al blog como la segunda parte del análisis.</p>
        </div>
      ),
      video: videoUrls.documentalAutoplay
    },
    {
      icon: 'bx bx-globe',
      title: 'Módulo 4 — Informe Final y Propuestas',
      description: (
        <div className="text-gray-700 text-sm leading-relaxed">
          <p className="mb-2"><strong>Contenidos Aplicados:</strong> Cumbres ambientales internacionales, Leyes y Normas oficiales en México, e Instituciones ambientales.</p>
          <p className="mb-2"><strong>Actividad Realizada:</strong> Generación de una propuesta de acciones de solución basadas en educación ambiental, tratamiento de aguas, y cumplimiento de normativas. Se integraron evidencias fotográficas.</p>
          <p><strong>Producto Integrador:</strong> Elaboración del informe final que resume los avances y soluciones, anexado como la tercera parte del blog.</p>
        </div>
      ),
      document: videoUrls.documento,
      secondaryVideo: videoUrls.documentalManual
    },
  ];

  return (
    <section
      id="cultura-ambiental"
      className="py-20 px-5 lg:px-20 relative overflow-hidden text-white bg-black"
    >

      <div className="absolute top-60 left-0 w-[30%] h-[10%]
        bg-gradient-to-r from-white/80 via-white/40 to-transparent
        transform rotate-12 -translate-x-1/4 z-0 pointer-events-none
        filter blur-3xl"> 
      </div>

      <div className="text-center mb-16 relative z-10" data-aos="fade-down">
        <h2 className={`text-5xl md:text-7xl font-bold tracking-tight mb-4 ${gradientTitleClass}`}>
          Cultura Ambiental y Acción
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Conciencia, soluciones y acción para recuperar el Río Lerma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative z-10">
        {campaignCards.map((card, index) => (
          <Card key={index} className={cardClass} data-aos="fade-up" data-aos-delay={index * 100}>

            {card.video && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                <iframe
                  src={card.video}
                  title={card.title}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}

            {!card.video && (
              <i className={`bx ${card.icon} text-6xl mb-4 block ${gradientTitleClass}`}></i>
            )}

            <h4 className={`text-2xl font-bold mb-2 ${gradientTitleClass}`}>{card.title}</h4>
            {card.description}

            {card.document && (
              <a
                href={card.document}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-block text-center px-6 py-3 font-bold rounded-full
                           bg-gradient-to-r from-purple-500 to-pink-500
                           text-white transition-all duration-300
                           hover:from-purple-600 hover:to-pink-600"
              >
                Descargar Documento <i className='bx bx-download text-xl ml-2'></i>
              </a>
            )}
            
            {card.secondaryVideo && (
              <div className="mt-6">
                <h5 className={`text-xl font-bold mb-2 ${gradientTitleClass}`}>Video Adicional (Reproducción Manual)</h5>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    src={card.secondaryVideo}
                    title="Video Adicional"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CulturaAmbiental;
