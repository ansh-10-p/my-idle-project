import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Toggle from './Toggle';

const links = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/history', label: 'History' },
  { to: '/profile', label: 'Profile' },
];

const Navbar = ({ dark, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-lg font-semibold text-ink dark:text-white">AI Code Review</div>
          <p className="text-xs text-slate dark:text-slate-300">UI-only demo</p>
        </motion.div>
        <nav className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-2 py-1 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'px-3 py-2 text-sm font-medium rounded-full transition',
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Toggle checked={dark} onChange={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

