import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LogIn from "./routePage/LogIn";
import UserPage from "./routePage/UserPage";
import NowDetail from "./routePage/NowDetail";
import PrevDetail from "./routePage/PrevDetail";
import Map from "./routePage/Map";
import NotFound from "./404Page/NotFound";
import UserNotFound from "./404Page/UserNotFound";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "./store/authSlice";
import {
  userIDUpdate,
  userEmailUpdate,
  userNameUpdate,
  userPhotoUpdate,
} from "./store/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useQuery } from "react-query";
import {
  dataNowUpdate,
  dataPrevUpdate,
  bannerImageUpdate,
} from "./store/dataSlice";
import { windowStateUpdate } from "./store/windowSlice";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => {
    return state.auth.logInState;
  });
  const dataPrevBanner = [];
  const auth = getAuth();
  const [dataNow, setDataNow] = useState([]);
  const [dataPrev, setDataPrev] = useState([]);
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
      }
    });
  }, []);

  const { status, data } = useQuery("museum", async () =>
    (
      await fetch(
        "https://port-0-museumapi-r8xoo2mletmb3b8.sel3.cloudtype.app/"
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
      for (let i = 0; i < 20; i++) {
        if (i < 10) {
          dataPrevBanner.push(dataPrev[i]);
        } else {
          dataPrevBanner[i] = dataPrev[i - 10];
        }
      }

      dispatch(dataNowUpdate(dataNow));
      dispatch(dataPrevUpdate(dataPrev));
      dispatch(bannerImageUpdate(dataPrevBanner));
    }
  }, [status]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          <Route
            path="/UserPage"
            element={isLoggedIn ? <UserPage /> : <UserNotFound />}
          />
        }
        <Route path="/NowDetail/:index" element={<NowDetail />} />
        <Route path="/PrevDetail" element={<PrevDetail />} />
        <Route path="/Map/:index" element={<Map />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/UserNotFound" element={<UserNotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
