import scrapeCard from "./rytir/scrapeCard"
import Server from "./serverClass"
import express, { Router } from "express"
// import axios from "axios"
import getJSON from "./rytir/utils/getJSON"
import sendBuyCardPostReq from "./rytir/utils/sendBuyCardPostReq"
import getNamedCards from "./getNamedCards"
import getNamedCardsRytir from "./rytir/getNamedCardsRytir"
import {getRAWNajadaCardSearch} from "./najada/getNamedCardsNajada"
import getNamedCardsRytirLEGACY from "./rytir/getNamedCardsRytirLEGACY"

const server = new Server()
server.listen()

const setURL = "https://mtgjson.com/api/v5/SetList.json"

const additionalInfo = {
    setsPromise: getJSON(setURL)
}

// not working:
server.app.get('/api/card/buy/:code/:amount', (req, res) => {
    const params = req.params
    if (!params) {
        res.json({
            error: "no params given"
        })
    } else {
        sendBuyCardPostReq(params.code, params.amount)
            .then(r => res.json(r))
            .catch(error => console.log(error))
    }
})

server.app.get('/api/card/:name', (req, res) => {
    const params = req.params
    if (!params) {
        res.json({
            error: "no params given"
        })
    } else {
        getNamedCards(params.name, additionalInfo)
            .then(r => res.json(r))
            .catch(error => console.log(error))
    }
})

server.app.get('/api/rytir/:name', (req, res) => {
    const params = req.params
    if (!params) {
        res.json({
            error: "no params given"
        })
    } else {
        getNamedCardsRytir(params.name, additionalInfo)
            .then(r => res.json(r))
            .catch(error => console.log(error))
    }
})

server.app.get('/api/raw_najada/:name', (req, res) => {
    const params = req.params
    if (!params) {
        res.json({
            error: "no params given"
        })
    } else {
        getRAWNajadaCardSearch(params.name)
            .then(r => res.json(r))
            //.then(r => console.log(r))
            .catch(error => console.log(error))
    }
})

server.app.get('/api/rytir_legacy/:name', (req, res) => {
    const params = req.params
    if (!params) {
        res.json({
            error: "no params given"
        })
    } else {
        getNamedCardsRytirLEGACY(params.name, additionalInfo)
            .then(r => res.json(r))
            .catch(error => console.log(error))
    }
})

// http://localhost:3001/api/search/?akce=3&jmenokarty=a&edice_magic=libovolna&poczob=30&foil=A&triditpodle=ceny&hledej_pouze_magic=1&submit=Vyhledej
// same search as on cerny rytir
server.app.get('/api/search', (req, res) => {
    const params = req.query
    // res.json(params)
    // res.send(params)
    const url = "https://cernyrytir.cz/index.php3?" + (new URLSearchParams(params)).toString()
    console.log(url)
    scrapeCard(url, "blank_cardname")
        .then(r => res.json(r))
        .catch(error => console.log(error))
})
//
// const router = Router()
// router.use(express.static('../../static_data/card_names.json'))
// server.app.use('/card_names', router)

// this shows the public folder: http://localhost:3001/favicon.ico
const router = Router()
router.use(express.static('./static_data'))
server.app.use('/cards/', router)


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
//
