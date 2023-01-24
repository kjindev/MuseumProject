import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import UserPage from "./UserPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "./authSlice";
import { userEmailUpdate, userNameUpdate, userPhotoUpdate } from "./userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(logIn());
        dispatch(userEmailUpdate(user.email));
        dispatch(userNameUpdate(user.displayName));
        if (user.photoURL === null) {
          dispatch(
            userPhotoUpdate(
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            )
          );
        } else {
          dispatch(userPhotoUpdate(user.photoURL));
        }
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
