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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',()=>{
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    
    cy.get('#firstName').type('Olá Mundo').should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome').should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo@gmail.com').should('have.value','ola.mundo@gmail.com')
    cy.get('#open-text-area')
        .type(longText, {delay: 0})
        .should('have.value',longText)

    cy.submeter()

})

Cypress.Commands.add('preencheCampos',()=>{
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    
    cy.get('#firstName').type('Olá Mundo').should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome').should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo@gmail.com').should('have.value','ola.mundo@gmail.com')
    cy.get('#open-text-area')
        .type(longText, {delay: 0})
        .should('have.value',longText)
})

Cypress.Commands.add('submeter',()=>{
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
})