describe('Blog app', function() {
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {name:'YJX YJX', username: 'yjx', password: 'yjx'}
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })
  })

  describe('Login', function() {
    beforeEach(function(){
        cy.get('button').then(($body) => {
            if($body.text().includes('logout')){
                cy.get('#logout-button').click()
            }
        })
        cy.get('#username').clear()
        cy.get('#password').clear()
    })

    it('succeeds with correct feedback', function() {
        cy.get('#username').type('yjx')
        cy.get('#password').type('yjx')
        cy.get('#login-button').click()
        cy.contains('logged in')
    })

    it('fails with wrong feedback', function() {
        cy.get('#username').type('yjx')
        cy.get('#password').type('yjx')
        cy.get('#login-button').click()
        cy.get('.red').contains('Wrong user or password')
    })

    describe ('When logged in', function(){
        beforeEach(function(){
            cy.get('#username').type('yjx')
            cy.get('#password').type('yjx')
            cy.get('#login-button').click()
        })

        it('a blog be created', function(){
            cy.get('#new-blog-button').click()
            cy.get('#title').type('cypress test')
            cy.get('#author').type('cypress test')
            cy.get('#url').type('cypress test')
            cy.get('#create-blog').click()
            cy.contains('cypress test')
        })

        it('a blog can be', function(){
            cy.get('.blog').contains('cypress test by cypress test').contains('view').click().then(() => {
                cy.get('.togglableContent').contains('0').get('#likeButton').click().then(() => {
                    cy.get('.togglableContent').contains('1')
                })
            })
        })

        it('a blog be deleted', function(){
            cy.visit('http://localhost:3000')
            cy.get('#username').type('yjx')
            cy.get('#password').type('yjx')
            cy.get('#login-button').click()
            cy.get('.blog').contains('cypress test by cypress test').contains('view').click().then(() => {
                cy.get('.togglableContent').get('#remove-button').click()
            })
            cy.get('html').should('not.contain','cypress test by cypress test')
        })

        it('blogs are ordered based on likes', function(){

            cy.get('#new-blog-button').click()

            cy.newBlog({title:'yjx test', author:'yjx test', url:'yjx test'}).then(() => {
                cy.get('.blog').contains('yjx test by yjx test').get('#view-button').click().then(() => {
                    cy.get('.togglableContent').contains('like').click()
            })
            
            cy.newBlog({title:'cypress test', author:'cypress test', url:'cypress test'}).then(() => {
                cy.wait(1000).get('.blog').contains('cypress test by cypress test').contains('view').click()
                cy.get('.blog').first().contains('yjx test by yjx test')
                cy.get('.blog').contains('cypress test by cypress test').contains('like').click().click() 
            })
            
            cy.wait(3000).get('.blog').first().contains('cypress test by cypress test')

            })
        })
    })
  })