import cardTreatments from "../../utils/cardTreatments";

function findTreatments(html) {
    const nameReg = /<font style="font-weight : bolder;">[^<]+<\/font><\/div/gm;
    const nameTreatmentFix = found => found.match(/(?<=>)[^<]+(?=<)/gm);
    let results = html.match(nameReg);
    const names = results.map(arr => nameTreatmentFix(arr)[0].trim())
    return names.map(name => Object
        .keys(cardTreatments)
        .filter(treatment => name.includes(cardTreatments[treatment])))
}

export default findTreatments