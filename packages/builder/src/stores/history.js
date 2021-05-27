import { writable } from "svelte/store"

export function createHistoryStore() {
  const { subscribe, update } = writable([])

    function push(event) {
        update(s => {
            return [event, ...s].slice(0, 10)
        })
    }

  return {
      subscribe,
      push
  }
}

export const history = createHistoryStore()
