import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  return (
    <nav className="flex gap-4 p-4 border-b">
      <NavLink to="/">Home</NavLink>

      {isAuthenticated && (
        <>
          <NavLink to="/upload">Upload</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </>
      )}

      {!isLoading && !isAuthenticated && (
        <button
          onClick={() => loginWithRedirect()}
          className="ml-auto bg-blue-600 text-white px-4 py-1 rounded"
        >
          Login
        </button>
      )}

      {!isLoading && isAuthenticated && (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="ml-auto bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
