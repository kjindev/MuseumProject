import React from "react";
import { Link } from "react-router-dom";
import { BsEmojiDizzy } from "react-icons/bs";

export default function NotFound() {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center text-xl bg-black text-white">
      <div className="flex items-center">
        <div>페이지를 찾을 수 없습니다</div>
        <BsEmojiDizzy className="ml-2" />
      </div>

      <Link
        to="/"
        className="hover:cursor-pointer hover:bg-yellow-400 mt-10 px-5 py-3 text-base bg-yellow-600 text-black"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
