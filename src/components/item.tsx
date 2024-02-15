import Box from "@/components/ui/box";
import TimePicker from "@/components/time-picker";
import Select from "@/components/ui/select";
import { printTime } from "@/app/lib/utils";
import { WeekType, DayOffType } from "@/app/lib/types";
import dayjs from "dayjs";

type ItemType = {
  week: WeekType;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  workingTime: number;
  dayOff: DayOffType;
  index: number;
  handleChangeTime: (
    time: dayjs.Dayjs,
    position: { index: number; place: "start" | "end" }
  ) => void;
  handleChangeWorkType: ({
    index,
    workday,
    id,
  }: {
    index: number;
    workday: WeekType;
    id: DayOffType;
  }) => void;
};

const Item = ({
  week,
  startTime,
  endTime,
  workingTime,
  dayOff,
  index,
  handleChangeTime,
  handleChangeWorkType,
}: ItemType) => {
  const printedWorkingTime = `${Math.floor(workingTime / 60) - 1}:${printTime(workingTime % 60)}`;

  return (
    <li className="flex items-center justify-center gap-2 mt-2">
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
};

export default Item;
