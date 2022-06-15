import AppDispatcher from './AppDispatcher';
import { EventEmitter } from 'events';

let _articles = [];
let _articlesApproved = [];
let _id = 0;

class AppStore extends EventEmitter {

    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }

    emitChange(eventName) {
        this.emit(eventName);
    }

    getAll() {
        return _articles;
    }

    getApproved() {
        return _articlesApproved;
    }

    submitArticle(article) {
        const newArticle = {
            id: ++_id,
            title: (article.title.length > 10 ? '[Reproved] ' : '[Approved] ') + article.title,
        }

        _articles.push(newArticle);
    }

    approveArticle(article) {
        if (article.title.length <= 10) {
            _articlesApproved.push({
                id: _id,
                title: article.title
            });
        }
    }

    removeArticle(key) {
        _articles = _articles.filter(article=>article.id != key);
        _articlesApproved = _articlesApproved.filter(article=>article.id != key);
    }

    addChangeListener(eventName, callback) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }

    dispatcherCallback(action) {
        switch (action.actionType) {
            case 'SUBMIT_ARTICLE':
                this.submitArticle(action.value);
                break;
            case 'APPROVE_ARTICLE':
                this.approveArticle(action.value);
                break;
            case 'REMOVE_ARTICLE':
                this.removeArticle(action.value);
        }

        this.emitChange('STORE_' + action.actionType);

        return true;
    }
}

export default new AppStore();

