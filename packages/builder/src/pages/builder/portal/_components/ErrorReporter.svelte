<script>
  import { Body, Modal, ModalContent, TextArea } from "@budibase/bbui"
  import { error } from "stores/error"
  import { history } from "stores/history"

  function throwError() {
    throw "Test error"
  }

  let modal
  let anchor

  let message

  function downloadData() {
    const data = {
      message,
      error: {
        file: $error.filename,
        message: $error.message,
      },
      history: $history,
    }
    let dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
    anchor.setAttribute("href", dataStr)
    anchor.setAttribute("download", "scene.json")
    anchor.click()
  }
</script>

<!-- <svelte:window use:errorReporter /> -->

<button on:click={throwError} on:click={modal.show}> Report </button>
<a bind:this={anchor} download />

<Modal bind:this={modal}>
  <ModalContent
    title="Submit Error Logs"
    confirmText="Submit"
    onConfirm={downloadData}
  >
    <Body size="S">
      Help us figure out what went wrong. Fill in the form below and hit submit.
    </Body>
    <TextArea bind:value={message} placeholder="Enter your message" />
  </ModalContent>
</Modal>

<style>
  a {
    visibility: none;
  }
</style>
