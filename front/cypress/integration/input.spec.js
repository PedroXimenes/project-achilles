/// <reference types="cypress" />

import { apiURL, apiBaseURL } from "../../src/config";
describe("test inputs endpoints", () => {
  beforeEach(() => {
    cy.visit(`${apiURL}/inputs`);
  });

  it("press help button", () => {
    cy.get("[data-cy=iHelp]").click();
    cy.location("pathname").should("include", "help");
  });

  it("press about button", () => {
    cy.get("[data-cy=iAbout]").click();
    cy.location("pathname").should("include", "about");
  });

  it("press help button", () => {
    cy.get("[data-cy=iHome]").click();
    cy.location().should((location) => {
      expect(location.hash).to.be.empty;
    });
  });
});

describe("test inputs form", () => {
  beforeEach(() => {
    cy.visit(`${apiURL}/inputs`);
  });

  it("inputs be numbers", () => {
    const hnum = "1,2";
    const hden = "1,2,3";
    const gnum = "1";
    const gden = "1,2";
    const rT = "1.2";
    const sT = "3.2";
    const pT = "2.1";
    const vSS = "1";
    const ovst = "18";
    const pattern = /[0-9]+/;

    cy.expect(gnum).to.match(pattern);
    cy.expect(hnum).to.match(pattern);
    cy.expect(gden).to.match(pattern);
    cy.expect(hden).to.match(pattern);
    cy.expect(rT).to.match(pattern);
    cy.expect(sT).to.match(pattern);
    cy.expect(pT).to.match(pattern);
    cy.expect(vSS).to.match(pattern);
    cy.expect(ovst).to.match(pattern);
  });
  it("ok if hden length > hnum length", () => {
    const hnum = "1,2";
    const hden = "1,2,3";

    cy.expect(hden.length).to.be.greaterThan(hnum.length);
  });

  it("is Ok when fill inputs", () => {
    const hnum = "1,2";
    const hden = "1,2,3";
    const gnum = "1";
    const gden = "1,2";
    const rT = "1.2";
    const sT = "3.2";
    const pT = "2.1";
    const vSS = "1";
    const ovst = "18";

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
    // cy.request('POST', `${apiBaseURL}analysis`)
    // .its('body')
    // .as('currentUser')

    cy.request(`${apiBaseURL}analysis`).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response).property("body").to.not.be.empty;
    });

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/analysis");
    });
  });

  it("alert must appear cus hnum >= hden", () => {
    const hnum = "1,2,3";
    const hden = "1,2,3";
    const gnum = "1";
    const gden = "1,2";
    const rT = "1.2";
    const sT = "3.2";
    const pT = "2.1";
    const vSS = "1";
    const ovst = "18";

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

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/inputs");
    });
  });
});
