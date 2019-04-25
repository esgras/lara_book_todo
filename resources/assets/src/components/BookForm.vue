<template>
    <form @submit.prevent="">
        <h2>{{ message }}</h2>
        <div class="form-group">
            <label for="book-name">Name:</label>
            <input type="text" class="form-control" id="book-name" v-model="name">
        </div>
        <div class="form-group">
            <label for="book-author">Author:</label>
            <input type="text" class="form-control" id="book-author" v-model="author">
        </div>
        <div class="form-group">
            <label for="book-tags">Tags:</label>
            <input type="text" class="form-control" id="book-tags" v-model="tags">
        </div>
        <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
        <button type="submit" class="btn btn-info" @click="back">Back To List</button>
    </form>
</template>
<script>
export default {
    data() {
        return this.$store.getters.book;
    },
    computed: {
        message() {
            return this.$store.getters.formMessage;
        }
    },
    methods: {
        submit() {
            this.$store.dispatch('submit', {
                id: this.id,
                name: this.name,
                author: this.author,
                tags: this.tags
            });
        },
        back() {
            this.$store.dispatch('showList');
        }
    }
}
</script>