import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BiSearch, BiX } from "react-icons/bi";

export default function PrevDetail() {
  const dataPrev = useSelector((state) => {
    return state.data.dataPrevState;
  });
  const [searchText, setSearchText] = useState("");
  const dataRef = useRef([]);
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);
  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < dataPrev.length; i++) {
      dataRef.current.children[i].classList.remove("hidden");
      if (
        dataRef.current.children[i].innerText.includes(searchText) === false &&
        dataRef.current.children[i].children[2].innerText.includes(
          searchText
        ) === false
      ) {
        dataRef.current.children[i].classList.add("hidden");
      } else if (searchText === "") {
        dataRef.current.children[i].classList.remove("hidden");
      }
    }
  };
  return (
    <div className="w-[100%]">
      <div className="px-[10%] pt-[10vh]">
        <div className="text-3xl lg:text-5xl">| 지난 전시</div>
        <div className="flex justify-between items-center">
          <div className="text-sm lg:text-lg">
            서울시립미술관 지난 전시를 확인해보세요
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-end items-center drop-shadow-lg rounded-full px-3 py-2 bg-gray-100"
          >
            <input
              value={searchText || ""}
              onChange={handleTextChange}
              placeholder="제목, 이름으로 검색"
              className="w-[20vw] text-sm p-1 mr-2 rounded-lg bg-gray-100"
            />
            <BiSearch size={20} className="hover:cursor-pointer" />
          </form>
        </div>
      </div>
      <div ref={dataRef} className="px-[10%] mt-5 flex flex-wrap">
        {dataPrev &&
          dataPrev.map((item, index) => (
            <div
              key={index}
              data-name={item.DP_NAME}
              data-artist={item.DP_ARTIST}
              data-img={item.DP_MAIN_IMG}
              data-place={item.DP_PLACE}
              data-start={item.DP_START}
              data-end={item.DP_END}
              data-artpart={item.DP_ART_PART}
              data-artcnt={item.DP_ART_CNT}
              data-info={item.DP_INFO}
              data-link={item.DP_LNK}
              className="w-[43%] text-xs m-2 lg:w-[23%] lg:h-[100%] flex flex-col hover:cursor-pointer hover:scale-105 duration-100 drop-shadow-lg"
            >
              <img
                src={item.DP_MAIN_IMG}
                className="w-[100%] h-[20vh] object-cover"
              />
              <div className="m-2 mt-3">{item.DP_NAME}</div>
              <div className="hidden">{item.DP_ARTIST}</div>
              <div className="hidden">{item.DP_START}</div>
              <div className="hidden">{item.DP_END}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
