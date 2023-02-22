//Including Gherkin in front of each test for demo purposes

describe("Find First link", () => {
  // Given the user wants to test the first page elements
  // When the user opens the page
  //   And the user clicks on the Simple Form Demo link
  // Then the user is on the Simple Form Demo page
  it("should find the link to a simple form demo", () =>{
    cy.openDemoPlayground('Simple Form Demo')
    cy.url().should("contain", "simple-form-demo")
  })
})

describe("Test Simple Form Demo", () => {
  beforeEach(() => {
    cy.openDemoPlayground('Simple Form Demo')
  })
  // Given the user wants to test the simple form demo
  //   And the user is on the simple form demo page
  // When the user fills in the single demo text box
  //   And the user clicks the "Get Checked Value" button
  // Then the user's input is displayed
  it("should open, fill in, and submit the simple form", () => {
    cy.get('#user-message').type("Cypress Test")
    cy.get('#showInput').click()
    cy.get('#message').should('have.text', "Cypress Test")
  })

  // Given the user wants to test the Two Input Fields demo
  //   And the user is on the Two Input Fields demo page
  // When the user fills in the both input boxes
  //   And the user clicks the "Get Values" button
  // Then the sum of the two values is displayed
  it("tests the two input field form", () => {
    cy.openDemoPlayground('Simple Form Demo')
    cy.get('#gettotal').within(() =>{
      cy.get('#sum1').type('13')
      cy.get('#sum2').type('10')
      cy.get('button').click()
    })
    cy.get('#addmessage').should('have.text', '23')
  })
})

describe("Test Checkbox demo", () => {
  beforeEach(() => {
    cy.openDemoPlayground("Checkbox Demo")
  })
  // Given the user wants to test the single checkbox demo
  //   And the user is on the Checkbox Demo page
  // When the user checks the checkbox in the single checkbox demo section
  // Then "Success - Check box is checked" will be displayed below the checkbox
  it("tests the single checkbox demo", () => {
    cy.get('#isAgeSelected').check()
    cy.get('#txtAge').should("be.visible").should("have.text", "Success - Check box is checked")
  })

  // Given the user wants to test the single checkbox demo
  //   And the user is on the Checkbox Demo page
  // When the user checks the checkbox in the single checkbox demo section
  // Then "Success - Check box is checked" will be displayed below the checkbox
  it("tests the 'check all' button in the multiple checkbox demo", () => {
    cy.get('#box').should('have.value', 'check all')
    cy.get('#box').click()
    cy.get('.cb-element').each( (item, index) => {
      cy.wrap(item).should('be.checked')
    })
  })

  // Given the user wants to test the single checkbox demo
  //   And the user is on the Checkbox Demo page
  // When the user checks the checkbox in the single checkbox demo section
  // Then "Success - Check box is checked" will be displayed below the checkbox
  it("tests the 'uncheck all' button in the multiple checkbox demo", () => {
    cy.get('#box').click()
    cy.get('#box').should('have.value', 'uncheck all')
    cy.get('.cb-element').each( (item, index) => {
      cy.wrap(item).should('be.checked')
    })
    cy.get('#box').click()
    cy.get('#box').should('have.value', 'check all')
    cy.get('.cb-element').each( (item, index) => {
      cy.wrap(item).should("not.be.checked")
    })
  })
})

