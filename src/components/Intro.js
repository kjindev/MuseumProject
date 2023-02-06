import React from "react";
import { BsChatRightQuoteFill } from "react-icons/bs";

export default function Intro() {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <div className="flex flex-col sm:flex-row items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <span>서울시립미술관</span>
        <span className="text-stroke text-white sm:ml-2">전시안내</span>
      </div>
      <BsChatRightQuoteFill size={25} className="mt-12" />
      <div className="text-xs sm:text-sm px-[10%] sm:px-[20%] md:px-[25%] mt-5 italic text-justify">
        서울시립미술관은 사용자, 매개자, 생산자 모두가 함께하는 공동의 기억을
        짓고, 뜻깊은 사회문화적 가치를 일구는 미래를 상상합니다. 서울 전역에
        펼쳐진 각 분관들이 시대와 미술의 변화에 조응해 교차하고, 서로를 채우고,
        매일 성장하는 ‘서울형 네트워크 미술관’입니다. 시대와 미술의 변화에
        부응하고, 서로를 채우며 성장해 갑니다.
      </div>
    </div>
  );
}
