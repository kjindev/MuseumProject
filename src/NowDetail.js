import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  BsChevronLeft,
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./fbase";

export default function NowDetail() {
  const dataNow = useSelector((state) => {
    return state.data.dataNowState;
  });
  const { index } = useParams();

  const [bookMark, setBookMark] = useState(false);

  useEffect(() => {
    if (bookMark) {
      console.log(index);
    }
  }, [bookMark]);

  const addDatabase = () => {
    try {
      addDoc(collection(db, "data"), {
        name: dataNow[index].DP_NAME,
        place: dataNow[index].DP_PLACE,
        link: dataNow[index].DP_LNK,
        img: dataNow[index].DP_MAIN_IMG,
      });
      console.log("ok");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getDatabase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "data"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="w-[100%]">
      <button onClick={getDatabase}>database</button>
      <div className="p-5 fixed">
        <Link to="/">
          <BsChevronLeft />
        </Link>
      </div>
      {dataNow === undefined ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row h-[100vh] justify-center items-center">
          <img
            src={dataNow[index].DP_MAIN_IMG}
            className="w-[40%] h-[500px] mx-2 object-cover drop-shadow-lg"
          />
          <div className="w-[40%] h-[500px] mx-2 p-3 overflow-scroll overflow-x-hidden bg-gray-50 drop-shadow-lg">
            <div className="flex items-center">
              <div className="title-font font-bold text-2xl mr-2">
                {dataNow[index].DP_NAME}
              </div>
              {bookMark ? (
                <BsFillBookmarkCheckFill
                  size={22}
                  color="#ca8a04"
                  className="hover:cursor-pointer"

                  // onClick={() => setBookMark(false)}
                />
              ) : (
                <BsBookmarkPlus
                  size={22}
                  className="hover:cursor-pointer"
                  onClick={addDatabase}
                  // onClick={() => setBookMark(true)}
                />
              )}
            </div>
            <div className="text-sm">
              <div>| {dataNow[index].DP_ARTIST}</div>
              <div>| {dataNow[index].DP_PLACE}</div>
              <div>| {dataNow[index].DP_END} 까지</div>
              <div className="text-justify mt-3">
                {dataNow[index].DP_INFO}
                <a
                  href={dataNow[index].DP_LNK}
                  target="_blank"
                  className="italic text-gray-500 hover:text-yellow-600"
                >
                  {" "}
                  홈페이지 바로가기
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
