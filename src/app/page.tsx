// @ts-nocheck
"use client";

import Box from "@/components/ui/Box";
import TimePicker from "@/components/TimePicker";
import Select from "@/components/ui/Select";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
const printTime = (time: number) => (time < 10 ? `0${time}` : time);

const DATA = [
  {
    week: "월",
    startTime: dayjs().day(1).hour(9).minute(0).second(0),
    endTime: dayjs().day(1).hour(18).minute(0).second(0),
    workingTime: dayjs()
      .day(1)
      .hour(18)
      .minute(0)
      .second(0)
      .diff(dayjs().day(1).hour(9).minute(0).second(0), "minute"),
    dayOff: "none",
  },
  {
    week: "화",
    startTime: dayjs().day(2).hour(9).minute(0).second(0),
    endTime: dayjs().day(2).hour(18).minute(0).second(0),
    workingTime: dayjs()
      .day(2)
      .hour(18)
      .minute(0)
      .second(0)
      .diff(dayjs().day(2).hour(9).minute(0).second(0), "minute"),
    dayOff: "none",
  },
  {
    week: "수",
    startTime: dayjs().day(3).hour(9).minute(0).second(0),
    endTime: dayjs().day(3).hour(18).minute(0).second(0),
    workingTime: dayjs()
      .day(3)
      .hour(18)
      .minute(0)
      .second(0)
      .diff(dayjs().day(3).hour(9).minute(0).second(0), "minute"),
    dayOff: "none",
  },
  {
    week: "목",
    startTime: dayjs().day(4).hour(9).minute(0).second(0),
    endTime: dayjs().day(4).hour(18).minute(0).second(0),
    workingTime: dayjs()
      .day(4)
      .hour(18)
      .minute(0)
      .second(0)
      .diff(dayjs().day(4).hour(9).minute(0).second(0), "minute"),
    dayOff: "none",
  },
  {
    week: "금",
    startTime: dayjs().day(5).hour(9).minute(0).second(0),
    endTime: dayjs().day(5).hour(18).minute(0).second(0),
    workingTime: dayjs()
      .day(5)
      .hour(18)
      .minute(0)
      .second(0)
      .diff(dayjs().day(5).hour(9).minute(0).second(0), "minute"),
    dayOff: "none",
  },
];

export default function Home() {
  const [data, setData] = useState<any>(DATA);

  useEffect(() => {
    if (!localStorage.getItem("workTime")) {
      localStorage.setItem("workTime", JSON.stringify(data));
    }
    console.log(localStorage.getItem("workTime"));
    setData(JSON.parse(localStorage.getItem("workTime")));
  }, []);

  console.log(data);
  console.log(
    `${Math.floor(data.reduce((acc, el) => acc + Number(el.workingTime), 0) / 60)}:${data.reduce(
      (acc, el) => acc + (Number(el.workingTime) % 60),
      0
    )}`
  );

  const handleOnSave = () => {
    console.log(data);
    localStorage.setItem("workTime", JSON.stringify(data));
  };

  const handleChangeTime = (time: any, position: any) => {
    const filteredData = data.find((_, i) => i === position.index);
    if (position.place === "start") filteredData.startTime = time;
    if (position.place === "end") filteredData.endTime = time;

    filteredData.workingTime = filteredData.endTime.diff(filteredData.startTime, "minute");
    setData((prevData) => prevData.toSpliced(position.index, 1, filteredData));
  };

  const handleChangeWorkType = (id, index, workday) => {
    const filteredData = data.find((_, i) => i === index);
    filteredData.dayOff = workday;
    setData((prevData) => prevData.toSpliced(index, 1, filteredData));
  };

  const workDayHTML = data.map(({ week, startTime, endTime, workingTime, dayOff }, index) => {
    const printedWorkingTime = `${Math.floor(workingTime / 60) - 1}:${printTime(workingTime % 60)}`;

    return (
      <li key={week} className="flex items-center justify-center gap-2 mt-2">
        <Box style="w-16 bg-neutral-500">
          <span className="text-neutral-50">{week}</span>
        </Box>
        <TimePicker
          time={startTime}
          onChangeTime={handleChangeTime}
          position={{ index, place: "start" }}
        />
        <span>~</span>
        <TimePicker
          time={endTime}
          onChangeTime={handleChangeTime}
          position={{ index, place: "end" }}
        />
        <Box style="w-30 bg-neutral-500 text-neutral-50">
          <span>+{printedWorkingTime}</span>
        </Box>
        <Select
          workday={week}
          index={index}
          dayOff={dayOff}
          onChangeWorkType={handleChangeWorkType}
        />
      </li>
    );
  });

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen">
      {/* <h1>하이</h1> */}
      <section className="w-3/5 bg-neutral-100 rounded-lg p-10">
        <div className="flex justify-end">
          <button type="button" title="저장" className="text-3xl mr-3" onClick={handleOnSave}>
            💾
          </button>
          <button type="button" title="데이터 리셋" className="text-3xl">
            🗑️
          </button>
        </div>
        <ul>{workDayHTML}</ul>
      </section>
    </main>
  );
}
