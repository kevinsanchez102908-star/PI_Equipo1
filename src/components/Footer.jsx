const Footer = () => {
  return (
    <section className="relative bg-black text-white py-20 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Luz diagonal de fondo */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "0%",
          left: "-20%",
          width: "200vh",
          height: "20vh",
          background: "linear-gradient(120deg, rgba(255,255,255,0.2), transparent 80%)",
          filter: "blur(80px)",
          transform: "rotate(-25deg)",
        }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
          ¡Gracias por visitar nuestro Proyecto Integrador!
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Aquí finaliza nuestra página. Esperamos que hayas podido explorar todos los análisis, propuestas y resultados de nuestro equipo.
        </p>
        <p className="text-gray-500 text-sm">
          © 2025 Grupo 517 — Todos los derechos reservados.
        </p>
      </div>
    </section>
  );
};

export default Footer;
