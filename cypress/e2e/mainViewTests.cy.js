describe('AddRequestView', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/') 
    })

    it("gets all active requests correctly", () => {
        cy.request("GET", "http://localhost:5077/SupportRequest", {}).then((res) => {
            cy.log(res.body)
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.have.property('id')
            expect(res.body[0]).to.have.property('description')
            expect(res.body[0]).to.have.property('resolutionDeadline')
            expect(res.body[0]).to.have.property('isResolved')
            expect(res.body[0]).to.have.property('submissionTime')
        });
    })
  
        it('marks a request as done correctly', () => {
            const requestId = 1;
            cy.request({
                method: 'PUT',
                url: `http://localhost:5077/SupportRequest/${requestId}`,
              }).then((response) => {
                
                expect(response.status).to.eq(204)
              })
            
              cy.request('GET', `http://localhost:5077/SupportRequest/${requestId}`).then((response) => {
                expect(response.body.isResolved).to.be.true
          })
        })


  })