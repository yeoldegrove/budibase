import { appStore, routerStore } from "./";
import { get } from 'svelte/store';
import _ from "lodash/fp";

export const APP_ACTIONS = {
  authenticate: ({ username, password }) => {
      // if (!username) {
      //   api.error("Authenticate: username not set")
      //   return
      // }
    
      // if (!password) {
      //   api.error("Authenticate: password not set")
      //   return
      // }
    
      // const user = await api.post({
      //   url: "/api/authenticate",
      //   body: { username, password },
      // })
    
      // this.setState({ path: "user", value: user })
  },
  setState: ({ path, value }) => {
    appStore.update(state =>  {
      state = _.set(path, value, state);
      return state;
    })
  },
  getState: ({ key, fallback }) => {
    return _.getOr(fallback, key, get(appStore));
  },
  getContext: () => {},
  setContext: () => {},
  triggerWorkflow: workflowId => {

  },
  webhook: async (url, body) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    });
    return await response.json();
  }
}

export const ROUTER_ACTIONS = {
  navigate: ({ url }) => {
    routerStore.update(state => {
      state.currentRoute = url;
      return state;
    })
  }
}