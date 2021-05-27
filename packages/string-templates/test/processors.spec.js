const { processString } = require("../src/index.cjs")
const { JAVASCRIPT_MARKER } = require("../src/helpers/constants")

function wrapFn(fnStr) {
  return `{{${JAVASCRIPT_MARKER} ${fnStr} }}`
}

describe("test javascript pre-processor", () => {
  it("should be able to process a very basic javascript function", async () => {
    const output = await processString(wrapFn("return x + y"), {
      x: 10,
      y: 20,
    })
    expect(output).toEqual(30)
  })

  it("should be able to do something a bit more complicated with dates", async () => {
    const date = new Date()
    const output = await processString(wrapFn("return new Date(dateThing).getFullYear()"), {
      dateThing: date,
    })
    expect(output).toEqual(date.getFullYear())
  })

  it("should be able to do some array functionality", async () => {
    const output = await processString(wrapFn("return array.map(el => el.a)"), {
      array: [{ a: 1 }, { a: 2 }, { a: 3 }]
    })
    expect(output).toEqual([1, 2, 3])
  })
})
