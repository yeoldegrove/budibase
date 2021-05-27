const { JAVASCRIPT_MARKER, JAVASCRIPT_COMMENT } = require("../helpers/constants")
const { removeBraces } = require("../utilities")
const vm = require("vm")

module.exports = (statement, context) => {
  const cleared = removeBraces(statement).trim()
  let jsCode = cleared.replace(JAVASCRIPT_MARKER, "")
  // wrap main code in a function
  jsCode = `${JAVASCRIPT_COMMENT}\nlet fn = () => {\n${jsCode}\n}; out = fn();`
  // make out the response from the function
  let ctx = {
    ...context,
    out: {},
  }
  ctx = vm.createContext(ctx)
  vm.runInContext(jsCode, ctx)
  return ctx.out
}