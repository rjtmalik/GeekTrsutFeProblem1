describe('find falcon complete', ()=>{
    it('finds falcon on Donlon',()=>{
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
          cy.contains("Donlon");
    });

    it('Does not find falcon at all',()=>{
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
          cy.should("not.contain","Donlon");
          cy.should("not.contain","Enchai");
          cy.should("not.contain","Jebing");
          cy.should("not.contain","Sapir");
          cy.should("not.contain","Lerbin");
          cy.should("not.contain","Pingasor");
    });
})