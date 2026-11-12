import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAccount } from "../api/movies";
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
      <header className="account">
        <h1>Welcome, {account.username}!</h1>
      </header>
      <section>
        <h3>Your reservations:</h3>
      </section>
    </>
  );
}
