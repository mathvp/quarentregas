<template>
  <q-card class="my-card" style="width: 700px; max-width: 80vw;">
    <template>
      <slot name="header"></slot>
    </template>
    <q-img :src="getPhotoUrl()" />
    <q-card-section>
      <div class="col no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{business.name}}
        </div>
        <div class="text-caption text-grey ">
          <q-icon name="las la-map-marker" />
          {{business.city}}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="">
        {{business.description}}
      </div>
    </q-card-section>

    <q-separator spaced />

    <q-card-section class="">
      <div class="text-subtitle2">
        Valores, Cardápio e Pedidos:
      </div>
      <div class="row q-pa-md q-gutter-md">
        <div v-if="business.whatsapp">
          <q-btn
          type="a"
          color="green"
          icon="lab la-whatsapp"
          :href="`https://wa.me/55${cleanNumber(business.whatsapp)}?text=Olá, eu gostaria de fazer um pedido`"
          :label="business.whatsapp"
          target="_blank" />
        </div>
        <div v-if="business.tel">
          <q-btn
            type="a"
            color="blue-9"
            icon="las la-phone"
            :href="`tel:${business.tel}`"
            :label="business.tel" />
        </div>
        <div v-if="business.siteURL">
          <q-btn
            outline
            icon="las la-hand-pointer"
            color="primary"
            type="a"
            :href="business.siteURL"
            target="_blank"
            label="Acesse nosso site" />
        </div>
      </div>
    </q-card-section>

    <q-separator spaced v-if="business.instagramURL || business.facebookURL" />

    <q-card-section v-if="business.instagramURL || business.facebookURL">
      <div class="text-subtitle2">
        Redes sociais:
      </div>
      <div class="column q-pa-md">
        <div v-if="business.instagramURL">
          <q-btn
            type="a"
            color="purple-8"
            icon="lab la-instagram"
            :href="business.instagramURL"
            label="Instagram"
            target="_blank" />
        </div>
        <div class="q-mt-md" v-if="business.facebookURL">
          <q-btn
            type="a"
            color="blue-10"
            icon="lab la-facebook"
            :href="business.facebookURL"
            label="Facebook"
            target="_blank" />
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    business: Object
  },
  methods: {
    cleanNumber (number) {
      return number.replace(/[^0-9]/g, '')
    },
    getPhotoUrl () {
      let imgUrl = this.business.photoURL

      if (!imgUrl || imgUrl === '' || imgUrl === null || imgUrl === undefined) {
        imgUrl = 'https://cdn.dribbble.com/users/208061/screenshots/2790412/all-icon-full-blue.png'
      }

      return imgUrl
    }
  }
}
</script>

<style>

</style>
