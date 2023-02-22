// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('openDemoPlayground', (demo) => {
    cy.visit('selenium-playground/')
    cy.contains(demo).click()
})

Cypress.Commands.add('enterFormInfo', (fullname, email, password, company, website, country, city, address, address2, state, zipcode) => {
    cy.get('#name').type(fullname)
    cy.get('#inputEmail4').type(email)
    cy.get('#inputPassword4').type(password)
    cy.get('#company').type(company)
    cy.get('#websitename').type(website)
    cy.get('select[name="country"]').select(country)
    cy.get('#inputCity').type(city)
    cy.get('#inputAddress1').type(address)
    cy.get('#inputAddress2').type(address2)
    cy.get('#inputState').type(state)
    cy.get('#inputZip').type(zipcode)
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })