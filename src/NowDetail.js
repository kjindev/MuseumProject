import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import {
  setDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./fbase";
import NavBar from "./components/NavBar";

export default function NowDetail() {
  const dataNow = useSelector((state) => {
    return state.data.dataNowState;
  });
  const userEmail = useSelector((state) => {
    return state.userInformation.userEmail;
  });

  const { index } = useParams();
  const [bookMark, setBookMark] = useState();

  const addDatabase = async () => {
    try {
      setDoc(doc(db, "data", userEmail, "arts", dataNow[index].DP_SEQ), {
        name: dataNow[index].DP_NAME,
        artist: dataNow[index].DP_ARTIST,
        img: dataNow[index].DP_MAIN_IMG,
        id: dataNow[index].DP_SEQ,
      });
      setBookMark(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDatabase = async () => {
      if (userEmail) {
        const q = query(
          collection(db, "data", userEmail, "arts"),
          where("name", "==", dataNow[index].DP_NAME)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(() => {
          setBookMark(true);
        });
      }
    };
    getDatabase();
  }, [bookMark]);

  const deleteDatabase = () => {
    try {
      deleteDoc(doc(db, "data", userEmail, "arts", dataNow[index].DP_SEQ));
      setBookMark(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-[100%]">
        {dataNow === undefined ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col md:pt-0 md:flex-row h-[100vh] justify-center items-center  drop-shadow-lg">
            <img
              src={dataNow[index].DP_MAIN_IMG}
              loading="lazy"
              className="w-[100%] md:w-[42%] h-[40vh] md:h-[500px] object-cover"
            />
            <div className="w-[100%] md:w-[42%] h-[500px] p-3 overflow-scroll overflow-x-hidden bg-gray-50">
              <div className="flex items-center">
                <div className="title-font font-bold text-xl md:text-2xl mr-2">
                  {dataNow[index].DP_NAME}
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div>| {dataNow[index].DP_ARTIST}</div>
                    <div>| {dataNow[index].DP_PLACE}</div>
                    <div>| {dataNow[index].DP_END} 까지</div>
                  </div>
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
    </>
  );
}
