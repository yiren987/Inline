// import React, { useState } from "react";
// import { Card, Button, Alert } from "react-bootstrap";
// import { useAuth } from "../../contexts/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { NavMain } from "../main/NavMain";
// import { Route, Routes } from "react-router-dom";

// export default function Dashboard() {
//   return (
//     <>
//       <Routes>
//         <Route path="/dashboard" element={<NavMain />}></Route>
//       </Routes>
//     </>
//   );
// }

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavMain } from "../main/NavMain";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <NavMain />
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
