<script>
  import { writable } from "svelte/store"
  import { setContext, onMount } from "svelte"
  import Component from "./Component.svelte"
  import SDK from "../sdk"
  import { createDataStore, initialise, screenStore, authStore } from "../store"
  import DataProvider from "./DataProvider.svelte"

  // Provide contexts
  setContext("sdk", SDK)
  setContext("component", writable({ id: "user" }))
  setContext("data", createDataStore())

  let loaded = false

  // Load app config
  onMount(async () => {
    await initialise()
    loaded = true
  })
</script>

{#if loaded && $screenStore.activeLayout}
  <DataProvider row={$authStore}>
    <Component definition={$screenStore.activeLayout.props} />
  </DataProvider>
{/if}
