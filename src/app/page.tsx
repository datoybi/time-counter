// @ts-nocheck
"use client";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Box from "@/components/ui/Box";
import TimePicker from "@/components/TimePicker";
import Select from "@/components/ui/Select";
import dayjs from "dayjs";
import { useState } from "react";
// state여야함
const DATA = [
  {
    week: "월",
    startTime: "09:01 AM",
    endTime: "06:02 PM",
    workingTime: "8:00",
    dayOff: "none",
  },
  {
    week: "화",
    startTime: "10:11 AM",
    endTime: "06:59 PM",
    workingTime: "8:00",
    dayOff: "none",
  },
  {
    week: "수",
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    workingTime: "8:00",
    dayOff: "none",
  },
  {
    week: "목",
    startTime: "08:00 AM",
    endTime: "05:00 PM",
    workingTime: "8:00",
    dayOff: "none",
  },
  {
    week: "금",
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    workingTime: "8:00",
    dayOff: "none",
  },
];

export default function Home() {
  dayjs.extend(customParseFormat);
  const [data, setData] = useState<any>(DATA);

  const handleChangeTime = (time: any, position: any) => {
    console.log(time);
    // const now = dayjs(time).format("hh:mm a");
    console.log(position);

    const filteredData = data.find((data, i) => i === position.index);
    if (position.place === "start") {
      const workingHour = dayjs(filteredData.endTime, "hh:mm A").diff(time, "hour");
      const workingMin = dayjs(filteredData.endTime, "hh:mm A").diff(time, "minute");
      console.log("start ", workingHour, " : ", workingMin);
    } else if (position.place === "end") {
      console.log();
      const workingHour = time.diff(dayjs(filteredData.startTime, "hh:mm A"), "hour");
      const workingMin = time.diff(dayjs(filteredData.startTime, "hh:mm A"), "minute");
      console.log("end ", workingHour, " : ", workingMin);
    }
    // setData((prevData) => prevData.filter((data, i) => i === position.index));
  };

  const workDayHTML = data.map(({ week, startTime, endTime, workingTime, dayOff }, index) => (
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
        <span>+{workingTime}</span>
      </Box>
      <Select workday={week} />
    </li>
  ));

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen">
      {/* <h1>하이</h1> */}
      <section className="w-3/5 bg-neutral-100 rounded-lg p-10">
        <div className="flex justify-end">
          <button type="button" title="저장" className="text-3xl mr-3">
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
