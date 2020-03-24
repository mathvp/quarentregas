<template>
  <q-page>
    <div class="column">
      <q-form>
        <q-stepper
          v-model="step"
          vertical
          color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Informações do Negócio"
            icon="las la-store-alt"
            :done="step > 1"
          >
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="businessToSubmit.name"
                label="Nome do seu Negócio ou Produto"
                :rules="[val => !!val || 'Campo obrigatório']"
                hint="Ex.: Mc Donald's"
                lazy-rules />
            </div>
            <div class="q-mt-lg">
              <q-file
                outlined
                bottom-slots
                v-model="businessToSubmit.logoFile"
                label="Imagem Logo (Opcional)"
                accept=".jpg, image/*"
                @input="uploadImage('logo', businessToSubmit.logoFile)"
                counter>
                <template v-slot:prepend>
                  <q-icon name="las la-image" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="las la-times-circle" @click.stop="logoFile = null" class="cursor-pointer" />
                </template>

                <template v-slot:hint>
                  O logotipo do seu negócio em .JPG, .JPEG ou .PNG
                </template>
              </q-file>
            </div>
            <div class="q-mt-lg">
              <q-file
                outlined
                bottom-slots
                v-model="businessToSubmit.photoFile"
                @input="uploadImage('photo', businessToSubmit.photoFile)"
                label="Foto Produtos (Opcional)"
                accept=".jpg, image/*"
                counter>
                <template v-slot:prepend>
                  <q-icon name="las la-camera-retro" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="las la-times-circle" @click.stop="photoFile = null" class="cursor-pointer" />
                </template>

                <template v-slot:hint>
                  Foto de algum produto em .JPG, .JPEG ou .PNG
                </template>
              </q-file>
            </div>
            <div class="q-mt-xl">
              <q-input
                outlined
                v-model="businessToSubmit.city"
                label="Cidade"
                hint="Esse App aceita apenas Bragança Paulista - SP no momento"
                readonly />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="businessToSubmit.state"
                label="Estado"
                hint="Esse App aceita apenas Bragança Paulista - SP no momento"
                readonly />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="businessToSubmit.description"
                type="textarea"
                label="Descrição"
                :rules="[val => !!val || 'Campo obrigatório']"
                hint="Descreva seus produtos ou serviços"
                lazy-rules
              />
            </div>
            <div class="q-mt-lg">
              <q-select
                outlined
                v-model="businessToSubmit.selectedCategory"
                :options="categoriesArray"
                clearable
                :rules="[val => !!val || 'Campo obrigatório']"
                label="Categoria"
                lazy-rules />
            </div>
            <div class="q-mt-lg text-subtitle1">
              Dados do Responsável
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="businessToSubmit.owner"
                label="Nome Responsável"
                :rules="[val => !!val || 'Campo obrigatório']"
                hint="Nome Completo"
                lazy-rules />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="businessToSubmit.email"
                label="Email Responsável"
                :rules="[val => !!val || 'Campo obrigatório',
                         val => isEmailValid(val) || 'Email inválido!' ]"
                lazy-rules
                hint="O email não será divulgado ao público" />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="businessToSubmit.document"
                label="CPF ou CNPJ"
                :rules="[ val => !!val || 'Campo obrigatório',
                val=> (val.length >= 11 && val.length <= 18) || 'CPF inválido' ]"
                lazy-rules
                hint="O documento não será divulgado ao público" />
            </div>

            <q-stepper-navigation class="q-gutter-md row justify-end">
              <q-btn @click="step = 2" color="primary" class="q-px-md" label="Continuar" />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Informações de Contato"
            icon="las la-phone"
            :done="step > 2"
          >
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="businessToSubmit.tel"
                label="Telefone ou Celular"
                maxlength="14"
                :rules="[ val => (val.length <= 14 && val.length >= 10) || 'Insira um telefone válido' ]"
                hint="Com DDD. Ex.: (11) 4012-1234"
                lazy-rules />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="businessToSubmit.whatsapp"
                label="Whatsapp"
                hint="Com DDD. Ex.: (11) 99999-9999"
                lazy-rules />
            </div>
            <q-stepper-navigation class="q-gutter-md row justify-between">
              <q-btn flat @click="step = 1" color="primary" label="Voltar" class="q-ml-sm" />
              <q-btn @click="step = 3" class="q-px-md" color="primary" label="Continuar" />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            title="Redes Sociais"
            icon="lab la-facebook"
          >
            <div class="q-mt-lg">
              <q-input
                outlined
                type="url"
                v-model="businessToSubmit.facebookURL"
                label="Link Página Facebook (Opcional)"
                hint="Ex.: https://www.facebook.com/facebook" />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                type="url"
                v-model="businessToSubmit.instagramURL"
                label="Link Instagram (Opcional)"
                hint="Ex.: https://www.instagram.com/instagram/" />
            </div>
            <div class="q-mt-lg q-mb-lg">
              <q-input
                outlined
                type="url"
                v-model="businessToSubmit.siteURL"
                label="Link seu Site (Opcional)"
                hint="Ex.: http://www.suaempresa.com.br" />
            </div>
            <q-separator spaced/>
            <q-stepper-navigation class="q-gutter-md row justify-between q-mb-xl">
              <q-btn flat @click="step = 2" color="primary" label="Voltar" class="q-ml-sm" />
              <q-btn @click="previewBusiness" color="primary" class="q-px-md" label="Continuar" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-form>
    </div>
    <q-dialog v-model="showPreviewModal">
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
      <business-details :business="businessToSubmit">
        <template v-slot:actions>
          <div class="full-width flex justify-between">
            <q-btn v-close-popup flat color="primary" label="Voltar à edição" />
            <q-btn color="primary" @click="submitBusiness" class="q-px-md" label="Tudo certo, publicar!" />
          </div>
        </template>
      </business-details>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import BusinessModal from '../components/BusinessModal'

export default {
  data () {
    return {
      step: 1,
      showPreviewModal: false,
      businessToSubmit: {
        name: null,
        description: null,
        selectedCategory: null,
        tel: null,
        whatsapp: null,
        facebookURL: null,
        instagramURL: null,
        siteURL: null,
        photoFile: null,
        photoURL: null,
        logoURL: null,
        logoFile: null,
        city: 'Bragança Paulista',
        state: 'SP',
        owner: null,
        email: null,
        document: null
      }
    }
  },
  components: {
    'business-details': BusinessModal
  },
  computed: {
    ...mapGetters('categories', ['categoriesArray']),
    ...mapState('business', ['temporaryImages'])
  },
  methods: {
    ...mapActions('categories', ['fbReadCategoriesData']),
    ...mapActions('business', ['addBusiness', 'uploadImg']),
    isEmailValid (email) {
      email = email.toString()
      return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    },
    uploadImage (id, file) {
      const payload = {
        id,
        file
      }
      this.uploadImg(payload)
    },
    previewBusiness () {
      this.showPreviewModal = true

      this.$q.notify({
        message: 'ATENÇÃO: Seu anúncio ainda não foi publicado, revise os dados abaixo e clique em Publicar',
        type: 'info',
        position: 'top'
      })

      if (this.temporaryImages.logo.url) {
        this.businessToSubmit.logoURL = this.temporaryImages.logo.url
      }

      if (this.temporaryImages.photo.url) {
        this.businessToSubmit.photoURL = this.temporaryImages.photo.url
      }
    },
    submitBusiness () {
      this.addBusiness(this.businessToSubmit)
    }
  },
  created () {
    this.fbReadCategoriesData()
  }
}
</script>

<style>

</style>
