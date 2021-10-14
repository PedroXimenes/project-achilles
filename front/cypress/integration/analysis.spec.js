/// <reference types="cypress" />
import { apiURL, apiBaseURL } from "../../src/config";

describe("test analysis endpoints", () => {
  beforeEach(() => {
    cy.visit(`${apiURL}/analysis`);
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
    cy.get("[data-cy=changeInput]").click();
    cy.location("pathname").should("include", "inputs");
  });

  it("press check bounds button", () => {
    cy.visit(`${apiURL}/inputs`);
    let gnum = "1";
    let hnum = "1,2";
    let gden = "1,2";
    let hden = "1,2,3";
    let rT = "1.2";
    let sT = "3.4";
    let pT = "2";
    let vSS = "1";
    let ovst = "17";
    cy.get("[data-test=gnum]").type(`${gnum}`);
    cy.get("[data-test=hnum]").type(`${hnum}`, { force: true });
    cy.get("[data-test=gden]").type(`${gden}`);
    cy.get("[data-test=hden]").type(`${hden}`, { force: true });
    cy.get("[data-test=riseTime]").type(`${rT}`);
    cy.get("[data-test=settlingTime]").type(`${sT}`);
    cy.get("[data-test=peakTime]").type(`${pT}`);
    cy.get("[data-test=varSS]").type(`${vSS}`);
    cy.get("[data-test=overshoot]").type(`${ovst}`);
    cy.get("[data-test=submit]").click();

    cy.request("POST", `${apiBaseURL}/analysis`, {
      gden: gden,
      gnum: gnum,
      hden: hden,
      hnum: hnum,
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response.body).to.not.be.empty;
    });

    cy.request(`${apiBaseURL}/analysis`).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response).property("body").to.not.be.empty;
    });

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/analysis");
    });

    cy.get("[data-cy=checkBounds]").click({ force: true });
    cy.location("pathname").should("include", "check");
  });
});
