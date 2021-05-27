export const JS_MARKER = "#javascript"

export function addToText({ value, caretPos, binding, usingJS }) {
  binding = typeof binding === "string" ? binding : binding.path
  value = value == null ? "" : value
  if (!value.includes("{{") && !value.includes("}}") && !usingJS) {
    binding = `{{ ${binding} }}`
  }
  if (caretPos.start) {
    value =
      value.substring(0, caretPos.start) +
      binding +
      value.substring(caretPos.end, value.length)
  } else {
    value += binding
  }
  return value
}

export function BuildTextAddFunction(caretPosFn, usingJS) {
  return (value, binding) => {
    return addToText({
      value,
      caretPos: caretPosFn(),
      usingJS,
      binding,
    })
  }
}

export function removeJavascriptWrapper(string) {
  if (!string.includes(JS_MARKER)) {
    return string
  }
  return string
    .substr(2, string.length - 4)
    .replace(JS_MARKER, "")
    .trim()
}
