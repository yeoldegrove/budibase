const send = require("koa-send")
const { resolve, join } = require("path")
const fetch = require("node-fetch");
const {
  budibaseAppsDir,
  budibaseTempDir,
} = require("../../utilities/budibaseDir")
const setBuilderToken = require("../../utilities/builder/setBuilderToken")
const { ANON_LEVEL_ID } = require("../../utilities/accessLevels")
const jwt = require("jsonwebtoken")

exports.serveBuilder = async function(ctx) {
  let builderPath = resolve(__dirname, "../../../builder")
  if (ctx.file === "index.html") {
    setBuilderToken(ctx)
  }
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
  // only set the appId cookie for /appId .. we COULD check for valid appIds
  // but would like to avoid that DB hit
  const appId = ctx.request.header.host.split('.')[0];

  // const looksLikeAppId = /^[0-9a-f]{32}$/.test(ctx.params.appId)
  const looksLikeAppId = /^[0-9a-f]{32}$/.test(appId)
  if (looksLikeAppId && !ctx.isAuthenticated) {
    const anonUser = {
      userId: "ANON",
      accessLevelId: ANON_LEVEL_ID,
      appId: appId
    }
    const anonToken = jwt.sign(anonUser, ctx.config.jwtSecret)
    ctx.cookies.set("budibase:token", anonToken, {
      path: "/",
      httpOnly: false,
    })
  }

  const mainOrAuth = ctx.isAuthenticated ? "main" : "unauthenticated";
  const file = ctx.file ? ctx.file : "index.html"
  
  const requestUrl = `https://s3-eu-west-1.amazonaws.com/apps.budibase.com/${appId}/public/${mainOrAuth}/${file}`
  console.log('request url:' , requestUrl)
  const response = await fetch(requestUrl)
  const body = await response.text()
  ctx.body = body 
  // await send(ctx, ctx.file || "index.html", { root: ctx.devPath || appPath })
}

exports.serveAppAsset = async function(ctx) {
  // default to homedir
  // const appPath = resolve(
  //   budibaseAppsDir(),
  //   ctx.user.appId,
  //   "public",
  //   ctx.isAuthenticated ? "main" : "unauthenticated"
  // )

  // default to homedir
  // const appPath = resolve(
  //   budibaseAppsDir(),
  //   ctx.params.appId,
  //   "public",
  //   ctx.isAuthenticated ? "main" : "unauthenticated"
  // )
  const appId = ctx.user.appId
  const mainOrAuth = ctx.isAuthenticated ? "main" : "unauthenticated";
  const requestUrl = `https://s3-eu-west-1.amazonaws.com/apps.budibase.com/${appId}/public/${mainOrAuth}/${ctx.file}`
  const response = await fetch(requestUrl)
  // if fetch fails - return error page
  const body = await response.text()
  ctx.body = body 
}

exports.serveComponentLibrary = async function(ctx) {
  // default to homedir
  // let componentLibraryPath = resolve(
  //   budibaseAppsDir(),
  //   ctx.user.appId,
  //   "node_modules",
  //   decodeURI(ctx.query.library),
  //   "dist"
  // )
  // if (ctx.isDev) {
  //   componentLibraryPath = join(
  //     budibaseTempDir(),
  //     decodeURI(ctx.query.library),
  //     "dist"
  //   )
  // }

  const appId = ctx.user.appId
  const requestUrl = encodeURI(`https://s3-eu-west-1.amazonaws.com/apps.budibase.com/${appId}/node_modules/${ctx.query.library}/dist/index.js`)
  console.log('request url components: ', requestUrl)
  const response = await fetch(requestUrl)
  const body = await response.text()
  ctx.type = 'application/javascript'
  ctx.body = body;
  // await send(ctx, "/index.js", { root: componentLibraryPath })
}
