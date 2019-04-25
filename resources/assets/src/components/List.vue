<template>
    <div class="list-container">
        <div class="form-group">
            <input type="text" class="form-control query-string" placeholder="query" v-model="query" required>
            <button class="btn btn-primary" @click="search">Search</button>
            <button class="btn btn-warning" @click="clear" v-if="searchActive">Clear Search</button>
            <button class="btn btn-success create-button" @click="showCreateForm">Create Book</button>
        </div>
        <table class="table" v-if="books.length">
            <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Tags</th>
                <th>Actions</th>
            </tr>
            <tr v-for="book in books">
                <td><a href="#" @click.prevent="view(book.id)">{{ book.name }}</a></td>
                <td>{{ book.author }}</td>
                <td>{{ book.tags }}</td>
                <td>
                    <a href="#" class="fa fa-pencil" @click.prevent="edit(book.id)"></a>
                    <a class="fa fa-trash" href="#" @click.prevent="remove(book.id)"></a>
                </td>
            </tr>
        </table>
        <h2 v-else="">There is no books found</h2>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                query: ''
            };
        },
        methods: {
            search() {
                this.$store.dispatch('loadBooks', this.query);
            },
            remove(id) {
                this.$store.dispatch('deleteBook', id)
            },
            showCreateForm() {
                this.$store.dispatch('showCreateForm');
            },
            edit(id) {
                this.$store.dispatch('showEditForm', id)
            },
            view(id) {
                this.$store.dispatch('viewBook', id)
            },
            clear() {
                this.query = null;
                this.$store.dispatch('clearSearch')
            }
        },
        computed: {
            books() {
                return this.$store.getters.books;
            },
            searchActive() {
                return this.$store.getters.searchActive;
            }
        }
    }
</script>
<style scoped="">
    .query-string {
        width: 65%; display: inline-block;
    }

    .create-button {
        margin-left: 15px;
    }
</style>