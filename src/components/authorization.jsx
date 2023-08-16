import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../customHook/currentUser";

function Authorization({ children }) {
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/timer");
    } else {
      navigate("/");
    }
  }, [currentUser, navigate]);
  return children;
}

export default Authorization;
