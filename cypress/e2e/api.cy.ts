describe('testing api:s', () => {
  //////////////////////////////
  // TEST: SAVE BOOKING TO DB //
  //////////////////////////////
  it('should save validated booking in db', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:4000/bookings',
      body: {
        date: '2023-03-03',
        time: '21',
        guest: {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '1234567',
        },
        amount: 2,
        tables: 1,
        message: '',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('date', '2023-03-03')
    })
  })
  // Make sure validation works
  it('should not save booking if informations is missing', () => {
    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: 'http://localhost:4000/bookings',
      body: {
        date: '',
        time: '21',
        guest: {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '1234567',
        },
        amount: 2,
        tables: 1,
        message: '',
      },
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })
})
