/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('loginToApplication', () => {
    // cy.visit('/login')
    // cy.get('[placeholder="Email"]').type('test28@gmail.com')
    // cy.get('[placeholder="Password"]').type('CypressTest28')
    // cy.get('form').submit()

//})
    //API method 41 Lesson:
    const userCredentials = {//to log in
        "user": {
        "email": "test28@gmail.com",
        "password": "CypressTest28"
    }
}

    cy.request('POST', 'https://api.realworld.io/api/users/login', userCredentials)//method, url, body included
            .its('body').then(body => {//by its - we get property Body, and by then grab the value of the token (path)
                const token = body.user.token
             //wrap our token into alias in order to use it:
            cy.wrap(token).as('token')//to use it in spec 
                cy.visit('/', {//option for our visit method before opening main page, so open lognn first
                    onBeforeLoad(win){//using window object
                        win.localStorage.setItem('jwtToken', token)//devtools key of application (for Token) + token value
                    }
                })
            })

        })
    