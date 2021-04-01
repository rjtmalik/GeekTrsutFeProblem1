describe("Verify planet loading scenario", () => {
  it("clicking anywhere on the image starts the search selection", () => {
    cy.visit("http://localhost:3000");

    cy.intercept(
      {
        method: "GET",
        url: "/planets",
      },"planets.json"
    );

    cy.get("#imgBg").click();

    cy.location("pathname").should("eq", "/selections/1");
  });

  it("The Planets Data Store is populated", () => {
    cy.visit("http://localhost:3000");

    cy.intercept(
      {
        method: "GET",
        url: "/planets",
      },
      {fixture: "planets.json"}
    );

    cy.get("#imgBg").click();

    cy.location("pathname").should("eq", "/selections/1");
  });
});
