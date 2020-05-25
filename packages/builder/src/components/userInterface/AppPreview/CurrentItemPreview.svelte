<script>
  import { onMount, onDestroy } from "svelte"
  import { store, backendUiStore } from "builderStore"
  import { map, join } from "lodash/fp"
  import iframeTemplate from "./iframeTemplate"
  import { pipe } from "components/common/core"
  import { loadBudibase } from "../../../client-neo/loadBudibase"

  let iframe
  let styles = ""
  let app

  function transform_component(comp) {
    const props = comp.props || comp
    if (props && props._children && props._children.length) {
      props._children = props._children.map(transform_component)
    }

    return props
  }

  $: {
    styles = ""
    // Apply the CSS from the currently selected page and its screens
    const currentPage = $store.pages[$store.currentPageName]
    styles += currentPage._css
    for (let screen of currentPage._screens) {
      styles += screen._css
    }
    styles = styles
  }

  $: frontendDefinition = {
    appId: $store.appId,
    libraries: $store.libraries,
    page: $store.pages[$store.currentPageName]
  }

  // $: frontendDefinition = {
  //   appId: $store.appId,
  //   libraries: $store.libraries,
  //   page: $store.currentPreviewItem,
  //   screens: screensExist
  //     ? $store.currentPreviewItem._screens
  //     : [
  //         {
  //           name: "Screen Placeholder",
  //           route: "*",
  //           props: {
  //             _component: "@budibase/standard-components/container",
  //             type: "div",
  //             _children: [
  //               {
  //                 _component: "@budibase/standard-components/container",
  //                 _styles: { position: {}, layout: {} },
  //                 _id: "__screenslot__text",
  //                 _code: "",
  //                 className: "",
  //                 onLoad: [],
  //                 type: "div",
  //                 _children: [
  //                   {
  //                     _component: "@budibase/standard-components/text",
  //                     _styles: { position: {}, layout: {} },
  //                     _id: "__screenslot__text_2",
  //                     _code: "",
  //                     text: "content",
  //                     font: "",
  //                     color: "",
  //                     textAlign: "inline",
  //                     verticalAlign: "inline",
  //                     formattingTag: "none",
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //   appRootPath: "",
  // }

  $: selectedComponentId = $store.currentComponentInfo
    ? $store.currentComponentInfo._id
    : ""

  $: if (app) { 
    iframe.head.innerHTML = `<style>${styles}</style>`;
    app.$set({
      definition: $store.pages[$store.currentPageName],
      selectedComponentId
    })
  }

  async function onLoad() {
    iframe.head = iframe.contentDocument.head
    const body = iframe.contentDocument.body
    

    app = await loadBudibase({
      frontendDefinition,
      page: $store.currentPreviewItem,
      opts: {},
      iframebody: body,
    })
  }

  onMount(() => iframe.addEventListener("load", onLoad))

  onDestroy(() => {
    if (iframe) iframe.removeEventListener("load", onLoad)
    if (app) app.$destroy()
  })
</script>

<div class="component-container">
  {#if $store.currentPreviewItem}
    <iframe
      title="componentPreview"
      bind:this={iframe} />
  {/if}
</div>

<style>
  .component-container {
    grid-row-start: middle;
    grid-column-start: middle;
    position: relative;
    overflow: hidden;
    margin: auto;
    height: 100%;
  }

  .component-container iframe {
    border: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
