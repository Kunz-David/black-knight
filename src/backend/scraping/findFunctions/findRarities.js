import { toLower } from "lodash";

function findRarities(html) {
    const rarityReg = /<td align="left" valign ="top" style="border-bottom-color : white; border-bottom-style : solid; border-bottom-width : 1px;">[\w|\s]+<\/td>/gm;
    const rarityFix = found => found.match(/(?<=>).*(?=<)/gm);
    let results = html.match(rarityReg);
    return results.map(arr => toLower(rarityFix(arr)[0].trim()))
}

export default findRarities