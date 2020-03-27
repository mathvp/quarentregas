<template>
  <div>
    <q-item
      v-ripple
      clickable
      @click="showModal">
      <q-item-section top avatar>
        <q-avatar
          color="white">
          <img :src="getBusinessAvatar()" />
        </q-avatar>

      </q-item-section>

      <q-item-section>
        <q-item-label>{{business.name}}</q-item-label>
        <q-item-label caption lines="2">
          {{business.description}}
        </q-item-label>
      </q-item-section>

    </q-item>
    <q-separator inset="item" />
  </div>
</template>

<script>
export default {
  props: {
    business: {
      type: Object
    }
  },
  methods: {
    getBusinessAvatar () {
      if (this.business.logoURL) {
        return this.business.logoURL
      }

      return `https://ui-avatars.com/api/?background=4527a0&color=fff&name=${this.business.name}`
    },
    showModal () {
      this.$emit('showModal')
    }
  }
}
</script>

<style>

</style>
