context('Browse all available phone numbers', () => {
  beforeEach(() => {
    cy.exec('npm run db:reset && npm run db:seed 100');
    cy.visit('localhost:3000/browse/1');
  });

  it('visits the page', function () {
    console.log(this.responseBody);
  });
});
