import { useEffect, useState } from "react";
import { WeekType, DayOffType } from "@/app/lib/types";

const OPTIONS: { [key: string]: string }[] = [
  { name: "해당없음", id: "none" },
  { name: "연차", id: "dayOff" },
  { name: "반차", id: "halfOff" },
];

type SelectType = {
  workday: WeekType;
  index: number;
  dayOff: DayOffType;
  onChangeWorkType: any;
};

const Select = ({ workday, index, dayOff, onChangeWorkType }: SelectType) => {
  const [checkedValue, setCheckedValue] = useState<string>(`${workday}-${dayOff}`);

  useEffect(() => {
    setCheckedValue(() => `${workday}-${dayOff}`);
  }, [dayOff, workday]);

  const handleChange = (id: string) => {
    setCheckedValue(`${workday}-${id}`);
    onChangeWorkType({ workday, index, id });
  };

  return (
    <div className="grid w-[16.5rem] grid-cols-3 gap-2 rounded-xl bg-gray-200 p-2 ml-3">
      {OPTIONS.map(({ name, id }) => (
        <div key={id}>
          <input
            type="radio"
            name={`${workday}-option`}
            id={`${workday}-${id}`}
            value={id}
            className="peer hidden"
            checked={checkedValue === `${workday}-${id}`}
            onChange={() => handleChange(id)}
          />
          <label
            htmlFor={`${workday}-${id}`}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Select;
