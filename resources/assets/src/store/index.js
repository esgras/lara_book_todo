import Vue from 'vue'
import Vuex from 'vuex'
import reqwest from 'reqwest'

Vue.use(Vuex);

function createEmptyBook() {
    return {
        id: '',
        name: '',
        author: '',
        tags: ''
    };
}



export default new Vuex.Store({
    state: {
        books: [],
        ajax: false,
        book: createEmptyBook(),
        viewComponents: {
            list: true,
            form: false,
            view: false
        },
        searchActive: false
    },
    mutations: {
        setBooks(state, payload) {
            state.books = payload;
        },
        hideAllViewsExcept(state, payload) {
            let viewComponents = Object.keys(state.viewComponents);
            for (let i = 0; i < viewComponents.length; i++) {
                let name = viewComponents[i];
                state.viewComponents[name] = payload === name;
            }
        },
        resetBook(state, payload) {
            state.book = createEmptyBook()
        },
        setBook(state, payload) {
            state.book.id = payload.id;
            state.book.name = payload.name;
            state.book.author = payload.author;
            state.book.tags = payload.tags;
        }
    },
    actions: {
        showCreateForm(context, payload) {
            context.commit('hideAllViewsExcept',  'form');
            context.commit('resetBook');
        },
        showEditForm(context, payload) {
            context.commit('hideAllViewsExcept',  'form');
            context.commit('setBook', context.getters.getBookById(payload));
        },

        showList(context, payload) {
            context.commit('hideAllViewsExcept',  'list');
            context.commit('resetBook', payload);
        },



        viewBook(context, payload) {
            context.commit('hideAllViewsExcept',  'view');
            context.commit('setBook', context.getters.getBookById(payload));
        },

        dropOldAjax(context, payload) {
            if (context.state.ajax) {
                context.state.ajax.abort();
            }
        },

        clearSearch(context, payload) {
            context.dispatch('dropOldAjax');

            let res = reqwest({
                url: `/api/v1/books`,
                method: 'get',
                success: resp => {
                    context.commit('setBooks', resp);
                    context.state.searchActive = false;

                },
                error: resp => {
                    alert('Something went wrong, try later.');
                    console.log(resp);
                }
            });
            context.state.ajax = res.request;
        },

        loadBooks(context, payload) {
            context.dispatch('dropOldAjax');

            let res = reqwest({
                url: `/api/v1/books/search/${payload}`,
                method: 'get',
                success: resp => {
                    context.commit('setBooks', resp);
                    context.state.searchActive = true;

                },
                error: resp => {
                    alert('Something went wrong, try later.');
                    console.log(resp);
                }
            });
            context.state.ajax = res.request;
        },
        submit(context, payload) {
            context.dispatch('dropOldAjax');

            let editAction = payload.id != false;
            let reqObject = {
                url: editAction ? `/api/v1/books/${payload.id}` : '/api/v1/books',
                method: editAction ? 'put': 'post'
            };

            //Валидация
            let keys = ['name', 'author'];
            let length = 5;
            for (let i = 0; i < keys.length; i++) {
                if (payload[keys[i]].length < length) {
                    alert(keys[i] + ` must be at least ${length} characters`);
                    return;
                }
            }

            let res = reqwest(Object.assign({}, reqObject, {
                data: payload,
                success: resp => {
                    if (editAction) {
                        let idx = context.state.books.findIndex(b => b.id == payload.id);
                        context.state.books.splice(idx, 1, payload);
                    } else {
                        context.state.books.splice(context.state.books.length, 0, payload);
                        context.dispatch('showList');
                    }
                },
                error: resp => {
                    alert('Something went wrong, try later.');
                    console.log(resp);
                }
            }));
            context.state.ajax = res.request;
        },

        deleteBook(context, payload) {
            context.dispatch('dropOldAjax');

            let res = reqwest({
                url: `/api/v1/books/${payload}`,
                method: 'delete',
                success: resp => {
                    resp = JSON.parse(resp);
                    if (resp.success) {
                        let idx = context.state.books.findIndex(b => b.id == payload);
                        console.log(idx);
                        context.state.books.splice(idx, 1);
                    } else {
                        alert(resp.message);
                    }
                },
                error: resp => {
                    alert('Something went wrong, try later.');
                    console.log(resp);
                }
            });
            context.state.ajax = res.request;
        }
    },
    getters: {
        books(state) {
            return state.books;
        },

        book(state) {
            return state.book;
        },

        getBookById(state) {
            return function(id) {
                let idx = state.books.findIndex(book => book.id == id);
                return idx == -1 ? createEmptyBook() : state.books[idx];
            };
        },

        formVisible(state) {
            return state.viewComponents.form;
        },

        listVisible(state) {
            return state.viewComponents.list;
        },

        viewVisible(state) {
            return state.viewComponents.view;
        },

        formMessage(state) {
            return state.book.id ? 'Edit Book #' + state.book.id : 'Create New Book';
        },

        searchActive(state) {
            return state.searchActive;
        }
    }

})