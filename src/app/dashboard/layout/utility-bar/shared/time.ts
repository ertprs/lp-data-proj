export const time_start = {
  From: {
    name: "From",
    value: "fromTime",
    formGroupName: "from",
    hours: [...Array(12).keys()].map(x =>
      x < 9 ? "0" + (x + 1).toString() : (x + 1).toString()
    ),
    minutes: [...Array(60).keys()].map(x =>
      x < 10 ? "0" + x.toString() : x.toString()
    ),
    periods: ["AM", "PM"]
  },
  To: {
    name: "To",
    value: "toTime",
    formGroupName: "to",
    hours: [...Array(12).keys()].map(x =>
      x < 9 ? "0" + (x + 1).toString() : (x + 1).toString()
    ),
    minutes: [...Array(60).keys()].map(x =>
      x < 10 ? "0" + x.toString() : x.toString()
    ),
    periods: ["AM", "PM"]
  }
};
