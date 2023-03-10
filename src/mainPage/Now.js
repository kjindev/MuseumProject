import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight, BsGeoAlt } from "react-icons/bs";
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
    <div className="pt-[10vh] pb-10 flex flex-col justify-center items-center w-[100%] md:h-[100vh]">
      {dataNow.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="text-center text-2xl md:text-3xl">현재 전시</div>
          <div className="mt-0 md:mt-2 text-center text-sm md:text-base">
            | 클릭하여 자세한 내용을 확인해보세요
          </div>
          <div className={`mt-1 lg:mt-7 flex w-[${dataNow.length}00%]`}>
            {dataNow.map((item, index) => (
              <div
                key={index}
                className="w-[100%] flex flex-col lg:flex-row items-center justify-center drop-shadow-lg"
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                  transitionDuration: "1.1s",
                }}
              >
                <img
                  src={item.DP_MAIN_IMG}
                  loading="lazy"
                  className="w-[70%] h-[30vh] md:w-[80%] md:h-[30vh] lg:w-[420px] lg:h-[60vh] xl:w-[510px] object-cover"
                />
                <div className="w-[70%] md:w-[80%] lg:w-[420px] lg:h-[60vh] xl:w-[510px] p-3 bg-gray-50">
                  <div>
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
                  <div className="flex items-center justify-center mt-2 py-2 w-[100%] text-center text-xs sm:text-sm hover:cursor-pointer hover:text-yellow-600">
                    <Link to={`NowDetail/${index}`}>자세히 알아보기</Link>
                    <BsChevronRight className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="pt-5 flex justify-between md:justify-center items-center z-[1] text-xs md:text-sm">
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
