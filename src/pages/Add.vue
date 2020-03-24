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
                v-model="name"
                label="Nome do seu Negócio ou Produto"
                :rules="[val => !!val || 'Campo obrigatório']"
                hint="Ex.: Mc Donald's" />
            </div>
            <div class="q-mt-lg">
              <q-file outlined bottom-slots v-model="logoURL" label="Imagem Logo (Opcional)" counter>
                <template v-slot:prepend>
                  <q-icon name="las la-image" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="las la-times-circle" @click.stop="logoURL = null" class="cursor-pointer" />
                </template>

                <template v-slot:hint>
                  O logotipo do seu negócio em .JPG, .JPEG ou .PNG
                </template>
              </q-file>
            </div>
            <div class="q-mt-lg">
              <q-file outlined bottom-slots v-model="photoURL" label="Foto Produtos (Opcional)" counter>
                <template v-slot:prepend>
                  <q-icon name="las la-camera-retro" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="las la-times-circle" @click.stop="photoURL = null" class="cursor-pointer" />
                </template>

                <template v-slot:hint>
                  Foto de algum produto em .JPG, .JPEG ou .PNG
                </template>
              </q-file>
            </div>
            <div class="q-mt-xl">
              <q-input
                outlined
                v-model="city"
                label="Cidade"
                hint="Esse App aceita apenas Bragança Paulista - SP no momento"
                readonly />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="state"
                label="Estado"
                hint="Esse App aceita apenas Bragança Paulista - SP no momento"
                readonly />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="description"
                type="textarea"
                label="Descrição"
                :rules="[val => !!val || 'Campo obrigatório']"
                hint="Descreva seus produtos ou serviços"
              />
            </div>
            <div class="q-mt-lg">
              <q-select
                outlined
                v-model="selectedCategory"
                :options="categoriesArray"
                clearable
                :rules="[val => !!val || 'Campo obrigatório']"
                label="Categoria" />
            </div>
            <div class="q-mt-lg text-subtitle1">
              Dados do Responsável
            </div>
            <div class="q-mt-md">
              <q-input
                outlined
                v-model="owner"
                label="Nome Responsável"
                :rules="[val => !!val || 'Campo obrigatório']"
                hint="Nome Completo" />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="email"
                label="Email Responsável"
                :rules="[val => !!val || 'Campo obrigatório',
                         val => isEmailValid(val) || 'Email inválido!' ]"
                lazy-rules
                hint="O email não será divulgado ao público" />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="document"
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
                v-model="tel"
                label="Telefone ou Celular"
                maxlength="10"
                :rules="[ val => val.length >= 8 || 'Insira um telefone válido' ]"
                hint="Com DDD. Ex.: (11) 4012-1234" />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="whatsapp"
                label="Whatsapp"
                hint="Com DDD. Ex.: (11) 99999-9999" />
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
                v-model="facebookURL"
                label="Link Página Facebook (Opcional)"
                hint="Ex.: https://www.facebook.com/facebook" />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                type="url"
                v-model="instagramURL"
                label="Link Instagram (Opcional)"
                hint="Ex.: https://www.instagram.com/instagram/" />
            </div>
            <div class="q-mt-lg q-mb-lg">
              <q-input
                outlined
                type="url"
                v-model="siteURL"
                label="Link seu Site (Opcional)"
                hint="Ex.: http://www.suaempresa.com.br" />
            </div>
            <q-separator spaced/>
            <q-stepper-navigation class="q-gutter-md row justify-between q-mb-xl">
              <q-btn flat @click="step = 2" color="primary" label="Voltar" class="q-ml-sm" />
              <q-btn color="primary" class="q-px-md" label="Publicar" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      step: 1,
      name: null,
      description: null,
      selectedCategory: null,
      tel: null,
      whatsapp: null,
      facebookURL: null,
      instagramURL: null,
      siteURL: null,
      photoURL: null,
      logoURL: null,
      city: 'Bragança Paulista',
      state: 'SP',
      owner: null,
      email: null,
      document: null
    }
  },
  computed: {
    ...mapGetters('categories', ['categoriesArray'])
  },
  methods: {
    isEmailValid (email) {
      email = email.toString()
      return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    },
    ...mapActions('categories', ['fbReadCategoriesData'])
  },
  created () {
    this.fbReadCategoriesData()
  }
}
</script>

<style>

</style>
