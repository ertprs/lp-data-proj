export const mih_double_select = {
  questionTypeAndFormatToRetrieve: {
    name: "Question Type & Format-to-Retrieve",
    description: "Select Type AND Format",
    class: "question-type-format",
    formGroupName: "questionTypeAndFormatToRetrieve",
    sets: [
        { placeholder: "Type", values: [ "custom", "csat", "nps", "fcr" ], formControlName: "type" },
        { placeholder: "Format", values: [ "single", "open" ], formControlName: "format" }
    ]
  }
};
