import { useUser, useAuth, useClerk } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const { isLoaded } = useUser();
  const { isSignedIn, signIn } = useAuth();
  const { openSignIn } = useClerk();

  // Wait for Clerk to load
  if (!isLoaded) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="animate-pulse text-slate-500">Preparing secure login…</p>
      </div>
    );
  }

  // Already logged in
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen grid place-items-center overflow-hidden bg-gradient-to-br from-blue-50 via-slate-100 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

      {/* Background glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:bg-slate-900/80"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
            <FaLock />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to continue securely
          </p>
        </div>

        {/* Email Login (Clerk hosted) */}
        <button
          onClick={() => openSignIn()}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Continue with Email
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
          <span className="text-xs font-medium text-slate-500">OR</span>
          <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <button
            onClick={() =>
              signIn.authenticateWithRedirect({ strategy: "oauth_google" })
            }
            className="flex w-full items-center justify-center gap-3 rounded-lg border py-2.5 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <button
            onClick={() =>
              signIn.authenticateWithRedirect({ strategy: "oauth_github" })
            }
            className="flex w-full items-center justify-center gap-3 rounded-lg border py-2.5 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaGithub />
            Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Secured by Clerk
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
