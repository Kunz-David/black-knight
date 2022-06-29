import mongoose from "mongoose"
import axios from "axios"

require('dotenv').config()

const { Schema } = mongoose

const url = "mongodb+srv://david-kunz:" + process.env.DB_PASSWORD + "@cluster.qhdmw.mongodb.net/default?retryWrites=true&w=majority"
mongoose.connect(url)

const cardSchema = new Schema({
    arena_id: { type: String },
    object: { type: String, required: true },
    id: { type: String, unique: true, required: true },
    oracle_id: { type: String, required: true },
    multiverse_ids: [Number],
    mtgo_id: { type: Number },
    mtgo_foil_id: { type: Number },
    tcgplayer_id: { type: Number },
    cardmarket_id: { type: Number },
    name: { type: String, required: true },
    lang: String,
    released_at: { type: Date, required: true },
    uri: { type: String, required: true },
    scryfall_uri: { type: String, required: true },
    layout: { type: String, required: true },
    highres_image: { type: Boolean, required: true },
    image_status: { type: String, required: true },
    image_uris: {
        small: { type: String },
        normal: { type: String },
        large: { type: String },
        png: { type: String },
        art_crop: { type: String },
        border_crop: { type: String },
    },
    mana_cost: { Number },
    cmc: { type: Number, required: true },
    type_line: { type: String, required: true },
    oracle_text: { type: String },
    colors: [String],
    color_identity: [String],
    keywords: [String],
    legalities: {
        standard: { type: String },
        future: { type: String },
        historic: { type: String },
        gladiator: { type: String },
        pioneer: { type: String },
        modern: { type: String },
        legacy: { type: String },
        pauper: { type: String },
        vintage: { type: String },
        penny: { type: String },
        commander: { type: String },
        brawl: { type: String },
        historicbrawl: { type: String },
        paupercommander: { type: String },
        duel: { type: String },
        oldschool: { type: String },
        premodern: { type: String }
    },
    games: [String],
    reserved: Boolean,
    foil: Boolean,
    nonfoil: Boolean,
    finishes: [String],
    oversized: Boolean,
    promo: { type: Boolean, required: true },
    reprint: { type: Boolean, required: true },
    variation: { type: Boolean, required: true },
    set_id: { type: String, required: true },
    set: { type: String, required: true },
    set_name: { type: String, required: true },
    set_type: { type: String, required: true },
    set_uri: { type: String, required: true },
    set_search_uri: { type: String, required: true },
    scryfall_set_uri: { type: String, required: true },
    rulings_uri: { type: String, required: true },
    prints_search_uri: { type: String, required: true },
    collector_number: String,
    digital: Boolean,
    rarity: { type: String, required: true },
    flavor_text: String,
    card_back_id: { type: String, required: true },
    artist: String,
    artist_ids: [String],
    illustration_id: String,
    border_color: String,
    frame: { type: String, required: true },
    full_art: { type: Boolean, required: true },
    textless: { type: Boolean, required: true },
    booster: { type: Boolean, required: true },
    story_spotlight: { type: Boolean, required: true },
    edhrec_rank: Number,
    prices: {
        usd: Number,
        usd_foil: Number,
        usd_etched: Number,
        eur: Number,
        eur_foil: Number,
        tix: Number
    },
    related_uris: {
        gatherer: String,
        tcgplayer_infinite_articles: String,
        tcgplayer_infinite_decks: String,
        edhrec: String,
        mtgtop8: String
    }
})

const CardModel = mongoose.model('Card', cardSchema)
const bulkUrl = "https://c2.scryfall.com/file/scryfall-bulk/oracle-cards/oracle-cards-20211022090346.json"

const getBulk = async (bulkUrl) => {
    try {
        return await axios.get(bulkUrl)
    } catch (error) {
        console.error(error)
    }
}

const bulk = getBulk(bulkUrl)

// bulk.then(res => {
//     for (let resKey in res.data) {
//         try {
//             const me = new CardModel(res.data[resKey])
//         } catch (error) {
//             console.log(resKey, res.data[resKey])
//             console.log(error)
//         }
//     }
// })
// console.log("done")

CardModel.deleteMany({})
    .then(res => console.log("cards deleted"))
    .then(CardModel.db.collection("cards").dropIndexes())
    .then(bulk.then(res => CardModel.insertMany(res.data))
        .then((docs) => {
            console.log(docs)
            console.log("done, should be on server")
            mongoose.disconnect()
        })
        .catch((error) => {
            mongoose.disconnect()
            console.error(error)
        }))


