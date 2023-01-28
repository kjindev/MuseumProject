import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  BsChevronLeft,
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./fbase";

export default function NowDetail() {
  const dataNow = useSelector((state) => {
    return state.data.dataNowState;
  });
  const userEmail = useSelector((state) => {
    return state.userInformation.userEmail;
  });
  const { index } = useParams();
  const [bookMark, setBookMark] = useState(false);

  const addDatabase = async () => {
    try {
      setDoc(
        doc(db, "data", userEmail, "arts", dataNow[index].DP_SEQ),
        {
          name: dataNow[index].DP_NAME,
          place: dataNow[index].DP_PLACE,
          artist: dataNow[index].DP_ARTIST,
          date: dataNow[index].DP_END,
          img: dataNow[index].DP_MAIN_IMG,
          link: dataNow[index].DP_LNK,
        },
        { merge: false }
      );
      setBookMark(true);
    } catch (error) {
      console.log(error);
    }
  };

  const test = () => {
    const q = getDocs(collection(db, "data", userEmail, "arts"));
    q.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  const deleteDatabase = () => {
    setBookMark(false);
    try {
      deleteDoc(doc(db, "data", userEmail, "arts", dataNow[index].DP_SEQ));
      setBookMark(false);
      console.log("delete");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100%]">
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
              <button onClick={test}>test</button>
              {userEmail && (
                <div>
                  {bookMark ? (
                    <BsFillBookmarkCheckFill
                      size={22}
                      color="#ca8a04"
                      className="hover:cursor-pointer"
                      onClick={deleteDatabase}
                    />
                  ) : (
                    <BsBookmarkPlus
                      size={22}
                      className="hover:cursor-pointer"
                      onClick={addDatabase}
                    />
                  )}
                </div>
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
