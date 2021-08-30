<script>
  import { getContext, setContext } from "svelte"
  import Placeholder from "../Placeholder.svelte"

  export let step = 1

  const { styleable, builderStore } = getContext("sdk")
  const component = getContext("component")
  const formContext = getContext("form")
  $: numericStep = step == null || isNaN(step) ? 1 : parseInt(step)

  // Set form step context so fields know what step they are within
  setContext("form-step", numericStep)

  $: formState = formContext?.formState
  $: currentStep = $formState?.currentStep

  // If in the builder preview, show this step if a child is selected
  $: {
    if (
      formContext &&
      $builderStore.inBuilder &&
      $builderStore.selectedComponentPath?.includes($component.id)
    ) {
      formContext.formApi.setStep(numericStep)
    }
  }
</script>

{#if !formContext}
  <Placeholder text="Form steps need to be wrapped in a form" />
{:else if numericStep === currentStep}
  <div use:styleable={$component.styles}>
    <slot />
  </div>
{/if}
