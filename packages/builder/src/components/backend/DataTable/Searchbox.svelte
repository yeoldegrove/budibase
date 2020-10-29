<script>
import { Input, Button } from "@budibase/bbui"
import { createEventDispatcher } from "svelte"
const dispatch = createEventDispatcher()

let expression

const search = () => {
  dispatch("search", expression)
}

</script>

<div class="root">
  <Input outline placeholder="search" bind:value={expression} />
  <Button secondary on:click={search}>Search</Button>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
  }
</style>