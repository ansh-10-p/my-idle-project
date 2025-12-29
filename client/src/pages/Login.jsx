import { useAuth0 } from "@auth0/auth0-react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900">

        <p className="text-center text-sm text-slate-500">
          Please enter your details
        </p>
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Welcome back
        </h2>

        {/* Email / Password (Auth0 Universal Login) */}
        <button
          onClick={() => loginWithRedirect()}
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Continue with Email
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
          <span className="text-sm text-slate-500">OR</span>
          <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Social login */}
        <div className="space-y-3">
          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  connection: "google-oauth2",
                },
              })
            }
            className="flex w-full items-center justify-center gap-3 rounded-lg border py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  connection: "github",
                },
              })
            }
            className="flex w-full items-center justify-center gap-3 rounded-lg border py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaGithub />
            Continue with GitHub
          </button>

          <button
            onClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  connection: "facebook",
                },
              })
            }
            className="flex w-full items-center justify-center gap-3 rounded-lg border py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaFacebook className="text-blue-600" />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
