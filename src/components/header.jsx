import "boxicons/css/boxicons.min.css";
import { useEffect, useState } from "react";

const Header = () => {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <header
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-500
        px-6
        lg:px-20
        py-4
        flex
        justify-between
        items-center

        ${scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
          : "bg-transparent"
        }
      `}
    >

      {/* ================================================= */}
      {/* LOGO */}
      {/* ================================================= */}

      <h1
        data-aos="fade-down"
        data-aos-duration="1200"
        className="
          text-2xl
          md:text-3xl
          lg:text-4xl
          font-light
          tracking-[0.3em]
          text-white
          hover:text-cyan-400
          transition-all
          duration-500
          cursor-pointer
        "
      >
        GRUPO 617
      </h1>

      {/* ================================================= */}
      {/* NAV DESKTOP */}
      {/* ================================================= */}

      <nav className="hidden md:flex items-center gap-10">

        <a
          href="#desarrollo-emprendedor"
          className="
            relative
            text-sm
            tracking-widest
            text-white/80
            hover:text-cyan-400
            transition-all
            duration-300
            after:content-['']
            after:absolute
            after:-bottom-2
            after:left-0
            after:w-0
            after:h-[1px]
            after:bg-cyan-400
            after:transition-all
            hover:after:w-full
          "
        >

          DESARROLLO EMPRENDEDOR

        </a>

      </nav>

      {/* ================================================= */}
      {/* MOBILE BUTTON */}
      {/* ================================================= */}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-3xl text-white z-50"
      >

        <i className="bx bx-menu"></i>

      </button>

      {/* ================================================= */}
      {/* MOBILE MENU */}
      {/* ================================================= */}

      {menuOpen && (

        <div
          className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-xl
            flex
            flex-col
            items-center
            justify-center
            gap-10
            z-40
          "
        >

          <a
            onClick={() => setMenuOpen(false)}
            href="#desarrollo-emprendedor"
            className="text-xl text-white hover:text-cyan-400"
          >

            Desarrollo Emprendedor

          </a>

          <button
            onClick={() => setMenuOpen(false)}
            className="
              px-8
              py-3
              rounded-full
              bg-white
              text-black
              font-bold
            "
          >

            Cerrar

          </button>

        </div>

      )}

    </header>

  );

};

export default Header;