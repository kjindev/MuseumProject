import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight, BsArrowRight } from "react-icons/bs";
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
    } else if (slideIndex === 6) {
      setNextButtonVisible(false);
    } else {
      setPrevButtonVisible(true);
      setNextButtonVisible(true);
    }
  }, [slideIndex]);

  return (
    <div className="w-[100%] h-[100vh] pt-[7vh] sm:pt-[10vh] flex flex-col justify-center">
      {dataNow !== undefined ? (
        <div className="h-[80vh]">
          <div className="text-center text-4xl">현재전시</div>
          <div className="flex w-[700%] h-[100%]">
            {dataNow.map((item, index) => (
              <div
                key={index}
                className="w-[100%] h-[100%] flex flex-col lg:flex-row justify-center items-center"
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                  transitionDuration: "1s",
                }}
              >
                <img
                  src={item.DP_MAIN_IMG}
                  className="mt-7 px-2 md:p-0 w-[100%] h-[30vh] lg:mt-0 md:w-[80%] md:h-[40%] lg:w-[420px] lg:h-[60vh] drop-shadow-lg object-cover"
                />

                <div className="md:w-[80%] lg:w-[420px] lg:h-[60vh] mx-2 p-3 flex flex-col items-center drop-shadow-lg bg-gray-50">
                  <div className="flex flex-col h-[100%]">
                    <div className="title-font font-bold mb-3 text-lg sm:text-xl md:text-2xl">
                      {item.DP_NAME}
                    </div>
                    <div className="text-xs text-justify sm:text-sm">
                      {`${item.DP_INFO.substr(0, 550)} ...`}
                    </div>
                  </div>
                  <Link to={`NowDetail/${index}`}>
                    <div className="py-5 flex items-center justify-self-end hover:text-yellow-600 hover:cursor-pointer">
                      <div className="mr-2 text-xs sm:text-sm md:text-base">
                        자세히 보기
                      </div>
                      <BsArrowRight />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="h-[20vh] flex justify-between md:justify-center items-center z-[1]">
        <BsChevronLeft
          size={18}
          className={
            prevButtomVisible ? "hover:cursor-pointer ml-10" : "invisible ml-10"
          }
          onClick={() => setSlideIndex(parseInt(slideIndex - 1))}
        />
        {dataNow && (
          <div className="px-[10vw] text-sm">{`${slideIndex + 1} / ${
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
