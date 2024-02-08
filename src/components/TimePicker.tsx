"use client";
import { useRef } from "react";
import Box from "@/components/ui/Box";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const TimePicker = ({
  time,
  onChangeTime,
  position,
}: {
  time: string;
  onChangeTime: any;
  position: [index: number, place: "start" | "end"];
}) => {
  dayjs.extend(customParseFormat);
  const printTime = (time: number) => (time < 10 ? `0${time}` : time);
  const ref = useRef<any>(null);
  const now = dayjs(time, "hh:mm A");
  const [hour, minute, ampm] = time.split(/:| /);
  console.log(hour, minute, ampm);
  const handleOnChange = (e: any) => {
    const selectedTarget = e.target.name;
    if (selectedTarget === "hour" && ref.current.value === "PM")
      now.set(selectedTarget, Number(e.target.value) + 12);
    const newTime = now.set(selectedTarget, Number(e.target.value));

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
          onChange={handleOnChange}
          ref={ref}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </Box>
  );
};

export default TimePicker;
