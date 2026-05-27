const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/10"
      style={{
        background:
          "linear-gradient(180deg, #050505 0%, #080808 40%, #0b0b0b 100%)",
      }}
    >
      {/* Glow rojo principal */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-120px",
          left: "-180px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229,9,20,0.18), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Glow secundario */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-180px",
          right: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* Línea roja superior */}
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e50914, transparent)",
        }}
      />

      {/* Patrón decorativo */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* Título */}
        <div className="text-center mb-14">
          <p
            className="uppercase tracking-[0.4em] text-xs mb-4"
            style={{ color: "#e50914" }}
          >
            Proyecto Integrador
          </p>

          <h2
            className="text-5xl md:text-7xl leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: ".08em",
            }}
          >
            Gracias por explorar
          </h2>

          <h3
            className="text-4xl md:text-6xl leading-none mt-2"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#e50914",
              letterSpacing: ".08em",
            }}
          >
            Psicología y Consumo
          </h3>

          <div
            className="mx-auto mt-8"
            style={{
              width: "90px",
              height: "2px",
              background: "#e50914",
            }}
          />

          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-8 mt-8">
            Este proyecto explora cómo los factores sociales, culturales,
            emocionales y digitales influyen en la conducta individual y
            grupal para el consumo de productos en la actualidad.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <div
            className="rounded-3xl p-8 backdrop-blur-md border border-white/10"
            style={{
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-3"
              style={{ color: "#e50914" }}
            >
              Temática
            </p>

            <h4 className="text-2xl font-bold mb-4">
              Factores Sociales
            </h4>

            <p className="text-gray-400 leading-7">
              Influencia de grupos, tendencias digitales y presión social
              en las decisiones del consumidor.
            </p>
          </div>

          <div
            className="rounded-3xl p-8 backdrop-blur-md border border-white/10"
            style={{
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-3"
              style={{ color: "#e50914" }}
            >
              Análisis
            </p>

            <h4 className="text-2xl font-bold mb-4">
              Cultura y Emoción
            </h4>

            <p className="text-gray-400 leading-7">
              Las emociones, valores culturales y la publicidad influyen
              directamente en la percepción del consumidor.
            </p>
          </div>

          <div
            className="rounded-3xl p-8 backdrop-blur-md border border-white/10"
            style={{
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-3"
              style={{ color: "#e50914" }}
            >
              Impacto
            </p>

            <h4 className="text-2xl font-bold mb-4">
              Redes y Consumo
            </h4>

            <p className="text-gray-400 leading-7">
              Las plataformas digitales modifican hábitos, tendencias y
              patrones de compra mediante algoritmos y contenido visual.
            </p>
          </div>
        </div>

        {/* Parte inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">

          <div className="flex items-center gap-4">
            <div
              style={{
                width: "4px",
                height: "32px",
                background: "#e50914",
              }}
            />

            <div>
              <p
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: ".08em",
                }}
              >
                Psicología
              </p>

              <p className="text-gray-500 text-sm">
                Plataforma interactiva educativa · 2026
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {[
              "Conducta",
              "Marketing",
              "Cultura",
              "Emociones",
              "Consumo",
            ].map((item) => (
              <div
                key={item}
                className="px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase"
                style={{
                  border: "1px solid rgba(229,9,20,.25)",
                  background: "rgba(229,9,20,.08)",
                  color: "#ffb7b7",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm tracking-[0.2em] uppercase">
            © 2026 Grupo 517 · Proyecto Integrador · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;