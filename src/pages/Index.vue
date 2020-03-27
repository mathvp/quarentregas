<template>
  <q-page class="column q-pa-md q-mb-xl q-pb-xl">
    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOut"
    >
      <q-banner rounded class="bg-primary text-white q-mt-sm" style="z-index:2">
        Quarentregas é um app grátis de anúncios de <strong>Delivery em Bragança Paulista</strong>, <strong>Aulas</strong> e <strong>Cursos Online</strong> ou qualquer outra atividade remota,
        durante o período de <strong>Quarentena do COVID-19</strong>.<br /><br />
        O intuito é apenas ajudar os pequenos comerciantes locais.<br/><br/>
        OBS.: Essa é uma iniciativa independente, sem qualquer ligação com governos ou empresas.<br/><br/>
        Sinta-se livre para criar o seu anúncio e divulgar o seu negócio também!
      </q-banner>
    </transition>
    <div class="position-relative">
      <q-inner-loading
        class="text-primary"
        :showing="!Object.keys(this.businessListing).length" style="z-index:1">
        <q-spinner-facebook
          color="primary"
          size="4em"
        />
        Carregando...
      </q-inner-loading>
      <category-listing
        v-for="(business, key) in this.businessListing"
        :key="business.name + key"
        :title="key"
        :businessArray="getBusinessByCategory(key)"
        class="q-my-lg">
        <template v-slot:actions>
          <q-btn
            outline
            color="primary"
            class="q-px-lg"
            label="Ver tudo"
            :to="{ name: 'categoryListing', params: { id: key } }"
          />
        </template>
      </category-listing>
    </div>
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
    ...mapActions('categories', ['fbReadCategoriesData']),
    getBusinessByCategory (categoryId) {
      return this.getBusinessFromCategory(categoryId)
    }
  },
  computed: {
    ...mapGetters('business', ['getBusinessFromCategory']),
    ...mapState('business', ['businessListing']),
    ...mapState('categories', ['categories'])
  },
  async created () {
    await this.fbReadCategoriesData(true)

    this.categories.data.forEach((category) => {
      this.businessFromCategory({
        category: category.name,
        limit: 10
      })
    })
  }
}
</script>

<style>
  .q-dialog .q-btn.close-btn {
    background-color: rgba(255, 255, 255, .55)
  }
</style>
