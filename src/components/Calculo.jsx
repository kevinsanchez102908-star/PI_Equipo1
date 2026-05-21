import React, { useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";

const Calculo = () => {

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3500);

    return () => clearTimeout(timer);

  }, []);

  return (

    <section className="bg-black text-white overflow-hidden relative">

      {/* ================================================= */}
      {/* ESTILOS */}
      {/* ================================================= */}

      <style>{`

        html {

          scroll-behavior: smooth;

        }

        /* ================================================= */
        /* TUNEL ESPACIAL */
        /* ================================================= */

        @keyframes hyperspace {

          0% {

            transform:
              translate(-50%, -50%)
              rotate(var(--rot))
              translateX(0)
              scaleX(0.05);

            opacity: 0;

          }

          10% {
            opacity: 1;
          }

          100% {

            transform:
              translate(-50%, -50%)
              rotate(var(--rot))
              translateX(var(--distance))
              scaleX(1);

            opacity: 0;

          }

        }

        .space-line {

          position: absolute;
          border-radius: 999px;

          animation-name: hyperspace;
          animation-timing-function: linear;
          animation-iteration-count: infinite;

        }

        /* ================================================= */
        /* PARTICULAS */
        /* ================================================= */

        @keyframes floatingParticles {

          0% {

            transform:
              translateY(0px)
              translateX(0px);

          }

          50% {

            transform:
              translateY(-40px)
              translateX(20px);

          }

          100% {

            transform:
              translateY(0px)
              translateX(0px);

          }

        }

        .particle {

          position: absolute;
          border-radius: 999px;

          animation:
            floatingParticles linear infinite;

        }

        /* ================================================= */
        /* GRID */
        /* ================================================= */

        @keyframes gridMove {

          from {
            transform: translateY(0px);
          }

          to {
            transform: translateY(120px);
          }

        }

        .grid-bg {

          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);

          background-size: 80px 80px;

          animation:
            gridMove 10s linear infinite;

        }

        /* ================================================= */
        /* TITULOS */
        /* ================================================= */

        @keyframes titleLeft {

          from {

            opacity: 0;
            transform: translateX(-160px);

          }

          to {

            opacity: 1;
            transform: translateX(0);

          }

        }

        @keyframes titleRight {

          from {

            opacity: 0;
            transform: translateX(160px);

          }

          to {

            opacity: 1;
            transform: translateX(0);

          }

        }

        @keyframes titleZoom {

          from {

            opacity: 0;
            transform: scale(0.4);

          }

          to {

            opacity: 1;
            transform: scale(1);

          }

        }

        @keyframes titleUp {

          from {

            opacity: 0;
            transform: translateY(120px);

          }

          to {

            opacity: 1;
            transform: translateY(0);

          }

        }

        .title-left {

          animation:
            titleLeft 1.4s ease forwards;

        }

        .title-right {

          animation:
            titleRight 1.4s ease forwards;

        }

        .title-zoom {

          animation:
            titleZoom 1.3s ease forwards;

        }

        .title-up {

          animation:
            titleUp 1.2s ease forwards;

        }

        /* ================================================= */
        /* CARDS */
        /* ================================================= */

        @keyframes floatCard {

          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-12px);
          }

          100% {
            transform: translateY(0px);
          }

        }

        @keyframes pulseGlow {

          0% {
            box-shadow: 0 0 0px rgba(236,72,153,0.3);
          }

          50% {
            box-shadow: 0 0 40px rgba(236,72,153,0.5);
          }

          100% {
            box-shadow: 0 0 0px rgba(236,72,153,0.3);
          }

        }

        @keyframes rotateCard {

          0% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(1deg);
          }

          100% {
            transform: rotate(0deg);
          }

        }

        @keyframes borderGlow {

          0% {

            border-color:
              rgba(255,255,255,0.1);

          }

          50% {

            border-color:
              rgba(236,72,153,0.6);

          }

          100% {

            border-color:
              rgba(255,255,255,0.1);

          }

        }

        .card-float {

          animation:
            floatCard 5s ease-in-out infinite;

        }

        .card-glow {

          animation:
            pulseGlow 4s ease-in-out infinite;

        }

        .card-rotate {

          animation:
            rotateCard 6s ease-in-out infinite;

        }

        .card-border {

          animation:
            borderGlow 5s ease infinite;

        }

      `}</style>

      {/* ================================================= */}
      {/* FONDO */}
      {/* ================================================= */}

      <div className="absolute inset-0 z-0 overflow-hidden">

        <div className="absolute inset-0 grid-bg opacity-20"></div>

        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-pink-500/10 blur-[180px] rounded-full"></div>

        <div className="absolute top-[40%] right-[0%] w-[600px] h-[600px] bg-cyan-500/10 blur-[200px] rounded-full"></div>

        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] bg-purple-500/10 blur-[220px] rounded-full"></div>

        <div className="absolute bottom-[0%] right-[15%] w-[500px] h-[500px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

        {[...Array(70)].map((_, i) => (

          <span
            key={i}
            className="particle"
            style={{

              width: `${4 + Math.random() * 10}px`,
              height: `${4 + Math.random() * 10}px`,

              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,

              background: `
                rgba(${Math.random() * 255},
                ${Math.random() * 255},
                255,
                0.8)
              `,

              filter:
                "blur(2px)",

              animationDuration:
                `${10 + Math.random() * 20}s`,

            }}
          />

        ))}

      </div>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <div className="relative h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          {[...Array(550)].map((_, i) => {

            const colors = [
              "#ffffff",
              "#f472b6",
              "#22d3ee",
              "#c084fc",
              "#fde047",
              "#60a5fa",
              "#fb7185"
            ];

            const angle = Math.random() * Math.PI * 2;

            return (

              <span
                key={i}
                className="space-line"
                style={{

                  left: "50%",
                  top: "50%",

                  width: `${300 + Math.random() * 1200}px`,
                  height: `${1 + Math.random() * 3}px`,

                  background:
                    colors[Math.floor(Math.random() * colors.length)],

                  "--rot": `${angle}rad`,
                  "--distance": `${2500 + Math.random() * 5000}px`,

                  animationDuration:
                    `${2 + Math.random() * 4}s`,

                  animationDelay:
                    `${Math.random() * 5}s`,

                  filter:
                    "blur(1px) drop-shadow(0 0 15px currentColor)",

                  opacity: 0.9,

                }}
              />

            );

          })}

        </div>

        {/* LOGO */}

        <div
          className={
            showContent
              ? "relative z-20 transition-all duration-1000 ease-out scale-75 -translate-y-24 opacity-90"
              : "relative z-20 transition-all duration-1000 ease-out scale-125 opacity-100"
          }
        >

          <img
            src="/images/yamamoi-logo.png"
            alt="Yamamoi's Snacks"
            className="w-[500px] sm:w-[750px] md:w-[900px] hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_120px_rgba(255,0,255,1)]"
          />

        </div>

      </div>

      {/* ================================================= */}
      {/* CONTENIDO */}
      {/* ================================================= */}

      <div
        className={
          showContent
            ? "relative z-10 opacity-100 translate-y-0 transition-all duration-1000"
            : "relative z-10 opacity-0 translate-y-20 transition-all duration-1000"
        }
      >

        {/* ================================================= */}
        {/* INTRO */}
        {/* ================================================= */}

        <section className="relative py-32 px-6">

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

            <div>

              <p className="uppercase tracking-[0.4em] text-pink-400 font-bold mb-6 title-left">
                Desarrollo Emprendedor
              </p>

              <h1 className="text-5xl sm:text-7xl font-black leading-tight mb-8 title-zoom">

                Snacks rápidos.
                <br />

                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
                  Deliciosos.
                </span>

                <br />

                Hechos para estudiantes.

              </h1>

              <p className="text-gray-300 text-xl leading-relaxed text-justify max-w-2xl mb-8">

                Yamamoi’s Snacks es un proyecto emprendedor desarrollado
                por estudiantes de 6° semestre de la Preparatoria No. 1
                de la UAEMéx, enfocado en ofrecer snacks rápidos,
                económicos y preparados al momento para estudiantes
                dentro del entorno escolar.

              </p>

              <p className="text-gray-400 text-lg leading-relaxed text-justify mb-8">

                El proyecto surge a partir de la necesidad observada
                entre estudiantes que diariamente buscan productos
                prácticos, accesibles, con buen sabor y fáciles
                de consumir durante los descansos escolares.

              </p>

              <p className="text-gray-500 text-lg leading-relaxed text-justify">

                Yamamoi’s Snacks busca combinar rapidez,
                buena presentación, sabores intensos,
                atención amigable y un concepto visual moderno
                que llame la atención del público juvenil.

              </p>

            </div>

            <div className="relative flex justify-center">

              <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full"></div>

              <img
                src="/images/caja-snacks.png"
                alt="Caja Yamamoi"
                className="relative z-10 w-[350px] sm:w-[500px] hover:scale-105 transition-transform duration-700 drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] card-float"
              />

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* MISION Y VISION */}
        {/* ================================================= */}

        <section className="relative py-36 px-6">

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-md card-glow hover:scale-[1.03] transition-all duration-500">

              <h2 className="text-5xl font-black text-pink-400 mb-8 title-left">
                Misión
              </h2>

              <p className="text-gray-300 text-xl leading-relaxed text-justify">

                Ofrecer snacks accesibles, deliciosos y preparados
                al momento dentro del entorno escolar,
                brindando una experiencia rápida, moderna y juvenil,
                utilizando ingredientes de calidad y una atención amable
                que permita satisfacer las necesidades de los estudiantes.

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-md card-rotate hover:scale-[1.03] transition-all duration-500">

              <h2 className="text-5xl font-black text-cyan-400 mb-8 title-right">
                Visión
              </h2>

              <p className="text-gray-300 text-xl leading-relaxed text-justify">

                Convertirse en el negocio de snacks escolares más reconocido
                y preferido dentro de la Preparatoria No. 1 de la UAEMéx,
                destacando por la innovación, calidad,
                buena presentación y crecimiento constante.

              </p>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* PUBLICO OBJETIVO */}
        {/* ================================================= */}

        <section className="relative py-36 px-6 text-center">

          <p className="uppercase tracking-[0.4em] text-pink-400 font-bold mb-6 title-left">
            Mercado y Clientes
          </p>

          <h2 className="text-5xl sm:text-7xl font-black mb-12 title-right">
            Público objetivo
          </h2>

          <div className="max-w-5xl mx-auto space-y-8">

            <p className="text-gray-300 text-2xl leading-relaxed text-justify">

              El negocio estará dirigido principalmente a estudiantes
              adolescentes entre 15 y 20 años que buscan
              snacks rápidos, económicos y deliciosos durante
              sus horarios de descanso dentro de la escuela.

            </p>

            <p className="text-gray-400 text-xl leading-relaxed text-justify">

              También se considera como clientes potenciales
              a docentes, personal escolar y estudiantes de otros semestres,
              ya que la propuesta está diseñada para ser accesible,
              rápida y atractiva para diferentes personas
              dentro de la comunidad escolar.

            </p>

          </div>

        </section>

                {/* ================================================= */}
        {/* PRODUCTOS */}
        {/* ================================================= */}

        <section className="relative py-40 px-6">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">

              <p className="uppercase tracking-[0.4em] text-yellow-400 font-bold mb-6 title-up">
                Productos
              </p>

              <h2 className="text-5xl sm:text-7xl font-black title-zoom">
                Lo que ofrecemos
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {[
                {
                  title: "Papas Preparadas",
                  img: "/images/papas1.png",
                  desc: "Preparadas con limón, salsa, chile, chamoy, queso líquido y toppings personalizables para estudiantes."
                },
                {
                  title: "Dulces Enchilados",
                  img: "/images/papas2.png",
                  desc: "Combinaciones dulces y picositas con chamoy y chile, enfocadas en sabores intensos y modernos."
                },
                {
                  title: "Combos Escolares",
                  img: "/images/papas3.png",
                  desc: "Promociones especiales que combinan snacks y bebidas a precios accesibles para estudiantes."
                }
              ].map((item, i) => (

                <div
                  key={i}
                  className={`
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    overflow-hidden
                    backdrop-blur-md
                    hover:scale-[1.03]
                    transition-all
                    duration-700
                    ${i === 0 ? "card-float" : ""}
                    ${i === 1 ? "card-glow" : ""}
                    ${i === 2 ? "card-rotate" : ""}
                  `}
                >

                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[320px] object-cover hover:scale-110 transition-transform duration-700"
                  />

                  <div className="p-8">

                    <h3 className="text-3xl font-black mb-6">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 text-lg leading-relaxed text-justify">
                      {item.desc}
                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* BOTON PDF */}

            <div className="flex justify-center mt-20">

              <a
                href="https://storage3.me-qr.com/pdf/e2ff9ff4-a188-4310-b9bf-716366c51f13.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-10
                  py-5
                  rounded-full
                  bg-gradient-to-r
                  from-pink-500
                  via-purple-500
                  to-cyan-500
                  text-white
                  text-xl
                  font-bold
                  hover:scale-110
                  transition-all
                  duration-500
                  shadow-[0_0_40px_rgba(236,72,153,0.6)]
                "
              >

                Descargar Plan de Negocios

              </a>

            </div>

          </div>

        </section>
        {/* ================================================= */}
        {/* DIVISION DE VENTAS */}
        {/* ================================================= */}

        <section className="relative py-32 px-6">

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-20">

              <p className="uppercase tracking-[0.4em] text-yellow-400 font-bold mb-6 title-up">
                Estrategia Comercial
              </p>

              <h2 className="text-5xl sm:text-7xl font-black title-right">
                División de ventas
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {[
                ["70%", "Ventas realizadas directamente dentro del plantel escolar."],
                ["20%", "Ventas generadas mediante recomendaciones entre estudiantes."],
                ["10%", "Ventas impulsadas mediante redes sociales y promoción visual."]
              ].map((item, i) => (

                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md text-center card-border hover:scale-[1.03] transition-all duration-500"
                >

                  <h3 className="text-6xl font-black text-pink-400 mb-6">
                    {item[0]}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed text-justify">
                    {item[1]}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* RELACION CON CLIENTES */}
        {/* ================================================= */}

        <section className="relative py-36 px-6">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">

              <p className="uppercase tracking-[0.4em] text-cyan-400 font-bold mb-6 title-up">
                Atención y Servicio
              </p>

              <h2 className="text-5xl sm:text-7xl font-black title-left">
                Relación con los clientes
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {[
                "Atención rápida y amable para mejorar la experiencia de compra.",
                "Presentación visual atractiva para llamar la atención de estudiantes.",
                "Interacción mediante redes sociales y recomendaciones entre alumnos."
              ].map((item, i) => (

                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md card-border hover:scale-[1.03] transition-all duration-500"
                >

                  <i className='bx bx-user-circle text-6xl text-pink-400 mb-6'></i>

                  <p className="text-gray-300 text-lg leading-relaxed text-justify">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* ACTIVIDADES Y RECURSOS */}
        {/* ================================================= */}

        <section className="relative py-36 px-6">

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-md card-glow">

              <h2 className="text-5xl font-black text-pink-400 mb-8 title-right">
                Actividades clave
              </h2>

              <ul className="space-y-6 text-gray-300 text-lg leading-relaxed">

                <li>• Preparación de snacks y productos al momento.</li>

                <li>• Compra y organización de insumos.</li>

                <li>• Promoción mediante redes sociales y recomendaciones.</li>

                <li>• Atención rápida durante horarios escolares.</li>

                <li>• Diseño de promociones y combos para estudiantes.</li>

              </ul>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-md card-rotate">

              <h2 className="text-5xl font-black text-cyan-400 mb-8 title-left">
                Recursos clave
              </h2>

              <ul className="space-y-6 text-gray-300 text-lg leading-relaxed">

                <li>• Insumos y productos alimenticios.</li>

                <li>• Envases, recipientes y material de presentación.</li>

                <li>• Equipo básico para preparación.</li>

                <li>• Capital inicial para operación.</li>

                <li>• Imagen visual y publicidad del negocio.</li>

              </ul>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* MODELO CANVAS */}
        {/* ================================================= */}

        <section className="relative py-36 px-6">

          <div className="max-w-7xl mx-auto text-center">

            <p className="uppercase tracking-[0.4em] text-cyan-400 font-bold mb-6 title-left">
              Modelo Canvas
            </p>

            <h2 className="text-5xl sm:text-7xl font-black mb-20 title-right">
              Organización del negocio
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                [
                  "Clientes",
                  "Estudiantes, jóvenes y comunidad escolar interesados en snacks rápidos y accesibles."
                ],
                [
                  "Propuesta de Valor",
                  "Snacks preparados al momento, accesibles, personalizables y con presentación atractiva."
                ],
                [
                  "Fuentes de Ingreso",
                  "Venta de snacks, combos escolares y promociones especiales."
                ],
                [
                  "Canales",
                  "Venta directa dentro de la escuela y promoción mediante redes sociales."
                ],
              ].map((item, i) => (

                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md hover:-translate-y-2 transition-all duration-500 card-glow"
                >

                  <h3 className="text-3xl font-black mb-6 text-yellow-400">
                    {item[0]}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed text-justify">
                    {item[1]}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* FODA */}
        {/* ================================================= */}

        <section className="relative py-40 px-6">

          <div className="max-w-7xl mx-auto text-center">

            <p className="uppercase tracking-[0.4em] text-cyan-400 font-bold mb-6 title-up">
              Análisis Estratégico
            </p>

            <h2 className="text-5xl sm:text-7xl font-black mb-20 title-zoom">
              Análisis FODA
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                [
                  "Fortalezas",
                  "Productos llamativos, buena ubicación, preparación rápida y conocimiento del público objetivo."
                ],
                [
                  "Oportunidades",
                  "Alta demanda de snacks escolares y posibilidad de crecimiento mediante recomendaciones."
                ],
                [
                  "Debilidades",
                  "Capital limitado y dependencia de horarios escolares."
                ],
                [
                  "Amenazas",
                  "Competencia dentro y fuera del plantel e incremento en precios de insumos."
                ],
              ].map((item, i) => (

                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md hover:scale-[1.03] transition-all duration-500 card-glow"
                >

                  <h3 className="text-3xl font-black text-pink-400 mb-6">
                    {item[0]}
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-lg text-justify">
                    {item[1]}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* COSTOS E INGRESOS */}
        {/* ================================================= */}

        <section className="relative py-40 px-6">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">

              <p className="uppercase tracking-[0.4em] text-yellow-400 font-bold mb-6 title-up">
                Finanzas
              </p>

              <h2 className="text-5xl sm:text-7xl font-black title-zoom">
                Costos e ingresos
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-10">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-md card-float">

                <h3 className="text-4xl font-black text-pink-400 mb-8">
                  Costos
                </h3>

                <ul className="space-y-5 text-gray-300 text-lg leading-relaxed">

                  <li>• Compra de papas, dulces y productos alimenticios.</li>

                  <li>• Compra de envases y materiales de presentación.</li>

                  <li>• Inversión en publicidad y diseño visual.</li>

                  <li>• Gastos de preparación y organización.</li>

                  <li>• Presupuesto estimado inicial de $1,000 a $1,500 MXN.</li>

                </ul>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-md card-glow">

                <h3 className="text-4xl font-black text-cyan-400 mb-8">
                  Ingresos
                </h3>

                <ul className="space-y-5 text-gray-300 text-lg leading-relaxed">

                  <li>• Venta diaria de entre 10 y 20 productos.</li>

                  <li>• Ingreso semanal aproximado de $1,000 a $2,000 MXN.</li>

                  <li>• Incremento de ventas mediante promociones.</li>

                  <li>• Posibilidad de crecimiento mediante redes sociales.</li>

                  <li>• Desarrollo de combos y productos especiales.</li>

                </ul>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* CRECIMIENTO */}
        {/* ================================================= */}

        <section className="relative py-40 px-6 text-center">

          <p className="uppercase tracking-[0.4em] text-pink-400 font-bold mb-6 title-left">
            Expansión
          </p>

          <h2 className="text-5xl sm:text-7xl font-black mb-16 title-right">
            Plan de crecimiento
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

            {[
              "Incrementar la variedad de snacks y productos disponibles.",
              "Expandir el alcance mediante redes sociales y publicidad escolar.",
              "Consolidar la marca Yamamoi’s Snacks dentro del entorno estudiantil."
            ].map((item, i) => (

              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md card-border hover:scale-[1.03] transition-all duration-500"
              >

                <i className='bx bx-rocket text-6xl text-yellow-400 mb-6'></i>

                <p className="text-gray-300 text-lg leading-relaxed text-justify">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </section>

      </div>

    </section>

  );
};
{/* ================================================= */}
{/* BOTON FLOTANTE */}
{/* ================================================= */}

<a
  href="#"
  className="
    fixed
    bottom-8
    right-8
    z-50
    bg-gradient-to-r
    from-pink-500
    via-purple-500
    to-cyan-400
    p-[3px]
    rounded-full
    hover:scale-110
    transition-all
    duration-500
    card-glow
  "
>

  <div
    className="
      bg-black
      rounded-full
      w-[70px]
      h-[70px]
      flex
      items-center
      justify-center
    "
  >

    <i className='bx bx-up-arrow-alt text-4xl text-white'></i>

  </div>

</a>

export default Calculo;