const fetch = require("node-fetch")
const fs = require("fs")
const { join } = require("path")
const uuid = require("uuid/v4")

const MAX_PER_TENANT = 10
const BASE_URL = "http://localhost:10000"
const APP_COUNT = process.argv[2]
const FIXED_TENANT = process.argv[3]

function getAPIKey() {
  const envPath = join(__dirname, "..", "..", ".env")
  const contents = fs.readFileSync(envPath, "utf8")
  for (let line of contents.split("\n")) {
    if (line.includes("INTERNAL_API_KEY")) {
      return line.split("=")[1]
    }
  }
  throw "No API key found"
}

async function run() {
  let tenantId = FIXED_TENANT || uuid()
  const apiKey = getAPIKey()
  const count = !APP_COUNT || APP_COUNT === "" ? 50 : parseInt(APP_COUNT)
  for (let i = 0; i < count; i++) {
    // change the tenant periodically
    if (!FIXED_TENANT && i % MAX_PER_TENANT === 0) {
      tenantId = uuid()
    }
    const appName = uuid()
    const response = await fetch(`${BASE_URL}/api/applications`, {
      method: "POST",
      body: JSON.stringify({
        name: appName,
        useTemplate: false,
      }),
      headers: {
        "x-budibase-api-key": apiKey,
        "x-budibase-tenant-id": tenantId,
        "Content-Type": "application/json",
      },
    })
    if (response.status !== 200) {
      throw await response.text()
    } else {
      console.log(`App created: ${appName}`)
    }
  }
  return count
}

run()
  .then(count => {
    console.log(`Apps created: ${count}`)
  })
  .catch(err => {
    console.error(err)
  })
