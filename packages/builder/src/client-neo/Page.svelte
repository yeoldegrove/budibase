<script>
  export let components
  export let props

  function getComponent(components, _component) {
    const [pkg, library, component] = _component.split("/")

    console.log(component);
    return components[`${pkg}/${library}`][component]
  }

  function bindHandlers() {}
</script>

<!-- How does state get bound? -->
<!-- For every prop -->
<!-- Determine which component it is and render it, passing all the props to it as well -->
<svelte:component this={getComponent(components, props._component)} {...props} _bb={{ props: { _children: [] }}}>
  {#each props._children as child}
    <svelte:self props={child} {components} />
  {/each}
  <slot name="screen" />
</svelte:component>
