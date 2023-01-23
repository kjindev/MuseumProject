import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { BsChevronLeft, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { userNameEdit } from "./userSlice";

export default function UserPage() {
  const userInfo = useSelector((state) => {
    return state.userInformation;
  });
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [userNameChanged, setUserNameChanged] = useState();

  console.log(userInfo);
  const handleProfileEdit = () => {
    modalRef.current.classList.remove("hidden");
  };

  const handleuserNameEdit = (event) => {
    setUserNameChanged(event.target.value);
  };

  const handleUserNameSubmit = (event) => {
    event.preventDefault();
    dispatch(
      userNameEdit({
        userName: userNameChanged,
      })
    );
  };

  return (
    <div>
      <div className="p-5 fixed">
        <Link to="/">
          <BsChevronLeft />
        </Link>
      </div>
      <div ref={modalRef} className="hidden fixed w-[100%] h-[100vh]">
        <div className="flex items-center justify-center bg-black w-[100%] h-[100%] z-[1]">
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
                    onChange={handleuserNameEdit}
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
                <div>사진 선택하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
        <div className="w-[70%] h-[20vh] sm:pl-11 bg-gray-200 flex flex-col sm:flex-row justify-center sm:justify-start items-center text-center sm:text-start">
          <div className="w-[7vh] h-[7vh] sm:w-[9vh] sm:h-[9vh] mb-2 sm:mr-3 bg-black rounded-full"></div>
          {userInfo.userEmail === null ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="flex items-center">
                <div className="text-sm mr-1">{userInfo.userName}</div>
                <AiFillEdit
                  onClick={handleProfileEdit}
                  className="hover:cursor-pointer"
                />
              </div>
              <div className="text-xs text-gray-500">{userInfo.userEmail}</div>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center w-[70%] h-[70vh] ">
          <div className="w-[100%] h-[50%] md:w-[50%] md:h-[100%] bg-gray-300 border border-black"></div>
          <div className="w-[100%] h-[50%] md:w-[50%] md:h-[100%] bg-gray-300 border border-black"></div>
        </div>
      </div>
    </div>
  );
}
