function findStocks(html) {
    const stockReg = /[0-9]*&nbsp;ks/g
    const costFix = found => found.match(/[\d,]+/)
    let results = html.match(stockReg)
    return results.map(arr => parseInt(costFix(arr)[0]))
}

export default findStocks