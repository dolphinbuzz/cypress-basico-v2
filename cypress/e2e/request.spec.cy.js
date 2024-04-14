it.only('faz uma requisição HTTP', () => {
    cy.request({
        method: 'GET',
        url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'  
    }).then((response)=>{
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        expect(response.body).include('CAC TAT')
        //console.log(response)
    })

    
});