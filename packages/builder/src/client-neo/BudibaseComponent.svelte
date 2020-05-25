<script>
  import { appStore } from "./store";

  export let components
  export let props
  export let selected

  function getComponent(_component) {
    const [pkg, library, component] = _component.split("/")
    return $appStore.components[`${pkg}/${library}`][component]
  }

  function bindHandlers() {}

  const _bb = {
    props: { _children: [] },
  }

  console.log(selected);
</script>

<!-- How does state get bound? -->
<!-- For every prop -->
<!-- Determine which component it is and render it, passing all the props to it as well -->
<div 
  class={`pos-${props._id} lay-${props._id}`}
  class:selected={$appStore.selectedComponentId === props._id}
>
  <svelte:component
    this={getComponent(props._component)}
    {_bb}
    {...props}>
    {#each props._children as child}
      <svelte:self props={child} {components} />
    {/each}
    <slot />
  </svelte:component>
</div>

<style>
  .selected {
    border: 1px solid blue;
    background: red;
  }
</style>
