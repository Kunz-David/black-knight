import axios from "axios"
import qs from "qs"


// returns a promise of the response
async function sendBuyCardPostReq(buyCode, count, PHPSESSID = "0dl6cd2baprqaal9bmfcqrjqn3") {

    const data = qs.stringify({
        'carovy_kod': buyCode.toString(),
        'databaze': 'kusovkymagic',
        'nakupzbozi': 'Pridat',
        'kusu': count.toString()
    })

    const config = {
        method: 'post',
        url: 'http://cernyrytir.cz/index.php3',
        headers: {
            'Cookie': `PHPSESSID=${PHPSESSID};`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const response = await axios(config)
        return { status: response.status }
    } catch (error) {
        console.error(error)
    }
}

export default sendBuyCardPostReq