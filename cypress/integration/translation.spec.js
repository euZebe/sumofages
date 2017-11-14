import * as s from './_selectors'

describe('changing language', () => {
    it('should modify the format of typed dates of birth', () => {
        // Given the initial language is french
        cy.visit('/')
        cy.get(s.howto_title).should('contain', "Comment l'utiliser")

        // When I set an expected age equal to 10
        cy.get(s.inputExpectedAge).type('10').should('have.value', '10')
        // When a dateOfBirth is defined
        cy.get(s.inputDateOfBirth).type("25/12/2017{enter}") // FIXME: {enter} should not be mandatory

        // When I click on the english flag
        cy.get(s.englishButton).click()

        // When I click on 'Go' button
        cy.get(s.submitButton).click()

        // Then the result label is in english format
        cy.get(s.resultMessage).should('contain', '12/25/2027')
        // Then the dateOfBirth label is in english format
        cy.get(s.inputDateOfBirth).first().should('have.value', "12/25/2017")
        // Then messages should be translated
        cy.get(s.howto_title).should('contain', "How to")
    })

    it('should modify the format of selected dates of birth', () => {
        // Given the initial language is french
        cy.visit('/')

        // When I set an expected age equal to 10
        cy.get(s.inputExpectedAge).type('10').should('have.value', '10')
        // When a dateOfBirth is defined
        cy.get(s.inputDateOfBirth).click()
        cy.get('[aria-label="day-26"]').click()

        // When I click on the english flag
        cy.get(s.englishButton).click()

        // When I click on 'Go' button
        cy.get(s.submitButton).click()

        // Then the result label is in english format
        cy.get(s.resultMessage).should('contain', '11/26/2027')
        // Then the dateOfBirth label is in english format
        cy.get(s.inputDateOfBirth).first().should('have.value', "11/26/2017")
    })
})