import axios from "axios";

// returns a promise of the html
async function getJSON(url) {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default getJSON