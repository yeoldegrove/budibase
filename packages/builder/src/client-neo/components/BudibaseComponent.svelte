<script>
  import { appStore, routerStore } from "../store"

  export let components
  export let props
  export let selected

  const DEFAULT_PROPS = {
    props: { _children: [] },
    _bb: { props: { _children: [] } },
    store: appStore,
    router: routerStore,
  }

  function getComponentConstructor(_component) {
    const [pkg, library, component] = _component.split("/")
    return $appStore.components[`${pkg}/${library}`][component]
  }

  // TODO: Support multiple events
  function bindEventHandlerFunction(handlers) {
    for (let handler of handlers) {
      // bind the handlers
      const type = handler["##eventHandlerType"]

      if (type === "Set State") {
        const { path, value } = handler.parameters
        return () => appStore.actions.setState({ path, value })
      }

      if (type === "Navigate To") {
        const { url } = handler.parameters
        return () => appStore.actions.navigate({ url })
      }

      if (type === "TRIGGER_WORKFLOW") {
        const { workflowId } = handler.parameters
        return () =>
          appStore.actions.triggerWorkflow({ workflowId })
      }
    }
  }

  function bindPropValueToState(statePath) {
    console.log(statePath);
    return appStore.actions.getState({ key: statePath });
  }

  function bindPropsToState(props) {
    const mappedProps = {
      ...props,
    }

    // for each prop
    for (let prop in props) {
      // check if it's an event
      const isEvent = ["onClick", "onLoad", "onChange"].includes(prop)
      if (isEvent) {
        mappedProps[prop] = bindEventHandlerFunction(props[prop]);
        continue
      }

      // If the value is like state.foo.bar bind it to state
      if (typeof props[prop] === "string" && props[prop].startsWith(".")) {
        const state = bindPropValueToState(props[prop].replace(".", ""));
        mappedProps[prop] = state;
        continue;
      }
    }
    console.log(mappedProps);
    return mappedProps
  }
</script>

<!-- How does state get bound? -->
<!-- For every prop -->
<!-- Determine which component it is and render it, passing all the props to it as well -->
<div
  class={`pos-${props._id} lay-${props._id}`}
  class:selected={$appStore.selectedComponentId === props._id}>
  <!-- TODO: Bind props to state -->
  <svelte:component
    this={getComponentConstructor(props._component)}
    {...DEFAULT_PROPS}
    {...bindPropsToState(props)}>
    {#each props._children as child}
      <svelte:self props={child} {components} />
    {/each}
    <slot />
  </svelte:component>
</div>

<style>
  /* .selected {
    background: red;
  } */
</style>
