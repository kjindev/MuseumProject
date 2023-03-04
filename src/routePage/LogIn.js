import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsChevronLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../fbase";
import { useSelector } from "react-redux";

export default function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccount] = useState(false);
  const isLoggedIn = useSelector((state) => {
    return state.auth.logInState;
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigator("/");
    }
  }, [isLoggedIn]);

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      if (newAccount) {
        alert("이미 가입된 정보입니다.");
      } else {
        alert("가입되지 않은 정보입니다.");
      }
    }
  };

  const handleGoogleLogIn = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
      }
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black w-[100%]">
      <div className="p-5 fixed">
        <Link to="/">
          <BsChevronLeft color="white" />
        </Link>
      </div>
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <div className="h-[10%] text-xl text-white">
          {newAccount ? "회원가입" : "로그인"}
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-9 rounded-2xl w-[320px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center text-sm w-[100%]"
          >
            <input
              name="email"
              type="text"
              placeholder="이메일"
              required
              value={email || ""}
              onChange={handleChange}
              className="p-2 px-3 my-2 border w-[100%] border-white border-b-gray-500"
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              value={password || ""}
              onChange={handleChange}
              className="p-2 px-3 my-2 border w-[100%] border-white border-b-gray-500
            "
            />
            <input
              type="submit"
              value={newAccount ? "회원가입" : "로그인"}
              className="bg-yellow-500 w-[100%] rounded-full p-2 hover:cursor-pointer text-sm m-2 mt-5"
            />
          </form>
          <button
            onClick={handleGoogleLogIn}
            name="google"
            className="bg-gray-200 w-[100%] rounded-full p-2 hover:cursor-pointer text-sm flex items-center justify-center"
          >
            <FcGoogle size={15} className="mr-1" />
            {newAccount ? "구글 계정으로 회원가입" : "구글 계정으로 로그인"}
          </button>
          <span
            onClick={() => setNewAccount((prev) => !prev)}
            className="text-xs underline underline-offset-2 m-2 mt-5 hover:cursor-pointer"
          >
            {newAccount ? "이미 계정이 있으신가요?" : "아직 회원이 아니신가요?"}
          </span>
        </div>
      </div>
    </div>
  );
}
