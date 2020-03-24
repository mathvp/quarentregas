<template>
  <q-page class="column q-pa-md">
    <category-listing
      v-for="(business, key) in this.businessListing"
      :key="key"
      :title="key"
      :businessArray="getBusinessByCategory(key)"
      class="q-mb-lg" />
  </q-page>
</template>

<script>
import CategoryListing from '../components/CategoryListing'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
    }
  },
  components: {
    'category-listing': CategoryListing
  },
  methods: {
    ...mapActions('business', ['businessFromCategory']),
    getBusinessByCategory (categoryId) {
      return this.getBusinessFromCategory(categoryId)
    }
  },
  computed: {
    ...mapGetters('business', ['getBusinessFromCategory']),
    ...mapState('business', ['businessListing'])
  },
  created () {
    this.businessFromCategory('Lanchonete')
    this.businessFromCategory('Aulas Online')
  }
}
</script>

<style>
  .q-dialog .q-btn.close-btn {
    background-color: rgba(255, 255, 255, .55)
  }
</style>
