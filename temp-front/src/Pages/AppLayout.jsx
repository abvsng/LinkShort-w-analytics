import { Outlet, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AppLayout() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <>
      <header className="flex justify-between items-center bg-slate-700 py-2 px-4">
        {/* Left side (empty placeholder) */}
        <div className="flex-1"></div>

        {/* Middle side */}
        <div className="flex-1 flex justify-center">
          {isAuthenticated && (
            <nav className="flex gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors duration-300 hover:text-cyan-500 ${
                    isActive ? "text-cyan-500" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `transition-colors duration-300 hover:text-cyan-500 ${
                    isActive ? "text-cyan-500" : ""
                  }`
                }
              >
                User
              </NavLink>
            </nav>
          )}
        </div>

        {/* Right side */}
        <div className="flex-1 flex justify-end">
          {isAuthenticated ? (
            <button
              onClick={() => {
                const confirm = window.confirm(
                  "Are you sure you want to logout?"
                );
                if (!confirm) return;
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => loginWithRedirect()}>Login</button>
              <button
                onClick={() => loginWithRedirect({ screen_hint: "signup" })}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}
