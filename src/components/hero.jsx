import 'boxicons/css/boxicons.min.css';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <main className="flex lg:mt-20 flex-col lg:flex-row items-center justify-between min-h-[90vh] relative bg-black text-white overflow-hidden">

      {/* CONTENIDO IZQUIERDO */}
      <div 
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        className="max-w-xl ml-[5%] z-20 mt-[90%] md:mt-[60%] lg:mt-0"
      >

        {/* Botón “INTRODUCCIÓN” con gradiente púrpura → rosa */}
        <div 
          className='relative w-[95%] sm:w-48 h-10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-4'
          style={{ background: 'linear-gradient(to right, #9b5de5, #f15bb5)' }}
        >
          <div className='absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1 text-white font-semibold'>
            <i className='bx bx-diamond'></i> INTRODUCCIÓN
          </div>
        </div>

        {/* Título principal */}
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8'>
          PROYECTO INTEGRADOR 5°<br />EQUIPO 6
        </h1>

        {/* Descripción */}
        <p className='text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[40rem] text-justify'>
          Bienvenido al Proyecto Integrador del Grupo 517.  
          En esta plataforma podrás explorar la información del equipo, los problemas ambientales identificados en nuestra comunidad, así como las causas, consecuencias y acciones que proponemos para mejorar el entorno.  
          Navega por cada sección para conocer nuestro análisis y nuestras metas.
        </p>

        {/* Botones */}
        <div className='flex gap-4 mt-12'>
          <a className='border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]' href="#">
            Documentation <i className='bx bx-link-alt'></i>
          </a>

          <a 
            className='border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 bg-white text-black hover:bg-gray-200' 
            href="#"
          >
            EMPEZAR <i className='bx bx-link-alt'></i>
          </a>
        </div>
      </div>

      {/* MODELO 3D */}
      <Spline
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0"
        data-aos-duration="3000"
        className='absolute lg:top-[-15%] top-[-5%] bottom-0 lg:right-0 sm:left-[-2%] h-[110%] z-10'
        scene="https://prod.spline.design/HOpGcX9lruwMcC19/scene.splinecode"
      />

      {/* ESCUDO DE LA ESCUELA (3 veces más grande y más a la izquierda) */}
      <img 
        src="/images/Escudo.png" 
        alt="Escudo de la escuela"
        className="absolute lg:top-0 lg:right-[-0px] top-5 right-[-100px] w-[450px] h-[450px] md:w-[600px] md:h-[600px] object-contain z-30"
      />

      {/* LUZ DIAGONAL BLANCA MÁS INTENSA (por encima del modelo) */}
      <div
        className="absolute pointer-events-none z-20"
        style={{
          top: "0%",
          right: "-40%",
          width: "300vh",
          height: "10vh",
          background: "linear-gradient(115deg, rgba(255,255,255,0.8), rgba(255,255,255,0.25), transparent 75%)",
          filter: "blur(75px)",
          transform: "rotate(-30deg)",
        }}
      ></div>

    </main>
  );
};

export default Hero;
