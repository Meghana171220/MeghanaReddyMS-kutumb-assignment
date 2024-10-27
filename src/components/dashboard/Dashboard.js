import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import QuoteList from "../quotelist/QuoteList";
import Toast from "../toast/Toast";

const Dashboard = ({ setToken }) => {
  const [redirectionState, setRedirectionState] = useState(
    sessionStorage.getItem("generic_success_toast") === "true"
  );

  useEffect(() => {
    sessionStorage.removeItem("generic_success_toast");
  }, [redirectionState]);

  const handleCloseToast = () => {
    setRedirectionState(false);
  };

  return (
    <div className="dashboard-container">
      <main>
        <h1>Welcome {localStorage.getItem("username")}</h1>
        {redirectionState && (
          <Toast
            message="New Quote has been added!"
            onClose={handleCloseToast}
          />
        )}
        <QuoteList />
      </main>
    </div>
  );
};

export default Dashboard;
