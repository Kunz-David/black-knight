import axios from "axios";

// returns a promise of the html
async function getHTML(url) {
    try {
        const response = await axios
            .request({
                method: 'GET',
                url: url,
                responseType: 'arraybuffer'
            })
        const decoder = new TextDecoder("windows-1250");
        return decoder.decode(response.data)
    } catch (error) {
        console.error(error)
    }
}

export default getHTML