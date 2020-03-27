<template>
  <q-card class="bg-primary text-white q-pt-xl">
    <q-card-section class="row q-mb-lg">
      <div class="text-bold text-h4 flex items-center">
        Pesquisar
      </div>
      <q-space />
      <q-btn size="lg" flat icon="las la-times" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section class="flex-center text-white">
      <q-input
        autofocus
        rounded
        standout
        bg-color="white"
        v-model="search"
        class="search-input text-h5 q-px-sm"
        style="height:5rem"
        label="O que está buscando?"
        @input="resetResults"
        @keydown.enter.prevent="performSearch"
        hint="Ex.: Aulas de Violão, Marmitex, Supermercado">
        <template v-slot:append>
          <q-btn
            rounded
            color="primary"
            icon="las la-search"
            label="Buscar"
            @click="performSearch"/>
        </template>
      </q-input>
    </q-card-section>
    <q-card-section v-if="list.length > 0">
      <category-listing
      :businessArray="list"
      :title="`Resultados da busca por: '${search}'`"
      class="q-my-lg text-grey-9" />
    </q-card-section>
    <q-card-section v-if="nothingFound">
      <div class="text-h6 full-width justify-center q-pt-md flex items-center">
        <q-icon size="xl" name="las la-frown" class="q-mr-md"/>
        Nada encontrado para o termo: '{{search}}'
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import lunr from 'lunr'
import { mapState, mapActions } from 'vuex'
import CategoryListing from '../components/CategoryListing'

export default {
  data () {
    return {
      original: [],
      list: [],
      search: '',
      results: [],
      searchIndex: null,
      nothingFound: false
    }
  },
  components: {
    'category-listing': CategoryListing
  },
  methods: {
    ...mapActions('business', ['loadBusinessForSearch']),
    resetResults () {
      this.nothingFound = false
      this.list = []
    },
    async buildIndex () {
      await this.loadData()
      this.original = Object.values(this.searchBusinessListing.data).flat()
      const documents = this.original

      this.searchIndex = lunr(function () {
        this.ref('id')
        this.field('name')
        this.field('category')
        this.field('keywords')
        this.field('description')

        documents.forEach(doc => {
          this.add(doc)
        })
      })
    },
    async loadData () {
      await this.loadBusinessForSearch()
    },
    async performSearch () {
      this.$q.loading.show({
        message: 'Buscando...'
      })

      this.list = []

      if (this.search === '') {
        return
      }

      await this.buildIndex()

      this.results = this.searchIndex.search(this.search)

      this.$q.loading.hide()

      if (!this.results.length) {
        this.nothingFound = true
        return
      }

      this.results.forEach(d => {
        this.original.forEach(p => {
          if (d.ref === p.id) this.list.push(p)
        })
      })
    }
  },
  computed: {
    ...mapState('business', ['businessListing', 'searchBusinessListing'])
  }
}
</script>

<style lang="scss">
  .search-input input {
    color: $primary !important;
  }
  .search-input .q-field__messages {
    color: #fff;
    margin-top: 10px;
  }
</style>
