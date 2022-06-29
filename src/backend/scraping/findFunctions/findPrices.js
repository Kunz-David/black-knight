function findPrices(html) {
    const costReg = /[0-9]*&nbsp;Kč/g
    const costFix = found => found.match(/[\d,]+/)
    let results = html.match(costReg)
    return results.map(arr => parseInt(costFix(arr)[0]))
}

export default findPrices