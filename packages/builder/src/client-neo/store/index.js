import { writable } from 'svelte/store';
import { APP_ACTIONS, ROUTER_ACTIONS } from "./actions";

const INITIAL_STATE = {
  authenticated: false
};

const appStore = writable(INITIAL_STATE);
appStore.actions = APP_ACTIONS

const routerStore = writable("/")
routerStore.actions = ROUTER_ACTIONS


export {
  appStore,
  routerStore
}