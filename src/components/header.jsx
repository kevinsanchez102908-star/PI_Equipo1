import 'boxicons/css/boxicons.min.css';

const Header = () => {

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20">

      {/* LOGO / TITULO */}
      <h1 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"  
        className="text-3xl md:text-4xl lg:text-5xl font-light m-0"
      >
        GRUPO 617
      </h1>

      {/* NAV DESKTOP */}
      <nav className="hidden md:flex items-center gap-10">

        {/* MATERIAS (estructura lista para crecer) */}
        <a 
          href="#desarrollo-emprendedor" 
          className="relative text-base tracking-wider transition-colors hover:text-green-400 z-50
                     after:content-[''] after:absolute after:-bottom-2 after:left-0 
                     after:w-0 after:h-[2px] after:bg-green-400 after:transition-all 
                     hover:after:w-full"
        >
          DESARROLLO EMPRENDEDOR
        </a>

        {/* FUTURAS MATERIAS (listas para activar después)
        <a href="#materia-2" className="text-base tracking-wider hover:text-blue-400">
          MATERIA 2
        </a>

        <a href="#materia-3" className="text-base tracking-wider hover:text-pink-400">
          MATERIA 3
        </a>
        */}

      </nav>

      {/* BOTÓN */}
      <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
        SIGNIN
      </button>

      {/* MOBILE BUTTON */}
      <button onClick={toggleMobileMenu} className="md:hidden text-3xl p-2 z-50">
        <i className='bx bx-menu'></i>
      </button>

      {/* MOBILE MENU */}
      <div 
        id='mobileMenu' 
        className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 
                   bg-black/70 backdrop-blur-md'
      >
        <nav className='flex flex-col gap-8 items-center'>

          {/* MATERIAS FUTURAS LISTAS PARA ESCALAR */}
          <a 
            href="#desarrollo-emprendedor" 
            className="text-lg tracking-wider transition-colors hover:text-green-400"
          >
            DESARROLLO EMPRENDEDOR
          </a>

          {/* Espacio reservado para futuras materias */}
          <div className="w-1/2 h-[1px] bg-white/20"></div>

          {/* EJEMPLOS FUTUROS (comentados)
          <a href="#materia-2" className="text-lg hover:text-blue-400">
            MATERIA 2
          </a>
          */}

        </nav>
      </div>

    </header>
  );
};

export default Header;