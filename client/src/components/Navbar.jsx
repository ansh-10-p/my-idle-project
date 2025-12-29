import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeLink, setActiveLink] = useState("/");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "History", path: "/history" },
  ];

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-500 dark:text-blue-400 hover:scale-105 transition-transform"
        >
          AI Review
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setActiveLink(link.path)}
              className={({ isActive }) =>
                `relative font-medium px-3 py-2 transition-all rounded-lg ${
                  isActive || activeLink === link.path
                    ? "text-blue-600 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
            >
              {link.name}
              {/* Sliding underline */}
              <motion.span
                layoutId="underline"
                className="absolute left-0 bottom-0 h-1 bg-blue-500 dark:bg-blue-300 rounded-full"
                style={{
                  width: activeLink === link.path ? "100%" : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600"
          >
            {theme === "light" ? <HiMoon size={20} /> : <HiSun size={20} />}
          </motion.button>

          <motion.button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </motion.button>
        </div>

        {/* Auth Buttons + Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoading && !isAuthenticated && (
            <>
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95, rotate: 0 }}
                onClick={() => loginWithRedirect()}
                className="rounded-lg bg-blue-500 px-5 py-2 text-white font-semibold shadow-md shadow-blue-300 hover:bg-blue-600 transition"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95, rotate: 0 }}
                onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                className="rounded-lg border border-blue-500 px-5 py-2 text-blue-500 font-semibold shadow-sm hover:bg-blue-500 hover:text-white transition"
              >
                Sign Up
              </motion.button>
            </>
          )}

          {!isLoading && isAuthenticated && (
            <div className="relative">
              <motion.button
                onClick={() => setDropdownOpen((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white shadow-md"
              >
                {user?.name || "Profile"}
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
                  >
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-blue-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-t-lg"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={() =>
                        logout({ logoutParams: { returnTo: window.location.origin } })
                      }
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden px-6 pb-4 flex flex-col gap-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveLink(link.path);
                }}
                className={({ isActive }) =>
                  `block font-medium px-3 py-2 rounded-lg transition-all ${
                    isActive || activeLink === link.path
                      ? "text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-slate-700"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {!isLoading && !isAuthenticated && (
              <>
                <button
                  onClick={() => loginWithRedirect()}
                  className="rounded-lg bg-blue-500 px-5 py-2 text-white font-semibold shadow-md hover:bg-blue-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                  className="rounded-lg border border-blue-500 px-5 py-2 text-blue-500 font-semibold shadow-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Sign Up
                </button>
              </>
            )}

            {!isLoading && isAuthenticated && (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg text-blue-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Profile
                </NavLink>
                <button
                  onClick={() =>
                    logout({ logoutParams: { returnTo: window.location.origin } })
                  }
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