describe("Test Radio Button Demo", () => {
  beforeEach(() => {
    cy.openDemoPlayground("Radio Buttons Demo")
  })
  // Given the user is on the radio button demo page
  //   And the user wants to test the first radio button demo
  // When the user clicks on the Male/Female radio button demo
  // Then the selected radio will appear in the text below
  let params = ["Male", "Female"]
  params.forEach( param => {
    it("tests the Radio Button Demo: " + param, () => {
      cy.get("input[value='" + param + "']").first().click()
      cy.get('#buttoncheck').click()
      cy.get(".radiobutton").should("have.text", "Radio button '" + param + "' is checked")
    })
  })

  // Given the user is on the radio button demo page
  //   And the user wants to test the group radio button demo
  // When the user clicks on the Male/Female/Other radio button 
  //   And the user clicks on the 0 to 5 / 5 to 10 / 15 to 50 radio button
  //  Then the selected gender will appear next to the form
  //   And the selected age range will appear next to the form
  it("Tests the Group Radio Buttons Demo: Male, 0 - 5", () => {
    cy.get("input[value='Male']").last().click()
    cy.get("input[value='0 - 5']").click()
    cy.get("button").contains("Get values").click()
    cy.get(".genderbutton").should("have.text", "Male")
    cy.get(".groupradiobutton").should("have.text", "0 - 5")
  })
})

describe("Test Select Box Demo", () => {
  beforeEach( () => {
    cy.openDemoPlayground("Select Dropdown List")
  })
  // Given the user is on the select box demo page
  // When the user selects a day from the dropdown
  // Then the text "Day selected :- " will appear 
  //   And will include the day selected in the dropdown
  let params = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
  params.forEach( param => {
    it("Test Select List Demo", () => {
      cy.get('#select-demo').select(param)
      cy.get(".selected-value").should("have.text", "Day selected :- " + param)
    })
  })

  // *****Failing as the select box on the page seems to be bugged, always displaying Texas when trying to use "get selected" buttons******
  // Given the user is on the Select Box Demo page
  // When the user selects multiple states
  //   And the user selects "California" and Washington
  //   And the user clicks the "First Selected" button
  // Then the user will see the first state selected in the list appear under the "first selected option is:" text
  it("MultiSelect: First Selected", () => {
    cy.get('#multi-select').select(['California', 'Washington']).invoke('val').should('deep.equal', ['California', 'Washington'])
    cy.get('#printMe').click()
    cy.get(".genderbutton").should("have.text", "California")
  })
})
  
describe('Input Form Submit', () => {
  // Given the user is on the Input Form Submit page
  // When the user enters in their information into the form
  //   And the user clicks the "Submit" button
  // Then the user will see the form submit success message
  before(function () {
    cy.fixture('inputFormDemo').then(function (data) {
      this.data = data
    })
  })

  it('Test Input Form Submit',function () {
    cy.openDemoPlayground("Input Form Submit")
    cy.enterFormInfo(
        this.data.name, this.data.email, this.data.password, 
        this.data.company, this.data.website, this.data.country, 
        this.data.city, this.data.address, this.data.address2, 
        this.data.state, this.data.zipcode)
    cy.get('#seleniumform').within(() => {
      cy.get('button').click()
    })
    cy.get('.success-msg').should('have.text', "Thanks for contacting us, we will get back to you shortly.")
  })
})

describe('JQuery Select dropdown', () => {
  beforeEach(() => {
    cy.openDemoPlayground("JQuery Select dropdown")
  }) 
  // Given the user is on the jquery select dropdown page
  //   And the user wants to use the single dropdown
  // When the user selects "Australia" from the dropdown
  // Then the value appearing in the dropdown will be "Australia"
  it("Drop Down with Search box", () => {
    cy.get("#country").select("Australia", { force: true })
    cy.get("#country").should("have.value", "Australia")
  })

  // Given the user is on the jquery select dropdown page
  //   And the user wants to use the multiselect dropdown
  // When the user selects "Alabama","Florida", and "Georgia"
  // Then they will all appear in the dropdown as selected values
  it("Test Select Multiple Values", () => {
    let states = [
      "Alabama",
      "Florida",
      "Georgia"
    ]
    cy.wrap(states).each((index) => {
      cy.get(".select2-search__field").type(index + "{enter}")
    })

    cy.get(".select2-selection__choice").each(($el, index) => {
      cy.wrap($el).should("contain.text", states[index])
    })
  })
  
})