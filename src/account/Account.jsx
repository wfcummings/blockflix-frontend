import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAccount } from "../api/movies";
import Reservations from "./Reservations";
import { Link } from "react-router";

export default function Account() {
  const { token } = useAuth();
  const [account, setAccount] = useState(null);

  const syncAccount = async (token) => {
    const data = await getAccount(token);
    setAccount(data);
  };
  useEffect(() => {
    syncAccount(token);
  }, [token]);

  if (!token)
    return (
      <p>
        Please <Link to="/login">log in</Link> to see your account.
      </p>
    );

  if (!account) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="watch-history-bar">
        <Link className="watch-history-link  button-base" to ="/watch-history">View Watch History</Link>
        <Reservations />
      </div>
    </>
  );
}
