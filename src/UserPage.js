import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { BsChevronLeft, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { userNameUpdate, userPhotoUpdate } from "./store/userSlice";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./fbase";

export default function UserPage() {
  const userInfo = useSelector((state) => {
    return state.userInformation;
  });
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [userNameChanged, setUserNameChanged] = useState();
  const fileInputRef = useRef();
  let arts = [];
  let museum = [];
  const [artList, setArtList] = useState([]);
  const [museumList, setMuseumList] = useState([]);
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
  }, []);

  const handleProfileEdit = () => {
    modalRef.current.classList.remove("hidden");
  };

  const handleUserNameUpdate = (event) => {
    setUserNameChanged(event.target.value);
  };

  const handleUserNameSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: userNameChanged,
    });
    dispatch(userNameUpdate(userNameChanged));
  };

  const handleUserPhotoUpdate = async (event) => {
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

  return (
    <div>
      <div ref={modalRef} className="hidden fixed w-[100%] h-[100vh]  z-[1]">
        <div className="flex items-center justify-center bg-black w-[100%] h-[100%]">
          <div className="w-[420px] h-[420px] bg-white flex flex-col">
            <BsX
              onClick={() => modalRef.current.classList.add("hidden")}
              className="z-[1] self-end hover:cursor-pointer"
              size={30}
            />
            <div className="self-center">
              <div className="flex items-center">
                <div>닉네임 수정</div>
                <form onSubmit={handleUserNameSubmit}>
                  <input
                    onChange={handleUserNameUpdate}
                    type="text"
                    value={userNameChanged || ""}
                    placeholder={userInfo.userName}
                    className="text-center border w-[70%] border-white border-b-gray-500
            "
                  />
                  <input
                    type="submit"
                    value="확인"
                    className="bg-yellow-500 rounded-full p-2 hover:cursor-pointer text-sm m-2 mt-5"
                  />
                </form>
              </div>
              <div className="flex">
                <div>프로필 사진 수정</div>
                <form>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleUserPhotoUpdate}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
        <div className="w-[70%] h-[15vh] sm:pl-11 flex flex-col sm:flex-row justify-center sm:justify-start items-center text-center sm:text-start">
          <img
            src={userInfo.userPhoto}
            className="w-[7vh] h-[7vh] sm:w-[9vh] sm:h-[9vh] mb-2 sm:mr-3 rounded-full"
          />
          {userInfo.userEmail === null ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="flex justify-center sm:justify-start items-center">
                <div className="text-sm mr-1">
                  {userInfo.userName === null
                    ? userInfo.userEmail
                    : userInfo.userName}
                </div>
                <AiFillEdit
                  onClick={handleProfileEdit}
                  className="hover:cursor-pointer"
                />
              </div>
              <div className="text-xs text-gray-500">{userInfo.userEmail}</div>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center w-[70%] h-[70vh] ">
          <div className="w-[90%] md:h-[50%] lg:w-[50%] lg:h-[100%] my-2 p-3 bg-gray-50 drop-shadow-md">
            <div>| 보고 싶은 전시</div>
            {artList.map((item, index) => (
              <div key={index}>{item.name}</div>
            ))}
          </div>
          <div className="w-[90%] h-[50%] lg:w-[50%] lg:h-[100%] my-2 p-3 bg-gray-50 drop-shadow-md">
            <div>| 가고 싶은 미술관</div>
            {museumList.map((item, index) => (
              <div key={index}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
