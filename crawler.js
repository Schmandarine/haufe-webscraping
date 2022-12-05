import axios from "axios";
import * as cheerio from "cheerio";
import { stringify } from "csv-stringify";
import { generate } from "csv-generate";
import fs from "fs";

const sites = [
  {
    link: "https://www.haufe-akademie.de/evolve/entwicklungsprogramme",
    selectorSet: 1,
  },
  {
    link: "https://www.haufe-akademie.de/evolve/organisationsentwicklung",
    selectorSet: 1,
  },
  {
    link: "https://www.haufe-akademie.de/evolve/themen/future-skills",
    selectorSet: 2,
  },
  {
    link: "https://www.haufe-akademie.de/evolve/themen/hr-toolbox",
    selectorSet: 2,
  },
  {
    link: "https://www.haufe-akademie.de/evolve/themen/next-level-leadership",
    selectorSet: 2,
  },
  {
    link: "https://www.haufe-akademie.de/evolve/themen/projektmanagement",
    selectorSet: 2,
  },
  {
    link: "https://www.haufe-akademie.de/evolve/lernreifegrad-assessment",
    selectorSet: 2,
  },
];

const getPostTitles = async (site) => {
  try {
    const { data } = await axios.get(site.link);
    const $ = cheerio.load(data);
    let postTitles = [];

    switch (site.selectorSet) {
      case 1:
        $(".c-thema").each((_idx, el) => {
          const cardTitle = $(el).find(".c-title-wrapper > .c-text-1").text();
          postTitles.push(cardTitle);
        });
        break;
      case 2:
        $(".c-card-loesungen-wrap").each((_idx, el) => {
          const cardTitle = $(el).find(".c-title-wrapper > .c-title-5").text();
          postTitles.push(cardTitle);
        });
        break;
    }

    return postTitles;
  } catch (error) {
    throw error;
  }
};

const getAllPages = async () => {
  let allPages = [];

  for (const site of sites) {
    const pagesTitles = await getPostTitles(site);
    allPages.push(pagesTitles);
  }

  let flatArray = allPages.flat();
  let flatArraySet = new Set([...flatArray]);
  console.log(flatArraySet);
};

getAllPages();

/* var dataToWrite = "mydata";
fs.writeFile("ormList.csv", dataToWrite, "utf8", function (err) {
  if (err) {
    console.log(
      "Some error occured - file either not saved or corrupted file saved."
    );
  } else {
    console.log("It's saved!");
  }
}); */
