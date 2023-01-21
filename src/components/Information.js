import React from "react";
import { AiOutlineMail, AiFillGithub, AiFillFolder } from "react-icons/ai";

export default function Information() {
  const handleCopy = (event) => {
    window.navigator.clipboard.writeText(event.target.innerText);
    event.target.innerText = "이메일 주소 복사됨";

    const textChange = () => {
      event.target.innerText = " pkjin.eng@gmail.com";
    };

    setTimeout(textChange, 800);
  };
  return (
    <div className="h-[30vh] bg-black text-white text-sm flex-col flex md:flex-row justify-center items-center hover:cursor-pointer">
      <div className="flex flex-row md:flex-col justify-center items-center w-[100%] md:w-[20%]">
        <AiOutlineMail size={22} className="m-3" />
        <div
          onClick={handleCopy}
          className="hover:cursor-pointer hover:text-gray-500"
        >
          pkjin.eng@gmail.com
        </div>
      </div>
      <div className="flex flex-row md:flex-col justify-center items-center w-[100%] md:w-[20%]">
        <AiFillGithub size={22} className="m-3" />
        <a
          className="hover:cursor-pointer hover:text-gray-500"
          href="https://github.com/kjindev"
          target="_blank"
        >
          github.com/kjindev
        </a>
      </div>
      <div className="flex flex-row md:flex-col justify-center items-center w-[100%] md:w-[20%]">
        <AiFillFolder size={22} className="m-3" />
        <a
          className="hover:cursor-pointer hover:text-gray-500"
          href="https://inthedev.tistory.com"
          target="_blank"
        >
          inthedev.tistory.com
        </a>
      </div>
    </div>
  );
}
