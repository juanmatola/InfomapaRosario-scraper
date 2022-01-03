function convertToJSON(data) {
    let scapeInfo = data.replace(/(\')/g, "\"");
    return JSON.parse(scapeInfo);
}
exports.convertToJSON = convertToJSON;