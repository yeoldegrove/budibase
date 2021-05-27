<script>
  import {
    ActionButton,
    Body,
    Modal,
    ModalContent,
    TextArea,
  } from "@budibase/bbui"
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
        file: $error?.filename,
        message: $error?.message,
      },
      history: $history,
    }
    let dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
    anchor.setAttribute("href", dataStr)
    anchor.setAttribute("download", "error_report.json")
    anchor.click()
  }

  function handleClick() {
    modal.show()
    // throwError()
  }
</script>

<!-- <svelte:window use:errorReporter /> -->

<ActionButton icon="Bug" on:click={handleClick}>Report</ActionButton>
<a bind:this={anchor} download />

<Modal bind:this={modal}>
  <ModalContent
    size="M"
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
