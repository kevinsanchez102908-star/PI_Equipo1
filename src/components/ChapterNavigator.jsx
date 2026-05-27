import { useEffect, useState } from "react";

const sections = ["hero", "emprendedor", "sociologia", "footer"];

export default function ChapterNavigator() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      let current = "hero";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`
            w-3 h-3 rounded-full transition-all duration-500
            ${
              active === id
                ? "bg-cyan-400 scale-150 shadow-[0_0_20px_#22d3ee]"
                : "bg-white/30"
            }
          `}
        />
      ))}
    </div>
  );
}