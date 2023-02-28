describe("Alerts and Modals", () => {
    beforeEach( () => {
        cy.openDemoPlayground("Bootstrap Alerts")
    })

    let params = require("../fixtures/bootstrapAlerts.json")
    params.forEach((param) => {
        it("Tests both manual and autoclose alerts", () => {
            cy.wait(250)
            cy.contains(param.alert).click()
            if(param.alert.includes("Autoclosable")){
                cy.wait(5000)
                cy.get(param.class).should('not.exist')
            } else {
                cy.get(param.class).find("a[data-dismiss='alert']").click()
                cy.get(param.class).should('not.exist')
            }
        })
    })
})

describe("Bootstrap Modals", () => {
    beforeEach( () => {
        cy.openDemoPlayground("Bootstrap Modals")
    })

    const saveClose = [
        "Save Changes",
        "Close"
    ]
    saveClose.forEach((param) => {
        it("Tests Single Modal", () => {
            cy.get("button[data-target='#myModal']").click()
            cy.get("#myModal").should("contain.text", "This is the place where the content for the modal dialog displays")
            cy.get('#myModal').within(() => {
                cy.contains(param).click()
                cy.get("#myModal").should('not.exist')
            })
        })

        it("Tests Multiple Modal", () => {
            cy.get("button[data-target='#myMultiModal']").click()
            cy.get("#myMultiModal").should("be.visible")
            cy.get("#myMultiModal").within(() => {
                cy.get("button[data-target='#mySecondModal']").click()
            })
            cy.get('#mySecondModal').should("be.visible")
            cy.get('#mySecondModal').within(() => {
                cy.contains(param).click()
                cy.get("#mySecondModal").should('not.exist')
            })
        })
    })
})

describe("File Download", () => {
    beforeEach(() => {
        cy.openDemoPlayground("File Download")
    })
    it("Enters text and checks if the file downloads properly", () => {
        cy.get("#textbox").type("some text")
        cy.get("#create").click()
        cy.get("#link-to-download").should("be.visible")
        cy.get("#link-to-download").click()
        cy.readFile('cypress/downloads/Lambdainfo.txt').should("eq", "some text")
    })
})