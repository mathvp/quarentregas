<template>
  <q-card class="business-card" style="width: 700px; max-width: 95vw;">
    <template>
      <slot name="header"></slot>
    </template>
    <q-img
      class="featured-img"
      :src="getPhotoUrl()"
      transition="jump-down" />
    <q-card-section
      class="q-pa-none flex justify-center"
      style="transform: translateY(-55%)">
      <q-avatar
        font-size="52px"
        color="primary"
        text-color="white"
        class="bordered">
        <q-img
          :src="getBusinessAvatar()"
          transition="slide-up"
          :ratio="1"/>
      </q-avatar>
    </q-card-section>
    <q-card-section class="business-name">
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
      <div class="q-pb-lg">
        {{business.description}}
      </div>
    </q-card-section>

    <q-separator spaced v-if="business.whatsapp || business.tel || business.siteURL" />

    <q-card-section class=""  v-if="business.whatsapp || business.tel || business.siteURL">
      <div class="text-subtitle2">
        Valores, Cardápio, Pedidos ou Mais detalhes:
      </div>
      <div class="row q-pa-md q-gutter-md">
        <div v-if="business.whatsapp">
          <q-btn
          type="a"
          color="green"
          icon="lab la-whatsapp"
          :href="`https://wa.me/55${cleanNumber(business.whatsapp)}?text=Olá! Vi o seu anúncio: ${business.name}, no aplicativo Quarentregas`"
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

    <q-card-section>
      <q-btn
        dense
        flat
        no-caps
        size="md"
        class="q-pa-sm"
        icon="las la-ban"
        color="red"
        @click="showReportDialog = true"
        label="Denunciar / Remover Anúncio"/>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <slot name="actions"></slot>
    </q-card-actions>

    <q-dialog v-model="showReportDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section>
          <div class="text-h6">Solicitar remoção deste anúncio</div>
        </q-card-section>
        <q-separator spaced/>
        <q-card-section class="q-pt-sm">
          Caso o conteúdo do anúncio '<b>{{business.name}}</b>' contenha dados seus, como telefone, imagens, dados pessoais, etc., ou
          se você acredita que o conteúdo esteja infringindo alguma lei, faça uma denúncia para nós.<br />
        </q-card-section>

        <q-card-actions class="flex justify-between">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            color="primary"
            label="Denunciar Anúcio"
            class="q-px-md"
            :to="{ name: 'reportBusiness', params: { id: encodedId, name: encodedName } }"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-card>
</template>

<script>
export default {
  props: {
    business: Object,
    id: String
  },
  data () {
    return {
      showReportDialog: false
    }
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
    },
    getBusinessAvatar () {
      if (this.business.logoURL) {
        return this.business.logoURL
      }

      return `https://ui-avatars.com/api/?background=4527a0&color=fff&name=${this.business.name}`
    }
  },
  computed: {
    encodedId () {
      return btoa(this.id)
    },
    encodedName () {
      return btoa(this.business.name)
    }
  }
}
</script>

<style>
  .business-card .featured-img::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(48,48,48,0.5) 100%);
  }
  .business-card .q-avatar {
    width:175px;
    height: 175px;
  }
  .business-card .business-name {
    margin-top: -100px;
  }
  .q-avatar.bordered .q-avatar__content {
    border: 8px solid rgba(255, 255, 255, .5);
  }
  @media screen and (max-width: 600px) {
    .business-card .q-avatar {
      width:100px;
      height: 100px;
    }
    .business-card .business-name {
      margin-top: -70px;
    }
  }
</style>
