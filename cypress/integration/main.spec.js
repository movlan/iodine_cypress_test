/// <reference types="cypress" />

describe("Test Iodine Software Carrier Application Page", () => {
  before(() => {
    cy.visit("https://iodinesoftware.com/");
  });

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("Check if opens Iodine Software Home Page", () => {
    // get title element and see if it contains "Home - Iodine"
    cy.get("title").should("contain.text", "Home - Iodine");
  });

  it("Test Apply for Job", () => {
    // To go to the Careers Page
    // 1. Click Company in the navigation
    //    but when we are in mobile view we
    //    need to toggle nav by pressing at hamburger
    // lets select hamburger and click if it's visible
    cy.log("Check if hamburger toggle is visible");
    cy.get(".hamburger").then(($hamburger) => {
      if ($hamburger.is(":visible")) $hamburger.trigger("click");
    });

    // now navigation should be visible
    // get menu and select "Company" assert it exists and click
    cy.log("Click Company -> Careers");
    cy.get(".menu").contains("Company").should("exist").click();

    // get sub-menu and select Careers and assert it exists and click
    cy.get(".sub-menu").contains("Careers").should("exist").click();

    cy.log("Check if Career Page is opened");
    cy.url().should("include", "/careers");
  });

  it("Checks if Software Development Engineer in Test position exists and selects it", () => {
    cy.log("Check if position exists");
    cy.contains("Software Development Engineer in Test")
      .should("exist")
      .click();
  });

  it("Apply for Job DOES NOT SUBMIT", () => {
    // cy.visit("https://iodinesoftware.bamboohr.com/jobs/view.php?id=75");
    cy.log("BambooHR Site");

    // check if right career page is opened
    cy.contains("Software Development Engineer in Test").should("exist");

    // hit apply button
    cy.log("Click Apply for This Job");
    // cy.get("button").contains("Apply for").click();
    cy.get(".ResAts__card > .fab-Button--biggie").should("be.visible").click();

    // check if description is not visible
    cy.get(".js-jobs-description").should("not.be.visible");

    // get data.json as data
    cy.fixture("info.json").then((info) => {
      // fill in info
      cy.get("#firstName").type(info.firstName);
      cy.get("#lastName").type(info.lastName);
      cy.get("#email").type(info.email);
      cy.get("#phone").type(info.phone);
      cy.get("#streetAddress").type(info.streetAddress);
      cy.get("#city").type(info.city);
      cy.get('[data-menu-id="fab-menu1"]').click();
      cy.contains(info.state).click();
      cy.get("#zip").type(info.zip);

      // tried to attach file using cypress-file-upload
      // could not figure out what am I doing wrong here
      // it seems that cypress cant do anything to hidden elements????
      cy.fixture("Resume.pdf").then((resume) => {
        console.log(resume);
        cy.get('input[type="file"]').attachFile(
          {
            resume,
            fileName: "Resume.pdf",
            mimeType: "application/pdf",
          },
          { subjectType: "input" }
        );
      });
      cy.pause();
      cy.get("#dateAvailable").type(info.dateAvailable);
      cy.get("#desiredPay").type(info.desiredPay);
      cy.get("#websiteUrl").type(info.websiteUrl);
      cy.get("#linkedinUrl").type(info.linkedinUrl);
      cy.get('[data-menu-id="fab-menu3"]').click();
      cy.contains(info.educationLevel).click();
      cy.get("#referredBy").type(info.referredBy);
      cy.get("#customQuestions\\[271\\]").type(info.authorization);
      cy.get("#customQuestions\\[272\\]").type(info.sponsorship);
      cy.get("#customQuestions\\[273\\]").type(info.gpa);
      cy.get("#customQuestions\\[274\\]").type(info.howHeard);
    });

    // click cancel
    cy.get("button").contains("Cancel").should("be.visible").click();

    // check if description is visible
    cy.get(".js-jobs-description").should("be.visible");
  });
});
