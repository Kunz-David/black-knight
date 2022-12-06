import axios from "axios"
import reformatNajadaResults from "./reformatNajadaResults"

async function getExactNajadaCardSearch(cardName) {
    let najadaSearchJSON = {
        o:"-price",
        in_stock:"false",
        q:cardName,
        offset: 0,
        limit: 123123,
        article_price_min:0,
        article_price_max:10000000,
    }
    const najadaSearchURL = new URLSearchParams(najadaSearchJSON)
    const request = {
        method: 'get',
        url: "https://najada.games/api/v1/najada2/catalog/mtg-singles/?" + najadaSearchURL,
        headers: {}
    }
    return axios(request)
}

export async function getRAWNajadaCardSearch(cardName) {
    let data = {}
    try {
        const rawNajada = await getExactNajadaCardSearch(cardName)
        data = {
            ...rawNajada.data
        }
    } catch (err) {
        console.log(err)
    }
    return data
}

async function getNamedCardsNajada(cardName) {
    let data = {status: "error"}
    try {
        const response = await getExactNajadaCardSearch(cardName)
        data.status = "success"
        data.cards = reformatNajadaResults(response.data)
    } catch (err) {
        console.log(err)
    }
    return data
}

export default getNamedCardsNajada

