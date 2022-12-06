function findBuyCode(html) {
    const buyCodeReg = /"carovy_kod" value="[0-9]+"/g
    const numberFix = found => found.match(/[\d,]+/)
    let results = html.match(buyCodeReg)
    return results.map(arr => parseInt(numberFix(arr)[0]))
}

export default findBuyCode