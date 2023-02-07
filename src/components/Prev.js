import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Prev() {
  return (
    <div className="pt-[7vh] w-[100%] h-[100vh] flex flex-col justify-center items-center">
      <div className="text-2xl md:text-3xl">지난 전시</div>
      <div className="mt-2 text-sm md:text-base">
        | 서울시립미술관의 지난 전시를 확인해보세요
      </div>
    </div>
  );
}
