import 'core-js/stable'
import Vue from 'vue'
import _Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from '@/assets/icons/icons'
import store from './store'
import { ValidationProvider, ValidationObserver } from '@/vee-validate'
import responseError        from '@/components/responseError.vue';
import UploadFileMultiple  from '@/components/UploadFileMultiple.vue';
import Notificacion       from '@/components/Notificaciones.vue';
import TitleSection     from '@/components/TituloSection.vue'
import ModalDelete    from '@/components/ModalDelete.vue';
import DataTable    from '@/components/MainDataTable.vue'
import ButtonOpen from '@/components/ButtonOpen.vue';
import Filtro  from '@/components/BuscadorGeneral.vue';
import vuetify   from './plugins/vuetify'
import FormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('UploadFileMultiple', UploadFileMultiple);
Vue.component('responseError', responseError);
Vue.component('Notificacion', Notificacion);
Vue.component('TitleSection', TitleSection);
Vue.component('ModalDelete', ModalDelete);
Vue.component('ButtonOpen', ButtonOpen);
Vue.component('DataTable', DataTable);
Vue.component('Filtro', Filtro);

Vue.config.performance = true;
Vue.use(CoreuiVue);
Vue.use(FormWizard)


Vue.prototype.$log = console.log.bind(console)



new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  vuetify,
  render: h => h(App)
})


