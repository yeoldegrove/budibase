import { writable } from "svelte/store"

export function createHistoryStore() {
  const { subscribe, update } = writable([])

    function push(event) {
        update(s => [...s.slice(0, 10), event])
    }

  return {
      subscribe,
      push
  }
}

export const history = createHistoryStore()
