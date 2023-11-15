
describe('Test log out', () => {
    beforeEach('login to the app', () => {
        cy.loginToApplication()
    })
    it.only('Verify user can log out successfully Lesson 43', () => {
         cy.contains('Settings').click()
         cy.contains('Or click here to logout.').click()
         cy.get('.nav.navbar-nav').should('contain', 'Sign up')


    })
})
