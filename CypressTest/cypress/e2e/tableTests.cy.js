describe("Table Pagination", () => {
    beforeEach(() => {
        cy.openDemoPlayground("Table Pagination")
    })

    // Given the user is on the Table Pagination demo page
    //   And the user wants to increase the number of records displayed
    it("Display More Table Rows", () => {
        // When the user selects 15 from the "Numer of Rows" dropdown
        cy.get('#maxRows').select('15')
        cy.get('.table-responsive > tbody').within(() => {
            // Then the user will see 15 rows displayed in the table
            cy.get('tr:visible').should("have.length", 15)
        })
    })

    // Given the user is on the table pagination demo page
    //   And the user wants to change the page of the table
    it("Change the table page", () => {
        const ids = [ "11", "12", "13", "14", "15" ]
        cy.get('.pagination_sp').within(() => {
            // When the user selects page 3 from the page list
            cy.contains("3").click()
        })
        cy.get(".table-responsive > tbody").within(() => {
            cy.get("tr:visible").each(($row, index) => {
                // Then pagination will indicate that page 3 is selected
                cy.wrap($row).find("td").first().should("have.text", ids[index])
             })
        })
    })
})

describe("Table Data Search", () => {
    beforeEach( () => {
        cy.openDemoPlayground("Table Data Search")
    })

    // Given the user is on the table Data Search demo page
    //   And the user wants to search the table
    // When the user enters a search term in the search table
    // Then the results will contain the search terms
    let tableSearches = [
        "SEO tags", 
        "Kilgore Trout",
        "completed"
    ]
    tableSearches.forEach( search => {
      it("Test Table Data Search: " + search, () => {
        cy.get("#task-table-filter").type(search)
        cy.get("#task-table").within(() => {
            cy.get("tr:visible").should("contain.text", search)
        })
      })
    })
})

describe("Table Data Search Filter Columns", () => {
    beforeEach( () => {
        cy.openDemoPlayground("Table Data Search")
    })
    const filters = require('../fixtures/tableSearchFilterDemo.json')
    filters.forEach((filter) => {
        it("Table Filter", () => {
            cy.get('.btn-default').click()
            cy.get(".filters").within(() => {
                cy.get("input[placeholder='" + filter.column + "']").type(filter.filtertext)
            })
            cy.get(".table-responsive > tbody > tr:visible").should("contain.text", filter.filtertext)
        })
    })
})

describe("Table Filter", () => {
    beforeEach(() => {
        cy.openDemoPlayground("Table Filter")
    })
    const filters = [ "pagado", "pendiente", "cancelado", "all" ]
    filters.forEach((filter) => {
        it("Filter by: " + filter + " column", () => {
            cy.get("button[data-target='" + filter + "']").click()
            if(filter == "all"){
                cy.get(".table-filter > tbody > tr").each(($el) => {
                    cy.wrap($el).should("be.visible")
                })
            }
            cy.get(".table-filter > tbody > tr").each(($el) => {
                if(cy.wrap($el).invoke("attr", "data-search") == filter){
                    cy.wrap($el).should("be.visible")
                }
            })
        }) 
    })

})

describe("Table Sort & Search", () => {
    beforeEach( () => {
        cy.openDemoPlayground("Table Sort & Search")
    })
    it("Search Table", () => {
        cy.get('#example_filter > label > input[type=search]').type("B. Greer")
        cy.get("#example > tbody > tr").first().should("contain.text", "B. Greer")
    })

    const colOrder = require("../fixtures/tableColReorder.json")
    colOrder.forEach( (col) => {
        it("Reorder " + col.column + " Column to " + col.order, () => {
            let column = cy.get("#example > thead > tr > th").contains(col.column)
            if(col.column == "Name"){
                column.should("have.class", "sorting_asc")
                column.click()
                column.should("have.class", "sorting_"+col.order)
                cy.get("#example > tbody > tr:nth-child(1)").should("contain.text", col.expectedValue)
            } else {
                column.should("have.class", "sorting")
                if(col.order == "asc") {
                    column.click()
                } else {
                    column.dblclick()
                }
                column.should("have.class", "sorting_"+col.order)
                cy.get("#example > tbody > tr:nth-child(1)").should("contain.text", col.expectedValue)
            }
        })
    })
})

