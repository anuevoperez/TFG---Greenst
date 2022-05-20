import "./App.css";
import { useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import Layout from "./Shared/Layout";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) return;
    if (loggedUser.token) setUser(loggedUser);
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Layout />
    </AuthContext.Provider>
  );
}

export default App;
