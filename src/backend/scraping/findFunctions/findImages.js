function findImages(html) {
    const imageReg = /<a href="\/images\/kusovkymagic[^"]+\.jpg"/gm
    const imageFix = found => found.match(/(?<=")\/images\/kusovkymagic[^"]+\.jpg(?=")/g)
    let results = html.match(imageReg)
    return results.map(arr => "https://cernyrytir.cz" + imageFix(arr)[0])
}

export default findImages