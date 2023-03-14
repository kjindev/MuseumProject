import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsChatRightText,
  BsGeoAlt,
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { useSelector } from "react-redux";
import { db } from "../fbase";
import {
  setDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import NavBar from "../mainPage/NavBar";

export default function Map() {
  const { index } = useParams();
  const mapRef = useRef(null);
  const infoRef = useRef();
  const directionsRef = useRef();
  const [bookMark, setBookMark] = useState();
  const userEmail = useSelector((state) => {
    return state.userInformation.userEmail;
  });

  class MuseumList {
    constructor([
      name,
      img,
      description,
      weekday,
      weekend,
      culture,
      closed_day,
      regular_closing_day,
      opening_hour,
      admission,
      address,
      phone,
      lat,
      lng,
    ]) {
      this.name = name;
      this.img = img;
      this.description = description;
      this.weekday = weekday;
      this.weekend = weekend;
      this.culture = culture;
      this.closed_day = closed_day;
      this.regular_closing_day = regular_closing_day;
      this.opening_hour = opening_hour;
      this.admission = admission;
      this.address = address;
      this.phone = phone;
      this.lat = lat;
      this.lng = lng;
    }
  }

  class DirectionList {
    constructor([subway, bus, parking, link]) {
      this.subway = subway;
      this.bus = bus;
      this.parking = parking;
      this.link = link;
    }
  }

  const museumList = {
    0: [
      "서울시립미술관 서소문본관",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220318141012_ed572a7d566c4aceb8998064d46a204a_4ca445f99fb7420994c0bebafe2de5da",
      "과거와 현대를 아우르며 모두가 만나고 경험하는 미술관입니다.",

      "오전 10시 - 오후 8시",
      { summer: "오전 10시 - 오후 7시", winter: "오전 10시 - 오후 6시" },
      "오전 10시 - 오후 10시",

      "매주 월요일",
      "1월 1일",

      "관람 종료 1시간 전까지 입장",
      "무료 (*특별전 유료)",

      "서울시 중구 덕수궁길 61(서소문동)",
      "02-2124-8800",

      37.5640625,
      126.9738125,
    ],
    1: [
      "서울시립 북서울미술관",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220513095232_c0ebb8e285034548af730cffb2bdd055_b4f14662ffb84f0da2f672fc2053852d",
      "지역 공동체와 상생하는 개방형 미술관입니다.",

      "오전 10시 - 오후 8시",
      { summer: "오전 10시 - 오후 7시", winter: "오전 10시 - 오후 6시" },
      "오전 10시 - 오후 10시",

      "매주 월요일",
      "1월 1일",

      "관람 종료 1시간 전까지 입장",
      "무료 (*특별전 유료)",

      "서울시 노원구 동일로 1238(중계동)",
      "02-2124-8800",

      37.6407938,
      127.0667628,
    ],
    2: [
      "서울시립 남서울미술관",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220318141104_0cec42e25349445b9e597098ca952391_17219a61af5948dcbbdb382af726a363",
      "역사의 정취가 가득한, 오래 머물고 싶은 미술관입니다.",

      "오전 10시 - 오후 8시",
      "오전 10시 - 오후 6시",
      undefined,

      "매주 월요일",
      "1월 1일",

      "관람 종료 1시간 전까지 입장",
      "무료",

      "서울시 관악구 남부순환로 2076(남현동)",
      "02-2124-8800",

      37.4761313,
      126.9795938,
    ],
    3: [
      "서울시립 미술아카이브",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220107193547_a78150f14adc45e59931073ab6cf1115_bd44dfffbdf7489e86516580e822982b",
      "미술사의 발자취를 좇아 미술의 역사를 보존하고 연구합니다.",

      undefined,
      undefined,
      undefined,

      undefined,
      undefined,

      undefined,
      undefined,

      "서울시 종로구 평창문화로 101(평창동)",
      "02-2133-4191",

      37.6103289,
      126.9744456,
    ],
    4: [
      "서울시립 난지미술창작스튜디오",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119170041_f2515359263f46f1b1f7e9581be90baa_324511ebbfe249c8a30361a024ab33a1",
      "미술인들의 레지던시 공간으로, 역량 있는 국내외 작가와 연구자를 양성하고 지원합니다.",

      "오전 10시 - 오후 6시",
      { summer: "오전 10시 - 오후 7시", winter: "오전 10시 - 오후 6시" },
      "오전 10시 - 오후 10시",

      "매주 월요일",
      "1월 1일",

      "관람 종료 30분 전까지 입장",
      "무료",

      "서울 마포구 하늘공원로 108-1(상암동)",
      "02-2124-8800",

      37.5690289,
      126.8785234,
    ],
    5: [
      "SeMA 벙커",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119161909_eac3c04784d249a2bd2cdc14aa2b6f64_f5eebbf92d60485ab307008aba5a1ba5",
      "1970년대 군사 정권 시절 지어진 것으로 추정되는 벙커가 미술 공간으로 탈바꿈했습니다.",

      "오전 11시 - 오후 7시",
      "오전 11시 - 오후 7시",
      undefined,

      "매주 월요일",
      "1월 1일",

      "관람 종료 30분 전까지 입장",
      "무료",

      "서울 영등포구 여의대로 지하 76(여의도동)",
      "02-2124-8942",

      37.5254177,
      126.9242075,
    ],
    6: [
      "SeMA 창고",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119170004_e0060b4359424cf4b16665a26262236b_38dd7561a710400d92d8ce97d7c7efa6",
      "옛 질병 본부의 시약 창고를 활용한 실험적인 공간입니다.",

      "오전 11시 - 오후 7시",
      "오전 11시 - 오후 7시",
      undefined,

      "매주 월요일",
      "1월 1일",

      "관람 종료 30분 전까지 입장",
      "무료",

      "서울 은평구 통일로 684(서울혁신파크 5동)",
      "02-2124-8946",

      37.6092596,
      126.9342695,
    ],
    7: [
      "SeMA 백남준기념관",
      "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119162110_0db45f47f85e476e9f36e2d720bd7bbd_0ee2d7a1a5314f31b335802e9796f6fd",
      "세계적인 현대 예술가 백남준을 기억하고 기념합니다.",

      "오전 10시 - 오후 7시",
      "오전 10시 - 오후 7시",
      undefined,

      "매주 월요일",
      "1월 1일",

      "관람 종료 30분 전까지 입장",
      "무료",

      "서울 종로구 종로53길 12-1(창신동)",
      "02-2124-5268",

      37.5730106,
      127.0137485,
    ],
  };

  const directionList = {
    0: [
      "1호선: 시청역 1번 출구 (서울시청 서소문청사 방면) / 2호선: 시청역 10, 11, 12번 출구 / 5호선: 서대문역 5번 출구 또는 광화문역 6번 출구",
      "파랑(간선)버스 172, 472, 600, 602번: '광화문' 또는 '시청 앞' 정류장에서 하차",
      "주차 요금: 평일(월~금) 5분당 400원, 토요일 및 공휴일 5분당 300원",
      "https://sema.seoul.go.kr/kr/visit/seosomun#museumHerecoms",
    ],
    1: [
      "7호선 하계역 1번 출구 도보 5분 거리에 등나무공원 내 / 7호선 중계역 3번 출구 도보 5분 거리에 등나무공원 내",
      "파랑(간선)버스: 100, 105, 146 / 초록(지선)버스: 1131, 1135, 1137, 1140 / 노랑(순환)버스: 15번 '서울시립 북서울미술관' 정류장에서 하차",
      "주차 요금: 화~일요일 5분당 250원, 월요일 무료 / 운영시간: 09:00~22:00 (동절기(12월~2월) 및 토·일·공휴일 : 09:00~21:00)",
      "https://sema.seoul.go.kr/kr/visit/bukseoul#museumHerecoms",
    ],
    2: [
      "2호선: 사당역 6번 출구에서 도보 1분 / 4호선: 사당역 4번 출구에서 도보 3분",
      "641, 5524번: ’남서울 농협 남현동지점‘ 정류장에서 하차 후 도보 6분 / 643, 8541번: '사당1동 관악시장 앞' 정류장에서 하차 후 도보 7분",
      "미술관 내 주차 시설이 없으므로, 인근 사당 공영주차장을 이용하여 주시기 바랍니다.",
      "https://sema.seoul.go.kr/kr/visit/namseoul#museumHerecoms",
    ],
    3: [
      undefined,
      undefined,
      undefined,
      "https://sema.seoul.go.kr/kr/visit/art_archive#museumHerecoms",
    ],
    4: [
      "2호선: 당산역 6, 7번 출구, 100m 직진 후 9707 버스 환승 / 6호선: 마포구청역 1번 출구, 271, 7011 버스 환승",
      "광역버스 9707번: ‘난지한강공원’ 정류장에서 하차, 도보 3분 / 271, 6715번: ‘월드컵파크 3단지 정문’ 정류장에서 하차, 난지천공원 가로질러 도보 15분 / 172, 670, 7011, 7016, 7019번: '월드컵파크 3단지, 난지천공원' 정류장에서 하차, 난지천공원 가로질러 도보 15분",
      "주차장은 A동과 B동 사이에 있습니다.",
      "https://sema.seoul.go.kr/kr/visit/nanji_residency#museumHerecoms",
    ],
    5: [
      "5, 9호선: 여의도역 3번 출구에서 도보 7분 (3번 출구에서 200m 직진 후 여의도 공원 앞 교차로에서 우회전하여 200m 직진 (엘리베이터를 지나 여의도 환승센터 방면으로 약 100m 직진하시면 신설 계단이 있습니다.)",
      "여의도 환승센터(정류장번호: 19-007, 19-008, 19-016, 19-017)에서 하차",
      "※ 주차 공간이 없으니 대중교통을 이용하여 주시기 바랍니다.",
      "https://sema.seoul.go.kr/kr/visit/sema_bunker#museumHerecoms",
    ],
    6: [
      "3, 6호선: 불광역 2번 출구에서 도보 7분 (2번 출구 앞의 횡단보도를 건넌 뒤, 녹번 파출소를 지나 100m 직진한 후 왼쪽에 있는 정문으로 들어오시면, 서울혁신파크입니다.)",
      "불광역 불광1동주민센터 정류장(701, 704, 705, 708, 720, 741, 774, 7720, 9703, 9709)에서 하차",
      "주차 요금: 현재 임시 무료 (주차 공간이 협소하니 가급적 대중교통을 이용해주시기 바랍니다.)",
      "https://sema.seoul.go.kr/kr/visit/sema_warehouse#museumHerecoms",
    ],
    7: [
      "1, 6호선: 동묘앞역 8번 출구에서 도보 3분 / 1, 4호선: 동대문역 3번 출구에서 도보 3분 (우리농산물마트와 BYC 사이의 종로53길로 진입 후 골목을 따라 우측으로 진입)",
      "'동대문 흥인지문'(정류장 번호: 01-037), '동대문'(01-233), '동묘'(01-595) 정류장에서 하차",
      "※ 기념관 내 주차시설이 없으므로, 인근 주차장을 이용하여 주시기 바랍니다",
      "https://sema.seoul.go.kr/kr/visit/nam_june_paik_house#museumHerecoms",
    ],
  };

  const direction = new DirectionList(directionList[index]);
  const museum = new MuseumList(museumList[index]);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  const addDatabase = async () => {
    try {
      setDoc(doc(db, "data", userEmail, "museum", museum.name), {
        name: museum.name,
        address: museum.address,
        img: museum.img,
        id: museum.Lat,
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
          collection(db, "data", userEmail, "museum"),
          where("name", "==", museum.name)
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
      deleteDoc(doc(db, "data", userEmail, "museum", museum.name));
      setBookMark(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInfo = () => {
    infoRef.current.classList.remove("hidden");
    infoRef.current.classList.add("flex");
    directionsRef.current.classList.add("hidden");
    directionsRef.current.classList.remove("flex");
  };

  const handleDirection = () => {
    directionsRef.current.classList.remove("hidden");
    directionsRef.current.classList.add("flex");
    infoRef.current.classList.add("hidden");
    infoRef.current.classList.remove("flex");
  };

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(museum.lat, museum.lng);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-[100%] pt-[7vh] md:pt-0 md:h-[100vh] flex flex-col justify-center items-center">
        <div className="px-3 w-[100%] md:w-[84%] flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-lg mr-2 sm:text-xl md:text-xl lg:text-3xl">
              {museum.name}
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
          <div className="flex items-center">
            <BsChatRightText
              size={20}
              className="mx-1 hover:cursor-pointer"
              onClick={handleInfo}
            />
            <BsGeoAlt
              size={20}
              className="mx-1 hover:cursor-pointer"
              onClick={handleDirection}
            />
          </div>
        </div>
        <div
          ref={infoRef}
          className="w-[100%] mt-3 flex flex-col justify-center items-center md:flex-row drop-shadow-lg"
        >
          <img
            src={museum.img}
            className="w-[100%] md:w-[42%] h-[40vh] md:h-[500px] object-cover"
          />
          <div className="w-[100%] md:w-[42%] md:h-[500px] object-cover bg-white">
            {index !== "3" ? (
              <div className="p-3">
                <div className="mb-3">
                  <div className="font-bold">| 이용 시간</div>
                  <div>화요일 - 금요일 : {museum.weekday}</div>
                  <div>
                    주말, 공휴일 :{" "}
                    {museum.weekend.summer !== undefined ? (
                      <span>
                        하절기(3-10월) {museum.weekend.summer} / 동절기(11-2월){" "}
                        {museum.weekend.winter}{" "}
                      </span>
                    ) : (
                      <span>{museum.weekend}</span>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 휴관</div>
                  <div className="flex">
                    <div>
                      {museum.closed_day}, {museum.regular_closing_day}
                      (*정기휴관)
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 입장 시간</div>
                  <div>{museum.opening_hour}</div>
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 입장 가격</div>
                  <div>{museum.admission}</div>
                </div>{" "}
                <div className="mb-3">
                  <div className="font-bold">| 대표 번호</div>
                  <div>{museum.phone}</div>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <div className="mb-3 text-justify">
                  <span className="font-bold">미술아카이브</span>는 미술의
                  역사를 보존하고 연구하는 미술관입니다. 미술아카이브는 예술인
                  개인과 단체가 남긴 미술사의 발자취를 좇아 수많은 기록과 자료를
                  수집 선별하여 보존하고 연구합니다. 또한 아카이브를 매개로 한
                  프로그램을 통해 다양한 사용자들과 관계를 맺고, 새로운 예술을
                  상상합니다.{" "}
                  <span className="italic">(2023년 3월 개관 예정)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          ref={directionsRef}
          className="w-[100%] mt-3 hidden flex-col justify-center items-center md:flex-row drop-shadow-lg"
        >
          <div
            ref={mapRef}
            className="w-[100vw] md:w-[42vw] h-[300px] md:h-[500px]"
          ></div>
          <div className="w-[100%] md:w-[42%] md:h-[500px] bg-white">
            {index !== "3" ? (
              <div className="p-3">
                <div className="mb-3">
                  <div className="font-bold">| 주소 </div>
                  {museum.address}
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 지하철 이용 안내</div>
                  {direction.subway}
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 버스 이용 안내</div>
                  {direction.bus}
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 주차장 이용 안내</div>
                  {direction.parking}
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 상세 안내 </div>
                  <div className="hover:text-yellow-600 hover:cursor-pointer">
                    <a
                      className="flex items-center"
                      href={direction.link}
                      target="_blank"
                    >
                      <FiLink className="mr-1" />
                      <span>홈페이지 바로가기</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <div className="mb-3">
                  <div className="font-bold">| 주소 </div>
                  {museum.address}
                </div>
                <div className="mb-3">
                  <div className="font-bold">| 상세 안내 </div>
                  <div className="hover:text-indigo-500 hover:cursor-pointer">
                    <a
                      className="flex items-center"
                      href={direction.link}
                      target="_blank"
                    >
                      <FiLink className="mr-1" />
                      <span>홈페이지 바로가기</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
