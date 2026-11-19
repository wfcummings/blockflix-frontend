import { NavLink } from "react-router";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="home">
        <img src="assets/BLOCKFLIX2.png" alt="Logo for BlockFlix"></img>
        <NavLink id="signup" to="/register">
          Sign Up
        </NavLink>
      </div>
    </>
  );
}
