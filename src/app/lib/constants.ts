import dayjs from "dayjs";

export const DATA = [
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
