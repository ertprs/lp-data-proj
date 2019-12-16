export const drop_down_select = {
    "channel": {
      name: "Channels",
      description: "Engagement Channel Id",
      class: "channel",
      formControlName: "channel",
      selectPlaceholder: "Select a Channel",
      values: [
        { name: "UNKNOWN(-1)", value: -1 },
        { name: "WEB(1)", value: 1 },
        { name: "VOICE(2)", value: 2 }
      ]
    },
    "alertedMcsValues": {
      name: "Alerted MCS Values",
      description: "Alerted MCS of the Chat",
      class: "alertedMCS",
      formControlName: "alertedMcsValues",
      selectPlaceholder: "Select an MCS Value",
      values: [
        { name: "-1", value: -1 },
        { name: "0", value: 0 },
        { name: "1", value: 1 }
      ]
    },
    "lineContentTypes": {
      name: "Line Content",
      description: "Type of Chat Line",
      class: "lineType",
      formControlName: "lineContentTypes",
      selectPlaceholder: "Select a Type",
      values: [
        { name: "Rich Content", value: "RICH_CONTENT"}
      ]
    }
  }