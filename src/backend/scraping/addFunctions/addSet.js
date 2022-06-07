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
        "Commander ZNR": "Zendikar Rising Commander",
        "Commander CMR": "Commander Legends",
        "Commander KHM": "Kaldheim Commander",
        "Commander AFR": "Forgotten Realms Commander",
        "Commander VOC": "Crimson Vow Commander",
        "Commander MIC": "Midnight Hunt Commander",
        "Commander NEO": "Neon Dynasty Commander",
        "Commander SNC": "New Capenna Commander",
        "Commander CLB": "Commander Legends: Battle for Baldur's Gate",
        "Baldur´s Gate": "Commander Legends: Battle for Baldur's Gate",
        "Commander Coll.: Green": "Commander Collection: Green",
        "New Capenna": "Streets of New Capenna",
        "Modern Horizons II": "Modern Horizons 2",
        "GS: Jiang Yanggu": "Global Series Jiang Yanggu & Mu Yanling",
        "RNA Guild Kits": "Guilds of Ravnica Guild Kits Set of 5",
        "P - Promo Pack": "Media Insert",
        "Timeshifted Remastered": "Time Spiral Timeshifted",
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