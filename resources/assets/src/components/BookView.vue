<template>
    <div class="book-container">
        <h1>{{ book.name }}</h1>
        <h2>{{ book.author }}</h2>
        <h3>{{ book.tags }}</h3>
        <button type="submit" class="btn btn-info" @click="back">Back To List</button>
    </div>
</template>
<script>
export default {
    computed: {
        book() {
            return this.$store.getters.book;
        }
    },
    methods: {
        back() {
            this.$store.dispatch('showList');
        }
    }
}
</script>