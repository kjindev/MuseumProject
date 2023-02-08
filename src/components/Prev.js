import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Prev() {
  const banner = useSelector((state) => {
    return state.data.bannerImageState;
  });

  return (
    <div className="pt-[7vh] h-[100vh] flex flex-col justify-center items-center">
      <div className="text-2xl md:text-3xl">지난 전시</div>
      <div className="mt-2 mb-5 text-sm md:text-base">
        | 서울시립미술관의 지난 전시를 확인해보세요
      </div>
      <div className="h-[50%]">
        {banner && (
          <div className="flex w-[1500%] md:w-[400%] h-[100%] image-box">
            {banner.map((item, index) => (
              <div key={index} className="w-[100%] md:w-[50%]">
                <img
                  loading="lazy"
                  src={item.DP_MAIN_IMG}
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to="/PrevDetail">
        <div className="text-sm mt-5 p-3 px-5 border border-black hover:bg-yellow-600 hover:border-yellow-600 hover:text-white">
          자세히 알아보기
        </div>
      </Link>
    </div>
  );
}
