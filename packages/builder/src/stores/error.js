import * as portalStores from './portal/'
// import * as builderStores from './portal/'
import { writable, derived } from "svelte/store"

export function createErrorStore() {
  const { subscribe, set } = writable()

  function ErrorHandler(event) {
    set(event)
  }

  window.addEventListener('error', ErrorHandler)

  return {
    subscribe
  }
}

export const error = createErrorStore()
