import fuzzysort from "fuzzysort"
import { toLower, has } from "lodash"


function rename(rytirSet) {
    const names = {
        "P - Secret Lair": "Secret Lair Drop",
        "3rd Edition": "Revised Edition",
        "4th Edition": "Fourth Edition",
        "5th Edition": "Fifth Edition",
        "6th Edition": "Sixth Edition",
        "7th Edition": "Seventh Edition",
        "8th Edition": "Eighth Edition",
        "9th Edition": "Ninth Edition",
        "10th Edition": "Tenth Edition",
        "Commander Coll.: Black": "Commander Collection: Black",
        "P - Grand Prix": "Grand Prix Promos",
        "P - Prerelease DOM": "Dominaria",
        "P - Promo Pack": "Media Insert",
        "P - Vanguard": "Vanguard Series",
        "P - Prerelease MH2": "Modern Horizons 2",
        "P - Prerelease CLB": "Battle for Baldur's Gate Promos",
        "P - Prerelease SNC": "Streets of New Capenna Promos",
        "P - Prerelease NEO": "Kamigawa: Neon Dynasty Promos",
        "P - Prerelease VOW": "Innistrad: Crimson Vow Promos",
        "P - Prerelease MID": "Innistrad: Midnight Hunt Promos",
        "P - Prerelease AFR": "Adventures in the Forgotten Realms Promos",
        "P - Prerelease MH2": "Modern Horizons 2 Promos",
        "P - Prerelease STX": "Strixhaven: School of Mages Promos",
        "P - Prerelease KHM": "Kaldheim Promos",
        "P - Prerelease ZNR": "Zendikar Rising Promos",
        "P - Prerelease M21": "Core Set 2021 Promos",
        "P - Prerelease IKO": "Ikoria: Lair of Behemoths Promos",
        "P - Prerelease THB": "Theros Beyond Death Promos",
        "P - Prerelease ELD": "Throne of Eldraine Promos",
        "P - Prerelease M20": "Core Set 2020 Promos",
        "P - Prerelease WAR": "War of the Spark Promos",
        "P - Prerelease RNA": "Ravnica Allegiance Promos",
        "P - Prerelease GRN": "Guilds of Ravnica Promos",
        "P - Prerelease M19": "Core Set 2019 Promos",
        "P - Prerelease BBD": "Battlebond Promos",
        "P - Prerelease DOM": "Dominaria Promos",
        "P - Prerelease RIX": "Rivals of Ixalan Promos",
        "P - Prerelease XLN": "Ixalan Promos",
        "P - Prerelease HOU": "Hour of Devastation Promos",
        "P - Prerelease AKH": "Amonkhet Promos",
        "P - Prerelease AER": "Aether Revolt Promos",
        "P - Prerelease KLD": "Kaladesh Promos",
        "P - Prerelease EMN": "Eldritch Moon Promos",
        "P - Prerelease SOI": "Shadows over Innistrad Promos",
        "P - Prerelease OGW": "Oath of the Gatewatch Promos",
        "P - Prerelease BFZ": "Battle for Zendikar Promos",
        "P - Prerelease ORI": "Magic Origins Promos",
        "P - Prerelease DTK": "Dragons of Tarkir Promos",
        "P - Prerelease FRF": "Fate Reforged Promos",
        "P - Prerelease KTK": "Khans of Tarkir Promos",
        "Commander ZNR": "Zendikar Rising Commander",
        "Commander CMR": "Commander Legends",
        "Commander KHM": "Kaldheim Commander",
        "Commander AFR": "Forgotten Realms Commander",
        "Commander VOW": "Crimson Vow Commander",
        "Commander MID": "Midnight Hunt Commander",
        "Commander NEO": "Neon Dynasty Commander",
        "Commander SNC": "New Capenna Commander",
        "Commander CLB": "Commander Legends: Battle for Baldur's Gate",
        "Baldur´s Gate": "Commander Legends: Battle for Baldur's Gate",
        "Commander Coll.: Green": "Commander Collection: Green",
        "New Capenna": "Streets of New Capenna",
        "Modern Horizons II": "Modern Horizons 2",
        "GS: Jiang Yanggu": "Global Series Jiang Yanggu & Mu Yanling",
        "RNA Guild Kits": "Guilds of Ravnica Guild Kits Set of 5",
        "Timeshifted Remastered": "Time Spiral Timeshifted",
        "Mystical Archive - JP": "Strixhaven Mystical Archive",
        "GRN Guild Kits": "GRN Guild Kit",
        "Kamigawa NEO": "Kamigawa: Neon Dynasty",
    }

    var newName = rytirSet

    newName = newName.replaceAll("Extras", "")
    newName = newName.replaceAll("´", "'")
    newName = newName.trim()

    if (has(names, newName)) {
        newName = names[newName]
        // console.debug(`swiched "${rytirSet}" for "${newName}"`)
    }

    return newName
}

// const setCodes = lodash.map(setList.data, val => lodash.pick(val, ['name', 'keyruneCode']))

const options = {
    limit: 1,
    threshold: -10000,
    key: "name"
}

async function addSet(card, setsPromise) {
    if (setsPromise === undefined || setsPromise === null) {
        return null
    }

    var searchSet = card.rytir_set

    const sets = (await setsPromise).data

    searchSet = rename(searchSet)
    var searchResults = fuzzysort.go(searchSet, sets, options)

    var keyruneCode = "DEFAULT"
    var releaseDate = undefined
    var setType = undefined

    if (searchResults.length !== 0) {
        keyruneCode = toLower(searchResults[0].obj.keyruneCode)
        releaseDate = searchResults[0].obj.releaseDate
        setType = searchResults[0].obj.type
    } else {
        console.debug(`Set "${searchSet}" not found, replaced by "${keyruneCode}".`)
    }

    return {
        set: searchSet,
        keyruneCode,
        releaseDate,
        setType
    }
}

export default addSet