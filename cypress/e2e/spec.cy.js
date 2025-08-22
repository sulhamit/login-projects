describe("Error testing", () => {
  it("show error when email is not valid and button disabled -1", () => {
    //arrange
    cy.visit("http://localhost:5175/");

    //act
    cy.get('[data-cy=email-input]').type("sulhamit.com");
    cy.get('[data-cy=password-input]').type("1234Aa.");
    cy.get('[data-cy=terms-checkbox]').check();

    //assert
    cy.contains("Email is required").should("be.visible");
    cy.get('[data-cy=error-message]').should("have.length", 1);
    cy.get('[data-cy=submit-button]').should('be.disabled')
  })
});

describe("Error testing -2", () => {
  it("show error when email, password and terms are not valid and button disabled", () => {
    //arrange
    cy.visit("http://localhost:5175/");

    //act
    cy.get('[data-cy=email-input]').type("sulhamit@gmail.com");
    cy.get('[data-cy=password-input]').type("123Ss.4");
    cy.get('[data-cy=terms-checkbox]').uncheck();



    //assert
    cy.contains("You must accept the terms and conditions").should("be.visible");
    cy.get('[data-cy=error-message]').should("have.length", 1);
    cy.get('[data-cy=submit-button]').should('be.disabled')
  })
});

describe("Error testing -3", () => {
  it("show error when email and password are valid but terms is not valid disabled", () => {
    //arrange
    cy.visit("http://localhost:5175/");

    //act
    cy.get('[data-cy=email-input]').type("sulhamit.com");
    cy.get('[data-cy=password-input]').type("1234");
    cy.get('[data-cy=terms-checkbox]').check();


    //assert
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.get('[data-cy=error-message]').should("have.length", 2);
    cy.get('[data-cy=submit-button]').should('be.disabled')
  })
});

describe("Suscess testing", () => {
  it('login successufully when email, password, terms are validated and navigates to success to success page', () => {

    //arrange
    cy.visit('http://localhost:5175/');
    //act
    cy.get('[data-cy=email-input]').type('sulhamit@gmail.com');
    cy.get('[data-cy=password-input]').type('1234Aa.');
    cy.get('[data-cy=terms-checkbox]').check();
    cy.get('[data-cy=submit-button]').click();

    //assert
    cy.url().should('include', '/success');

  });



})