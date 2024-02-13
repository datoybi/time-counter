"use client";
import { useState } from "react";

const OPTIONS = [
  { name: "해당없음", id: "none" },
  { name: "연차", id: "dayOff" },
  { name: "반차", id: "halfOff" },
];

const Select = ({ workday, index, dayOff, onChangeWorkType }: any) => {
  const [checkedValue, setCheckedValue] = useState<any>(`${workday}-${dayOff}`);
  console.log(checkedValue);

  const handleChange = (id: any) => {
    console.log("!!!!! ", id);
    console.log(`! ${workday}-${id}`);
    setCheckedValue(`${workday}-${id}`);
    onChangeWorkType(workday, index, id);
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
