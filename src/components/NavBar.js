import React, { useRef, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsList, BsX, BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function NavBar({ handleScrollView }) {
  const isLoggedIn = useSelector((state) => {
    return state.auth.logInState;
  });
  const userInfo = useSelector((state) => {
    return state.userInformation;
  });
  const navName = useSelector((state) => {
    return state.data.navNameState;
  });

  const textStyle = "ml-5 py-1 cursor-pointer text-sm maxmd:hidden";
  const textStyleObserve =
    "ml-5 py-1 cursor-pointer text-yellow-600 text-sm maxmd:hidden";
  const menuTextStyle = "ml-5 mb-2 cursor-pointer text-white text-sm";
  const menuTextStyleObserve =
    "ml-5 mb-2 cursor-pointer text-yellow-600 text-sm";

  const menuIconRef = useRef();
  const menuRef = useRef();
  const tooltipRef = useRef();

  const [menuVisible, setMenuVisible] = useState();
  const { pathname } = useLocation();
  const handleLogOut = () => {
    try {
      const auth = getAuth();
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuClick = () => {
    setMenuVisible(true);
    menuRef.current.classList.remove("hidden");
    menuIconRef.current.classList.add("hidden");
  };

  const handleXClick = () => {
    setMenuVisible(false);
    menuIconRef.current.classList.remove("hidden");
    menuRef.current.classList.add("hidden");
  };

  return (
    <div onClick={handleScrollView} className="fixed z-[2] w-[100%] bg-white">
      <div
        ref={menuRef}
        className="menu-moving hidden fixed ml-[20%] w-[80%] h-[100vh] bg-black px-3 py-1 md:hidden"
      >
        <div className="pt-[7vh] flex flex-col">
          <div className="mx-5 mb-7 text-xs text-white border border-white p-5">
            <div className="flex items-center border border-black border-b-white pb-3">
              <img
                src={
                  isLoggedIn
                    ? userInfo.userPhoto
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                className="w-[5vh] h-[5vh] mr-3 rounded-full"
              />
              {isLoggedIn ? (
                <div className="text-white">
                  {userInfo.userName === null ? (
                    <div>{`${userInfo.userEmail} 님`}</div>
                  ) : (
                    <div>{`${userInfo.userName} 님`}</div>
                  )}
                </div>
              ) : (
                <Link to="/LogIn">
                  <div className="flex items-center text-sm">
                    <div>로그인을 해주세요</div>
                    <BsChevronRight className="ml-2" />
                  </div>
                </Link>
              )}
            </div>
            <div className="mt-5">
              {isLoggedIn ? (
                <div className="flex justify-center items-center">
                  <Link to="/userPage">
                    <div className="mx-5">마이페이지</div>
                  </Link>
                  <div
                    onClick={handleLogOut}
                    className="mx-5 hover:cursor-pointer"
                  >
                    로그아웃
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  로그인 후 서비스를 이용해보세요 :)
                </div>
              )}
            </div>
          </div>
          {pathname === "/" ? (
            <>
              <div
                className={
                  navName === "intro" ? menuTextStyleObserve : menuTextStyle
                }
              >
                소개
              </div>
              <div
                className={
                  navName === "now" ? menuTextStyleObserve : menuTextStyle
                }
              >
                현재 전시
              </div>
              <div
                className={
                  navName === "prev" ? menuTextStyleObserve : menuTextStyle
                }
              >
                지난 전시
              </div>
              <div
                className={
                  navName === "location" ? menuTextStyleObserve : menuTextStyle
                }
              >
                방문하기
              </div>
            </>
          ) : (
            <div className="py-1"></div>
          )}
        </div>
      </div>
      <div className="h-[7vh] p-3 mx-2 flex justify-between">
        {pathname === "/" ? (
          <div className="px-2 logo-font">OurMuseum</div>
        ) : (
          <Link to="/">
            <AiOutlineHome size={25} />
          </Link>
        )}
        <div className="flex maxmd:hidden">
          {pathname === "/" ? (
            <>
              <div
                className={navName === "intro" ? textStyleObserve : textStyle}
              >
                소개
              </div>
              <div className={navName === "now" ? textStyleObserve : textStyle}>
                현재 전시
              </div>
              <div
                className={navName === "prev" ? textStyleObserve : textStyle}
              >
                지난 전시
              </div>
              <div
                className={
                  navName === "location" ? textStyleObserve : textStyle
                }
              >
                방문하기
              </div>
            </>
          ) : (
            <div className="px-2 py-1"></div>
          )}
          {!isLoggedIn && (
            <Link to="/LogIn">
              <div className="ml-5 px-3 py-1 cursor-pointer text-sm border border-black w-[100px] text-center hover:bg-yellow-600 hover:border-yellow-600">
                로그인
              </div>
            </Link>
          )}
          {isLoggedIn && (
            <div
              onMouseOver={() => tooltipRef.current.classList.remove("hidden")}
              onMouseOut={() => tooltipRef.current.classList.add("hidden")}
              className={
                pathname === "/userPage"
                  ? "hidden"
                  : "px-3 py-1 cursor-pointer text-sm w-[100px] h-[40px] text-end"
              }
            >
              {userInfo.userName === null ? (
                <div className="font-bold">
                  {userInfo.userEmail.length > 5
                    ? `${userInfo.userEmail.substr(0, 5) + "..."}님`
                    : `${userInfo.userEmail}님`}
                </div>
              ) : (
                <div className="font-bold">
                  {userInfo.userName.length > 5
                    ? `${userInfo.userName.substr(0, 5) + "..."}님`
                    : `${userInfo.userName}님`}
                </div>
              )}
              <div ref={tooltipRef} className="z-[2] bg-white hidden">
                <Link to="/userPage">
                  <div className="mt-1 hover:text-yellow-600">마이페이지</div>
                </Link>
                <div
                  onClick={handleLogOut}
                  className="mt-1 hover:text-yellow-600"
                >
                  로그아웃
                </div>
              </div>
            </div>
          )}
        </div>
        {pathname !== "/userPage" && (
          <div className="z-[2] md:hidden">
            <div ref={menuIconRef}>
              <BsList
                onClick={handleMenuClick}
                size={25}
                className={menuVisible ? "hidden" : "hover:cursor-pointer"}
              />
            </div>
            <div>
              <BsX
                onClick={handleXClick}
                color="white"
                size={25}
                className={!menuVisible ? "hidden" : "hover:cursor-pointer"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
