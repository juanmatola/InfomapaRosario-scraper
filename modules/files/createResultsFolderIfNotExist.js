const fs = require('fs');

function createResultsFolderIfNotExist() {
    const RESULTS_FOLDER_NAME = './results';
    if (!fs.existsSync(RESULTS_FOLDER_NAME)) {
        fs.mkdirSync(RESULTS_FOLDER_NAME);
    }
}
exports.createResultsFolderIfNotExist = createResultsFolderIfNotExist;
