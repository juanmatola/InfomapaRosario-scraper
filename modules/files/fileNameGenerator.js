const crypto = require('crypto');

function fileNameGenerator() {
    const randomString = crypto.randomBytes(8).toString('hex');
    const date = new Date();
    return `${date.getHours()}-${date.getMinutes()} ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}_${randomString}`;
}
exports.fileNameGenerator = fileNameGenerator;
