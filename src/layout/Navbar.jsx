import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header id="navbar">
      {token ? (
        <NavLink id="brand" to="/movies">
          <img
            id="logosmall"
            src="src/logo/bflogo.png"
            alt="Logo for BlockFlix"
          ></img>
        </NavLink>
      ) : (
        <NavLink id="brand" to="/">
          <img
            id="logosmall"
            src="src/logo/bflogo.png"
            alt="Logo for BlockFlix"
          ></img>
        </NavLink>
      )}

      <nav>
        {token ? (
          <>
            <NavLink to="/movies">movies</NavLink>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/" onClick={() => logout()}>
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink id="login" to="/login">
              Log in
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
