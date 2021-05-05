<script>
  import { createEventDispatcher, getContext } from "svelte"

  const dispatch = createEventDispatcher()
  const actionMenu = getContext("actionMenu")

  export let icon = undefined
  export let disabled = undefined
  export let noClose = false

  const onClick = () => {
    if (actionMenu && !noClose) {
      actionMenu.hide()
    }
    dispatch("click")
  }
</script>

<li
  on:click|preventDefault={onClick}
  class="spectrum-Menu-item"
  class:is-disabled={disabled}
  role="menuitem"
  tabindex="0"
  {...$$restProps}
>
  {#if icon}
    <svg
      class="spectrum-Icon spectrum-Icon--sizeM spectrum-Menu-itemIcon"
      focusable="false"
      aria-hidden="true"
      aria-label={icon}
    >
      <use xlink:href="#spectrum-icon-18-{icon}" />
    </svg>
  {/if}
  <span class="spectrum-Menu-itemLabel"><slot /></span>
</li>
