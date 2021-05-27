const { LITERAL_MARKER } = require("../helpers/constants")

const PostProcessorNames = {
  CONVERT_LITERALS: "convert-literals",
}

/* eslint-disable no-unused-vars */
class Postprocessor {
  constructor(name, fn) {
    this.name = name
    this.fn = fn
  }

  process(string) {
    return this.fn(string)
  }
}

module.exports.processors = [
  new Postprocessor(PostProcessorNames.CONVERT_LITERALS, string => {
    if (typeof string !== "string" || !string.includes(LITERAL_MARKER)) {
      return string
    }
    const splitMarkerIndex = string.indexOf("-")
    const type = string.substring(12, splitMarkerIndex)
    const value = string.substring(
      splitMarkerIndex + 1,
      string.length - 2
    )
    switch (type) {
      case "string":
        return value
      case "number":
        return parseFloat(value)
      case "boolean":
        return value === "true"
      case "object":
        return JSON.parse(value)
    }
    return value
  }),
]
