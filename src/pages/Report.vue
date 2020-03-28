<template>
  <q-page>
    <q-breadcrumbs class="q-px-md q-py-lg">
      <q-breadcrumbs-el :to="{ name: 'index' }" label="Início" />
      <q-breadcrumbs-el label="Denunciar Anúncio" />
    </q-breadcrumbs>
    <div class="q-pa-md">
      <div class="text-h6">
        Denunciar Anúncio: <span class="text-italic">'{{decodedName}}'</span>
      </div>
      <div class="q-pt-lg q-mb-xl">
        <p>
          Não iremos divulgar sua identidade à ninguém, porém precisamos de alguns dados para que a denúncia seja válida.
        </p>
        <q-form
          ref="reportForm"
          @validation-success="formValid"
          @validation-error="formInvalid">
          <div class="q-mt-md">
            <q-input
              outlined
              autofocus
              v-model="reportOwner.name"
              label="Seu Nome"
              :rules="[val => !!val || 'Campo obrigatório']"
              hint="Nome completo"
              ref="reportOwnerName"
              lazy-rules />
          </div>
          <div class="q-mt-lg">
            <q-input
              outlined
              v-model="reportOwner.email"
              label="Seu Email"
              :rules="[val => !!val || 'Campo obrigatório',
                        val => isEmailValid(val) || 'Email inválido!' ]"
              lazy-rules
              ref="reportOwnerEmail"
              hint="O email não será divulgado ao público" />
          </div>
          <div class="q-mt-md">
              <q-input
                outlined
                v-model="reportOwner.tel"
                label="Telefone ou Celular"
                maxlength="14"
                :rules="[ val => (val.length <= 14 && val.length >= 10) || 'Insira um telefone válido' ]"
                hint="Com DDD. Ex.: (11) 4012-1234"
                lazy-rules />
            </div>
            <div class="q-mt-lg">
              <q-input
                outlined
                v-model="reportOwner.whatsapp"
                label="Whatsapp"
                hint="Com DDD. Ex.: (11) 99999-9999" />
            </div>
            <div class="q-mt-lg">
              <q-input
                  outlined
                  v-model="message"
                  type="textarea"
                  label="Motivo"
                  :rules="[val => !!val || 'Campo obrigatório']"
                  hint="Descreva o motivo que deseja remover o anúncio"
                  ref="reportMessage"
                  lazy-rules
                />
            </div>
            <div class="q-mt-lg flex justify-between">
              <q-btn label="Voltar" :to="{ name: 'index' }" color="primary" outline />
              <q-btn label="Enviar Denúncia" color="primary" @click="submitReport"/>
            </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['id', 'name'],
  data () {
    return {
      reportOwner: {
        name: '',
        email: '',
        tel: '',
        whatsapp: ''
      },
      message: ''
    }
  },
  computed: {
    decodedId () {
      return atob(this.id)
    },
    decodedName () {
      return atob(this.name)
    }
  },
  methods: {
    isEmailValid (email) {
      email = email.toString()
      return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    },
    submitReport () {
      this.$refs.reportForm.validate()
    },
    formValid () {
      this.businessReport({
        ...this.reportOwner,
        message: this.message,
        businessId: this.decodedId,
        businessName: this.decodedName
      })
    },
    formInvalid () {},
    ...mapActions('business', ['businessReport'])
  }
}
</script>
<style>
</style>
