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
      id_parc: '1',
      agenda: [],
      id_theme:[],
      encours: true,
      avenir: false,
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
    this.evenementEnCours();
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
    evenementAVenir() {
      this.avenir=true;
      this.encours= false;
      var vm = this
      axios
      axios
      .get('https://parcs2018.local/?page=agenda_avenir',{
       params: {
         id_article: vm.id_parc,
       }
     })
      .then(function(response){
       vm.loading = false; 
       vm.enAttente = false;
       vm.agenda = response.data;
     })
     .catch(error => console.log(error))
     },
     evenementEnCours() {
      this.avenir=false;
      this.encours= true;
      var vm = this
      axios
      axios
      .get('https://parcs2018.local/?page=agenda_encours',{
       params: {
         id_article: vm.id_parc,
       }
     })
      .then(function(response){
       vm.loading = false; 
       vm.enAttente = false;
       vm.agenda = response.data;
     })
     .catch(error => console.log(error))
     }
    }
  }
)
