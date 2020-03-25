<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        class="bg-primary">
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <router-link :to="{ name: 'index' }">
            <q-img src="../assets/quarentregas_logo.svg" style="width:150px" />
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey">
          Menu
        </q-item-label>
        <q-item clickable tag="a" :to="{ name: 'index' }" exact>
          <q-item-section avatar>
            <q-icon name="las la-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Início</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{ name: 'add' }" exact>
          <q-item-section avatar>
            <q-icon name="las la-plus-circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Postar Anúncio</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
