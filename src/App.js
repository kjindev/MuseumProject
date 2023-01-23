import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import UserPage from "./UserPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "./authSlice";
import { afterLogIn } from "./userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(logIn());
        dispatch(
          afterLogIn({
            userID: user.uid,
            userEmail: user.email,
            userName: user.email,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/UserPage" element={<UserPage />} />
    </Routes>
  );
}

export default App;
