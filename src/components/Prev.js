import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Prev() {
  const queryClient = useQueryClient();
  const { status } = queryClient.getQueryState("museum");
  //let dataPrev = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  /*
  if (status === "success" && dataPrev.length === 0) {
    const museumData =
      queryClient.getQueryData("museum").ListExhibitionOfSeoulMOAInfo.row;
    for (let i = 0; i < museumData.length; i++) {
      if (museumData[i].DP_END < `${year}-${month}-${day}`) {
        dataPrev.push(museumData[i]);
      }
    }
  }
*/
  const dataPrev = useSelector((state) => {
    return state.data.dataPrevState;
  });
  const [num, setNum] = useState(0);
  const color = ["red", "yellow", "green", "blue", "black"];
  const textSize = [2, 3, 4, 5];

  const randomName = () => {
    nameRef.current.children[num].classList.add(
      `text-${textSize[Math.floor(Math.random() * textSize.length)]}xl`
    );
    setNum(num + 1);
    return dataPrev[num];
  };

  const nameRef = useRef();

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div ref={nameRef}>
        {dataPrev && (
          <div>
            {dataPrev.map((item, index) => {
              <div key={index}>{item.DP_NAME}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
