export const eh_time = {
  times: [
    {
      name: "Start",
      formGroupName: "start",
      description: "Start Time Range"
    }
  ],

  body: {
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
  }
};

export const mih_time = {
  times: [
    ...eh_time.times,
    { name: "End", description: "End Time Range", formGroupName: "end" },
    {
      name: "Response Time",
      description:
        "Response Time Range (Requires: status[open] contentToRetrieve[responseTime])",
      formGroupName: "responseTime"
    },
    {
      name: "Latest Update Time",
      description: "Latest Update Time (Requires: status[open, close])",
      formGroupName: "latestUpdateTime"
    }
  ],
  body: eh_time.body
};
