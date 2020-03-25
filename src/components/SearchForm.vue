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
        rounded
        standout
        bg-color="white"
        v-model="text"
        class="search-input text-h5 q-px-sm"
        style="height:5rem"
        label="O que está buscando?"
        hint="Ex.: Aulas de Violão, Marmitex, Supermercado" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {

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
