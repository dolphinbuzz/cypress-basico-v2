Cypress.Commands.add('fillMandatoryFieldsAndSubmit',()=>{
    const longText = Cypress._.repeat('teste ', 70)
    
    cy.get('#firstName').type('Olá Mundo',{delay:0}).should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome',{delay:0}).should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo@gmail.com',{delay:0}).should('have.value','ola.mundo@gmail.com')
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
})