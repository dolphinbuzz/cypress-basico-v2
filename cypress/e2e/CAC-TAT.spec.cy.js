/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('../../src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  
  it('preenche os campos obrigatórios e envia formulãrio', ()=>{
    cy.get('#firstName').type('Olá Mundo').should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome').should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo@gmail.com').should('have.value','ola.mundo@gmail.com')
    cy.get('#open-text-area')
    .type('gostaria de uma ajuda', {delay: 0})
    .should('have.value','gostaria de uma ajuda')

    cy.get('#white-background > form > button').click()
    cy.get('body > span.success')
      .should('have.class','success')
      .should('be.visible')
      .contains('Mensagem enviada com sucesso.')
  })
 
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Olá Mundo').should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome').should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo_gmail.com').should('have.value','ola.mundo_gmail.com')
    cy.get('#open-text-area')
    .type('gostaria de uma ajuda', {delay: 10})
    .should('have.value','gostaria de uma ajuda')

    cy.get('#white-background > form > button').click()
    cy.get('body > span.error')
      .should('have.class','error')
      .should('be.visible')
      .contains('Valide os campos obrigatórios!')
  });

})

//exercicio 3 https://github.com/wlsf82/cypress-basico-v2/blob/main/lessons/02.md#exerc%C3%ADcio-extra-3
it('validar campo telefone', () => {
  
  
});