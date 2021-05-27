const { FIND_HBS_REGEX, removeBraces } = require("../utilities")
const { JAVASCRIPT_MARKER } = require("../helpers/constants")
const preprocessor = require("./preprocessor")
const postprocessor = require("./postprocessor")
const jsProcessor = require("./jsProcessor")

function process(output, processors, context) {
  // process javascript before anything else
  if (removeBraces(output).trim().startsWith(JAVASCRIPT_MARKER)) {
    return jsProcessor(output, context)
  }
  for (let processor of processors) {
    // if a literal statement has occurred stop
    if (typeof output !== "string") {
      break
    }
    // re-run search each time incase previous processor updated/removed a match
    let regexp = new RegExp(FIND_HBS_REGEX)
    let matches = output.match(regexp)
    if (matches == null) {
      continue
    }
    for (let match of matches) {
      output = processor.process(output, match, context)
    }
  }
  return output
}

module.exports.preprocess = (string, context, finalise = true) => {
  let processors = preprocessor.processors
  // the pre-processor finalisation stops handlebars from ever throwing an error
  // might want to pre-process for other benefits but still want to see errors
  if (!finalise) {
    processors = processors.filter(
      processor => processor.name !== preprocessor.PreprocessorNames.FINALISE
    )
  }
  return process(string, processors, context)
}

module.exports.postprocess = (string, context) => {
  return process(string, postprocessor.processors, context)
}
