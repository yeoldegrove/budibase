import { writable } from 'svelte/store';

const INITIAL_STATE = {
  authenticated: false
};

export const appStore = writable(INITIAL_STATE);

export const routerStore = writable("/")