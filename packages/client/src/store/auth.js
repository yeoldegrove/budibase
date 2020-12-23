import * as API from "../api"
import { getAppId } from "../utils/getAppId"
import { initialise } from "./initialise"
import { routeStore } from "./routes"
import { localStorageStore } from "./localStorage"

const createAuthStore = () => {
  const store = localStorageStore({
    loggedIn: false,
    user: {},
  })

  const goToDefaultRoute = () => {
    // Setting the active route forces an update of the active screen ID,
    // even if we're on the same URL
    routeStore.actions.setActiveRoute("/")

    // Navigating updates the URL to reflect this route
    routeStore.actions.navigate("/")
  }
  const logIn = async ({ email, password }) => {
    const user = await API.logIn({ email, password })
    if (!user.error) {
      store.set({
        user,
        loggedIn: true,
      })
      await initialise()
      goToDefaultRoute()
    }
  }
  const logOut = async () => {
    store.set({
      loggedIn: false,
      user: {},
    })
    const appId = getAppId()
    if (appId) {
      for (let environment of ["local", "cloud"]) {
        window.document.cookie = `budibase:${appId}:${environment}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
      }
    }
    await initialise()
    goToDefaultRoute()
  }

  return {
    subscribe: store.subscribe,
    actions: { logIn, logOut },
  }
}

export const authStore = createAuthStore()
