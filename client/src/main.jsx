import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Debug: Log the key (remove in production)
if (PUBLISHABLE_KEY) {
  console.log("✅ Clerk Key loaded:", PUBLISHABLE_KEY.substring(0, 30) + "...");
  console.log("Key length:", PUBLISHABLE_KEY.length);
  // Clerk keys should start with pk_test_ or pk_live_
  if (!PUBLISHABLE_KEY.startsWith("pk_test_") && !PUBLISHABLE_KEY.startsWith("pk_live_")) {
    console.warn("⚠️ Warning: Clerk key format may be incorrect. Should start with pk_test_ or pk_live_");
  }
} else {
  console.error("❌ Clerk Key NOT loaded!");
  console.error("Make sure VITE_CLERK_PUBLISHABLE_KEY is set in client/.env file");
}

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
