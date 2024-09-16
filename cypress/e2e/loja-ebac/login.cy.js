///<reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    afterEach(() => {
        ///cy.screenshot()
    });
    
     ('Deve fazer login com sucesso', () => {
        cy.get('#username').type('estevao.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, estevao.teste (não é estevao.teste? Sair)')
    });

    it('Deve exibit uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('estevao@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {    
        cy.get('#username').type('estevao.teste@teste.com.br')
        cy.get('#password').type('teste@000')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain' , 'Erro: A senha fornecida para o e-mail')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve fazer login com sucesso - usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, estevao.teste (não é estevao.teste? Sair)')
    });

    it('Deve fazer login com sucesso - usando Fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha ,{ log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, estevao.teste (não é estevao.teste? Sair)')
        })
    });

    it.only('Deve fazer login com sucessi - usando comandos customizados', () => {
       cy.login('estevao.teste@teste.com.br', 'teste@123')
       cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, estevao.teste (não é estevao.teste? Sair)')
    });
});