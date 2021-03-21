import vue from "vue";
import App from "./App.vue";
import VueNativeNotification from "vue-native-notification";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSortDown, faSortUp)



vue.component('font-aweseome-icon', FontAwesomeIcon);
vue.use(VueNativeNotification, {
  requestOnNotify: true
});
vue.config.productionTip = false;

new vue({
  render: h => h(App)
}).$mount("#app");
