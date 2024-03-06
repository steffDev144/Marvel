import md5 from 'js-md5';
import axios from 'axios';

const publicKey = "1420f1967a9fa21eb9f8e2388ce74c6f";
const privateKey = "102c7d8fb0cee26cc6c3cc9d4aa3316ffc47e9ca";

class MarvelService {
    getResource = async (url) => {

        const res = await axios.get(url);

        if(res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.data.data.results;
    }

    getAllCharacters = () => {
        const ts = Number(new Date());
        const hash = md5(ts + privateKey + publicKey);
        return this.getResource(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    }

}

export  default MarvelService;