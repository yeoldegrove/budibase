import { history } from './history'
import { writable } from 'svelte/store'

export function historyWritableStore(initial) {
    const store = writable(initial)

    store.subscribe(value => {
        history.push(value)
    })
    return {
        subscribe: store.subscribe,
        set: store.set,
        update: store.update
    }
}


export { historyWritableStore as writable } 