describe("Table Pagination", () => {
    beforeEach(() => {
        cy.openDemoPlayground("Table Pagination")
    })
    // Given the user is on the Table Pagination demo page
    //   And the user wants to increase the number of records displayed
    // When the user selects 15 from the "Numer of Rows" dropdown
    // Then the user will see 15 rows displayed in the table
    it("Display More Table Rows", () => {
        let expectedResult = 0
        cy.get('#maxRows').select('15')
        cy.get('.table-responsive > tbody').within(() => {
            cy.get('tr:visible').should("have.length", 15)
        })
    })
})