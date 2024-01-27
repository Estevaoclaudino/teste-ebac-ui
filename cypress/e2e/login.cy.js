/// <reference types="cypress" />

context('Funcionalidade Login', () =>{

    it('Deve fazer login com sucesso', () =>{
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
        cy.get('#username').type('aluno_ebac@teste.com');
        cy.get('#password').type('teste@teste.com');
        cy.get('.woocommerce-form > .button').click();
       
        cy.get('.page-title').should('include' , 'MINHA CONTA');
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('include' , 'Olá, aluno_ebac (não é aluno_ebac? Sair)');
        

    })

    it('Deve exibir uma mensagem de erro ao inserir usuário ou senha inválidos', () =>{
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
        cy.get('#username').type('ebac@teste.com');
        cy.get('#password').type('teste@teste');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-error > li').should('include', 'Endereço de e-mail desconhecido.');
    })

    it('Deve exibir uma mensagem de erro ao inserir uma senha inválida', () =>{
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
        cy.get('#username').type('aluno_ebac@teste.com');
        cy.get('#password').type('teste@teste');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-error > li').should('include', 'Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
    })

})
