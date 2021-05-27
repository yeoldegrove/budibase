export const JS_MARKER = "#javascript"

export function addToText({ value, caretPos, binding }) {
  binding = typeof binding === "string" ? binding : binding.path
  value = value == null ? "" : value
  if (!value.includes("{{") && !value.includes("}}")) {
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

export function BuildTextAddFunction(caretPosFn, usingJS, updateEditor) {
  return (value, binding) => {
    // this will populate out
    if (updateEditor && usingJS) {
      return updateEditor(binding)
    } else {
      return addToText({
        value,
        caretPos: caretPosFn ? caretPosFn() : 0,
        usingJS,
        binding,
        updateEditor,
      })
    }
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
