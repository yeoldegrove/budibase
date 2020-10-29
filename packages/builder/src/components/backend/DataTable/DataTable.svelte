<script>
  import { backendUiStore } from "builderStore"
  import CreateRowButton from "./buttons/CreateRowButton.svelte"
  import CreateColumnButton from "./buttons/CreateColumnButton.svelte"
  import CreateViewButton from "./buttons/CreateViewButton.svelte"
  import ExportButton from "./buttons/ExportButton.svelte"
  import Searchbox from "./Searchbox.svelte"
  import * as api from "./api"
  import Table from "./Table.svelte"

  let data = []
  let loading = false

  $: title = $backendUiStore.selectedTable.name
  $: schema = $backendUiStore.selectedTable.schema
  $: tableView = {
    schema,
    name: $backendUiStore.selectedView.name,
  }

  // Fetch rows for specified table
  $: {
    if ($backendUiStore.selectedView?.name?.startsWith("all_")) {
      fetch()
    }
  }

  const fetch = (searchExpression) => {
    loading = true
    api.fetchDataForView($backendUiStore.selectedView, searchExpression).then(rows => {
      data = rows || []
      loading = false
    })
  }

  const onSearch = (ev) => {
    fetch(ev.detail)
  }
</script>

<Table {title} {schema} {data} allowEditing={true} {loading}>
  <CreateColumnButton />
  {#if Object.keys(schema).length > 0}
    <CreateRowButton />
    <CreateViewButton />
    <ExportButton view={tableView} />
    <Searchbox on:search={onSearch} />
  {/if}
</Table>
