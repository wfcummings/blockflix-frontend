import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import MoviesPage from "./movies/MoviesPage";
import Error404 from "./Error404";
import Account from "./account/Account";
// Import movies details 
import MovieDetails from "./movies/MovieDetails";
import Reservations from "./account/Reservations";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        {/** show details for the selected movie */}
        <Route path = "/movies/:id" element = {<MovieDetails />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
