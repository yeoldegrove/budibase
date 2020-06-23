const send = require("koa-send")
const { resolve, join } = require("path")
const fetch = require("node-fetch");
const {
  budibaseAppsDir,
  budibaseTempDir,
} = require("../../utilities/budibaseDir")
const env = require("../../environment")

exports.serveBuilder = async function(ctx) {
  let builderPath = resolve(__dirname, "../../../builder")
  ctx.cookies.set("builder:token", env.ADMIN_SECRET)
  await send(ctx, ctx.file, { root: ctx.devPath || builderPath })
}

exports.serveApp = async function(ctx) {

  // default to homedir
  // const appPath = resolve(
  //   budibaseAppsDir(),
  //   ctx.params.appId,
  //   "public",
  //   ctx.isAuthenticated ? "main" : "unauthenticated"
  // )
  
  const appId = ctx.request.header.host.split('.')[0];
  const mainOrAuth = ctx.isAuthenticated ? "main" : "unauthenticated";
  const requestUrl = `https://s3-eu-west-1.amazonaws.com/apps.budibase.com/${appId}/public/${mainOrAuth}/${ctx.file}`
  const response = await fetch(requestUrl)
  // if fetch fails - return error page
  const body = await response.text()
  ctx.body = body 
}

exports.serveComponentLibrary = async function(ctx) {
  // default to homedir
  let componentLibraryPath = resolve(
    budibaseAppsDir(),
    ctx.params.appId,
    "node_modules",
    decodeURI(ctx.query.library),
    "dist"
  )

  if (ctx.isDev) {
    componentLibraryPath = join(
      budibaseTempDir(),
      decodeURI(ctx.query.library),
      "dist"
    )
  }

  await send(ctx, "/index.js", { root: componentLibraryPath })
}
