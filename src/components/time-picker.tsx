"use client";

import { useRef } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Box from "@/components/ui/box";
import dayjs from "dayjs";
import { printTime } from "@/app/lib/utils";

const TimePicker = ({
  time,
  onChangeTime,
  position,
}: {
  time: dayjs.Dayjs;
  onChangeTime: (time: any, position: { index: number; place: "start" | "end" }) => void;
  position: { index: number; place: "start" | "end" };
}) => {
  dayjs.extend(customParseFormat);

  const printedDate = dayjs(time).format("hh:mm A");
  const ampmRef = useRef<HTMLSelectElement>(null);
  const [hour, minute, ampm] = printedDate.split(/:| /);

  const calculateTime = (
    type: "hour" | "minute" | "ampm" | string,
    value: any,
    time: dayjs.Dayjs
  ) => {
    if (type === "hour") {
      if (ampmRef?.current?.value === "PM") return time.set("hour", Number(value) + 12);
      return time.set("hour", value);
    } else if (type === "minute") {
      return time.set("minute", Number(value));
    } else if (type === "ampm") {
      if (value === "PM") {
        return time.set("hour", time.hour() + 12);
      } else {
        return time.set("hour", time.hour() - 12);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = calculateTime(e.target.name, e.target.value, dayjs(time));
    onChangeTime(newTime, position);
  };

  return (
    <Box style="bg-white">
      <div className="flex">
        <select
          name="hour"
          className="bg-transparent text-xl appearance-none outline-none cursor-pointer"
          value={hour}
          onChange={handleOnChange}
        >
          {Array(12)
            .fill("")
            .map((v, i) => (
              <option key={i + 1} value={printTime(i + 1)}>
                {printTime(i + 1)}
              </option>
            ))}
        </select>
        <span className="text-xl mr-3">:</span>
        <select
          name="minute"
          className="bg-transparent text-xl appearance-none outline-none mr-4 cursor-pointer"
          value={minute}
          onChange={handleOnChange}
        >
          {Array(60)
            .fill("")
            .map((v, i) => (
              <option key={i} value={printTime(i)}>
                {printTime(i)}
              </option>
            ))}
        </select>
        <select
          name="ampm"
          className="bg-transparent text-xl appearance-none outline-none"
          value={ampm}
          ref={ampmRef}
          onChange={handleOnChange}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </Box>
  );
};

export default TimePicker;
