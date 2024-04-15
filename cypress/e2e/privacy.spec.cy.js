  //exercicio extra 2
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.title().should('eq','Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.get('#title').should('have.text','CAC TAT - Política de privacidade').should('be.visible')

    cy.get('#white-background').should('have.text','\n      Não salvamos dados submetidos no formulário da aplicação CAC TAT.\n      Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.\n      No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.\n      \n      Talking About Testing\n    ').should('be.visible')
  });