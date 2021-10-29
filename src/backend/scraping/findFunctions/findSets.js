function findSets(html) {
    const setReg = /<img src = "\/images\/kusovky\/\w+\.gif"> [^<]+<\/td>/gm;
    const setFix = found => found.match(/(?<=>).*(?=<)/gm);
    let results = html.match(setReg);
    return results.map(arr => setFix(arr)[0].trim())
}

export default findSets