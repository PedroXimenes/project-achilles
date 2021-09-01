/// <reference types="cypress" />

describe("test home endpoints", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("press start button", () => {
    cy.get("[data-cy=start]").click();
    cy.location("pathname").should("include", "inputs");
  });

  it("press about button", () => {
    cy.get("[data-cy=about]").click();
    cy.location("pathname").should("include", "about");
  });

  it("press help button", () => {
    cy.get("[data-cy=help]").click();
    cy.location("pathname").should("include", "help");
  });
});
