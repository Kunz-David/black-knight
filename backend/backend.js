import scrapeCard from "./scraping/scrapeCard";
import exactCardSearchURL from "./scraping/exactCardSearchURL";
import Server from "./serverClass";


const server = new Server()
server.listen()

server.app.get('/api/card/:name', (req, res) => {
    const params = req.params
    if (!params) {
        res.json({
            error: "no params given"
        });
    } else {
        scrapeCard(exactCardSearchURL(params.name))
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
    const url = "http://cernyrytir.cz/index.php3?" + (new URLSearchParams(params)).toString()
    console.log(url)
    scrapeCard(url)
        .then(r => res.json(r))
        .catch(error => console.log(error))
})


// this shows the public folder: http://localhost:3001/favicon.ico
// const router = Router()
// router.use(express.static('./public'))
// app.use('/', router)


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
//
