import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BiSearch, BiX } from "react-icons/bi";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./fbase";

export default function PrevDetail() {
  const dataPrev = useSelector((state) => {
    return state.data.dataPrevState;
  });
  const userEmail = useSelector((state) => {
    return state.userInformation.userEmail;
  });
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [modalText, setModalText] = useState([]);
  const [modalTextInfo, setModalTextInfo] = useState();
  const [bookMark, setBookMark] = useState();

  const listRef = useRef([]);
  const modalRef = useRef();

  const [totalPage, setTotalPage] = useState();
  const [pageList, setPageList] = useState([]);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleModal = (event) => {
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
      ]);
      if (event.target.parentElement.dataset.info.length > 400) {
        setModalTextInfo(
          event.target.parentElement.dataset.info.substr(0, 400) + "..."
        );
      } else {
        setModalTextInfo(event.target.parentElement.dataset.info + ` `);
      }
      modalRef.current.classList.remove("hidden");
    }
  };

  const handleResetSearching = () => {
    setSearching(false);
    for (let i = 0; i < 12; i++) {
      listRef.current[i].classList.remove("hidden");
      listRef.current[i].classList.add("flex");
    }
    for (let i = 12; i < dataPrev.length; i++) {
      listRef.current[i].classList.remove("hidden");
    }
  };

  useEffect(() => {
    if (dataPrev) {
      for (let i = 0; i < 12; i++) {
        listRef.current[i].classList.remove("hidden");
        listRef.current[i].classList.add("flex");
      }
      setTotalPage(Math.ceil(dataPrev.length / 12));
    }
  }, [dataPrev]);

  const handlePageList = () => {
    for (let i = 1; i <= totalPage; i++) {
      pageList.push(i);
    }
    console.log(pageList);
  };

  useEffect(() => {
    if (pageList.length !== 0) {
      for (let i = 0; i < dataPrev.length; i++) {
        listRef.current[i].classList.add("hidden");
        listRef.current[i].classList.remove("flex");
        for (let j = 12 * (page - 1); j < 12 * page; j++) {
          if (listRef.current[j] !== undefined) {
            listRef.current[j].classList.remove("hidden");
            listRef.current[j].classList.add("flex");
          }
        }
      }
    }
  }, [pageList, page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPageList([]);
    handlePageList();
    let cnt = 0;
    for (let i = 0; i < dataPrev.length; i++) {
      listRef.current[i].classList.remove("hidden");
      if (
        listRef.current[i].innerText.includes(searchText) === false &&
        listRef.current[i].children[2].innerText.includes(searchText) === false
      ) {
        listRef.current[i].classList.add("hidden");
        cnt = cnt + 1;
      }
    }
    setTotalPage(Math.ceil((dataPrev.length - cnt) / 12));
  };
  /*
  const options = { threshold: 0.9 };
  const callback = (entries, observer) => {
    if (searching == false) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let num = parseInt(entry.target.dataset.index);
          if ((num + 1) % 12 === 0) {
            for (let i = num + 1; i < num + 13; i++) {
              listRef.current[i].classList.remove("hidden");
              listRef.current[i].classList.add("flex");
            }
          }
        }
      });
    }
  };
  const observer = new IntersectionObserver(callback, options);

  if (listRef.current[0] !== null) {
    if (searching === false) {
      listRef.current.forEach((el) => observer.observe(el));
      console.log("false");
    } else if (searching === true) {
      listRef.current.forEach((el) => observer.disconnect(el));
      console.log("true");
    }
  }
*/
  const addDatabase = async () => {
    try {
      setDoc(doc(db, "data", userEmail, "arts", modalText[7]), {
        name: modalText[0],
        place: modalText[3],
        artist: modalText[1],
        end: modalText[5],
        img: modalText[2],
        link: modalText[6],
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
    <div className="w-[100%] flex flex-col">
      <div
        ref={modalRef}
        className="z-[2] hidden fixed bg-black w-[100%] h-[100vh] opacity-90"
      >
        <BiX
          color="white"
          size={30}
          className="hover:cursor-pointer"
          onClick={() => modalRef.current.classList.add("hidden")}
        />
        <div className="p-3">
          <div className="mb-5">
            <div className="flex items-center">
              <div className="z-[2] mr-2 text-lg text-yellow-600 lg:text-4xl mb-1">
                {modalText[0]}
              </div>
              {userEmail && (
                <div>
                  {bookMark ? (
                    <BsFillBookmarkCheckFill
                      size={22}
                      color="#ca8a04"
                      className="hover:cursor-pointer z-[2]"
                      onClick={deleteDatabase}
                    />
                  ) : (
                    <BsBookmarkPlus
                      size={22}
                      color="white"
                      className="hover:cursor-pointer z-[2]"
                      onClick={addDatabase}
                    />
                  )}
                </div>
              )}
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
          </div>
          <div className="flex flex-wrap-reverse justify-center text-xs lg:flex-row lg:mt-5 lg:mr-10">
            <div className="z-[2] text-white lg:mt-5 text-justify">
              {modalTextInfo}
              <a
                href={modalText[6]}
                target="_blank"
                className="italic text-gray-500 hover:text-indigo-500"
              >
                더보기
              </a>
            </div>
            <img
              src={modalText[2]}
              className="h-[200px] z-[2] lg:mt-5 lg:ml-6 p-2"
            />
          </div>
        </div>
      </div>
      <div className="px-[10%] pt-[10vh]">
        <div className="text-3xl lg:text-5xl">| 지난 전시</div>
        <div className="flex justify-between items-center">
          <div className="text-sm lg:text-lg">
            서울시립미술관 지난 전시를 확인해보세요
          </div>
          <div onClick={handleResetSearching} className="hover:cursor-pointer">
            검색 초기화
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-end items-center drop-shadow-lg rounded-full px-3 py-2 bg-gray-100"
          >
            <input
              value={searchText || ""}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="제목, 이름으로 검색"
              className="w-[20vw] text-sm p-1 mr-2 rounded-lg bg-gray-100"
            />
            <BiSearch size={20} className="hover:cursor-pointer" />
          </form>
        </div>
      </div>
      <div className="px-[10%] mt-5 flex flex-wrap">
        {dataPrev &&
          dataPrev.map((item, index) => (
            <div
              onClick={handleModal}
              ref={(el) => (listRef.current[index] = el)}
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
              className="hidden w-[43%] text-xs m-2 lg:w-[23%] lg:h-[100%] flex-col hover:cursor-pointer hover:scale-105 duration-100 drop-shadow-lg"
            >
              <img
                src={item.DP_MAIN_IMG}
                className="w-[100%] h-[20vh] object-cover"
              />
              <div className="m-2 mt-3">{item.DP_NAME}</div>
              <div className="hidden">{item.DP_ARTIST}</div>
              <div className="hidden">{item.DP_START}</div>
              <div className="hidden">{item.DP_END}</div>
            </div>
          ))}
      </div>
      {pageList && (
        <div className="h-[10vh] flex justify-center">
          {pageList.map((item, index) => (
            <div
              key={index}
              onClick={(event) => setPage(parseInt(event.target.innerText))}
              className="hover:cursor-pointer mx-1"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
