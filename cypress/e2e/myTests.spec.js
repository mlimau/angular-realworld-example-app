

describe('Intercept tests', () => {
    beforeEach('Login to the app', () => {
        //cy.intercept('GET', 'https://api.realworld.io/api/tags',{fixture: 'tagsmy.json'} )//assigned
        cy.intercept({method: 'Get', path: 'tags'},{fixture: 'tagsmy.json'} )//with pattern matching
        cy.loginToApplication(2000, 2200)
    })

   it('Intercept tags', () => {
    
    cy.get('.tag-list').should('contain', 'Mary welcome')
                        .and('contain', 'Mary implementations')
                        .should('contain', 'Mary tests')
   })

   it('Intercept verify Articles counter ', ()=> {
      cy.intercept('GET', 'https://api.realworld.io/api/articles/feed*', {"articles":[],"articlesCount":0} )
      cy.intercept('GET', 'https://api.realworld.io/api/articles*', {fixture: 'articlesmy.json'})//fixture-replaising a responce

      cy.contains('Global Feed').click()

      cy.get('app-article-list button').then(likeCounter => {
        console.log(likeCounter)
        expect(likeCounter[0]).to.contain('10')
        expect(likeCounter[1]).to.contain('5')
      })
       
   
    cy.fixture('articlesmy.json').then(file => {//если мы хотим изменить содержимое файла fixtures то меняем его с помощью метода cy.fixture: 
        //здесь мы favoritesCount 5 меняем на 6. Since we clicked on
            const articlesLink = file.articles[1].slug
            file.articles[1].favoritesCount = 6
            console.log(file.articles)
    
       cy.intercept('POST', 'https://api.realworld.io/api/articles/'+articlesLink+'/favorite', file)
    })
    
       cy.get('app-article-list button').eq(1).click().should('contain', '6')
   
   
})

})
