/// <reference types="cypress"/>
import produtosPage from "../../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {      
        produtosPage.visitarUrl()
    });
    
    it('Deve selecionar um produto da lita', () => {
        produtosPage.buscarProdutoLista('Aether Gym Pant')
            cy.get('#tab-title-description > a').should('contain' , 'Descrição')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Apollo Running Short'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain' , produto)
    });

    it('Deve visitar a pagina do produto', () => {
        produtosPage.visitarProduto('Arcadio Gym Short')
        cy.get('.product_title').should('contain' , 'Arcadio Gym Short')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Aero Daily Fitness Tee')
        produtosPage.addProdutoCarrinho('XL', 'Black', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')
    });

    it.only('Deve adicionar produto ao carrinho - buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[0].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[0].tamanho, 
                dados[0].cor, 
                dados[0].quantidade)

            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
        });
        })


});