const colors = require('colors');
const { convertToJSON } = require("./convertToJSON");

async function getData(page, addresses) {
    const estimatedDelay = (addresses.length * 1.081);
    console.log(">Expected run time: " + estimatedDelay + "s");
    console.log(">Getting data... please wait\n");

    let results = {
        "founds": {},
        "notFounds": [],
    };
    let notFoundStack = [];

    for (const address of addresses) {

        await page.type('#txtDireccionesLugares', address);
        await page.click('#txtDireccionesLugares-boton-search');
        await page.waitForTimeout(1000);

        const data = await page.evaluate(() => {
            const firsResult = document.querySelector('#txtDireccionesLugares-ul > li:nth-child(1)');
            return firsResult.getAttribute('hidden-value');
        });

        if (data) {

            let infoInJSON = convertToJSON(data);

            if (infoInJSON.geometry) {
                results.founds[address] = infoInJSON;
            } else {
                notFoundStack.push(address);
            }

        } else {
            notFoundStack.push(address);
        }

    }

    results.notFounds = notFoundStack;

    return JSON.stringify(results);

}
exports.getData = getData;
