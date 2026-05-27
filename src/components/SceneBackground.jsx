import { motion, AnimatePresence } from "framer-motion";

const scenes = {
  hero: "#000000",
  emprendedor: "#0b001a",
  sociologia: "#001018",
  footer: "#000000",
};

export default function SceneBackground({ active }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 -z-10"
        style={{
          background: scenes[active] || "#000",
        }}
      />
    </AnimatePresence>
  );
}