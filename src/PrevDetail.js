import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BiSearch, BiX, BiXCircle } from "react-icons/bi";
import {
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
  BsEmojiDizzy,
} from "react-icons/bs";
import {
  setDoc,
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./fbase";
import { useQueryClient } from "react-query";
import NavBar from "./components/NavBar";

export default function PrevDetail() {
  const dataPrev = useSelector((state) => {
    return state.data.dataPrevState;
  });
  const userEmail = useSelector((state) => {
    return state.userInformation.userEmail;
  });
  const queryClient = useQueryClient();
  const { status } = queryClient.getQueryState("museum");
  const [searchText, setSearchText] = useState("");
  const [modalText, setModalText] = useState([]);
  const [modalTextInfo, setModalTextInfo] = useState();
  const [bookMark, setBookMark] = useState();

  const modalRef = useRef();
  const dataRef = useRef();

  const [pageList, setPageList] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [submitCheck, setSubmitCheck] = useState(true);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (status === "success") {
      if (!searching) {
        for (let j = 0; j < dataPrev.length; j++) {
          dataRef.current.children[j].classList.add("hidden");
          if (page !== totalPage) {
            for (let i = (page - 1) * 12; i < page * 12; i++) {
              dataRef.current.children[i].classList.remove("hidden");
            }
          } else if (page === totalPage) {
            for (let i = (page - 1) * 12; i < dataPrev.length; i++) {
              dataRef.current.children[i].classList.remove("hidden");
            }
          }
        }
      }
    }
  }, [page]);

  useEffect(() => {
    if (dataPrev) {
      setTotalPage(Math.ceil(dataPrev.length / 12));
    }
  }, [dataPrev]);

  useEffect(() => {
    let pageItems = [];
    for (let i = 1; i <= totalPage; i++) {
      pageItems.push(i);
    }
    setPageList(pageItems);
  }, [totalPage]);

  useEffect(() => {
    handleSubmit();
  }, [submitCheck]);

  const handleSubmit = (event) => {
    if (dataPrev !== []) {
      try {
        let cnt = 0;
        let totalPageNumber = 0;
        let dataItem = [];
        let dataItems = [];
        for (let i = 0; i < dataPrev.length; i++) {
          if (
            dataPrev[i].DP_NAME.includes(searchText) ||
            dataPrev[i].DP_ARTIST.includes(searchText)
          ) {
            dataItem.push(dataPrev[i]);
            cnt = cnt + 1;
          }
        }
        if (cnt === 0) {
          return setSearchedData(undefined), setTotalPage(Math.ceil(cnt / 12));
        }
        totalPageNumber = Math.ceil(cnt / 12);
        setTotalPage(Math.ceil(cnt / 12));
        let i = 0;
        let dataArray = [];
        while (i < totalPageNumber) {
          dataItems = [];
          if (i === totalPageNumber - 1) {
            for (let j = i * 12; j < cnt; j++) {
              dataItems.push(dataItem[j]);
            }
          } else {
            for (let j = i * 12; j < (i + 1) * 12; j++) {
              dataItems.push(dataItem[j]);
            }
          }
          dataArray.push(dataItems);
          i++;
        }
        setSearchedData(dataArray);
      } catch (error) {
        console.log(error);
      }
    } else {
      return [];
    }
  };

  const handleResetSeaching = () => {
    setSearching(false);
    setSearchText("");
    setTotalPage(Math.ceil(dataPrev.length / 12));
  };

  const handleModal = async (event) => {
    setBookMark(false);
    if (event.target.parentElement.dataset.name !== undefined) {
      setModalText([
        event.target.parentElement.dataset.name,
        event.target.parentElement.dataset.artist,
        event.target.parentElement.dataset.img,
        event.target.parentElement.dataset.place,
        event.target.parentElement.dataset.start,
        event.target.parentElement.dataset.end,
        event.target.parentElement.dataset.link,
        event.target.parentElement.dataset.id,
        event.target.parentElement.dataset.info,
      ]);
      if (event.target.parentElement.dataset.info.length > 400) {
        setModalTextInfo(
          event.target.parentElement.dataset.info.substr(0, 400) + "..."
        );
      } else {
        setModalTextInfo(event.target.parentElement.dataset.info + ` `);
      }
      modalRef.current.classList.remove("hidden");
      const q = query(
        collection(db, "data", userEmail, "arts"),
        where("name", "==", event.target.parentElement.dataset.name)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((e) => {
        setBookMark(true);
      });
    }
  };

  const addDatabase = async () => {
    try {
      setDoc(doc(db, "data", userEmail, "arts", modalText[7]), {
        name: modalText[0],
        artist: modalText[1],
        img: modalText[2],
        id: modalText[7],
      });
      setBookMark(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDatabase = () => {
    try {
      deleteDoc(doc(db, "data", userEmail, "arts", modalText[7]));
      setBookMark(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-[100%] flex flex-col">
        <div
          ref={modalRef}
          className="z-[2] hidden fixed bg-black w-[100%] p-5 md:px-[5%] lg:px-[15%] h-[100vh] opacity-95"
        >
          <div className="flex flex-col">
            <BiXCircle
              color="white"
              size={30}
              className="hover:cursor-pointer self-end mb-5"
              onClick={() => modalRef.current.classList.add("hidden")}
            />
            <div className="mb-5">
              <div className="flex items-center">
                <div className="z-[2] flex items-center">
                  <div className="text-yellow-600 text-base lg:text-3xl">
                    {modalText[0]}
                  </div>
                </div>
              </div>
              {modalText[1] && (
                <div className="z-[2] text-white text-xs lg:text-base">
                  | {modalText[1]}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="z-[2] text-xs text-white">
                  전시 장소 | {modalText[3]}
                </div>
                <div className="z-[2] text-xs text-white ">
                  전시 기간 | {modalText[4]} ~ {modalText[5]}
                </div>
              </div>
              {userEmail && (
                <div>
                  {bookMark ? (
                    <BsFillBookmarkCheckFill
                      size={20}
                      color="#ca8a04"
                      className="hover:cursor-pointer z-[2]"
                      onClick={deleteDatabase}
                    />
                  ) : (
                    <BsBookmarkPlus
                      size={20}
                      color="white"
                      className="hover:cursor-pointer z-[2]"
                      onClick={addDatabase}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap-reverse justify-center text-xs">
              <div className="z-[2] text-white text-justify">
                {modalTextInfo}
                <a
                  href={modalText[6]}
                  target="_blank"
                  className="italic text-gray-300 hover:text-yellow-600"
                >
                  더보기
                </a>
              </div>
              <img
                src={modalText[2]}
                loading="lazy"
                className="w-[100%] h-[50vh] my-3 object-cover z-[2]"
              />
            </div>
          </div>
        </div>
        <div className="md:h-[10vh] mt-[7vh] xl:px-[20%] px-5 md:px-[10%]">
          <div className="text-3xl lg:text-4xl">| 지난 전시</div>
          <div className="flex flex-col justify-start md:flex-row md:justify-between items-start md:items-center">
            <div className="text-sm lg:text-lg">
              전시 제목과 아티스트 이름으로 검색해보세요
            </div>
            <form
              onSubmit={(event) => {
                setSearching(true);
                setSubmitCheck(!submitCheck);
                event.preventDefault();
              }}
              className="w-[98%] md:w-[30vw] lg:w-[20vw] xl:w-[15vw] flex justify-end items-center self-center drop-shadow-lg rounded-full px-2 py-1 my-3 md:my-0 bg-gray-100"
            >
              <input
                value={searchText || ""}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="제목, 이름으로 검색"
                className="w-[100%] text-sm p-1 mr-2 rounded-lg bg-gray-100"
              />
              {!searching && (
                <BiSearch size={20} className="hover:cursor-pointer" />
              )}
              {searching && (
                <BiX
                  onClick={() => {
                    setPage(1);
                    handleResetSeaching();
                  }}
                  size={20}
                  className="hover:cursor-pointer"
                />
              )}
            </form>
          </div>
        </div>
        {dataPrev !== [] && (
          <div
            ref={dataRef}
            className="md:mt-[3vh] xl:px-[20%] px-5 md:px-[10%] w-[100%] md:h-[70vh] flex flex-wrap content-start justify-start"
          >
            {searching ? (
              searchedData ? (
                searchedData[page - 1].map((item, index) => (
                  <div
                    onClick={handleModal}
                    key={index}
                    data-index={index}
                    data-name={item.DP_NAME}
                    data-artist={item.DP_ARTIST}
                    data-id={item.DP_SEQ}
                    data-img={item.DP_MAIN_IMG}
                    data-place={item.DP_PLACE}
                    data-start={item.DP_START}
                    data-end={item.DP_END}
                    data-artpart={item.DP_ART_PART}
                    data-artcnt={item.DP_ART_CNT}
                    data-info={item.DP_INFO}
                    data-link={item.DP_LNK}
                    className="w-[50%] h-[30vh] md:w-[25%] md:h-[22vh] text-xs p-2 mb-3 flex-col hover:cursor-pointer hover:scale-105 duration-100 drop-shadow-lg"
                  >
                    <img
                      src={item?.DP_MAIN_IMG}
                      loading="lazy"
                      className="w-[100%] h-[80%] object-cover"
                    />
                    <div className="m-2 mt-3">
                      {item?.DP_NAME.length < 35
                        ? item?.DP_NAME
                        : item?.DP_NAME.slice(0, 35) + "..." || ""}
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-[100%] h-[100%] flex items-center justify-center text-xl">
                  <div className="mr-2">검색 결과가 없습니다</div>
                  <BsEmojiDizzy />
                </div>
              )
            ) : (
              dataPrev?.map((item, index) => (
                <div
                  onClick={handleModal}
                  key={item?.DP_SEQ}
                  data-name={item?.DP_NAME}
                  data-artist={item?.DP_ARTIST}
                  data-id={item?.DP_SEQ}
                  data-img={item?.DP_MAIN_IMG}
                  data-place={item?.DP_PLACE}
                  data-start={item?.DP_START}
                  data-end={item?.DP_END}
                  data-artpart={item?.DP_ART_PART}
                  data-artcnt={item?.DP_ART_CNT}
                  data-info={item?.DP_INFO}
                  data-link={item?.DP_LNK}
                  className={
                    index < 12
                      ? "w-[50%] h-[30vh] md:w-[25%] md:h-[22vh] text-xs p-2 mb-3 flex-col hover:cursor-pointer hover:scale-105 duration-100 drop-shadow-lg"
                      : "hidden w-[50%] h-[30vh] md:w-[25%] md:h-[22vh] text-xs p-2 mb-3 flex-col hover:cursor-pointer hover:scale-105 duration-100 drop-shadow-lg"
                  }
                >
                  <img
                    src={item?.DP_MAIN_IMG || ""}
                    loading="lazy"
                    className="w-[100%] h-[80%] object-cover"
                  />
                  <div className="m-2 mt-3">
                    {item?.DP_NAME.length < 35
                      ? item?.DP_NAME
                      : item?.DP_NAME.slice(0, 35) + "..." || ""}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {pageList === undefined ? (
          <div>Loading...</div>
        ) : (
          <div className="text-xs md:text-sm py-5 px-[10%] md:h-[8vh] xl:px-[20%] flex justify-center items-center">
            {pageList.map((item, index) => (
              <div
                key={index}
                className={
                  page === index + 1
                    ? "bg-yellow-500 px-2 rounded-full hover:cursor-pointer"
                    : "px-2 hover:cursor-pointer"
                }
                onClick={(event) => setPage(parseInt(event.target.innerText))}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
