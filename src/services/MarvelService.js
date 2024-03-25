import md5 from 'js-md5';
import axios from 'axios';


class MarvelService {
    _apiBase = 'https://gateway.marvel.com/v1/public/';
    _publicKey = "1420f1967a9fa21eb9f8e2388ce74c6f";
    _privateKey = "102c7d8fb0cee26cc6c3cc9d4aa3316ffc47e9ca";
    _ts = Number(new Date());
    _hash = md5(this._ts + this._privateKey + this._publicKey);
    _baseOffset = 210;

    getResource = async (url) => {
        const res = await axios.get(url);

        if(res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        // return await res.data.data.results;
        return res;
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&ts=${this._ts}&apikey=${this._publicKey}&hash=${this._hash}`);
        return res.data.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?ts=${this._ts}&apikey=${this._publicKey}&hash${this._hash}`);
        return this._transformCharacter(res.data.data.results[0]);
    }

    _transformCharacter = (res) => {
        const text = res.description;
        let sliced = text.slice(0, 210);
        if (sliced.length < text.length) {
            sliced += '...';
        }
        return {
            id: res.id,
            name: res.name,
            description: sliced || "Unfortunately, there is no description for this character.",
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
}

export  default MarvelService;