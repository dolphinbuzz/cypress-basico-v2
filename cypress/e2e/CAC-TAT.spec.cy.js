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
    cy.get('.success').should('be.visible')
  });
  
  //exercicio extra 2
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.preencheCampos()
      
    cy.get('#product').select(1).should('have.value','blog')
    cy.submeter()
  });

  //aula 4
  //exercicio
  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  
  });

  //exercicio extra
  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio)=>{
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  });

  //aula 5
  //exercicio
  it('marca ambos checkboxes, depois desmarca o último', () => {
    var checkbokes ='input[type="checkbox"]'
/*
    cy.get(checkbokes).
      should('have.length', 2)
      .each(($check)=>{
        cy.wrap($check).check()
        cy.wrap($check).should('be.checked')
      })
    cy.get(checkbokes).last().uncheck().should('not.be.checked')
*/
      cy.get(checkbokes)
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    
  });

  //aula 06
  //exercicio
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(($input)=>{
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  //exercicio extra 1
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(($input)=>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  });

  //exercicio 2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
   cy.fixture('example.json').as('arquivo')

    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('@arquivo', {action: 'drag-drop'})
    .should(($input)=>{
      expect($input[0].files[0].name).to.equal('example.json')
    })
  });

  //aula 07
  //exercicio
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a').should('have.attr','target', '_blank')
  });

  //exercicio extra 1
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a')
      .invoke('removeAttr','target')
      .should('not.have.class','target')
      .click()
      
    cy.title().should('eq','Central de Atendimento ao Cliente TAT - Política de privacidade')
  });


  //aula 11
  //exercicio

  it('exibe mensagem por 3 segundos', function() {
    cy.clock() // congela o relógio do navegador
  
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')  
    cy.tick(3000) 
    cy.get('.success').should('not.be.visible')

    cy.clock() // congela o relógio do navegador
  
    cy.submeter()
    cy.get('.error').should('be.visible')  
    cy.tick(3000) 
    cy.get('.error').should('not.be.visible')
    
  });

  
  //exercicio extra 1
  it('teste com lodash', () => {

    Cypress._.times(5,()=>{
      cy.fillMandatoryFieldsAndSubmit()
    })
    
  });

  //exercicio extra 2
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
    
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
      
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios')
      .invoke('hide')
      .should('not.be.visible')
  });

  //exercicio 3
  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('0123456789',20)
    cy.get('#open-text-area')
      .invoke('val',longText)
      .should('have.value',longText)
  
  });

})