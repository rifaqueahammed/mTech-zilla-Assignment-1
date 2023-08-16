import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../components/firebase/configue";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser("");
      }
    });
    return unsbscribe;
  }, []);

  return currentUser;
};

export default useAuth;
