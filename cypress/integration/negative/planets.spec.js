describe("Verify planet error handling scenario", () => {
  it("The Planets Api is unresponsive", () => {
    cy.visit("http://localhost:3000");

    cy.intercept(
      {
        method: "GET",
        url: "/planets",
      },
      { statusCode: 500 }
    );

    cy.get("#imgBg").click();

    cy.contains("Oops");
  });
});
