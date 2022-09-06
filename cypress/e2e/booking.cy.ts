describe('booking test', () => {
  it('should create a reservation if table is available', () => {
    cy.visit('http://localhost:3000/reservations') // Visit booking page
    cy.get('input[type="Date"]').type('2022-12-12').click() // Choose a date
    cy.get('select').select('21:00 PM').should('have.value', '21') // Select 21 PM
    cy.get('.guest-amount-btns .increase').click().click() // Choose 2 guests
    cy.get('#request-booking').click() // Submit booking request
    cy.get('#name').type('John Doe') // If table is available, fill out name
    cy.get('#email').type('john@doe.com') // Fill out email
    cy.get('#phone').type('0701234567') // Fill out phone number
    cy.get('input[type="Checkbox"]').click() // Accept terms & conditions
    cy.get('#confirm-booking').click() // Submit form
    // Confirmation page should include booking date and guest e-mail
    cy.get('#booking-information').should(
      'contain.html',
      '2022-12-12, 21:00 pm',
    )
    cy.get('#confirmation').should('contain.html', 'john@doe.com')
  })

  it('should check that validation is working', () => {
    cy.visit('http://localhost:3000/reservations') // Visit booking page
    cy.get('.guest-amount-btns .increase').click().click() // Choose 2 guests
    cy.get('#request-booking').click() // Request booking
    // Make sure error shows up because time and date is missing
    cy.get('.error-generic').should(
      'contain.html',
      'Please fill out missing fields.',
    )
    cy.get('select').select('21:00 PM').should('have.value', '21') // Select 21:00 PM
    cy.get('#request-booking').click() // Request booking
    // Make sure error shows up beause date is missing
    cy.get('.error-generic').should(
      'contain.html',
      'Please fill out missing fields.',
    )
    cy.get('input[type="Date"]').type('2022-12-12').click() // Choose date 2022-12-12
    cy.get('#request-booking').click() // Request booking
    cy.get('input[type="Checkbox"]').click() // On next page, check GDPR checkbox
    // Try submitting form with missing fields
    cy.get('#confirm-booking').click()
    cy.get('.error-generic').should(
      'contain.html',
      'Please fill out required fields.',
    )
    // Try submitting with e-mail and phone number missing
    cy.get('#name').type('John Doe')
    cy.get('#confirm-booking').click()
    // Make sure error shows up
    cy.get('.error-generic').should(
      'contain.html',
      'Please fill out required fields.',
    )
    // Type in an e-mail and try booking
    cy.get('#email').type('john@doe.com')
    cy.get('#confirm-booking').click()
    // Make sure error shows up if phone number is still missing
    cy.get('.error-generic').should(
      'contain.html',
      'Please fill out required fields.',
    )
    // Type in final phone number field and try booking
    cy.get('#phone').type('0701234567')
    cy.get('#confirm-booking').click()
    // Booking confirmation on next page should include booking date and guest e-mail
    cy.get('#booking-information').should(
      'contain.html',
      '2022-12-12, 21:00 pm',
    )
    cy.get('#confirmation').should('contain.html', 'john@doe.com')
  })
})
