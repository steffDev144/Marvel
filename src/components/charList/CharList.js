import {Component} from "react";
import './charList.scss';

import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onRequest = (offset) => {

    }

    onCharListLoaded = (chars) => {
        this.setState({chars, loading: false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    updateCharList = () => {
        this.setState({loading: true, error: false});
        
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {chars, loading, error} = this.state;

        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;


        let loadMore = null;

        if(!(loading || error)) {
            
            loadMore =  <button className="button button__main button__long">
                            <div className="inner">load more</div>
                        </button>;
        }
        

        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                {loadMore}
            </div>
        )
    }
}

export default CharList;

// char__item_selected