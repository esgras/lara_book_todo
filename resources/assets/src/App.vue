<template>
  <div id="app">
    <book-form v-if="formVisible"></book-form>
    <book-view v-if="viewVisible"></book-view>
    <list v-if="listVisible"></list>
  </div>
</template>

<script>
import List from './components/List.vue'
import BookForm from './components/BookForm.vue'
import BookView from './components/BookView.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    List,
    BookForm,
    BookView
  },
  computed: {
      formVisible() {
          return this.$store.getters.formVisible;
      },
      listVisible() {
          return this.$store.getters.listVisible;
      },
      viewVisible() {
          return this.$store.getters.viewVisible;
      }
  }
}
</script>