import React from "react";
import { Link } from "react-router-dom";

export default function Location() {
  const museumName = [
    {
      name: "서소문본관",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220318141012_ed572a7d566c4aceb8998064d46a204a_4ca445f99fb7420994c0bebafe2de5da",
    },
    {
      name: "북서울미술관",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220513095232_c0ebb8e285034548af730cffb2bdd055_b4f14662ffb84f0da2f672fc2053852d",
    },
    {
      name: "남서울미술관",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220318141104_0cec42e25349445b9e597098ca952391_17219a61af5948dcbbdb382af726a363",
    },
    {
      name: "미술아카이브",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220107193547_a78150f14adc45e59931073ab6cf1115_bd44dfffbdf7489e86516580e822982b",
    },
    {
      name: "난지미술창작스튜디오",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119170041_f2515359263f46f1b1f7e9581be90baa_324511ebbfe249c8a30361a024ab33a1",
    },
    {
      name: "SeMA 벙커",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119161909_eac3c04784d249a2bd2cdc14aa2b6f64_f5eebbf92d60485ab307008aba5a1ba5",
    },
    {
      name: "SeMA 창고",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119170004_e0060b4359424cf4b16665a26262236b_38dd7561a710400d92d8ce97d7c7efa6",
    },
    {
      name: "SeMA 백남준기념관",
      img: "https://sema.seoul.go.kr/common/imageView?FILE_PATH=%2Fit%2FITRA0%2F2022%2F&FILE_NM=20220119162110_0db45f47f85e476e9f36e2d720bd7bbd_0ee2d7a1a5314f31b335802e9796f6fd",
    },
  ];

  return (
    <div className="pt-[10vh] w-[100%] h-[100vh] flex flex-col items-center">
      <div className="text-2xl md:text-3xl">방문하기</div>
      <div className="mt-2">| 서울시립미술관을 직접 방문해보세요</div>
      <div className="mt-7 flex flex-wrap justify-center content-center w-[95%]">
        {museumName.map((item, index) => (
          <div
            key={index}
            className="w-[40%] h-[18vh] m-2 sm:w-[30%] sm:h-[24vh] lg:w-[20vw] lg:h-[25vh]"
          >
            <Link to={`Map/${index}`}>
              <div className="w-[100%] h-[100%] p-1 md:p-2 bg-white drop-shadow-lg hover:scale-105 duration-100">
                <img src={item.img} className="w-[100%] h-[90%] object-cover" />
                <div className="w-[100%] text-end text-xs sm:text-sm lg:text-base">
                  {item.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
