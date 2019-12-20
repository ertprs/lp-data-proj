export const mih_serializeQueryForm = (formValue) => {
    let serialized = {};
    for (let key in formValue) {
      let value = formValue[key];
      // start, duration, chatMCS, coBrowseDuration, keyword_search_area
      if (typeof value == "object") {
        if (value.from) {
          // start, end, responseTime,
          if (typeof value.from == "object") {
            if (!value.from.date || (value.to && !value.to.date)) {
              if (key == "start") {
                serialized[key] = {
                  from: Date.now() - 60000 * 60 * 24 * 30,
                  to: Date.now()
                };
              }
            } else {
              if (key == "latestUpdateTime") {
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
                  ).valueOf()
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
          }
          // duration, mcs, csat, nps
          if (typeof value.from != "object") {
            if (value.from && value.to) {
              serialized[key] = {
                from: Number(value.from),
                to: Number(value.to)
              };
            }
          }
        }
        // sdeSearch, questionTypeAndFormatToRetrieve, agentSurveySearch
        else if (!value.from) {
          if (key == "questionTypeAndFormatToRetrieve") {
            if (value.type && value.format) {
              serialized[key] = { type: value.type, format: value.format };
            }
          } else if (key == "sdeSearch") {
            for (let sde in value) {
              if (value[sde]) {
                if (!serialized[key]) serialized[key] = {};
                serialized[key][sde] = value[sde];
              }
            }
          } else if (key == "agentSurveySearch") {
            for (let item in value) {
              if (value[item]) {
                if (!serialized[key]) serialized[key] = {};
                serialized[key][item] = value[item].split(/,\s*/);
              }
            }
          }
        }
      } else if (
        key == "agentIds" ||
        key == "latestAgentIds" ||
        key == "skillIds" ||
        key == "latestSkillIds" ||
        key == "agentGroupIds" ||
        key == "alertedMcsValues" ||
        key == "source" ||
        key == "device" ||
        key == "messageContentTypes" ||
        key == "surveyIds" ||
        key == "fcr" ||
        key == "answerText" ||
        key == "intentName" ||
        key == "contentToRetrieve" ||
        key == "status"
      ) {
        if (value) {
          serialized[key] = value.split(/,\s*/);
        }
      } else if (key == "intentConfidenceScore") {
        if (value) {
          serialized[key] = Number(value);
        }
      } else if (value) {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  export const mih_serializeParamForm = (formValue) => {
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