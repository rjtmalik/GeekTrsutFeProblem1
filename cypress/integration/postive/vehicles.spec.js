describe("Verify the vehicles loading scenarios", () => {

  it("The Vehicles Data Store is populated", () => {
    cy.visit("http://localhost:3000");

    cy.intercept(
      {
        method: "GET",
        url: "/planets",
      },
      {fixture: "planets.json"}
    );
    cy.intercept(
      {
        method: "GET",
        url: "/vehicles",
      },
      {fixture: "vehicles.json"}
    );

    cy.get("#imgBg").click();
    cy.location("pathname").should("eq", "/selections/1");

    cy.contains("Donlon").click();

    cy.contains("Space pod")
    cy.location("pathname").should("eq", "/selections/1");
  });

  it("Show only eligible Vehicles", () => {
    cy.visit("http://localhost:3000");

    cy.intercept(
      {
        method: "GET",
        url: "/planets",
      },
      {fixture: "planets.json"}
    );
    cy.intercept(
      {
        method: "GET",
        url: "/vehicles",
      },
      {fixture: "vehicles.json"}
    );

    cy.get("#imgBg").click();

    cy.contains("Sapir").click();

    cy.contains("Space ship")
    cy.contains("Space shuttle")
    cy.should('not.contain',"Space pod")
  });
});
