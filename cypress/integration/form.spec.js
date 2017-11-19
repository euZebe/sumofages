import * as s from './_selectors'

describe('OK button', () => {
    it('should return the date + {age} years', () => {
        // Given I open the app
        cy.visit('/')
        // When I set an expected age equal to 10
        cy.get(s.inputExpectedAge).type('10').should('have.value', '10')
        // When I set a person's date of birth
        cy.get(s.inputDateOfBirth).type('26/10/1981')
        // When I click on 'Go' button
        cy.get(s.submitButton).click()
        // Then I get dateOfBirth + 10 years as a result
        cy.get('#result').should('contain', '26/10/1991')
    })

    it('should be disabled when no expected age is set', () => {
        cy.visit('/')
        // Given I set no expected age
        // Then "Go" button cannot be clicked
        cy.get(s.submitButton).should('be.disabled')
    })
})

describe('Clear button', () => {
    it('should prevent from validating the form', () => {
        cy.visit('/')
        // Given an expected age is set
        cy.get(s.inputExpectedAge).type('4')
        // Given some names and dates of birth are set
        cy.get(s.inputName).type('machin')
        cy.get(s.inputDateOfBirth).type('26/10/{enter}')

        // When I click "Clear all" button
        cy.get(s.clearButton).click()

        // Then all fields are cleared
        cy.get(s.inputExpectedAge).should('have.value', '')
        // Then only one participant row is visible
        cy.get(s.inputDateOfBirth).then(inputs => {
            expect(inputs).to.have.length(1)
        })

    })
})

describe('Form', () => {
    it('should add an empty row when the last dateOfBirth is set', () => {
        cy.visit('/')
        cy.get(s.inputDateOfBirth).then(inputs => {
            expect(inputs).to.have.length(1)
        })
        cy.get(s.inputDateOfBirth).type('10/11/2000{enter}')
        cy.get(s.inputDateOfBirth).then(inputs => {
            expect(inputs).to.have.length(2)
        })
        cy.get(s.inputDateOfBirth + ':eq(1)').type('06/05/2000{enter}')
        cy.get(s.inputDateOfBirth).then(inputs => {
            expect(inputs).to.have.length(3)
        })
    })
})


// check 0 value in expected age
