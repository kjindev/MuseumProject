import React, { useEffect, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsArrowRight,
  BsGeoAlt,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { slideIndexUpdate } from "../store/dataSlice";

export default function Now() {
  const slideIndexState = useSelector((state) => {
    return state.data.slideIndexState;
  });
  const dataNow = useSelector((state) => {
    return state.data.dataNowState;
  });
  const [slideIndex, setSlideIndex] = useState(slideIndexState);
  const [prevButtomVisible, setPrevButtonVisible] = useState(true);
  const [nextButtomVisible, setNextButtonVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(slideIndexUpdate(slideIndex));
    if (slideIndex === 0) {
      setPrevButtonVisible(false);
    } else if (slideIndex === dataNow.length - 1) {
      setNextButtonVisible(false);
    } else {
      setPrevButtonVisible(true);
      setNextButtonVisible(true);
    }
  }, [slideIndex]);

  return (
    <div className="flex flex-col justify-between pb-12 w-[100%] h-[100vh] pt-[10vh]">
      {dataNow === [] ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="text-center text-2xl md:text-3xl">현재 전시</div>
          <div className="mt-2 text-center">
            | 클릭하여 자세한 내용을 확인해보세요
          </div>
          <div className="mt-7 w-[600%] flex">
            {dataNow.map((item, index) => (
              <Link
                to={`NowDetail/${index}`}
                key={index}
                className="w-[100%] flex flex-col lg:flex-row items-center justify-center drop-shadow-lg"
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                  transitionDuration: "1s",
                }}
              >
                <img
                  src={item.DP_MAIN_IMG}
                  loading="lazy"
                  className="w-[100%] h-[30vh] md:w-[80%] md:h-[30vh] lg:w-[420px] lg:h-[60vh] xl:w-[520px] object-cover"
                />
                <div className="hover:bg-gray-100 w-[100%] md:w-[80%] lg:w-[420px] lg:h-[60vh] xl:w-[520px] p-3 bg-gray-50">
                  <div className="title-font font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl">
                    {item.DP_NAME}
                  </div>
                  <div className="mt-1 md:mt-2 flex items-center text-sm md:text-base text-justify">
                    <BsGeoAlt />
                    <div>{item.DP_PLACE}</div>
                  </div>
                  <div className="md:hidden mt-2 md:mt-5 text-xs text-justify sm:text-sm">
                    {`${item.DP_INFO.substr(0, 350)} ...`}
                  </div>
                  <div className="mt-2 maxmd:hidden md:mt-5 text-xs text-justify sm:text-sm">
                    {`${item.DP_INFO.substr(0, 450)} ...`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between md:justify-center items-center z-[1] text-xs md:text-sm">
        <BsChevronLeft
          size={18}
          className={
            prevButtomVisible ? "hover:cursor-pointer ml-10" : "invisible ml-10"
          }
          onClick={() => setSlideIndex(parseInt(slideIndex - 1))}
        />
        {dataNow && (
          <div className="px-[10vw]">{`${slideIndex + 1} / ${
            dataNow.length
          }`}</div>
        )}
        <BsChevronRight
          size={18}
          className={
            nextButtomVisible ? "hover:cursor-pointer mr-10" : "invisible mr-10"
          }
          onClick={() => setSlideIndex(parseInt(slideIndex + 1))}
        />
      </div>
    </div>
  );
}
