const puppeteer = require('puppeteer');
const colors = require('colors');
const { getCoordinates } = require("./modules/getCoordinates");
const { saveResultsInJsonFile } = require("./modules/files/saveResultsInJsonFile");

const URL = 'http://infomapa.rosario.gov.ar/emapa/mapa.htm';

const addresses = [ 'iriondo 2040', 'cerrito 2000', 'moreno 1025', 'entre rios 554',
                    'amenabar 1840', 'cerrito 554', 'san juan 1125', 'entre rios 1556', ];

(async () => {
  try {
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    await page.goto(URL);

    let t1 = performance.now();

    let results = await getCoordinates(page, addresses); 

    await saveResultsInJsonFile(results);
    
    let t2 = performance.now();

    console.log(colors.yellow.italic("Performance Information:"));
    console.log(">Total addresses: " + addresses.length);
    console.log(">Total run time: " + ((t2-t1)/1000));

    await browser.close();
    
  } catch (error) {

    console.error(colors.red(error));

  }
})();
