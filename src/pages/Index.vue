<template>
  <q-page class="flex">
    <q-list
      bordered
      padding
      class="col" >
      <list-item
        v-for="(business, key) in businessList"
        :key="key"
        :business="business"
        @showModal="showBusinnesDetails(business)"
         />
    </q-list>
    <q-dialog v-model="showBusinessModal">
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
      <business-details :business="activeBusiness" />
    </q-dialog>
  </q-page>
</template>

<script>
import ListItem from '../components/ListItem'
import BusinessModal from '../components/BusinessModal'

export default {
  name: 'PageIndex',
  data () {
    return {
      businessList: [
        {
          name: 'MC Donald\'s Bragança',
          description: 'Maior rede de Fast-Food do Mundo',
          categories: [
            'Alimentação',
            'Lanchonete'
          ],
          tel: '(11) 97529-7752',
          whatsapp: '(11) 97529-7752',
          logoURL: 'https://imagensemoldes.com.br/wp-content/uploads/2018/03/Mc-Donald%C2%B4s-Logo-Vetor-PNG.png',
          photoURL: 'https://assets.b9.com.br/wp-content/uploads/2019/04/pulls-artificil-preservatives-burgers.jpg',
          facebookURL: 'https://www.facebook.com/McDonaldsBrasil/',
          instagramURL: 'https://www.instagram.com/mcdonalds_br/?hl=pt-br',
          deliveryURL: '',
          siteURL: 'www.mcdonalds.com.br',
          city: 'Bragança Paulista',
          state: 'SP',
          cep: '12900-351',
          owner: 'Matheus Vieira',
          email: 'matheusvieiradepaula@gmail.com',
          document: '421.945.238-98',
          status: 1
        },
        {
          name: 'Habib\'s',
          description: 'Peça sua Bib\'sfiha',
          categories: [
            'Alimentação',
            'Lanchonete'
          ],
          tel: '(11) 97529-7752',
          whatsapp: '(11) 97529-7752',
          logoURL: 'https://3.bp.blogspot.com/-NJw9aMf4pbA/U83NJelGXkI/AAAAAAABS6I/cQH7TjJ8B80/s1600/habibs+logo.jpg',
          photoURL: 'https://www.habibs.com.br/storage/products/images/1_grid_fundo_2.jpg',
          facebookURL: '',
          instagramURL: '',
          deliveryURL: '',
          siteURL: '',
          city: 'Bragança Paulista',
          state: 'SP',
          cep: '12900-351',
          owner: 'Matheus Vieira',
          email: 'matheusvieiradepaula@gmail.com',
          document: '421.945.238-98',
          status: 1
        },
        {
          name: 'Lanchonete do Silvio Santos',
          description: `Silvio Santos Ipsum É por sua conta e riscoamm?
          É fácil ou não éam? Ma vejam só, vejam só. Eu só acreditoammmm....
          Vendoammmm. Mah roda a roduamm. É bom ou não éam? Mah você não consegue né Moisés?
          Você não consegueam.`,
          categories: [
            'Alimentação',
            'Lanchonete'
          ],
          tel: '',
          whatsapp: '(11) 97529-7752',
          logoURL: '',
          photoURL: '',
          facebookURL: '',
          instagramURL: '',
          siteURL: 'www.google.com',
          city: 'Bragança Paulista',
          state: 'SP',
          cep: '12900-351',
          owner: 'Matheus Vieira',
          email: 'matheusvieiradepaula@gmail.com',
          document: '421.945.238-98',
          status: 1
        }
      ],
      activeBusiness: {},
      showBusinessModal: false
    }
  },
  components: {
    'list-item': ListItem,
    'business-details': BusinessModal
  },
  methods: {
    showBusinnesDetails (business) {
      Object.assign(this.activeBusiness, business)
      this.showBusinessModal = true
    }
  }
}
</script>

<style>
  .q-dialog .q-btn.close-btn {
    background-color: rgba(255, 255, 255, .55)
  }
</style>
