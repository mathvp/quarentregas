<template>
  <q-page>
    <div class="column">
      <q-breadcrumbs class="q-px-md q-py-lg">
        <q-breadcrumbs-el :to="{ name: 'index' }" label="Início" />
        <q-breadcrumbs-el label="Postar Anúncio" />
      </q-breadcrumbs>
      <div class="q-px-md q-pb-lg">
        <div class="text-h6">
          Cadastrar Anúncio
        </div>
        <p>
          Divulgue gratuitamente seu negócio ou produto aqui, com as suas informações de contato.<br />
          Obs.: Serão aceitos apenas anúncios de acordo com as políticas de combate ao <strong>Coronavírus</strong>,
          como Delivery, Aulas online, Voluntários, Doações, Mercados, Farmácias, etc...
        </p>
      </div>
      <q-form>
        <q-stepper
          v-model="step"
          vertical
          color="primary"
          animated
          class="q-pb-xl"
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
                @blur="createKeywords"
                ref="businessName"
                lazy-rules />
            </div>
            <div class="q-mt-lg">
              <q-file
                outlined
                bottom-slots
                v-model="businessToSubmit.logoFile"
                label="Imagem Logo (Opcional)"
                accept=".jpg, image/*"
                ref="logoImg"
                :error="imgErrors.logoImg"
                error-message="Imagem inválida"
                @focus="validateImg('logoImg')"
                @blur="clearImgError('logoImg')"
                @input="uploadImage('logo', businessToSubmit.logoFile)"
                max-files="1"
                :max-file-size="2200000"
                counter>
                <template v-slot:prepend>
                  <q-icon name="las la-image" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon size="lg" name="las la-times-circle" @click.prevent.stop="businessToSubmit.logoFile = null" class="cursor-pointer" />
                </template>

                <template v-slot:hint>
                  Max. 2 MB. O logotipo do seu negócio em .JPG, .JPEG ou .PNG
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
                max-files="1"
                :error="imgErrors.photoImg"
                error-message="Imagem inválida"
                ref="photoImg"
                @focus="validateImg('photoImg')"
                @blur="clearImgError('photoImg')"
                :max-file-size="2500000"
                counter>
                <template v-slot:prepend>
                  <q-icon name="las la-camera-retro" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon size="lg" name="las la-times-circle" @click.prevent.stop="businessToSubmit.photoFile = null" class="cursor-pointer" />
                </template>

                <template v-slot:hint>
                  Max. 2 MB. Foto de algum produto em .JPG, .JPEG ou .PNG
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
                ref="businessDescription"
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
                ref="businessCategory"
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
                ref="businessOwnerName"
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
                ref="businessOwnerEmail"
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
                ref="businessOwnerDocument"
                hint="O documento não será divulgado ao público" />
            </div>

            <q-stepper-navigation class="q-gutter-md row justify-end">
              <q-btn
                @click="validateFields(
                  ['businessName', 'businessDescription', 'businessCategory', 'businessOwnerName', 'businessOwnerEmail', 'businessOwnerDocument'],
                  2)"
                color="primary"
                class="q-px-md"
                label="Continuar" />
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
              <q-btn
                @click="step = 3"
                class="q-px-md"
                color="primary"
                label="Continuar" />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            title="Redes Sociais"
            icon="lab la-facebook"
            class="q-mb-xl"
          >
            <div class="q-mt-lg">
              <q-input
                outlined
                type="url"
                v-model="businessToSubmit.facebookURL"
                label="Link Página Facebook (Opcional)"
                :rules="[val => isValidUrl(val) || 'Link inválido!',
                         val => isValidFacebookUrl(val) || 'Informe uma URL do Facebook']"
                lazy-rules
                hint="Ex.: https://www.facebook.com/facebook" />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                type="url"
                v-model="businessToSubmit.instagramURL"
                label="Link Instagram (Opcional)"
                :rules="[val => isValidUrl(val) || 'Link inválido!',
                         val => isValidInstagramUrl(val) || 'Informe uma URL do Instagram']"
                lazy-rules
                hint="Ex.: https://www.instagram.com/instagram/" />
            </div>
            <div class="q-mt-lg q-mb-lg">
              <q-input
                outlined
                type="url"
                v-model="businessToSubmit.siteURL"
                label="Link seu Site (Opcional)"
                :rules="[val => isValidUrl(val) || 'Link inválido!']"
                hint="Ex.: http://www.suaempresa.com.br" />
            </div>
            <q-separator spaced/>
            <q-stepper-navigation class="q-gutter-md row justify-between q-mb-xl">
              <q-btn flat @click="step = 2" color="primary" label="Voltar" class="q-ml-sm" />
              <q-btn @click="previewBusiness" color="primary" class="q-px-md" label="Continuar" />
            </q-stepper-navigation>
          </q-step>
          <q-separator spaced />
          <q-btn
            label="Cancelar"
            :to="{ name: 'index' }"
            outline
            icon="las la-long-arrow-alt-left"
            color="primary"
            class="q-ml-lg q-mb-xl q-mt-md" />
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
import { generateKeywords } from '../statics/js/generateKeywords'

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
        document: null,
        keywords: null
      },
      imgErrors: {
        logoImg: false,
        photoImg: false
      },
      hasErrors: false
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
    validateImg (refName) {
      const element = this.$refs[refName]
      this.imgErrors[refName] = !element.value
    },
    clearImgError (refName) {
      this.imgErrors[refName] = false
    },
    uploadImage (id, file) {
      const payload = {
        id,
        file
      }
      this.uploadImg(payload)
    },
    async validateFields (fieldsRefArray, nextStep) {
      this.countErrors = 0

      await fieldsRefArray.forEach(async (fieldRef) => {
        const field = this.$refs[fieldRef]
        await field.validate()
        if (field.innerError) {
          this.countErrors += 1
        }
      })

      if (this.countErrors === 0) {
        this.step = nextStep
      }
    },
    previewBusiness () {
      this.showPreviewModal = true

      this.$q.notify({
        message: `ATENÇÃO: Seu anúncio ainda não foi publicado,
        revise os dados abaixo e clique em <strong>Publicar</strong>`,
        type: 'warning',
        position: 'top-right',
        progress: true,
        timeout: 7000,
        multiLine: true,
        html: true
      })

      if (this.temporaryImages.logo) {
        this.businessToSubmit.logoURL = this.temporaryImages.logo.url
      }

      if (this.temporaryImages.photo) {
        this.businessToSubmit.photoURL = this.temporaryImages.photo.url
      }
    },
    submitBusiness () {
      this.addBusiness(this.businessToSubmit)
    },
    createKeywords () {
      const sentence = this.businessToSubmit.name || ''

      this.businessToSubmit.keywords = generateKeywords(sentence) || ''
    },
    isValidUrl (url) {
      const regex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/)
      return regex.test(url)
    },
    isValidFacebookUrl (url) {
      const regex = new RegExp(/(http(s)?:\/\/.)?(www\.)?(m\.)?((facebook|fb))\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/)
      return regex.test(url)
    },
    isValidInstagramUrl (url) {
      const regex = new RegExp(/(http(s)?:\/\/.)?(www\.)?(m\.)?((instagram))\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/)
      return regex.test(url)
    }
  },
  created () {
    this.fbReadCategoriesData()
  }
}
</script>
