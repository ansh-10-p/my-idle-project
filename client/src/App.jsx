import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SmoothCursor from "./components/SmoothCursor"; // 👈 Import Cursor

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Analysis from "./pages/AnalysisResult";

const App = () => {
  return (
    // 1. Force the dark midnight background globally
    <div className="min-h-screen w-full bg-[#0B1121] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 2. Add the Magnetic Cursor */}
      <SmoothCursor />

      {/* Navbar sits on top */}
      <Navbar />

      {/* 3. Main Content: Removed "max-w-6xl", "mx-auto", "pt-24" */}
      {/* We allow pages to be full-width so backgrounds stretch properly */}
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
          
            element={
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            }
          />
          

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;