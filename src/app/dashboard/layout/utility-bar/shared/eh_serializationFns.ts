export const eh_serializeQueryForm = (formValue) => {
    let serialized = {};
    for (let key in formValue) {
      let value = formValue[key];
      // start, duration, chatMCS, coBrowseDuration, keyword_search_area
      if (typeof value == "object") {
        if (value.from) {
          // start
          if (typeof value.from == "object") {
            if (!value.from.date || !value.to.date) {
              serialized[key] = {
                from: Date.now() - 60000 * 60 * 24 * 30,
                to: Date.now()
              };
            } else {
              serialized[key] = {
                from: new Date(
                  `${JSON.stringify(value.from.date).substring(0, 11)} ${
                    value.from.hour
                      ? value.from.hour +
                        ":" +
                        value.from.minute +
                        " " +
                        value.from.period
                      : ""
                  }`
                ).valueOf(),
                to: new Date(
                  `${JSON.stringify(value.to.date).substring(0, 11)} ${
                    value.to.hour
                      ? value.to.hour +
                        ":" +
                        value.to.minute +
                        " " +
                        value.from.period
                      : ""
                  }`
                ).valueOf()
              };
            }
          }
          // duration, chatMCS, coBrowseDuration
          if (typeof value.from != "object") {
            if (value.from && value.to) {
              serialized[key] = {
                from: Number(value.from),
                to: Number(value.to)
              };
            }
          }
        }
        // keyword_search_area
        else if (key === "keyword_search_area") {
          if (value.type) {
            serialized[key] = { type: value.type.split(/,\s*/) };
          }
        }
      } else if (
        key == "agentIds" ||
        key == "agentGroupIds" ||
        key == "skillIds" ||
        key == "lineContentTypes" ||
        key == "alertedMcsValues"
      ) {
        if (value) {
          // agentIds, agentGroupIds, skillIds
          if (key != "lineContentTypes") {
            serialized[key] = value.split(/,\s*/).map(x => Number(x));
          } else {
            // lineContentTypes, alertedMcsValues
            serialized[key] = Array(value);
          }
        }
      } else if (value) {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  export const eh_serializeParamForm = (formValue) => {
    let serialized = {};
    for (let key in formValue) {
      let value = formValue[key];
      if (key == "sort") {
        value
          ? (serialized[key] = `start:${value}`)
          : (serialized[key] = `start:desc`);
      } else {
        serialized[key] = value;
      }
    }
    return serialized;
  }