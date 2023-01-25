import React from "react";
import { useQueryClient } from "react-query";

export default function Prev() {
  const queryClient = useQueryClient();
  const { status } = queryClient.getQueryState("museum");
  let dataPrev = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  if (status === "success" && dataPrev.length === 0) {
    const museumData =
      queryClient.getQueryData("museum").ListExhibitionOfSeoulMOAInfo.row;
    for (let i = 0; i < museumData.length; i++) {
      if (museumData[i].DP_END < `${year}-${month}-${day}`) {
        dataPrev.push(museumData[i]);
      }
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="text-center text-xl sm:text-3xl md:text-5xl lg:text-7xl">
        지난 전시
      </div>
    </div>
  );
}
