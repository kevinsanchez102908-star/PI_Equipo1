import { motion } from "framer-motion";

// IMÁGENES
import organismo1 from "../assets/organismo1.jpg";
import organismo2 from "../assets/organismo2.jpg";
import organismo3 from "../assets/organismo3.jpg";

const ORGANISMOS = [
  {
    id: 1,
    nombre: "Banco Mundial",
    tipo: "Financiamiento Global",
    imagen: organismo1,
    descripcion:
      "Organismo internacional que brinda apoyo económico y asesoría para proyectos de desarrollo sustentable, innovación y crecimiento social.",
    ventajas: [
      "Financiamiento internacional",
      "Apoyo a proyectos sustentables",
      "Capacitación y asesoría técnica",
    ],
    desventajas: [
      "Procesos largos",
      "Muchos requisitos",
      "Evaluaciones estrictas",
    ],
    color: "#2563eb",
    gradiente:
      "radial-gradient(circle at top left, rgba(37,99,235,0.35), transparent 45%)",
  },

  {
    id: 2,
    nombre: "ONU",
    tipo: "Asesoría Internacional",
    imagen: organismo2,
    descripcion:
      "La Organización de las Naciones Unidas impulsa iniciativas sociales, ambientales y tecnológicas mediante programas internacionales.",
    ventajas: [
      "Reconocimiento mundial",
      "Programas de apoyo social",
      "Impulsa innovación sostenible",
    ],
    desventajas: [
      "Acceso limitado",
      "Trámites complejos",
      "Dependencia de convocatorias",
    ],
    color: "#7c3aed",
    gradiente:
      "radial-gradient(circle at top left, rgba(124,58,237,0.35), transparent 45%)",
  },

  {
    id: 3,
    nombre: "FMI",
    tipo: "Finanzas y Economía",
    imagen: organismo3,
    descripcion:
      "El Fondo Monetario Internacional proporciona apoyo económico y orientación financiera para proyectos y países en desarrollo.",
    ventajas: [
      "Apoyo económico",
      "Asesoría financiera",
      "Estabilidad internacional",
    ],
    desventajas: [
      "Políticas estrictas",
      "Condiciones económicas",
      "Procesos burocráticos",
    ],
    color: "#e11d48",
    gradiente:
      "radial-gradient(circle at top left, rgba(225,29,72,0.35), transparent 45%)",
  },
];

export default function Ciudadania() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden py-32">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[150px]" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 mb-24">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.4em] text-cyan-400 font-bold mb-6"
        >
          Ciudadanía
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="
            text-5xl
            md:text-7xl
            font-black
            leading-tight
            bg-gradient-to-r
            from-cyan-400
            via-purple-400
            to-pink-500
            bg-clip-text
            text-transparent
            mb-10
          "
        >
          Organismos Globales
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl text-gray-300 text-xl leading-relaxed"
        >
          Existen organismos internacionales que apoyan proyectos
          emprendedores mediante financiamiento, asesoría jurídica,
          apoyo tecnológico y programas de innovación.
          Estos organismos permiten impulsar iniciativas sociales,
          económicas y sustentables en diferentes partes del mundo.
        </motion.p>

      </div>

      {/* CARDS */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {ORGANISMOS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="
                relative
                rounded-[2rem]
                overflow-hidden
                border
                border-white/10
                bg-[#0c0c0c]
                backdrop-blur-xl
              "
            >

              {/* EFFECT */}
              <div
                className="absolute inset-0"
                style={{ background: item.gradiente }}
              />

              {/* IMAGE */}
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div
                  className="absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
                  style={{ background: item.color }}
                >
                  {item.tipo}
                </div>
              </div>

              {/* CONTENT */}
              <div className="relative z-10 p-8">

                <h3 className="text-4xl font-black mb-5">
                  {item.nombre}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-8">
                  {item.descripcion}
                </p>

                {/* VENTAJAS */}
                <div className="mb-8">
                  <p
                    className="uppercase tracking-[0.25em] text-sm font-bold mb-4"
                    style={{ color: item.color }}
                  >
                    Ventajas
                  </p>

                  <div className="space-y-3">
                    {item.ventajas.map((ventaja, i) => (
                      <div
                        key={i}
                        className="
                          flex
                          items-center
                          gap-3
                          text-gray-200
                          bg-white/5
                          rounded-xl
                          px-4
                          py-3
                        "
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: item.color }}
                        />
                        {ventaja}
                      </div>
                    ))}
                  </div>
                </div>

                {/* DESVENTAJAS */}
                <div>
                  <p className="uppercase tracking-[0.25em] text-sm font-bold text-red-400 mb-4">
                    Desventajas
                  </p>

                  <div className="space-y-3">
                    {item.desventajas.map((desventaja, i) => (
                      <div
                        key={i}
                        className="
                          flex
                          items-center
                          gap-3
                          text-gray-300
                          bg-red-500/5
                          rounded-xl
                          px-4
                          py-3
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {desventaja}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}