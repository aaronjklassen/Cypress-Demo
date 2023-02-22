describe("Bootstrap Date Pickers", () => {
    beforeEach( () => {
        cy.openDemoPlayground("Bootstrap Date Picker")
    })
    it("Date Range Picker", () => {
        cy.get("#birthday").type("1992{tab}04{tab}19")
    })
})