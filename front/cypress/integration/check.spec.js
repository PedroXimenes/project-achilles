/// <reference types="cypress" />
import { apiURL, apiBaseURL } from "../../src/config";

describe("test check endpoints", () => {
  beforeEach(() => {
    cy.visit(`${apiURL}/check`);
  });
  it("press ctrl button", () => {
    cy.get("[data-cy=ctrl]").click({ force: true });
    cy.location().should((location) => {
      expect(location.hash).to.be.empty;
    });
  });

  it("press about button", () => {
    cy.get("[data-cy=about]").click();
    cy.location("pathname").should("include", "about");
  });

  it("press help button", () => {
    cy.get("[data-cy=help]").click();
    cy.location("pathname").should("include", "help");
  });
  it("press change inputs button", () => {
    cy.get("[data-cy=cInput]").click();
    cy.location("pathname").should("include", "inputs");
  });
  it("press back to analysis button", () => {
    cy.get("[data-cy=analysisB]").click();
    cy.location("pathname").should("include", "analysis");
  });
});
