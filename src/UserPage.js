import React from "react";
import { useSelector } from "react-redux";

export default function UserPage() {
  const userInfo = useSelector((state) => {
    return state.userInformation;
  });
  console.log(userInfo);
  return (
    <div className="w-[100%] flex flex-col items-center justify-center">
      <div className="mt-[10vh] mb-3 mx-[2vh] w-[96%] h-[30vh] bg-gray-100">
        user
      </div>
      <div className="w-[100%] flex justify-center">
        <div className="bg-gray-100">저장한 전시</div>
        <div className="bg-gray-100">자주가는 미술관</div>
      </div>
    </div>
  );
}
