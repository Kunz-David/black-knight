function findBuyCode(html) {
    const buycCodeReg = /"carovy_kod" value="[0-9]+"/g
    const numberFix = found => found.match(/[\d,]+/)
    let results = html.match(buycCodeReg)
    return results.map(arr => parseInt(numberFix(arr)[0]))
}

export default findBuyCode