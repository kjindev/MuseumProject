import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userNameUpdate, userPhotoUpdate } from "../store/userSlice";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../fbase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import NavBar from "../mainPage/NavBar";
import { BsDashCircle } from "react-icons/bs";

export default function UserPage() {
  const userInfo = useSelector((state) => {
    return state.userInformation;
  });

  const dispatch = useDispatch();
  const [userNameChanged, setUserNameChanged] = useState();
  const fileInputRef = useRef();
  let arts = [];
  let museum = [];
  const [artList, setArtList] = useState([]);
  const [museumList, setMuseumList] = useState([]);

  const artRef = useRef();
  const museumRef = useRef();
  const tooltipRef = useRef();

  const [nameEditing, setNameEditing] = useState(false);

  useEffect(() => {
    if (userInfo.userEmail) {
      const artQuery = query(
        collection(db, "data", userInfo.userEmail, "arts")
      );
      onSnapshot(artQuery, (querySnapshot) => {
        arts = [];
        querySnapshot.forEach((doc) => {
          arts.push(doc.data());
        });
        setArtList(arts);
      });
      const museumQuery = query(
        collection(db, "data", userInfo.userEmail, "museum")
      );
      onSnapshot(museumQuery, (querySnapshot) => {
        museum = [];
        querySnapshot.forEach((doc) => {
          museum.push(doc.data());
        });
        setMuseumList(museum);
      });
    }
  }, [userInfo.userEmail]);

  const handleUserNameUpdate = (event) => {
    setUserNameChanged(event.target.value);
  };

  const handleUserNameSubmit = (event) => {
    event.preventDefault();
    setNameEditing(false);
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: userNameChanged,
    });
    dispatch(userNameUpdate(userNameChanged));
  };

  const handleUserPhotoUpdate = async (event) => {
    event.preventDefault();
    let image = fileInputRef.current.files[0];
    const auth = getAuth();
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${image.name}`);
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytes(storageRef, image, metadata);
    await getDownloadURL(storageRef).then((url) => {
      updateProfile(auth.currentUser, {
        photoURL: url,
      });
      dispatch(userPhotoUpdate(url));
    });
  };

  const handleMenu = (event) => {
    const name = event.target.innerText;
    if (name === "My 전시") {
      artRef.current.classList.remove("hidden");
      artRef.current.classList.add("flex");
      museumRef.current.classList.add("hidden");
      museumRef.current.classList.remove("flex");
    } else if (name === "My 미술관") {
      museumRef.current.classList.remove("hidden");
      museumRef.current.classList.add("flex");
      artRef.current.classList.add("hidden");
      artRef.current.classList.remove("flex");
    }
  };

  const artDeleteDatabase = (event) => {
    try {
      deleteDoc(
        doc(
          db,
          "data",
          userInfo.userEmail,
          "arts",
          event.target.parentElement.dataset.id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const museumDeleteDatabase = (event) => {
    try {
      deleteDoc(
        doc(
          db,
          "data",
          userInfo.userEmail,
          "museum",
          event.target.parentElement.dataset.name
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="pb-5 md:p-0">
        <div className="w-[100%] pt-[12vh] md:h-[100vh] flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-center items-center w-[100%] md:w-[80%] md:h-[70vh]">
            <div className="w-[100%] md:w-[25%] h-[100%] flex flex-col justify-center sm:justify-start items-center">
              <img
                src={userInfo.userPhoto}
                loading="lazy"
                className="w-[10vh] h-[10vh] sm:w-[12vh] sm:h-[12vh] md:w-[20vh] md:h-[20vh] object-cover rounded-[50%]"
              />
              {!nameEditing && (
                <div className="sm:text-base md:text-xl mt-3 md:mt-5">
                  {userInfo.userName === null
                    ? userInfo.userEmail
                    : userInfo.userName}
                </div>
              )}
              {nameEditing && (
                <form
                  onSubmit={handleUserNameSubmit}
                  className="mt-3 md:mt-5 md:ml-5 flex justify-center items-center"
                >
                  <input
                    onChange={handleUserNameUpdate}
                    type="text"
                    maxLength="10"
                    value={userNameChanged || ""}
                    placeholder={userInfo.userName}
                    className="w-[100%] md:w-[70%] text-center border border-white border-b-gray-500"
                  />
                  <input
                    type="submit"
                    value="확인"
                    className="hover:cursor-pointer text-sm"
                  />
                </form>
              )}
              <div className="text-sm md:text-base text-gray-500">
                {userInfo.userEmail}
              </div>
              <div
                className="my-3 md:mt-5 w-[100%] flex flex-col items-center justify-center rounded-lg"
                onMouseOver={() =>
                  tooltipRef.current.classList.remove("hidden")
                }
                onMouseOut={() => tooltipRef.current.classList.add("hidden")}
              >
                <div className="hover:cursor-pointer text-yellow-600 w-[100%] text-sm text-center">
                  프로필 수정
                </div>
                <div
                  ref={tooltipRef}
                  className="z-[2] text-center w-[70%] hidden"
                >
                  <div
                    onClick={() => setNameEditing(true)}
                    className="mt-2 hover:cursor-pointer hover:text-yellow-600 text-sm"
                  >
                    이름 변경
                  </div>
                  <form className="mt-1">
                    <label
                      htmlFor="input-file"
                      className="hover:cursor-pointer hover:text-yellow-600 text-sm"
                    >
                      사진 변경
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleUserPhotoUpdate}
                      id="input-file"
                      className="hidden"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="md:pl-10 w-[100%] md:w-[80%] md:h-[100%]">
              <div
                onClick={handleMenu}
                className="flex justify-center items-center mb-2 md:mb-7"
              >
                <div className="mx-7 hover:cursor-pointer">My 전시</div>
                <div className="mx-7 hover:cursor-pointer">My 미술관</div>
              </div>
              <div
                ref={artRef}
                className="p-0 md:pl-10 flex flex-wrap content-start w-[100%] md:h-[100%] md:overflow-x-hidden"
              >
                {artList === [] ? (
                  <div>Loading...</div>
                ) : (
                  artList.map((item, index) => (
                    <div
                      data-id={item.id}
                      key={item.id}
                      className="flex m-2 p-2 w-[100%] h-[20vh] md:h-[30%] bg-white rounded-lg drop-shadow-lg"
                    >
                      <img
                        src={item.img}
                        className="w-[30%] h-[100%] object-cover rounded-lg"
                      />
                      <div className="w-[70%] p-2 overflow-hidden">
                        <div className="text-sm md:text-base font-bold">
                          {item.name}
                        </div>
                        <div className="text-sm">| {item.artist}</div>
                      </div>
                      <BsDashCircle
                        className="hover:cursor-pointer"
                        size={15}
                        onClick={artDeleteDatabase}
                      />
                    </div>
                  ))
                )}
              </div>
              <div
                ref={museumRef}
                className="hidden flex-wrap content-start w-[100%] h-[100%] overflow-x-hidden"
              >
                {museumList === [] ? (
                  <div>Loading...</div>
                ) : (
                  museumList.map((item) => (
                    <div
                      data-name={item.name}
                      key={item.id}
                      className="flex m-2 p-2 w-[100%] h-[20vh] md:h-[30%] bg-white rounded-lg drop-shadow-lg"
                    >
                      <img
                        src={item.img}
                        className="w-[30%] h-[100%] object-cover rounded-lg"
                      />
                      <div className="w-[70%] p-2 overflow-hidden">
                        <div className="text-sm md:text-base font-bold">
                          {item.name}
                        </div>
                        <div className="text-sm">| {item.address}</div>
                      </div>
                      <BsDashCircle
                        className="hover:cursor-pointer"
                        size={15}
                        onClick={museumDeleteDatabase}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
