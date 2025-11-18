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

      <h1 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"  
        className="text-3xl md:text-4xl lg:text-5xl font-light m-0"
      >
        GRUPO 517
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-12">

        <a href="#cultura-ambiental" className="text-base tracking-wider transition-colors hover:text-gray-300 z-50">
          CULTURA AMBIENTAL
        </a>

        <a href="#nociones-derecho" className="text-base tracking-wider transition-colors hover:text-cyan-400 z-50">
          NOCIONES DE DERECHO
        </a>

        <a href="#english" className="text-base tracking-wider transition-colors hover:text-blue-400 z-50">
          ENGLISH
        </a>

        <a href="#fisica" className="text-base tracking-wider transition-colors hover:text-purple-500 z-50">
          FÍSICA
        </a>

        <a href="#calculo" className="text-base tracking-wider transition-colors hover:text-pink-500 z-50">
          CÁLCULO
        </a>

        <a href="#apreciacion-artes" className="text-base tracking-wider transition-colors hover:text-yellow-400 z-50">
          ARTES
        </a>

        <a href="#etimologias" className="text-base tracking-wider transition-colors hover:text-orange-400 z-50">
          ETIMOLOGÍAS
        </a>

      </nav>

      <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full border-none font-medium transition-all duration-500 hover:bg-white cursor-pointer z-50">
        SIGNIN
      </button>

      {/* Mobile Button */}
      <button onClick={toggleMobileMenu} className="md:hidden text-3xl p-2 z-50">
        <i className='bx bx-menu'></i>
      </button>

      {/* Mobile Menu */}
      <div 
        id='mobileMenu' 
        className='hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md'
      >
        <nav className='flex flex-col gap-6 items-center'>
          <a href="#cultura-ambiental" className="text-base tracking-wider transition-colors hover:text-gray-300 z-50">
            CULTURA AMBIENTAL
          </a>

          <a href="#nociones-derecho" className="text-base tracking-wider transition-colors hover:text-cyan-400 z-50">
            NOCIONES DE DERECHO
          </a>

          <a href="#english" className="text-base tracking-wider transition-colors hover:text-blue-400 z-50">
            ENGLISH
          </a>

          <a href="#fisica" className="text-base tracking-wider transition-colors hover:text-purple-500 z-50">
            FÍSICA
          </a>

          <a href="#calculo" className="text-base tracking-wider transition-colors hover:text-pink-500 z-50">
            CÁLCULO
          </a>

          <a href="#apreciacion-artes" className="text-base tracking-wider transition-colors hover:text-yellow-400 z-50">
            ARTES
          </a>

          <a href="#etimologias" className="text-base tracking-wider transition-colors hover:text-orange-400 z-50">
            ETIMOLOGÍAS
          </a>
        </nav>
      </div>

    </header>
  );
};

export default Header;
