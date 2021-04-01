describe('the time taken should be calculated',()=>{
    it('should add time as selections are made',()=>{
        cy.visit('http://localhost:3000');
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

          cy.contains('Time Taken 0');
          cy.contains("Donlon").click();
          cy.contains("Space pod").click();

          cy.contains('Time Taken 50');
          cy.contains("Enchai").click();
          cy.contains("Space pod").click();

          cy.contains('Time Taken 150');
          cy.contains("Jebing").click();
          cy.contains("Space rocket").click();
    });

    it('should display total time on result screen',()=>{
        cy.visit('http://localhost:3000');
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

          cy.intercept(
            {
              method: "POST",
              url: "/token",
            },
            {fixture: "validToken.json"}
          );

          cy.intercept(
            {
              method: "POST",
              url: "/find",
            },
            {fixture: "successFindResult.json"}
          );

          cy.get("#imgBg").click();

          cy.contains("Donlon").click();
          cy.contains("Space pod").click();

          cy.contains("Enchai").click();
          cy.contains("Space pod").click();

          cy.contains("Jebing").click();
          cy.contains("Space rocket").click();

          cy.contains("Sapir").click();
          cy.contains("Space shuttle").click();

          cy.contains('Time Taken 305');
    });

    it('should display total time even when falcon wasn not found',()=>{
        cy.visit('http://localhost:3000');
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

          cy.intercept(
            {
              method: "POST",
              url: "/token",
            },
            {fixture: "validToken.json"}
          );

          cy.intercept(
            {
              method: "POST",
              url: "/find",
            },
            {fixture: "failFindResult.json"}
          );

          cy.get("#imgBg").click();

          cy.contains("Donlon").click();
          cy.contains("Space pod").click();

          cy.contains("Enchai").click();
          cy.contains("Space pod").click();

          cy.contains("Jebing").click();
          cy.contains("Space rocket").click();

          cy.contains("Sapir").click();
          cy.contains("Space shuttle").click();

          cy.contains('Time Taken 305');
    });
})