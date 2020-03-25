<template>
  <q-layout view="hhh lpR fff">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="flex justify-center q-py-md">
          <router-link :to="{ name: 'index' }">
            <q-img src="../assets/quarentregas_logo.svg" style="width:180px" />
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-scroller id="actions-scroller" position="bottom" :scroll-offset="80" expand :offset="[0, 0]">
      <q-toolbar class="full-width bg-primary flex justify-center">
        <q-tabs
          v-model="tab"
          class="bg-primary text-white"
          align="center"
          switch-indicator
          indicator-color="cyan-12"
        >
          <q-route-tab
            name="home"
            icon="las la-home"
            class="q-pa-sm"
            label="Início"
            :to="{ name: 'index' }"
            exact />
          <q-route-tab
            name="add"
            icon="las la-plus-circle"
            label="Postar Anúncio"
            :to="{ name: 'add' }"
            exact />
          <q-tab
            name="search"
            icon="las la-search"
            label="Buscar" />
        </q-tabs>
      </q-toolbar>
    </q-page-scroller>
    <custom-footer />
  </q-layout>
</template>

<script>
import CustomFooter from '../components/CustomFooter'

export default {
  data () {
    return {
      tab: 'home'
    }
  },
  components: {
    'custom-footer': CustomFooter
  }
}
</script>
