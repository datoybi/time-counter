"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";

import Item from "@/components/item";
import { WeekType, DayOffType } from "@/app/lib/types";
import { DATA } from "@/app/lib/constants";
import { successToast, errorToast } from "@/app/lib/toast";
import { printTimes } from "@/app/lib/utils";
import { ListSkeleton } from "@/components/ui/skeletons";

type DataType = {
  week: WeekType;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  workingTime: number;
  dayOff: DayOffType;
};

const List = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  console.log(data);

  useEffect(() => {
    const isMonday = dayjs().day(1).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
    if (!localStorage.getItem("workTime") || isMonday) {
      localStorage.setItem("workTime", JSON.stringify(DATA));
    }
    setData(JSON.parse(localStorage.getItem("workTime") || "''"));
  }, []);

  const handleOnSave = () => {
    localStorage.setItem("workTime", JSON.stringify(data));
    successToast("저장완료");
  };

  const handleOnDelete = () => {
    localStorage.setItem("workTime", JSON.stringify(DATA));
    setData(() => JSON.parse(localStorage.getItem("workTime") || "''"));
    errorToast("데이터 삭제 완료");
  };

  const handleChangeTime = (
    time: dayjs.Dayjs,
    position: { index: number; place: "start" | "end" }
  ) => {
    const filteredData = data?.find((_, i) => i === position.index);
    if (!filteredData) return;

    if (position.place === "start") filteredData.startTime = time;
    if (position.place === "end") filteredData.endTime = time;

    filteredData.workingTime =
      dayjs(filteredData.endTime).diff(dayjs(filteredData.startTime), "minute") - 60;
    setData((prevData) => prevData && prevData.toSpliced(position.index, 1, filteredData));
  };

  const handleChangeWorkType = ({
    index,
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

  const calculateTotalTime = () => {
    const DEFAULT_TOTAL_TIME = 40;
    const halfOffCount = (data && data.filter((el) => el.dayOff === "halfOff").length) || 0;
    const dayOffCount = (data && data.filter((el) => el.dayOff === "dayOff").length) || 0;

    const workingMinutes =
      (data && data.reduce((acc, el) => acc + el.workingTime, 0) - dayOffCount * 60 * 8) || 0;
    const totalWorkMinutes = (DEFAULT_TOTAL_TIME - halfOffCount * 5 - dayOffCount * 8) * 60;

    return printTimes(workingMinutes - totalWorkMinutes);
  };

  return (
    <>
      <div className="flex justify-end">
        <button type="button" title="저장" className="text-3xl mr-3" onClick={handleOnSave}>
          💾
        </button>
        <button type="button" title="데이터 리셋" className="text-3xl" onClick={handleOnDelete}>
          🗑️
        </button>
      </div>
      <ul>
        {data ? (
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
          ))
        ) : (
          <ListSkeleton />
        )}
      </ul>
      <p className="font-mono text-center mt-10">{data && calculateTotalTime()}</p>
      <ToastContainer />
    </>
  );
};

export default List;
