"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { WeekType, DayOffType } from "@/app/lib/types";
import Item from "@/components/item";
import { DATA } from "@/app/lib/constants";

type DataType = {
  week: WeekType;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  workingTime: number;
  dayOff: DayOffType;
};

const List = () => {
  const [data, setData] = useState<DataType[] | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("workTime")) {
      localStorage.setItem("workTime", JSON.stringify(DATA));
    }
    setData(JSON.parse(localStorage.getItem("workTime") || "''"));
  }, []);

  console.log(data);

  const handleOnSave = () => {
    localStorage.setItem("workTime", JSON.stringify(data));
  };

  const handleChangeTime = (
    time: dayjs.Dayjs,
    position: { index: number; place: "start" | "end" }
  ) => {
    const filteredData = data?.find((_, i) => i === position.index);
    if (!filteredData) return;

    if (position.place === "start") filteredData.startTime = time;
    if (position.place === "end") filteredData.endTime = time;

    filteredData.workingTime = dayjs(filteredData.endTime).diff(
      dayjs(filteredData.startTime),
      "minute"
    );
    setData((prevData) => prevData && prevData.toSpliced(position.index, 1, filteredData));
  };

  const handleChangeWorkType = ({
    index,
    workday,
    id,
  }: {
    index: number;
    workday: WeekType;
    id: DayOffType;
  }) => {
    const filteredData = data?.find((_, i) => i === index);
    if (!filteredData) return;
    filteredData.dayOff = id;
    setData((prevData) => prevData && prevData.toSpliced(index, 1, filteredData));
  };

  return (
    <>
      <div className="flex justify-end">
        <button type="button" title="저장" className="text-3xl mr-3" onClick={handleOnSave}>
          💾
        </button>
        <button type="button" title="데이터 리셋" className="text-3xl">
          🗑️
        </button>
      </div>
      <ul>
        {data &&
          data.map(({ week, startTime, endTime, workingTime, dayOff }, index) => (
            <Item
              key={week}
              week={week}
              startTime={startTime}
              endTime={endTime}
              workingTime={workingTime}
              dayOff={dayOff}
              index={index}
              handleChangeTime={handleChangeTime}
              handleChangeWorkType={handleChangeWorkType}
            />
          ))}
      </ul>
    </>
  );
};

export default List;
