import { motion } from "framer-motion";
import clsx from "clsx";

const Toggle = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={clsx(
        "group relative flex h-7 w-12 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1121]",
        checked
          ? "border-cyan-500 bg-cyan-500/20"
          : "border-slate-700 bg-slate-800"
      )}
      aria-pressed={checked}
    >
      {/* Background Track Glow (Active State) */}
      <span
        className={clsx(
          "absolute inset-0 rounded-full transition duration-500",
          checked ? "shadow-[0_0_12px_rgba(6,182,212,0.5)]" : "shadow-none"
        )}
      />

      {/* The Moving Handle */}
      <motion.span
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        animate={{
          x: checked ? 22 : 2, // Moves from left (2px) to right (22px)
        }}
        className={clsx(
          "relative block h-4 w-4 rounded-full shadow-sm transition-colors",
          checked 
            ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
            : "bg-slate-400 group-hover:bg-slate-300"
        )}
      >
        {/* Optional: Tiny shine/reflection on the handle for depth */}
        <span className="absolute right-[3px] top-[3px] h-1.5 w-1.5 rounded-full bg-white/30" />
      </motion.span>
    </button>
  );
};

export default Toggle;