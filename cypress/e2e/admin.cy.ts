/// <reference types="cypress" />

describe("ADMIN functions i.e. duplicates, wrong password, login etc.", () => {
  // MAKE SURE USER DON'T EXIST FIRST IN DATABASE
  it("Test REGISTER ADMIN post", () => {
    cy.request({
      method: "POST",
      url: "http:localhost:4000/admin/register",
      body: {
        email: "random@random.se",
        password: "rakso",
        confirmPassword: "rakso",
      },
    }).then((response) => {
      expect(response.body).has.property("created", true);
    });
  });

  it("Test CONFIRM PASSWORD post", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/admin/register",
      body: {
        email: "oskar@oskar.se",
        password: "rakso",
        confirmPassword: "oskar",
      },
    }).then((response) => {
      expect(response.body).has.property("created", false);
    });
  });

  it("TEST DUPLICATE ADMIN post", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/admin/register",
      body: {
        email: "oskar@oskar.se",
        password: "rakso",
        confirmPassword: "rakso",
      },
    }).then((response) => {
      expect(response.body).has.property("created", false);
    });
  });

  it("TEST LOGIN, WRONG CREDENTIALS", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4000/admin",
      body: {
        emaiL: "oskar@oskar.se",
        password: "oskar",
      },
    }).then((response) => {
      expect(response.body).has.property("status", false);
    });
  });
});
