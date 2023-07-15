import { SimLoad } from 'types';
import { load } from 'cheerio';
import axios from 'axios';

async function scrapeAllPromo() {
  const promo: SimLoad[] = [];
    const smart = await scrapeSmartPromos();
    const sun = await scrapeSunPromos();
    const tnt = await scrapeTNTPromos();
    const globe = await scrapeGlobePromos();
    const tm = await scrapeTMPromos();
    promo.push(...smart, ...sun, ...tnt, ...globe, ...tm);
    return promo;
}

async function scrapeSmartPromos() {
  try {
    const promo : SimLoad[] = [];
    const getHTML = await axios.get('https://mobilenetworksphilippines.com/smart-promos/')
    const $ = load(getHTML.data);
    const items = $('.promo-list > .promo-item');
    items.each((i, el) => {
      const Promo = $(el).find('h3 > strong').text();
      const Description = $(el).find('.promo > li:nth-child(1)').text().replace('Promo:', "").replace(/\n/g, '').replace(/\+/g, ",").trim();
      const Registration = $(el).find('.promo > li:nth-child(2)').text().replace("Registration:", "").trim();
      const Validity = $(el).find('.promo > li:nth-child(3)').text().replace("Validity:", "").trim();
      const Price = "₱" + $(el).find('.promo > li:nth-child(4)').text().replace("Price:", "").replace("Pesos", "").trim();
      const Sim = "Smart";
      promo.push({
        Promo,
        Description,
        Registration,
        Validity,
        Price,
        Sim
      })
    });
    return promo;
  } catch (error) {
    console.log(error);
  }
}

async function scrapeSunPromos() {
  try {
    const promo : SimLoad[] = [];
    const getHTML = await axios.get('https://onlineloadingstation.net/sun-promos/')
    const $ = load(getHTML.data);
    const items = $('.divTableBody:nth-child(2) > .divTableRow');
    items.each((i, el) => {
      const Promo = $(el).find('.divTableCell > h3').text().replace(/\t/g, "");
      const Description = $(el).find('.promo-feature').text().replace(/\t/g, " ").replace(/\s+/g, " ").trim();
      const Registration = $(el).find('.how-to-register').text().replace(/\t/g, " ").replace(/\s+/g, " ").trim();
      const Validity = $(el).find('.promo-validity').text().replace(/\t/g, " ").replace(/\s+/g, " ").replace("Valid for", "").trim();
      const Price = $(el).find('.promo-cost').text().replace(/\t/g, " ").replace(/\s+/g, " ").replace("only", "").trim();
      const Sim = "Sun";
      promo.push({
        Promo,
        Description,
        Registration,
        Validity,
        Price,
        Sim
      })
    });
    return promo;
  } catch (error) {
    console.log(error);
  }
}

async function scrapeTNTPromos() {
  try {
    const promo : SimLoad[] = [];
    const getHTML = await axios.get('https://pinoyboxbreak.com/pinoy-news/list-of-tnt-promos/');
    const $  = load(getHTML.data);
    const items = $('.promo-container');
    items.each((i, el) => {
      const Promo = $(el).find('h2').text();
      const Description = $(el).find('ul > li:nth-child(1)').text().replace("Features:", "").trim();
      const Registration = $(el).find('ul > li:nth-child(4)').text().replace("How to register:", "").trim();
      const Validity = $(el).find('ul > li:nth-child(3)').text().replace("Validity:", "").trim();
      const Price = $(el).find('ul > li:nth-child(2)').text().replace("Price:", "").trim();
      const Sim = "TNT";
      promo.push({
        Promo,
        Description,
        Registration,
        Validity,
        Price,
        Sim
      })
    })
    return promo;
  } catch(error) {
    console.log(error);
  }
}

async function scrapeGlobePromos() {
  try {
    const promo : SimLoad[] = [];
    const getHTML = await axios.get('https://mobilenetworksphilippines.com/globe-promos/');
    const $  = load(getHTML.data);
    const items = $('.promo-item');
    items.each((i, el) => {
      const Promo = $(el).find('h3').text();
      const Description = $(el).find('ul > li:nth-child(1)').text().replace("Promo:", "").replace(/\n\+/g, '').trim();
      const Registration = $(el).find('ul > li:nth-child(2)').text().replace("Registration:", "").replace(/\n\+/g, '').replace("REQUIREMENTS:", "").replace("⭬ ", "").replace("\n⭬ ","").trim();
      const Validity = $(el).find('ul > li:nth-child(3)').text().replace("Validity:", "").replace("Valid for", "").trim();
      const Price = $(el).find('ul > li:nth-child(4)').text().replace("Price:", "").replace("Costs", "").trim();
      const Sim = "Globe";
      promo.push({
        Promo,
        Description,
        Registration,
        Validity,
        Price,
        Sim
      })
    })
    return promo;
  } catch (error) {
    console.log(error);
  }
}

async function scrapeTMPromos() {
  try {
    const promo : SimLoad[] = [];
    const getHTML = await axios.get('https://mobilenetworksphilippines.com/tm-promos/');
    const $  = load(getHTML.data);
    const items = $('.promo-item');
    items.each((i, el) => {
      const Promo = $(el).remove('img.emoji').find('h3').text().replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]| /g, "").replace(/\u200d/g, "").trim();;
      const Description = $(el).find('ul > li:nth-child(1)').text().replace("Promo:", "").replace(/\n\+/g, '').trim();
      const Registration = $(el).find('ul > li:nth-child(2)').text().replace("Registration:", "").replace("Extension:", "").trim();
      const Validity = $(el).find('ul > li:nth-child(3)').text().replace("Validity:", "").replace("Va;idity:", "").trim();
      const Price = $(el).find('ul > li:nth-child(4)').text().replace("Price:", "").replace("load", "").trim();
      const Sim = "TM";
      promo.push({
        Promo,
        Description,
        Registration,
        Validity,
        Price,
        Sim
      })
    })
    return promo;
  } catch (error) {
    console.log(error);
  }
}

export default {
  scrapeAllPromo,
  scrapeSmartPromos,
  scrapeSunPromos,
  scrapeTNTPromos,
  scrapeGlobePromos,
  scrapeTMPromos
}