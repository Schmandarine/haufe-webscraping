import Puppeteer from "puppeteer";

(async () => {
  let selector = "body > div.c-nav.w-nav";
  let cookie = ".sc-gsDKAQ.jLriiD";
  // Create a browser instance
  const browser = await Puppeteer.launch({
    defaultViewport: { width: 1920, height: 1080 },
  });

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url =
    "https://www.haufe-akademie.de/evolve/lernreifegrad-assessment";

  // Open URL in current page
  await page.goto(website_url, { waitUntil: ["load", "domcontentloaded"] });

  await page.waitForSelector("#usercentrics-root", { visible: true });
  await page.addStyleTag({
    content: "#usercentrics-root { display: none !important; }",
  });

  await page.waitForSelector(selector); // wait for the selector to load
  const element = await page.$(selector); // declare a variable with an ElementHandle
  await element.screenshot({ path: "navi.png" }); // take screenshot element in puppeteer

  //await page.screenshot({ path: "image.png" });

  // Close the browser instance
  await browser.close();
})();
