<script>
  import { onMount } from "svelte";
  import BudibaseComponent from "./BudibaseComponent.svelte"
  import { appStore } from "./store";

  export let definition
  export let components
  export let selectedComponentId

  $: {
    console.log({ definition, components, selectedComponentId })
  }

  $: screensExist = definition._screens && definition._screens.length > 0

  appStore.update(state => {
    state.components = components;
    state.selectedComponentId = selectedComponentId;
    return state;
  });
</script>

<!-- <svelte:head>
  <title>{definition.title}</title>
  <link rel="icon" type="image/x-icon" href={definition.favicon} />
  {@html `<style ✂prettier:content✂="ICR7c3R5bGVzfSA=" ✂prettier:content✂=""></style>`}
</svelte:head> -->

<main>
  <!-- TODO: Render the right component based on auth status.. -->
  <BudibaseComponent
    props={definition.props}
    selected={definition.props._id === selectedComponentId}
    >
    <!-- TODO: Render the chosen screen -->
    {#if screensExist}
      <BudibaseComponent props={definition._screens[0].props} />
    {/if}
  </BudibaseComponent>
</main>
