import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLink } from "react-icons/ai";
import { userNameUpdate, userPhotoUpdate } from "./store/userSlice";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./fbase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function UserPage() {
  const userInfo = useSelector((state) => {
    return state.userInformation;
  });

  const dispatch = useDispatch();
  const editRef = useRef();
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
    console.log(name);
    if (name === "My 전시") {
      artRef.current.classList.remove("hidden");
      museumRef.current.classList.add("hidden");
    } else if (name === "My 미술관") {
      museumRef.current.classList.remove("hidden");
      artRef.current.classList.add("hidden");
    }
  };

  return (
    <div>
      <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row justify-center items-center w-[80%] h-[70vh]">
          <div className="w-[25%] h-[100%] flex flex-col justify-center sm:justify-start items-center">
            <img
              src={userInfo.userPhoto}
              className="w-[300px] h-[300px] object-cover rounded-[50%]"
            />
            {!nameEditing && (
              <div className="text-xl mt-5">
                {userInfo.userName === null
                  ? userInfo.userEmail
                  : userInfo.userName}
              </div>
            )}
            {nameEditing && (
              <form
                onSubmit={handleUserNameSubmit}
                className="mt-5 ml-5 flex justify-center items-center"
              >
                <input
                  onChange={handleUserNameUpdate}
                  type="text"
                  value={userNameChanged || ""}
                  placeholder={userInfo.userName}
                  className="w-[70%] text-center border border-white border-b-gray-500"
                />
                <input
                  type="submit"
                  value="확인"
                  className="hover:cursor-pointer text-sm"
                />
              </form>
            )}
            <div className="text-base text-gray-500">{userInfo.userEmail}</div>
            <div
              className="mt-5 w-[100%] flex flex-col items-center justify-center rounded-lg"
              onMouseOver={() => tooltipRef.current.classList.remove("hidden")}
              onMouseOut={() => tooltipRef.current.classList.add("hidden")}
            >
              <div className="hover:cursor-pointer bg-gray-200 w-[70%] text-center">
                프로필 수정
              </div>
              <div
                ref={tooltipRef}
                className="z-[2] text-center w-[70%] bg-gray-200 hidden"
              >
                <form>
                  <label
                    htmlFor="input-file"
                    className="mt-1 hover:cursor-pointer hover:text-yellow-600"
                  >
                    사진 업로드
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
                <div
                  onClick={() => setNameEditing(true)}
                  className="mt-1 hover:cursor-pointer hover:text-yellow-600"
                >
                  닉네임 변경
                </div>
              </div>
            </div>
          </div>
          <div className="pl-10 w-[100%] md:w-[75%] md:h-[100%]">
            <div
              onClick={handleMenu}
              className="flex justify-center items-center mb-7"
            >
              <div className="mx-7 hover:cursor-pointer">My 전시</div>
              <div className="mx-7 hover:cursor-pointer">My 미술관</div>
            </div>
            <div
              ref={artRef}
              className="pl-10 w-[100%] h-[100%] overflow-x-hidden overflow-y-scroll"
            >
              {artList === [] ? (
                <div>Loading...</div>
              ) : (
                artList.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-[100%] h-[50%] p-2 bg-white m-2 drop-shadow-lg rounded-lg"
                  >
                    <img src={item.img} className="object-cover rounded-lg" />
                    <div className="text-sm p-3">
                      <div className="font-bold text-lg">{item.name}</div>
                      <div className="text-justify">
                        아티스트 | {item.artist}
                      </div>
                      <div className="flex text-justify">
                        상세정보 |
                        <a
                          href={item.link}
                          target="_blank"
                          className="flex items-center italic text-gray-700 hover:text-yellow-600"
                        >
                          <AiOutlineLink className="ml-1" />
                          <div>홈페이지 링크</div>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              ref={museumRef}
              className="hidden pl-10 w-[100%] h-[100%] overflow-x-hidden overflow-y-scroll"
            >
              {museumList === [] ? (
                <div>Loading...</div>
              ) : (
                museumList.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-[100%] h-[50%] p-2 bg-white m-2 drop-shadow-lg rounded-lg"
                  >
                    <img
                      src={item.img}
                      className="w-[50%] h-[100%] object-cover rounded-lg"
                    />
                    <div className="text-sm p-3 text-justify">
                      <div className="font-bold text-lg">{item.name}</div>
                      <div className="mt-1">주소 | {item.address}</div>
                      <div className="flex mt-1">
                        상세정보 |
                        <a
                          href={item.link}
                          target="_blank"
                          className="flex items-center italic text-gray-700 hover:cursor-pointer hover:text-yellow-600"
                        >
                          <AiOutlineLink className="ml-1" />
                          <div>홈페이지 링크</div>
                        </a>
                      </div>
                      <div className="mt-1">대표번호 | {item.phone}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
