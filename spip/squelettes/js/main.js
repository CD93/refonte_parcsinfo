Vue.component('menu-haut', {
  data: function () {
    return {
      items: [
        {titre: "item 1"},
        {titre: "item 2"}
        ]
    }
  },
  template:
    '#menu-haut'
})

var app = new Vue({
  el: '#app',
  data() {
    return {
      id_parc: '',
      info: '',
      id_theme:[],
      carte: null,
      points: null,
      titre: "Chargement...",
      
      showMenu: false,
      chargement: true,
      myLayer:null
      }
  },
  mounted() {
    this.initMap();
    this.id_travaux = 43;
    var vm = this
    axios
    axios
    .get('http://parcs2018/api/agenda/encours',{
      params: {
        id_parc: vm.id_parc,
      }
    })
    .then(function(response){
      vm.loading = false; 
      vm.enAttente = false;
      vm.tout = response.data;
      vm.meta=false;
      vm.categories = response.data.subCategories;
      vm.documents = response.data.members;
      vm.idCatParent = response.data.nodeCategoryParent;
    })
    .catch(error => console.log(error))
   },
  computed: {
  },
  methods: {
    initMap() {
        this.carte = L.map('map',{scrollWheelZoom:false}).setView([48.90903, 2.45506], 11);
        this.fond = L.tileLayer('https://api.mapbox.com/styles/v1/samuelgodo/cikntcil500fiaxkirp48amn7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FtdWVsZ29kbyIsImEiOiJybVppYVBVIn0.S9oz7e1I5yfvYJuPhrVAyw');
        this.fond.addTo(this.carte);
        this.myLayer = L.geoJSON().addTo(this.carte);
      },
    chargerCarte() {
        this.myLayer.clearLayers();
        this.myLayer.addData(this.points);
        this.carte.fitBounds(this.myLayer.getBounds());
      },
    viderCarte() {
        this.myLayer.clearLayers();
      },
    idchantier() {
      this.params = new URLSearchParams(document.location.search.substring(1));
      return this.params.get("id_chantier");
    }
    }
  }
)
