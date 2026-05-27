import { useEffect } from "react";

const GlobalBackground = () => {

  useEffect(() => {
    document.body.style.background = "black";
    document.body.style.overflowX = "hidden";
  }, []);

  return (

    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Glow superior izquierdo */}
      <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-purple-500/15 blur-[200px] rounded-full animate-pulse"></div>

      {/* Glow inferior derecho */}
      <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-cyan-500/15 blur-[200px] rounded-full animate-pulse"></div>

      {/* Glow central */}
      <div className="absolute top-[35%] left-[30%] w-[500px] h-[500px] bg-pink-500/10 blur-[180px] rounded-full"></div>

    </div>

  );

};

export default GlobalBackground;