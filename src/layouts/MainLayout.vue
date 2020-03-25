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
    <custom-footer />
  </q-layout>
</template>

<script>
import CustomFooter from '../components/CustomFooter'

export default {
  data () {
    return {
    }
  },
  components: {
    'custom-footer': CustomFooter
  }
}
</script>
