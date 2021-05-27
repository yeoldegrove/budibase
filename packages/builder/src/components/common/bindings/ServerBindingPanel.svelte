<script>
  import groupBy from "lodash/fp/groupBy"
  import {
    Input,
    TextArea,
    Heading,
    Layout,
    DrawerContent,
    Toggle,
  } from "@budibase/bbui"
  import { createEventDispatcher } from "svelte"
  import { isValid } from "@budibase/string-templates"
  import { handlebarsCompletions } from "constants/completions"
  import { readableToRuntimeBinding } from "builderStore/dataBinding"
  import { BuildTextAddFunction, JS_MARKER, removeJavascriptWrapper } from "./utils"
  import Editor from "components/integration/QueryEditor.svelte"

  const dispatch = createEventDispatcher()

  export let bindingContainer
  export let bindableProperties = []
  export let validity = true
  export let value = ""
  export let usingJS = value.includes(JS_MARKER)

  let hasReadable = bindableProperties[0].readableBinding != null
  let helpers = handlebarsCompletions()
  let getCaretPosition
  let search = ""
  let jsValue = removeJavascriptWrapper(value)

  $: addToText = BuildTextAddFunction(getCaretPosition, usingJS)
  $: categories = Object.entries(groupBy("category", bindableProperties))
  $: value && checkValid()
  $: value = jsValue ? `{{ ${JS_MARKER} ${jsValue} }}` : value
  $: dispatch("update", value)
  $: searchRgx = new RegExp(search, "ig")
  $: usingJS && toggleJS()

  function toggleJS() {
    const hasJS = value.includes(JS_MARKER)
    if (!usingJS) {
      console.log(hasJS)
      jsValue = ""
      value = hasJS ? "" : value
    } else {
      jsValue = hasJS ? removeJavascriptWrapper(value) : `return "${value}"`
    }
  }

  function checkValid() {
    if (hasReadable) {
      const runtime = readableToRuntimeBinding(bindableProperties, value)
      validity = isValid(runtime)
    } else {
      validity = isValid(value)
    }
  }
</script>

<DrawerContent>
  <div slot="sidebar" class="list">
    <Layout>
      <div class="section">
        <Heading size="S">Available bindings</Heading>
        <Input extraThin placeholder="Search" bind:value={search} />
      </div>
      <div class="section">
        {#each categories as [categoryName, bindings]}
          <Heading size="XS">{categoryName}</Heading>
          {#each bindings.filter(binding =>
            binding.label.match(searchRgx)
          ) as binding}
            <div
              class="binding"
              on:click={() => {
                value = addToText(value, binding)
              }}
            >
              <span class="binding__label">{binding.label}</span>
              <span class="binding__type">{binding.type}</span>
              <br />
              <div class="binding__description">
                {binding.description || ""}
              </div>
            </div>
          {/each}
        {/each}
      </div>
      <div class="section">
        <Heading size="XS">Helpers</Heading>
        {#each helpers.filter(helper => helper.label.match(searchRgx) || helper.description.match(searchRgx)) as helper}
          <div
            class="binding"
            on:click={() => {
              value = addToText(value, helper.text)
            }}
          >
            <span class="binding__label">{helper.label}</span>
            <br />
            <div class="binding__description">
              {@html helper.description || ""}
            </div>
            <pre>{helper.example || ""}</pre>
          </div>
        {/each}
      </div>
    </Layout>
  </div>
  <div class="text">
    {#if !usingJS}
      <TextArea
          bind:getCaretPosition
          bind:value
          placeholder="Add text, or click the objects on the left to add them to the textbox."
      />
      {#if !validity}
        <p class="syntax-error">
          Current Handlebars syntax is invalid, please check the guide
          <a href="https://handlebarsjs.com/guide/">here</a>
          for more details.
        </p>
      {/if}
    {:else}
      <!-- TODO: CARET POSITION -->
      <Editor
          mode="javascript"
          on:change={e => {
              jsValue = e.detail.value
            }}
          value={jsValue}
      />
    {/if}
  </div>
</DrawerContent>

<style>
  .list {
    grid-gap: var(--spacing-s);
    border-right: var(--border-light);
    overflow-y: auto;
  }
  .section {
    display: grid;
    grid-gap: var(--spacing-s);
  }

  .text {
    padding: var(--spacing-l);
    font-family: var(--font-sans);
  }
  .text :global(textarea) {
    min-height: 150px !important;
  }
  .text :global(p) {
    margin: 0;
  }

  .binding {
    font-size: 12px;
    border: var(--border-light);
    border-width: 1px 0 0 0;
    padding: var(--spacing-m) 0;
    margin: auto 0;
    align-items: center;
    cursor: pointer;
  }
  .binding:hover {
    background-color: var(--grey-2);
    cursor: pointer;
  }
  .binding__label {
    font-weight: 600;
    text-transform: capitalize;
  }
  .binding__description {
    color: var(--grey-8);
    margin-top: 2px;
    white-space: normal;
  }

  pre {
    white-space: normal;
  }

  .binding__type {
    font-family: monospace;
    background-color: var(--grey-2);
    border-radius: var(--border-radius-m);
    padding: 2px;
    margin-left: 2px;
    font-weight: 600;
  }

  .syntax-error {
    color: var(--red);
    font-size: 12px;
  }

  .syntax-error a {
    color: var(--red);
    text-decoration: underline;
  }
</style>
