import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  HiMenu,
  HiX,
  HiSun,
  HiMoon,
  HiBell,
  HiOutlineSearch,
} from "react-icons/hi";

/* ---------------- Config ---------------- */
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Upload", path: "/upload" },
  { name: "History", path: "/history" },
];

/* ---------------- Navbar ---------------- */
const Navbar = () => {
  const { openSignIn, openSignUp } = useClerk();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(false);

  const [notifOpen, setNotifOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const notifRef = useRef(null);

  /* ---------------- Persistent Theme ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- Route Progress Bar ---------------- */
  useEffect(() => {
    setProgress(true);
    const t = setTimeout(() => setProgress(false), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  /* ---------------- Close Menus ---------------- */
  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
  }, [pathname]);

  /* ---------------- Click Outside Notification ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- Command Palette Shortcut ---------------- */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <AnimatePresence>
        {progress && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-blue-500"
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all
          ${
            scrolled
              ? "bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl shadow-lg"
              : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md"
          }
          border-b border-slate-200 dark:border-slate-700`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink className="text-2xl font-bold text-blue-600 dark:text-blue-400" to="/">
            AI Review
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <NavLink key={link.path} to={link.path} className="relative px-4 py-2">
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-blue-100 dark:bg-slate-800"
                    />
                  )}
                  <span className="relative z-10 font-medium">{link.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Command */}
            <motion.button
              onClick={() => setCommandOpen(true)}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg border px-3 py-2 flex items-center gap-2"
            >
              <HiOutlineSearch />
              <span className="text-xs opacity-70">⌘K</span>
            </motion.button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setNotifOpen((p) => !p)}
                className="relative rounded-full border p-2"
              >
                <HiBell />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-64 rounded-xl bg-white dark:bg-slate-900 shadow-lg border p-3"
                  >
                    <p className="text-sm font-semibold">Notifications</p>
                    <p className="text-xs text-slate-500 mt-2">
                      No new notifications
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ rotate: 15 }}
              className="rounded-full border p-2"
            >
              {theme === "light" ? <HiMoon /> : <HiSun />}
            </motion.button>

            <SignedOut>
              <button 
                onClick={() => openSignIn()}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Login
              </button>
              <button 
                onClick={() => openSignUp()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Sign Up
              </button>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </motion.nav>

      {/* Command Palette */}
      <AnimatePresence>
        {commandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-32"
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-xl"
            >
              <input
                autoFocus
                placeholder="Search pages…"
                className="w-full rounded-lg border px-4 py-3"
              />
              <div className="mt-3 space-y-2">
                {navLinks.map((l) => (
                  <button
                    key={l.path}
                    onClick={() => {
                      navigate(l.path);
                      setCommandOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50"
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
