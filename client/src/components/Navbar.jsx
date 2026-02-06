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
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  Search,
  Code2,
  Command,
  ChevronRight,
  LogOut
} from "lucide-react";
import clsx from "clsx";

/* ---------------- Config ---------------- */
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Review", path: "/upload" },
  { name: "History", path: "/history" },
];

/* ---------------- Navbar ---------------- */
const Navbar = () => {
  const { openSignIn, openSignUp } = useClerk();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const notifRef = useRef(null);

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- Close Menus on Nav ---------------- */
  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
    setCommandOpen(false);
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
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-slate-800 bg-[#0B1121]/80 backdrop-blur-xl shadow-lg shadow-black/20"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span>DevReview</span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                >
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={clsx("relative z-10", active ? "text-white" : "text-slate-400 hover:text-white")}>
                    {link.name}
                  </span>
                </NavLink>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Command Trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-[#151e32] px-3 py-1.5 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="mr-2">Search...</span>
              <kbd className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-1.5 text-[10px] font-medium text-slate-400 group-hover:border-slate-600 group-hover:text-slate-300">
                <Command className="h-2 w-2" /> K
              </kbd>
            </button>

            <div className="h-5 w-[1px] bg-slate-800" />

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((p) => !p)}
                className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-[#0B1121]" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 overflow-hidden rounded-xl border border-slate-800 bg-[#151e32] shadow-2xl shadow-black/50"
                  >
                    <div className="border-b border-slate-800 px-4 py-3">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="flex h-32 flex-col items-center justify-center p-4 text-center text-slate-500">
                      <Bell className="mb-2 h-8 w-8 opacity-20" />
                      <p className="text-xs">You're all caught up!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Buttons */}
            <SignedOut>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => openSignIn()}
                  className="text-sm font-medium text-slate-300 hover:text-white"
                >
                  Log in
                </button>
                <button 
                  onClick={() => openSignUp()}
                  className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:-translate-y-0.5 hover:bg-cyan-500"
                >
                  Sign Up
                </button>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 ring-2 ring-slate-800",
                    userButtonPopoverCard: "bg-[#151e32] border border-slate-800 shadow-xl",
                    userButtonPopoverActionButton: "hover:bg-slate-800 text-slate-300",
                    userButtonPopoverActionButtonText: "text-slate-300",
                    userButtonPopoverFooter: "hidden" 
                  }
                }}
                afterSignOutUrl="/" 
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[65px] z-40 overflow-hidden border-b border-slate-800 bg-[#0B1121]/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 p-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => clsx(
                    "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-800">
                <SignedOut>
                  <button onClick={() => openSignIn()} className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/5">
                    Log In
                  </button>
                  <button onClick={() => openSignUp()} className="mt-2 w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-bold text-white">
                    Sign Up
                  </button>
                </SignedOut>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {commandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-[20vh] backdrop-blur-sm"
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-700 bg-[#151e32] shadow-2xl shadow-black/50"
            >
              <div className="flex items-center border-b border-slate-700 px-4 py-3">
                <Search className="h-5 w-5 text-slate-500" />
                <input
                  autoFocus
                  placeholder="Search documentation, projects, or history..."
                  className="ml-3 flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                />
                <kbd className="rounded border border-slate-700 bg-slate-800 px-1.5 text-xs text-slate-500">ESC</kbd>
              </div>
              <div className="p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">Navigation</div>
                {navLinks.map((l) => (
                  <button
                    key={l.path}
                    onClick={() => {
                      navigate(l.path);
                      setCommandOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400" />
                      {l.name}
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100" />
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