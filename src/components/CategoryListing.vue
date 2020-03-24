<template>
  <q-card class="column">
    <q-card-section>
      <div class="text-h6">{{title}}</div>
    </q-card-section>

    <q-card-section>
      <q-list>
        <list-item
          v-for="(business, key) in this.businessArray"
          :key="key"
          :business="business"
          @showModal="showBusinnesDetails(business)"
          />
      </q-list>
    </q-card-section>

    <q-separator dark />

    <q-card-actions class="justify-end">
      <q-btn color="primary" outline class="q-px-lg">Ver tudo</q-btn>
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
      <business-details :business="activeBusiness" />
    </q-dialog>
  </q-card>
</template>

<script>
import ListItem from './ListItem'
import BusinessModal from './BusinessModal'

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
  methods: {
    showBusinnesDetails (business) {
      Object.assign(this.activeBusiness, business)
      this.showBusinessModal = true
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
