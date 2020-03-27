<template>
  <q-card class="column">
    <q-card-section>
      <div class="text-h6 text-italic">{{title}}</div>
    </q-card-section>

    <q-card-section>
      <q-list>
        <list-item
          v-for="(business, key) in this.businessArray"
          :key="key"
          :business="business"
          @showModal="showBusinnesDetails(business.id)"
          />
      </q-list>
    </q-card-section>

    <q-separator dark />

    <q-card-actions class="justify-end">
      <slot name="actions" />
    </q-card-actions>
    <q-dialog v-model="showBusinessModal">
      <q-btn
      icon="las la-times-circle"
      text-color="primary"
      class="absolute-right close-btn"
      style="z-index: 999; height: 60px; width: 60px; cursor:pointer"
      size="lg"
      round
      flat
      v-ripple
      v-close-popup />
      <business-details :business="activeBusiness">
        <template v-slot:actions>
          <div class="full-width flex justify-end">
            <q-btn v-close-popup flat color="primary" label="Fechar" />
          </div>
        </template>
      </business-details>
    </q-dialog>
  </q-card>
</template>

<script>
import ListItem from './ListItem'
import BusinessModal from './BusinessModal'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    title: String,
    businessArray: Array
  },
  data () {
    return {
      activeBusiness: {},
      showBusinessModal: false
    }
  },
  computed: {
    ...mapGetters('business', ['getBusiness'])
  },
  methods: {
    ...mapActions('business', ['loadBusiness']),
    async showBusinnesDetails (businessId) {
      await this.loadBusiness(businessId)
      this.$nextTick(function () {
        Object.assign(this.activeBusiness, this.getBusiness)
        this.showBusinessModal = true
      })
    }
  },
  components: {
    'list-item': ListItem,
    'business-details': BusinessModal
  }
}
</script>

<style>

</style>
