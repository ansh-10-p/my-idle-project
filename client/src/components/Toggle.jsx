import { motion } from "framer-motion";
import clsx from "clsx";

const Toggle = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative inline-flex h-7 w-12 items-center rounded-full px-1 transition",
        checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
      )}
      aria-pressed={checked}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="h-5 w-5 rounded-full bg-white shadow"
        animate={{ x: checked ? 20 : 0 }}
      />
    </button>
  );
};

export default Toggle;

