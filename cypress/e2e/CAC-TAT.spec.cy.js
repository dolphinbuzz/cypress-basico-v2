/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('../../src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  
  it('preenche os campos obrigatórios e envia formulário', ()=>{
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    cy.get('#firstName').type('Olá Mundo').should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome').should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo@gmail.com').should('have.value','ola.mundo@gmail.com')
    cy.get('#open-text-area')
    .type(longText, {delay: 0})
    .should('have.value',longText)
    cy.get('button[type="submit"]').click()

    cy.get('.success')
      .should('have.class','success')
      .should('be.visible')
      .contains('Mensagem enviada com sucesso.')
  })
 
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Olá Mundo').should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome').should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo_gmail.com').should('have.value','ola.mundo_gmail.com')
    cy.get('#open-text-area')
    .type('gostaria de uma ajuda', {delay: 20})
    .should('have.value','gostaria de uma ajuda')

    cy.get('#white-background > form > button').click()
    cy.get('.error')
      .should('have.class','error')
      .should('be.visible')
      .contains('Valide os campos obrigatórios!')
  });

  //exercicio 3
  it('validar campo telefone', () => {
    cy.get('#phone').type('qwertyuiopasdfghjklçzxcvbnm').should('have.value',"")
    cy.get('#phone').type('qwertyuiopasdfghjklçzxcvbnm').should('be.empty')
  });

  //exercicio 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Olá Mundo').should('have.value','Olá Mundo')
    cy.get('#lastName').type('Olá Mundo sobrenome').should('have.value','Olá Mundo sobrenome')
    cy.get('#email').type('ola.mundo@gmail.com').should('have.value','ola.mundo@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  });

  //exercicio 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('teste teste teste').should('have.value','teste teste teste').clear().should('have.value','')
  });
 
  //exercicio 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.get('#phone').type('99999999')
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  });

  //exercicio 7
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit() 
    
    cy.get('.success').should('be.visible')
  });

  //aula 3
  //exercicio
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.preencheCampos()
    
    cy.get('#product').select('YouTube').should('have.value','youtube')
  });
  
  //exercicio extra 1
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.preencheCampos()
      
    cy.get('#product').select('mentoria').should('have.value','mentoria')

    cy.submeter()
  });
  
  //exercicio extra 2
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.preencheCampos()
      
    cy.get('#product').select(1).should('have.value','blog')
    cy.submeter()
  });

  //aula 4
  


})