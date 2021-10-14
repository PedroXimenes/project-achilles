/// <reference types="cypress" />

import { apiURL, apiBaseURL } from "../../src/config";

var inputTestOk = [];
var inputTestNotOk = [];

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
    cy.fixture("inputsTestOk.json").then((item) => {
      inputTestOk = item;
    });
    cy.fixture("inputsTestNotOk.json").then((item) => {
      inputTestNotOk = item;
    });
  });

  it("inputs be numbers", () => {
    const pattern = /[0-9]+/;

    inputTestOk.map((item) => {
      cy.expect(item.gnum).to.match(pattern);
      cy.expect(item.hnum).to.match(pattern);
      cy.expect(item.gden).to.match(pattern);
      cy.expect(item.hden).to.match(pattern);
      cy.expect(item.rT).to.match(pattern);
      cy.expect(item.sT).to.match(pattern);
      cy.expect(item.pT).to.match(pattern);
      cy.expect(item.vSS).to.match(pattern);
      cy.expect(item.ovst).to.match(pattern);
    });
  });
  it("ok if hden length > hnum length", () => {
    const hnum = "1,2";
    const hden = "1,2,3";

    cy.expect(hden.length).to.be.greaterThan(hnum.length);
  });

  it("is Ok when fill inputs", () => {
    inputTestOk.map((item) => {
      cy.visit(`${apiURL}/inputs`);

      cy.get("[data-test=gnum]").type(`${item.gnum}`);
      cy.get("[data-test=hnum]").type(`${item.hnum}`, { force: true });
      cy.get("[data-test=gden]").type(`${item.gden}`);
      cy.get("[data-test=hden]").type(`${item.hden}`, { force: true });
      cy.get("[data-test=riseTime]").type(`${item.rT}`);
      cy.get("[data-test=settlingTime]").type(`${item.sT}`);
      cy.get("[data-test=peakTime]").type(`${item.pT}`);
      cy.get("[data-test=varSS]").type(`${item.vSS}`);
      cy.get("[data-test=overshoot]").type(`${item.ovst}`);
      cy.get("[data-test=submit]").click();

      cy.request("POST", `${apiBaseURL}/analysis`, {
        gden: item.gden,
        gnum: item.gnum,
        hden: item.hden,
        hnum: item.hnum,
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
    });
  });
  it("alert must appear cus hnum > hden", () => {
    inputTestNotOk.map((item) => {
      cy.visit(`${apiURL}/inputs`);

      cy.get("[data-test=gnum]").type(`${item.gnum}`);
      cy.get("[data-test=hnum]").type(`${item.hnum}`, { force: true });
      cy.get("[data-test=gden]").type(`${item.gden}`);
      cy.get("[data-test=hden]").type(`${item.hden}`, { force: true });
      cy.get("[data-test=riseTime]").type(`${item.rT}`);
      cy.get("[data-test=settlingTime]").type(`${item.sT}`);
      cy.get("[data-test=peakTime]").type(`${item.pT}`);
      cy.get("[data-test=varSS]").type(`${item.vSS}`);
      cy.get("[data-test=overshoot]").type(`${item.ovst}`);
      cy.get("[data-test=submit]").click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq("/inputs");
      });
      cy.on("window:alert", (text) => {
        expect(text).to.contains(
          "O denominador do processo tem que ter grau maior ou igual do que o do numerador"
        );
      });
    });
  });
});
