import Vue from 'vue'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
function render(App) {
    new Vue({
        render: h => h(App),
    }).$mount('#app')
}

export default render