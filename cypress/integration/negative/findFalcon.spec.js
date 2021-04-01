describe("find falcon complete", () => {
  it("Does not receive valid token", () => {
    cy.visit("http://localhost:3000");
    cy.intercept(
      {
        method: "GET",
        url: "/planets",
      },
      { fixture: "planets.json" }
    );
    cy.intercept(
      {
        method: "GET",
        url: "/vehicles",
      },
      { fixture: "vehicles.json" }
    );

    cy.intercept(
      {
        method: "POST",
        url: "/token",
      },
      { statusCode: 500 }
    );

    cy.get("#imgBg").click();

    cy.contains("Donlon").click();
    cy.contains("Space pod").click();

    cy.location("pathname").should("eq", "/selections/2");
    cy.contains("Enchai").click();
    cy.contains("Space pod").click();

    cy.location("pathname").should("eq", "/selections/3");
    cy.contains("Jebing").click();
    cy.contains("Space rocket").click();

    cy.location("pathname").should("eq", "/selections/4");
    cy.contains("Sapir").click();
    cy.contains("Space shuttle").click();

    cy.location("pathname").should("eq", "/result");
    cy.contains("Oops");
  });

  it("Find API does not return a response", () => {
    cy.visit("http://localhost:3000");
    cy.intercept(
      {
        method: "GET",
        url: "/planets",
      },
      { fixture: "planets.json" }
    );
    cy.intercept(
      {
        method: "GET",
        url: "/vehicles",
      },
      { fixture: "vehicles.json" }
    );

    cy.intercept(
      {
        method: "POST",
        url: "/token",
      },
      { fixture: "validToken.json" }
    );

    cy.intercept(
      {
        method: "POST",
        url: "/find",
      },
      { statusCode: 500 }
    );

    cy.get("#imgBg").click();

    cy.contains("Donlon").click();
    cy.contains("Space pod").click();

    cy.location("pathname").should("eq", "/selections/2");
    cy.contains("Enchai").click();
    cy.contains("Space pod").click();

    cy.location("pathname").should("eq", "/selections/3");
    cy.contains("Jebing").click();
    cy.contains("Space rocket").click();

    cy.location("pathname").should("eq", "/selections/4");
    cy.contains("Sapir").click();
    cy.contains("Space shuttle").click();

    cy.location("pathname").should("eq", "/result");
    cy.contains("Oops");
  });
});
