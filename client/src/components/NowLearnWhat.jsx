import React, { useState, useRef } from "react";
import axios from "axios";
import info from "../info.json";

const Cards = ({ item, index, time }) => {
  console.log(time);
  return (
    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        class="rounded-t-lg"
        src={item.img}
        alt=""
        style={{ maxWidth: "500px" }}
      />
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.dis}
        </p>
        <p class="font-extrabold mb-3 font-normal text-gray-700 dark:text-gray-400">
          เวลา :
          {time > item.timeOpen && time < item.timeClose
            ? "ตอนนี้นะจ๊ะ"
            : item.timeOpen.toFixed(2) +
              "-" +
              item.timeClose.toFixed(2) +
              " น."}
        </p>
      </div>
    </div>
  );
};

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./NowLearnCss.css";

// import required modules
import { Pagination } from "swiper/modules";
import { useEffect } from "react";

const dayTostring = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function NowLearnWhat() {
  const date = new Date();
  var [timing,setTiming] = useState((date.getHours() + date.getMinutes() * 0.01).toString())
  var day = 'Tuesday'//dayTostring[date.getDay()];
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(day)
    loadData();
  }, []);
  const loadData = async () => {
    console.log("loading");
    await axios
      .get(info.apiuri + "/timetable/getnow:" + timing + ";" + day)
      .then((e) => {
        const raw_data = e.data;
        console.log(raw_data);
        raw_data.sort((a, b) => a.timeOpen - b.timeOpen);
        console.log(raw_data);
        setData(raw_data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div id="nowlearn" className="mt-5">
      <Swiper
        slidesPerView={1.3}
        spaceBetween={5}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data !== null
          ? data.map((e, i) => {
              return (
                <SwiperSlide key={i}>
                  <Cards key={i} item={e} index={i} time={timing} />
                </SwiperSlide>
              );
            })
          : "Loading"}
        {data !== null ? (
          data.length === 0 ? (
            <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                class="rounded-t-lg"
                src="https://img.freepik.com/free-vector/free-word-concept_23-2147852946.jpg?w=740&t=st=1699202494~exp=1699203094~hmac=2d9a7df58b85f4878bc81b0e3017e4240cf482d72eebbd4e0c4a97e17a9d5a3d"
                alt=""
                style={{ maxWidth: "300px" }}
              />
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    ว่างขนาดนี้ไปเล่นอย่างอื่นไป
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  ว่างมีเวลาดูแชทเขา แต่เขาก็มี..... เศร้าจัง5555
                </p>
                <p class="font-extrabold mb-3 font-normal text-gray-700 dark:text-gray-400">
                  สู้ๆครับ
                </p>
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          " "
        )}
      </Swiper>
      <h1>for admin</h1>
      <input type="number" step={0.01} onChange={e=>{
        setTiming(e.target.value)
        console.log(timing)
        }}/>
        <button onClick={loadData}>refresh</button>
    </div>
  );
}

export default NowLearnWhat;
