const { resolve } = require("path")

async function runServer() {
  const budibaseDir = "~/.budibase"
  require("dotenv").config({ path: join(homedir(), ".budibase", ".env") })

  process.env.BUDIBASE_DIR = resolve(budibaseDir)

  const server = await require("./app")()
  server.on("close", () => console.log("Server Closed"))
  console.log(`Budibase running on ${JSON.stringify(server.address())}`)
}

runServer()
