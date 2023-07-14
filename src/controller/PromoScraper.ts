import { SimLoad } from 'types';
import { load } from 'cheerio';
import axios from 'axios';

async function scrapeSmartPromos() {
  try {
    const promo : SimLoad[] = [];
    const getHTML = await axios.get('https://mobilenetworksphilippines.com/smart-promos/')
    const $ = load(getHTML.data);
    const items = $('.promo-list > .promo-item');
    items.each((i, el) => {
      const Promo = $(el).find('h3 > strong').text();
      const Description = $(el).find('.promo > li:nth-child(1)').text();
      const Registration = $(el).find('.promo > li:nth-child(2)').text();
      const Validity = $(el).find('.promo > li:nth-child(3)').text();
      const Price = $(el).find('.promo > li:nth-child(4)').text();
      const Sim = "smart";
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
    const items = $('.divTableBody > .divTableRow');
    items.each((i, el) => {
      const Promo = $(el).find('.divTableCell > h3').text();
      const Description = $(el).find('.load-promos').text();
      const Registration = $(el).find('.how-to-register').text();
      const Validity = $(el).find('.promo-validity').text();
      const Price = $(el).find('.promo-cost').text();
      const Sim = "sun";
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
      const Description = $(el).find('ul > li:nth-child(1)').text();
      const Registration = $(el).find('ul > li:nth-child(4)').text();
      const Validity = $(el).find('ul > li:nth-child(3)').text();
      const Price = $(el).find('ul > li:nth-child(2)').text();
      const Sim = "tnt";
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
      const Description = $(el).find('ul > li:nth-child(1)').text();
      const Registration = $(el).find('ul > li:nth-child(2)').text();
      const Validity = $(el).find('ul > li:nth-child(3)').text();
      const Price = $(el).find('ul > li:nth-child(4)').text();
      const Sim = "globe";
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
      const Promo = $(el).find('h3').text();
      const Description = $(el).find('ul > li:nth-child(1)').text();
      const Registration = $(el).find('ul > li:nth-child(2)').text();
      const Validity = $(el).find('ul > li:nth-child(3)').text();
      const Price = $(el).find('ul > li:nth-child(4)').text();
      const Sim = "tm";
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
  scrapeSmartPromos,
  scrapeSunPromos,
  scrapeTNTPromos,
  scrapeGlobePromos,
  scrapeTMPromos
}