<template>
  <q-page>
    <q-breadcrumbs class="q-px-md q-py-lg">
      <q-breadcrumbs-el :to="{ name: 'index' }" label="Início" />
      <q-breadcrumbs-el label="Listar Anúncios" />
    </q-breadcrumbs>

    <category-listing
      v-for="(business, key) in this.businessListing"
      :key="key"
      :title="key"
      :businessArray="getBusinessByCategory(key)"
      class="q-my-lg q-mx-md" />

    <q-btn
      label="Voltar"
      :to="{ name: 'index' }"
      outline
      icon="las la-long-arrow-alt-left"
      color="primary"
      class="q-ml-lg q-mb-xl q-mt-md" />
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CategoryListing from '../components/CategoryListing'

export default {
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
    this.businessFromCategory({
      category: this.$route.params.id
    })
  }
}
</script>

<style>

</style>
