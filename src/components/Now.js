import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { BsChevronLeft, BsChevronRight, BsGeoAlt } from "react-icons/bs";

export default function Now() {
  const queryClient = useQueryClient();
  const { status } = queryClient.getQueryState("museum");
  const [dataNow, setDataNow] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const [slideIndex, setSlideIndex] = useState(0);
  const [prevButtomVisible, setPrevButtonVisible] = useState(true);
  const [nextButtomVisible, setNextButtonVisible] = useState(true);

  useEffect(() => {
    if (slideIndex === 0) {
      setPrevButtonVisible(false);
    } else if (slideIndex === 6) {
      setNextButtonVisible(false);
    } else {
      setPrevButtonVisible(true);
      setNextButtonVisible(true);
    }
  }, [slideIndex]);

  useEffect(() => {
    if (status === "success" && dataNow.length === 0) {
      const museumData =
        queryClient.getQueryData("museum").ListExhibitionOfSeoulMOAInfo.row;
      for (let i = 0; i < museumData.length; i++) {
        if (museumData[i].DP_END >= `${year}-${month}-${day}`) {
          dataNow.push(museumData[i]);
        }
      }
    }
  }, [status]);

  return (
    <div className="w-[100%] h-[100vh] pt-[10vh] flex flex-col justify-center">
      <div className="h-[10vh] ml-[10%] text-4xl">| 현재전시</div>
      {status !== "success" ? (
        <div className="w-[100%]">Loading...</div>
      ) : (
        <div className="h-[60vh]">
          <div className="flex w-[700%] h-[100%]">
            {dataNow.map((item, index) => (
              <div
                key={index}
                className="w-[100%] h-[100%] flex flex-col md:flex-row items-center justify-center"
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                  transitionDuration: "1s",
                }}
              >
                <img
                  src={item.DP_MAIN_IMG}
                  className="w-[80%] h-[50%] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] drop-shadow-lg object-cover"
                />
                <div className="w-[100%] md:w-[40%]">
                  <div className="font-bold text-center mt-5 text-lg">
                    {item.DP_NAME}
                  </div>
                  <div className="flex justify-center items-center mt-5">
                    <BsGeoAlt />
                    <div className="ml-1 text-sm text-center sm:text-base md:text-xl">
                      {item.DP_PLACE}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="h-[20vh] flex justify-between md:justify-center items-center z-[1]">
        <BsChevronLeft
          size={18}
          className={
            prevButtomVisible ? "hover:cursor-pointer ml-10" : "invisible ml-10"
          }
          onClick={() => setSlideIndex(parseInt(slideIndex - 1))}
        />
        <div className="px-[10vw] text-sm">{slideIndex + 1}</div>
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
