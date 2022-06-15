import React from 'react'
import Button from './Button.jsx';
import List from './List.jsx'
import AppActions from '../lib/AppActions';
import AppStore from '../lib/AppStore'


class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articles: [], articlesApproved: [], message: ''};
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    handleClick() {
        const title = document.getElementById('simpletext').value;
        if (title.length > 0 && this.state.articles.length < 10) {
            AppActions.submitArticle({ title });
            document.getElementById('simpletext').value = '';
        }
    }

    componentDidMount() {
        AppStore.addChangeListener('STORE_SUBMIT_ARTICLE', this.onSubmit);
        AppStore.addChangeListener('STORE_REMOVE_ARTICLE', this.onRemove);
    }

    onRemove() {
        this.listArticles()
    }


    onSubmit() {
        this.listArticles()
    }

    listArticles()
    {
        let usermessage = ''

        if (this.state.articles.length > 9) {
            usermessage = 'Você excedeu o número máximo de artigos.'
        }

        this.setState({
            articles: AppStore.getAll(),
            articlesApproved: AppStore.getApproved(),
            message: usermessage
        })
    }

    componentWillUnmount() {
        AppStore.removeChangeListener('STORE_SUBMIT_ARTICLE', this.onChange);
        AppStore.removeChangeListener('STORE_REMOVE_ARTICLE', this.onRemove);
    }

    render() {
        var simpleContent =
            <div>
                <h1>{this.props.text}</h1>
                <br />
                <br />
                Digite o Título do Artigo: <input type="text" name="simpletext" id="simpletext" />  
                <Button handleClick={this.handleClick} text="ENVIAR" />
                <br />
                <List articles={this.state.articles} listHeader="Artigos Enviados" />
                {this.state.message}
                <List articles={this.state.articlesApproved} listHeader="Artigos Aprovados" />
            </div>;

        return simpleContent;
    }

}

export default Content;