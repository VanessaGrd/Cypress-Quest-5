import 'cypress-mochawesome-reporter/register';

describe("download tests", () => {
  beforeEach(() => {
    cy.visit("https://filebin.net/");
  });

  it("upload file", () => {
    const avatar = 'avatar.jpeg'; 

    cy.get("#fileField").attachFile(avatar);
    cy.contains("It contains 1 uploaded file").should("be.visible");
    cy.contains("Download files").click();
    cy.contains("Zip")
      .invoke("attr", "href")
      .then((downloadLink) => {
        const absoluteLink = "https://filebin.net" + downloadLink;
        cy.log(absoluteLink);
        cy.downloadFile(
          absoluteLink,
          "mydownloads/zipFiles",
          "downloadedFromCypress.zip"
        );
        cy.readFile("mydownloads/zipFiles/downloadedFromCypress.zip");
      });
  });

  it("Upload file and download it in Tar format", () => {
    const avatar = 'avatar.jpeg'; 

    cy.get("#fileField").attachFile(avatar);
    cy.contains("It contains 1 uploaded file").should("be.visible");
    cy.contains("Download files").click();
    cy.contains("Tar")
      .invoke("attr", "href")
      .then((downloadLink) => {
        const absoluteLink = "https://filebin.net" + downloadLink;
        cy.log(absoluteLink);
        cy.downloadFile(
          absoluteLink,
          "mydownloads/tarFiles",
          "downloadedFromCypress.tar"
        );
        cy.readFile("mydownloads/tarFiles/downloadedFromCypress.tar");
      });
  });
});