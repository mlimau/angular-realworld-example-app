//from 41 lesson

describe('from 41 lesson Tests with backend', () => {
    
    beforeEach('login to the app', ()=>{
        cy.intercept('GET',
                      'https://api.realworld.io/api/tags',
                      {fixture: 'tags.json'})
        cy.loginToApplication(2000,2200)
        
    })

    it('41 lesson delete a new atricle in a global feed', () => {
            const userCredentials = {//to log in
                "user": {
                "email": Cypress.env('userEmail'),
                "password": Cypress.env('password')
            }
        }

        const bodyRequest = {//for creatinf an article body 
            "article": {
                "title": "Request from API ",
                "description": "lesson 41",
                "body": "Create article and delete it by API Postman",
                "tagList": []
            }
        } 
        const nameOfArticle = bodyRequest.article.title//var for name of article (path)
            //API actions: I method to login by credentials
        // //got tocy.request('POST', 'https://api.realworld.io/api/users/login', userCredentials)//method, url, body included
        //     .its('body').then(body => {//by its - we get property Body, and by then grab the value of the token (path)
        //         const token = body.user.tokenken by path


        //II method to login (42 lesson Headless auth):save token as alias in commands.js and use it here:
           cy.get('@token').then (token => {

                           //API actions:
            cy.request({//provide all nessesary param of the request
                url:Cypress.env('apiUrl')+'/api/articles/',
                headers: {'Authorization': 'Token '+token},//token we got above
                method: 'POST',
                body: bodyRequest//const with parameters of request above
            }).then( response => {
                expect(response.status).to.equal(201)
            })
            //cy.reload()

            //DELETING by UI actions
            cy.contains('Global Feed').click()
            cy.contains(nameOfArticle).click()//assigned to var by path
            
            cy.get('.article-actions').contains('Delete').click()

            //проверим by API method что этого article больше нет на странице click on Global feed
            cy.request({
                url: Cypress.env('apiUrl')+'/api/articles?limit=10&offset=0',
                headers: {'Authorization': 'Token '+token},//token we got above
                method: 'GET'
            }).its('body').then (body => {//pull out the body of response
                console.log(body)//see array of articles devtools which were created and not deleted
                //get first array and verify its title not equal our tested:
                expect(body.articles[0].title).not.to.equal(nameOfArticle)
            })

            })

        })    
    })
       

    
