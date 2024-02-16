import Box from "@/components/ui/box";
import TimePicker from "@/components/time-picker";
import Select from "@/components/ui/select";
import { printTimes } from "@/app/lib/utils";
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
  return (
    <li className="flex items-center justify-center gap-2 mt-2">
      <Box style="w-16 bg-neutral-500">
        <span className="text-neutral-50">{week}</span>
      </Box>
      <TimePicker
        time={startTime}
        onChangeTime={handleChangeTime}
        position={{ index, place: "start" }}
        dayOff={dayOff}
      />
      <span>~</span>
      <TimePicker
        time={endTime}
        onChangeTime={handleChangeTime}
        position={{ index, place: "end" }}
        dayOff={dayOff}
      />
      <Box style={`w-30 bg-neutral-500 text-neutral-50 ${dayOff === "dayOff" && "opacity-30"}`}>
        <span>{printTimes(workingTime)}</span>
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
