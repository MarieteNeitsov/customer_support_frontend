describe('AddRequestView', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/addrequest') 
    })
  
    it('renders the form correctly', () => {
        cy.get('form').should('exist')
        cy.get('textarea[name="description"]').should('exist')
        cy.get('input[name="deadline"]').should('exist')
        cy.get('button.add-request').should('exist').and('be.disabled')
    })

    it('creates a new request correctly', () => {
        const requestDeadline = new Date(2025, 8, 2, 14, 30);
        const formattedDeadline = new Date(requestDeadline.getTime() - (requestDeadline.getTimezoneOffset() * 60000)).toISOString().slice(0, -5);
        const newRequest = {
          Description: 'Test request',
          ResolutionDeadline: formattedDeadline
        }
        cy.request({
          method: 'POST',
          url: 'http://localhost:5077/SupportRequest',
          body: newRequest
        }).then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.description).to.eql(newRequest.Description)
          expect(response.body.resolutionDeadline).to.eql(newRequest.ResolutionDeadline)
        })
      })
  
    it('submits the form correctly', () => {
        cy.get('textarea[name="description"]').type('Test request')
        cy.get('#datepicker').click()
        cy.window().then(win => {
            win.$refs.datepicker.requestDeadline = new Date(2023, 5, 31, 14, 30)
        }) //currently not working because of the datepicker
        
        cy.get('button.add-request').click()
        cy.visit('http://localhost:8080/')
        cy.get('.request-box').should('have.class', 'blue')
        cy.get('#description').should('contain', 'Test request')
    })
  
    it('validates the form correctly', () => {
        cy.get('button.add-request').should('be.disabled')
        cy.get('textarea[name="description"]').type('Test request')
        cy.get('button.add-request').should('be.disabled')
        cy.window().then(win => {
            win.$refs.datepicker.requestDeadline = new Date(2025, 5, 31, 14, 30)
        })
        cy.get('button.add-request').should('be.enabled')
        })

    it('shows requests past deadline red', () => {
        cy.get('textarea[name="description"]').type('Test request')
        cy.window().then(win => {
            win.$refs.datepicker.requestDeadline = new Date(2023, 5, 31, 14, 30)
        })
        cy.get('button.add-request').click()
        cy.visit('http://localhost:8080/')
        cy.get('.request-box').should('have.class', 'red')
        cy.get('#description').should('contain', 'Test request')
        cy.get('#deadline').should('contain', '31.06.2023, 14:30')
          
        })

        


  })