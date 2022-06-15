import React from 'react'
import Button from './Button.jsx'
import AppActions from '../lib/AppActions'

class List extends React.Component {

    handleClick(key) {
        AppActions.removeArticle(key);
    }

    render() {
        var articles = this.props.articles != undefined ? this.props.articles.map((article, i) => {
            return (
                <li key={i}>Artigo {article.id}: {article.title}
                    <Button handleClick={()=>this.handleClick(article.id)} text="Remover"/>
                </li>
            )
        }): [];
        
        return (
            <div>
                <h3>{this.props.listHeader}</h3>
                <ul>
                    {articles} 
                </ul>
            </div>
        );
    }
}

export default List;