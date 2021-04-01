describe("Verify the vehicles error handling scenario", () => {

  it("The Vehicles Api is unresponsive", () => {
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
      {statusCode: 500}
    );

    cy.get("#imgBg").click();
    cy.contains("Donlon").click();
    cy.contains("Oops");
  });
});
