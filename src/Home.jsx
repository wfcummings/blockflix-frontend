import { NavLink } from "react-router";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div id="home">
        <img id="logo" src="src/logo/bflogo.png" alt="Logo for BlockFlix"></img>
        <NavLink id="signup" to="/register">
          Sign Up
        </NavLink>
      </div>
    </>
  );
}
