function findWebNames(html) {
    const nameReg = /<font style="font-weight : bolder;">[^<]+<\/font><\/div/gm;
    const nameFix = found => found.match(/(?<=>)[^<]+(?=<)/gm);
    let results = html.match(nameReg);
    return results.map(arr => nameFix(arr)[0].trim()) // names
}

export default findWebNames