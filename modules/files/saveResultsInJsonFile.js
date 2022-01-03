const fs = require('fs');
const colors = require('colors');
const { fileNameGenerator } = require("./fileNameGenerator");
const { throws } = require('assert');
const { createResultsFolderIfNotExist } = require("./createResultsFolderIfNotExist");

async function saveResultsInJsonFile(results) {

    createResultsFolderIfNotExist();

    let fileName = fileNameGenerator();
    fs.writeFile(`./results/${fileName}.json`, results, (err) => {
        if (err)
            throw err;
        console.log(colors.green("\nSuccess!"));
        console.log(colors.green("\nThe results were saved in a file called " + `'${fileName}.json'` + " inside the results folder\n"));
    });
}
exports.saveResultsInJsonFile = saveResultsInJsonFile;