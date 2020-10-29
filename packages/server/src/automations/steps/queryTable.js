const CouchDB = require("../../db")
const { getRowParams, filterWithLunr } = require("../../db/utils")

module.exports.definition = {
  name: "Query Table",
  tagline: "Query the {{inputs.enriched.table.name}} table",
  icon: "ri-save-3-line",
  description: "Fetch rows from a table",
  type: "ACTION",
  stepId: "QUERY_TABLE",
  inputs: {},
  schema: {
    inputs: {
      properties: {
        tableId: {
          type: "string",
          customType: "table",
          title: "Table",
        },
        filter: {
          type: "string",
          title: "Filter",
        },
      },
      required: ["tableId"],
    },
    outputs: {
      properties: {
        row: {
          type: "object",
          customType: "row",
          description: "A row",
        },
      },
      required: ["row"],
    },
  },
}

module.exports.run = async function*({ inputs, instanceId }) {
  // TODO: better logging of when actions are missed due to missing parameters
  if (inputs.tableId == null) {
    return []
  }

  try {
    let currentFetchResult = {}
    while (!currentFetchResult.done) {
      currentFetchResult = await fetchTableRows(
        instanceId,
        inputs.tableId,
        inputs.filter
      )

      for (let row of currentFetchResult.rows) {
        yield row
      }
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      response: err,
    }
  }
}

const fetchTableRows = async (instanceId, tableId, filter, position = 0) => {
  const db = new CouchDB(instanceId)

  const LIMIT = 100

  const response = await db.allDocs(
    getRowParams(tableId, null, {
      include_docs: true,
      limit: LIMIT,
      skip: position,
    })
  )

  const allRows = response.rows.map(row => row.doc)
  const rows = filter
    ? await filterWithLunr(db, tableId, allRows, filter)
    : allRows

  return {
    rows,
    done: allRows.length < LIMIT,
    position: position + LIMIT,
  }
}
