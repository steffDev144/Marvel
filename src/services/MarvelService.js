import md5 from 'js-md5';
import axios from 'axios';


class MarvelService {
    _apiBase = 'https://gateway.marvel.com/v1/public/';
    _publicKey = "1420f1967a9fa21eb9f8e2388ce74c6f";
    _privateKey = "102c7d8fb0cee26cc6c3cc9d4aa3316ffc47e9ca";
    _ts = Number(new Date());
    _hash = md5(this._ts + this._privateKey + this._publicKey);
    getResource = async (url) => {
    console.log(url)
        const res = await axios.get(url);

        if(res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        // return await res.data.data.results;
        return res;
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&ts=${this._ts}&apikey=${this._publicKey}&hash${this._hash}`);
    }
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?ts=${this._ts}&apikey=${this._publicKey}&hash${this._hash}`);
    }

}

export  default MarvelService;