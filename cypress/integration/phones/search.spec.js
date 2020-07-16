context('Search', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });

  it('searches valid phone number', () => {
    cy.get('#search').focus().type('89313518669');
    cy.get('#submit').click();
    cy.get('[data-testid=phone]').should('contain.text', '+7 (931) 351 - 86 - 69');
  });

  it('searches valid phone number with custom formatting', () => {
    cy.get('#search').focus().type('8 931 351 8669');
    cy.get('#submit').click();
    cy.get('[data-testid=phone]').should('contain.text', '+7 (931) 351 - 86 - 69');
  });

  it('searches valid phone number with punctuation', () => {
    cy.get('#search').focus().type('8 (931) 351-86-69');
    cy.get('#submit').click();
    cy.get('[data-testid=phone]').should('contain.text', '+7 (931) 351 - 86 - 69');
  });

  it('searches phone number without a leading 8', () => {
    cy.get('#search').focus().type('931 351 8669');
    cy.get('#submit').click();
    cy.get('[data-testid=phone]').should('contain.text', '+7 (931) 351 - 86 - 69');
  });

  it('displays error when phone number is invalid', () => {
    cy.get('#search').focus().type('invalid phone');
    cy.get('#submit').click();
    cy.get('[data-testid=phone]').should('not.exist');
    cy.get('[data-testid=error]').should('contain.text', 'Phone number is not valid!');
  });
});
