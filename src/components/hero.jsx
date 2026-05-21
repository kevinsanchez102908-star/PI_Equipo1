import 'boxicons/css/boxicons.min.css';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <main className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen h-screen bg-black text-white overflow-hidden px-6 lg:px-16">

      {/* ================================================= */}
      {/* FONDO */}
      {/* ================================================= */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full"></div>
      </div>

      {/* ================================================= */}
      {/* MODELO 3D */}
      {/* ================================================= */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <Spline
          scene="https://prod.spline.design/HOpGcX9lruwMcC19/scene.splinecode"
        />
      </div>

      {/* ================================================= */}
      {/* CONTENIDO IZQUIERDO */}
      {/* ================================================= */}
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        className="relative z-30 max-w-2xl mt-40 lg:mt-0"
      >

        {/* BOTON INTRO */}
        <div
          className='relative w-[220px] h-11 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.25)] mb-6'
          style={{
            background: 'linear-gradient(to right, #8b5cf6, #ec4899)'
          }}
        >
          <div className='absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-2 text-white font-semibold tracking-wider'>
            <i className='bx bx-diamond'></i>
            INTRODUCCIÓN
          </div>
        </div>

        {/* TITULO */}
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-8'>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            PROYECTO
            <br />
            INTEGRADOR
          </span>

          <br />

          <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            6° SEMESTRE
            <br />
            EQUIPO 1
          </span>
        </h1>

        {/* DESCRIPCION */}
        <p className='text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl text-justify'>
          Bienvenido al Proyecto Integrador del Grupo 617.
          En esta plataforma podrás explorar la información
          del equipo, los proyectos de cada materia y mucho más.
        </p>

        {/* BOTONES */}
        <div className='flex flex-wrap gap-5 mt-12'>
          <a
            className='border border-white/20 px-6 py-3 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-white/10 hover:scale-105'
            href="#"
          >
            Documentation <i className='bx bx-link-alt'></i>
          </a>

          <a
            className='px-8 py-3 rounded-full text-lg font-bold tracking-wide bg-white text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200'
            href="#"
          >
            EMPEZAR <i className='bx bx-link-alt'></i>
          </a>
        </div>

      </div>

      {/* ================================================= */}
      {/* ESCUDO */}
      {/* ================================================= */}
      <img
        src="/images/Escudo.png"
        alt="Escudo de la escuela"
        className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          w-[260px]
          md:w-[380px]
          lg:w-[520px]
          object-contain
          z-30
          opacity-90
          drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]
          pointer-events-none
        "
      />

      {/* ================================================= */}
      {/* LUZ DIAGONAL */}
      {/* ================================================= */}
      <div
        className="absolute pointer-events-none z-20"
        style={{
          top: "30%",
          right: "-20%",
          width: "220vh",
          height: "10vh",
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2), transparent 75%)",
          filter: "blur(70px)",
          transform: "rotate(-30deg)",
        }}
      />

    </main>
  );
};

export default Hero;