context("Create a automation", () => {
  before(() => {
    cy.login()
    cy.createTestApp()
  })

  // https://on.cypress.io/interacting-with-elements
  it("should create a automation", () => {
    cy.createTestTableWithData()

    cy.contains("Automate").click()
    cy.get("[data-cy=new-automation]").click()
    cy.get(".spectrum-Dialog").within(() => {
      cy.get("input").type("Add Row").blur()
      cy.get(".spectrum-Button--cta").click()
    })

    // Add trigger
    cy.contains("Trigger").click()
    cy.contains("Row Created").click()
    cy.get(".setup").within(() => {
      cy.getPicker().first().pick("dog")
    })

    // Create action
    cy.contains("Action").click()
    cy.contains("Create Row").click()
    cy.get(".setup").within(() => {
      cy.getPicker().first().pick("dog")
      cy.get("input").first().type("goodboy").blur()
      cy.get("input").eq(1).type("11").blur()
    })

    // Save
    cy.contains("Save Automation").click()

    // Activate Automation
    cy.get("[data-cy=activate-automation]").click()
    cy.get("[data-cy=deactivate-automation]").should("have.class", "hoverable")
  })

  it("should add row when a new row is added", () => {
    cy.contains("Data").click()
    cy.addRow(["Rover", 15])
    cy.reload()
    cy.contains("goodboy").should("have.text", "goodboy")
  })
})
