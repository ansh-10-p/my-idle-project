import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import AnalysisResult from './pages/AnalysisResult';
import History from './pages/History';
import Profile from './pages/Profile';

const usePersistedState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

const App = () => {
  const location = useLocation();
  const [dark, setDark] = usePersistedState('theme-dark', false);
  const [history, setHistory] = usePersistedState('history', []);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const handleSaveDraft = (result, meta) => {
    setDraft({ ...result, meta });
  };

  const handleSaveHistory = (item) => {
    setHistory((prev) => [{ ...item, title: 'Analysis #' + (prev.length + 1) }, ...prev].slice(0, 20));
  };

  const handleDeleteHistory = (id) => setHistory((prev) => prev.filter((h) => h.id !== id));

  const routes = useMemo(
    () => [
      { path: '/', element: <Home /> },
      { path: '/upload', element: <Upload onSaveDraft={handleSaveDraft} dark={dark} /> },
      { path: '/analysis', element: <AnalysisResult result={draft} onSaveHistory={handleSaveHistory} /> },
      { path: '/history', element: <History history={history} onDelete={handleDeleteHistory} /> },
      { path: '/profile', element: <Profile /> },
    ],
    [dark, draft, history],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-ink transition dark:from-slate-950 dark:to-slate-900">
      <Navbar dark={dark} onToggleTheme={() => setDark((v) => !v)} />
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;

