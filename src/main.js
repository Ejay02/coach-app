import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import store from './store/index';
import baseCard from './components/ui/baseCard.vue';
import baseButton from './components/ui/baseButton.vue';
import baseBadge from './components/ui/baseBadge.vue';
import baseSpinner from './components/ui/baseSpinner.vue';
import baseDialog from './components/ui/baseDialog.vue';

const app = createApp(App);
app.use(store);

app.use(router);
app.component('base-card', baseCard);
app.component('base-badge', baseBadge);
app.component('base-button', baseButton);
app.component('base-spinner', baseSpinner);
app.component('base-dialog', baseDialog);
app.mount('#app');
