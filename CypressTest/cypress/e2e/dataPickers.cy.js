describe("Bootstrap Date Pickers", () => {
    beforeEach( () => {
        cy.openDemoPlayground("Bootstrap Date Picker")
    })
    // Given the user is on the bootstrap date picker page demo
    //   And the user wants to use the date picker
    // When the user enters the date into the picker
    // Then the date will be displayed
    it("Date Picker", () => {
        cy.get("#birthday").type("1992-04-19")
        cy.get('#birthday').invoke("val").should("deep.equal", "1992-04-19")
    })

    // Given the user is on the bootstrap date picker page demo 
    //   And the user wants to use the Date Range Picker
    // When the user enters the first date into the range picker
    //   And the user enters the second date into the range picker
    // Then both dates will be displayed
    it("Date Range Picker", () => {
        cy.get("#datepicker").within(() => {
            cy.get("input").first().type("01/04/1992")
            cy.get("input").last().type("30/04/1992")
        })

        cy.get("#datepicker > input").first().invoke("val").should("deep.equal", "01/04/1992")
        cy.get("#datepicker > input").last().invoke("val").should("deep.equal", "30/04/1992")
    })
})

describe("JQuery Date Pickers", () =>{
    beforeEach(() => {
        cy.openDemoPlayground("JQuery Date Picker")
    })
    
    // Given the user is on the JQuery date picker page demo
    //   And the user wants to use the Date Range Picker
    // When the user enters in the first date
    //   And the user enters in the second date
    // Then both dates will be displayed in the range picker
    it("JQuery Date Range Picker", () => {
        cy.get('#from').type("03/01/2023")
        cy.get("#to").type("03/31/2023")

        cy.get("#from").invoke("val").should("deep.equal", "03/01/2023")
        cy.get("#to").invoke("val").should("deep.equal", "03/31/2023")
    })
})
