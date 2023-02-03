import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import UserPage from "./UserPage";
import NowDetail from "./NowDetail";
import PrevDetail from "./PrevDetail";
import Map from "./Map";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./store/authSlice";
import {
  userIDUpdate,
  userEmailUpdate,
  userNameUpdate,
  userPhotoUpdate,
} from "./store/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useQuery } from "react-query";
import { dataNowUpdate, dataPrevUpdate } from "./store/dataSlice";
import { windowStateUpdate } from "./store/windowSlice";
import NavBar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const { pathname } = useLocation();
  const [dataNow, setDataNow] = useState([]);
  const [dataPrev, setDataPrev] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  useEffect(() => {
    if (typeof window !== undefined) {
      dispatch(windowStateUpdate());
    }
  }, [window]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(logIn());
        dispatch(userIDUpdate(user.uid));
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
        setIsLoggedIn(false);
      }
    });
  }, []);

  const { status, data } = useQuery("museum", async () =>
    (
      await fetch(
        `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/ListExhibitionOfSeoulMOAInfo/1/100/`
      )
    ).json()
  );

  useEffect(() => {
    if (status === "success" && dataNow.length === 0) {
      const museumData = data.ListExhibitionOfSeoulMOAInfo.row;
      const museumDataCopy = museumData.map((item) => item);
      const str = /[<pdir="ltr">ns<br><strong></p>&lt;&gt;]/gi;
      for (let i = 0; i < museumData.length; i++) {
        museumDataCopy[i].DP_INFO = museumDataCopy[i].DP_INFO.replace(str, "");
        if (museumDataCopy[i].DP_END >= `${year}-${month}-${day}`) {
          dataNow.push(museumDataCopy[i]);
        } else if (museumDataCopy[i].DP_END < `${year}-${month}-${day}`) {
          dataPrev.push(museumDataCopy[i]);
        }
      }
      dispatch(dataNowUpdate(dataNow));
      dispatch(dataPrevUpdate(dataPrev));
    }
  }, [status]);

  return (
    <>
      {pathname !== "/LogIn" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/NowDetail/:index" element={<NowDetail />} />
        <Route path="/PrevDetail" element={<PrevDetail />} />
        <Route path="/Map/:index" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
