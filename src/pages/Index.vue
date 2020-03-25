<template>
  <q-page class="column q-pa-md q-mb-xl q-pb-xl">
    <q-banner rounded class="bg-primary text-white q-mt-sm">
      Quarentregas é um app grátis de anúncios de <strong>Delivery em Bragança Paulista</strong>, <strong>Aulas</strong> e <strong>Cursos Online</strong> ou qualquer outra atividade remota,
      durante o período de <strong>Quarentena do COVID-19</strong>.<br /><br />
      O intuito é apenas ajudar os pequenos comerciantes locais.<br/><br/>
      OBS.: Essa é uma iniciativa independente, sem qualquer ligação com governos ou empresas.<br/><br/>
      Sinta-se livre para criar o seu anúncio e divulgar o seu negócio também!
    </q-banner>
    <category-listing
      v-for="(business, key) in this.businessListing"
      :key="key"
      :title="key"
      :businessArray="getBusinessByCategory(key)"
      class="q-my-lg" />
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
    this.businessFromCategory('Farmácia')
  }
}
</script>

<style>
  .q-dialog .q-btn.close-btn {
    background-color: rgba(255, 255, 255, .55)
  }
</style>
