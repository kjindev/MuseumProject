import React, { useRef, useLayoutEffect } from "react";
import Intro from "./components/Intro";
import Now from "./components/Now";
import Prev from "./components/Prev";
import Location from "./components/Location";
import Information from "./components/Information";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { navNameUpdate } from "./store/dataSlice";

export default function Home() {
  const scrollRef = useRef([]);
  const dispatch = useDispatch();
  const isWindow = useSelector((state) => {
    return state.setWindow.windowState;
  });

  useLayoutEffect(() => {
    if (isWindow) {
      window.scroll(0, sessionStorage.y);
    }
  }, []);

  const handleScrollView = (event) => {
    const name = event.target.innerText;
    const category = {
      소개: 0,
      "현재 전시": 1,
      "지난 전시": 2,
      방문하기: 3,
    };
    if (
      name === "소개" ||
      name === "현재 전시" ||
      name === "지난 전시" ||
      name === "방문하기"
    ) {
      scrollRef.current[category[name]].scrollIntoView({ behavior: "smooth" });
    }
  };

  const options = { threshold: 0.5 };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dispatch(navNameUpdate(entry.target.id));
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  if (scrollRef.current[0] !== null) {
    scrollRef.current.forEach((el) => observer.observe(el));
  }

  return (
    <div
      onClick={() => {
        sessionStorage.setItem("y", window.pageYOffset);
      }}
    >
      <NavBar handleScrollView={handleScrollView} />
      <div ref={(el) => (scrollRef.current[0] = el)} id="intro">
        <Intro />
      </div>
      <div ref={(el) => (scrollRef.current[1] = el)} id="now">
        <Now />
      </div>
      <div ref={(el) => (scrollRef.current[2] = el)} id="prev">
        <Prev />
      </div>
      <div ref={(el) => (scrollRef.current[3] = el)} id="location">
        <Location />
      </div>
      <div>
        <Information />
      </div>
    </div>
  );
}
