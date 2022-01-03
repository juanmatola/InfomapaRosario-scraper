const colors = require('colors');
const { convertToJSON } = require("./convertToJSON");

async function getCoordinates(page, addresses) {
    const estimatedDelay = (addresses.length * 1.081);

    let results = {
        "founds": {},
        "notFounds": [],
    };
    let notFoundStack = [];

    console.log(colors.green('Getting coordinates... \n'));
    console.log(">Expected run time: " + estimatedDelay + "s \n");

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
exports.getCoordinates = getCoordinates;
